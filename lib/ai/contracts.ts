import { z } from "zod";

export const chatMessageSchema = z.strictObject({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2_400),
});

export const chatRequestSchema = z.strictObject({
  locale: z.enum(["ar", "en"]),
  messages: z.array(chatMessageSchema).min(1).max(14),
}).superRefine((value, ctx) => {
  if (value.messages[0]?.role !== "user" || value.messages.at(-1)?.role !== "user") {
    ctx.addIssue({ code: "custom", path: ["messages"], message: "Conversation must begin and end with a user message." });
  }
  if (value.messages.some((message, index) => index > 0 && message.role === value.messages[index - 1].role)) {
    ctx.addIssue({ code: "custom", path: ["messages"], message: "Roles must alternate." });
  }
  const total = value.messages.reduce((sum, message) => sum + message.content.length, 0);
  if (total > 10_000) {
    ctx.addIssue({ code: "custom", path: ["messages"], message: "Conversation exceeds its size budget." });
  }
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatStreamEvent =
  | { type: "meta"; sourceIds: string[] }
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };
