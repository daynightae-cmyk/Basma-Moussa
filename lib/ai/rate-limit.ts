import "server-only";

import { createHmac } from "node:crypto";

const LIMIT_PER_MINUTE = 12;
const local = new Map<string, { count: number; expires: number }>();

export type RateResult = { allowed: true } | {
  allowed: false;
  reason: "limited" | "unconfigured" | "unavailable";
};

/**
 * Production is fail-closed unless Redis rate limiting is configured.
 * An in-memory Map cannot secure an autoscaling/serverless deployment.
 */
export async function checkAiRateLimit(headers: Headers): Promise<RateResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if ((!url || !token) && process.env.NODE_ENV === "production") {
    return { allowed: false, reason: "unconfigured" };
  }

  // Only trust forwarding when Vercel is the authenticated edge.
  // Unknown peers share a conservative bucket; no client-supplied IP is stored.
  const forwarded = process.env.VERCEL === "1"
    ? headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    : undefined;
  const rawClient = forwarded && /^[\da-fA-F.:]+$/.test(forwarded) ? forwarded : "shared";
  const salt = process.env.AI_RATE_LIMIT_SALT ?? process.env.AI_API_KEY ?? "development";
  const bucket = createHmac("sha256", salt).update(rawClient).digest("hex").slice(0, 24);
  const key = "bm:ai:chat:" + bucket + ":" + Math.floor(Date.now() / 60_000);

  if (url && token) {
    try {
      const endpoint = new URL(url);
      if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".upstash.io")) {
        return { allowed: false, reason: "unavailable" };
      }
      const response = await fetch(endpoint.toString().replace(/\/$/, "") + "/pipeline", {
        method: "POST",
        headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", key], ["EXPIRE", key, "75"]]),
        cache: "no-store",
        signal: AbortSignal.timeout(2_000),
      });
      if (!response.ok) return { allowed: false, reason: "unavailable" };
      const result: unknown = await response.json();
      if (!Array.isArray(result) || typeof result[0]?.result !== "number" ||
          result[0].error || result[1]?.error) {
        return { allowed: false, reason: "unavailable" };
      }
      return result[0].result <= LIMIT_PER_MINUTE
        ? { allowed: true } : { allowed: false, reason: "limited" };
    } catch {
      return { allowed: false, reason: "unavailable" };
    }
  }

  // Single-process developer fallback only.
  const now = Date.now();
  if (local.size > 1_000) {
    for (const [oldKey, value] of local) {
      if (value.expires < now) local.delete(oldKey);
    }
  }
  const state = local.get(key) ?? { count: 0, expires: now + 75_000 };
  state.count += 1;
  local.set(key, state);
  return state.count <= LIMIT_PER_MINUTE
    ? { allowed: true } : { allowed: false, reason: "limited" };
}
