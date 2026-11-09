/**
 * OpenAI-compatible chat-completions SSE decoder.
 * Handles chunk boundaries, multiple data lines and [DONE].
 */
export class ProviderStreamParser {
  private pending = "";
  private completed = false;

  consume(chunk: string): { deltas: string[]; done: boolean } {
    if (this.completed) return { deltas: [], done: true };
    this.pending += chunk.replace(/\r\n/g, "\n");
    if (this.pending.length > 65_536) throw new Error("Provider frame exceeds safety limit.");

    const deltas: string[] = [];
    while (true) {
      const end = this.pending.indexOf("\n\n");
      if (end < 0) break;
      const frame = this.pending.slice(0, end);
      this.pending = this.pending.slice(end + 2);
      const data = frame.split("\n")
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart()).join("\n").trim();
      if (!data) continue;
      if (data === "[DONE]") {
        this.completed = true;
        break;
      }
      let parsed: unknown;
      try { parsed = JSON.parse(data); } catch { throw new Error("Invalid provider streaming frame."); }
      if (!parsed || typeof parsed !== "object") continue;
      const response = parsed as {
        error?: { message?: string };
        choices?: Array<{ delta?: { content?: string | null } }>;
      };
      if (response.error) throw new Error("Provider reported an error.");
      const content = response.choices?.[0]?.delta?.content;
      if (typeof content === "string" && content.length) deltas.push(content);
    }
    return { deltas, done: this.completed };
  }
}
