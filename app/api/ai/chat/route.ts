import { NextRequest } from "next/server";
import { chatRequestSchema, type ChatStreamEvent } from "@/lib/ai/contracts";
import { buildGroundedPrompt } from "@/lib/ai/grounding";
import { ProviderStreamParser } from "@/lib/ai/provider-stream";
import { checkAiRateLimit } from "@/lib/ai/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BODY_BYTES = 48_000;
const MAX_ANSWER_CHARS = 8_000;
const UPSTREAM_TIMEOUT_MS = 40_000;

function errorResponse(status: number, code: string, message: string): Response {
  return Response.json({ error: code, message }, {
    status,
    headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

export async function readBoundedJson(req: Request): Promise<unknown> {
  const length = Number(req.headers.get("content-length") ?? "0");
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
  if (!req.body) throw new Error("INVALID_BODY");
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      size += next.value.byteLength;
      if (size > MAX_BODY_BYTES) throw new Error("PAYLOAD_TOO_LARGE");
      chunks.push(next.value);
    }
  } finally {
    reader.releaseLock();
  }
  const merged = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try { return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(merged)); }
  catch { throw new Error("INVALID_BODY"); }
}

function providerEndpoint(): URL | null {
  const key = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL;
  if (!key || !model || model.length > 100) return null;
  try {
    const endpoint = new URL(process.env.AI_PROVIDER_BASE_URL ?? "https://api.openai.com/v1");
    const approved = (process.env.AI_APPROVED_PROVIDER_HOSTS ?? "api.openai.com")
      .split(",").map((host) => host.trim().toLowerCase()).filter(Boolean);
    if (endpoint.protocol !== "https:" || !approved.includes(endpoint.hostname.toLowerCase()) ||
        endpoint.username || endpoint.password || endpoint.search || endpoint.hash ||
        endpoint.port || !/^[a-z0-9._/-]+$/i.test(endpoint.pathname)) return null;
    return new URL(endpoint.href.replace(/\/$/, "") + "/chat/completions");
  } catch {
    return null;
  }
}

function isCrossOrigin(req: NextRequest): boolean {
  if (req.headers.get("sec-fetch-site") === "cross-site") return true;
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const host = req.headers.get("x-forwarded-host") ??
      req.headers.get("host") ?? new URL(req.url).host;
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(request: NextRequest): Promise<Response> {
  if (isCrossOrigin(request)) {
    return errorResponse(403, "FORBIDDEN_ORIGIN", "Cross-origin chat requests are not allowed.");
  }
  if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
    return errorResponse(415, "UNSUPPORTED_MEDIA_TYPE", "Expected application/json.");
  }

  let raw: unknown;
  try { raw = await readBoundedJson(request); }
  catch (error) {
    const oversized = error instanceof Error && error.message === "PAYLOAD_TOO_LARGE";
    return errorResponse(oversized ? 413 : 400, oversized ? "PAYLOAD_TOO_LARGE" : "INVALID_BODY",
      oversized ? "Chat request is too large." : "Invalid JSON request.");
  }
  const parsed = chatRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return errorResponse(422, "INVALID_MESSAGES", "Invalid conversation format or size.");
  }

  const rate = await checkAiRateLimit(request.headers);
  if (!rate.allowed) {
    return errorResponse(rate.reason === "limited" ? 429 : 503,
      rate.reason === "limited" ? "RATE_LIMITED" : "RATE_LIMIT_UNAVAILABLE",
      rate.reason === "limited" ? "Too many messages. Please try again later." :
        "Chat service capacity protection is not configured or is unavailable.");
  }
  const endpoint = providerEndpoint();
  if (!endpoint) {
    return errorResponse(503, "AI_NOT_CONFIGURED",
      "An approved AI provider and model must be configured on the server.");
  }

  const grounded = buildGroundedPrompt(parsed.data.locale, parsed.data.messages);
  const upstreamAbort = new AbortController();
  const onClientAbort = () => upstreamAbort.abort();
  request.signal.addEventListener("abort", onClientAbort, { once: true });
  const timeout = setTimeout(() => upstreamAbort.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(endpoint.toString(), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.AI_API_KEY!,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL,
        stream: true,
        messages: grounded.messages,
        temperature: 0.45,
        max_tokens: 850,
      }),
      cache: "no-store",
      redirect: "error",
      signal: upstreamAbort.signal,
    });
  } catch {
    clearTimeout(timeout);
    request.signal.removeEventListener("abort", onClientAbort);
    return errorResponse(502, "AI_PROVIDER_UNAVAILABLE", "AI provider could not be reached.");
  }
  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    upstreamAbort.abort();
    request.signal.removeEventListener("abort", onClientAbort);
    // Never forward raw provider error bodies, endpoints, model names or tokens.
    return errorResponse(502, "AI_PROVIDER_ERROR", "The AI provider did not accept the request.");
  }

  const reader = upstream.body.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const output = new ReadableStream<Uint8Array>({
    start(controller) {
      const send = (event: ChatStreamEvent) => {
        controller.enqueue(encoder.encode("data: " + JSON.stringify(event) + "\n\n"));
      };
      const parser = new ProviderStreamParser();
      let delivered = 0;
      void (async () => {
        try {
          send({ type: "meta", sourceIds: grounded.sourceIds });
          while (!upstreamAbort.signal.aborted) {
            const chunk = await reader.read();
            if (chunk.done) break;
            const frame = parser.consume(decoder.decode(chunk.value, { stream: true }));
            for (const text of frame.deltas) {
              const remaining = MAX_ANSWER_CHARS - delivered;
              if (remaining <= 0) break;
              const part = text.slice(0, remaining);
              if (part) {
                send({ type: "delta", text: part });
                delivered += part.length;
              }
            }
            if (frame.done || delivered >= MAX_ANSWER_CHARS) break;
          }
          if (!upstreamAbort.signal.aborted && delivered > 0) {
            send({ type: "done" });
          } else if (!upstreamAbort.signal.aborted) {
            send({ type: "error", message: "No response content was available." });
          }
        } catch {
          if (!upstreamAbort.signal.aborted) {
            try { send({ type: "error", message: "The answer stream was interrupted." }); } catch { /* disconnected */ }
          }
        } finally {
          clearTimeout(timeout);
          request.signal.removeEventListener("abort", onClientAbort);
          void reader.cancel().catch(() => undefined);
          try { controller.close(); } catch { /* browser disconnected */ }
        }
      })();
    },
    cancel() {
      upstreamAbort.abort();
      clearTimeout(timeout);
      request.signal.removeEventListener("abort", onClientAbort);
      void reader.cancel().catch(() => undefined);
    },
  });

  return new Response(output, {
    status: 200,
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "same-origin",
    },
  });
}
