import { describe, expect, it } from "vitest";

import {
  ATELIER_DRAFT_KEY,
  MAX_STORY_CARDS,
  STORY_THEMES,
  addCard,
  buildStoryboard,
  createDraft,
  moveCard,
  parseDraft,
  removeCard,
  themeById,
} from "@/lib/experience/atelier";

const theme = STORY_THEMES[0];

describe("story atelier composition", () => {
  it("builds a storyboard in the chosen order", () => {
    const cards = [theme.beats[1].id, theme.beats[0].id];
    const frames = buildStoryboard({
      themeId: theme.id,
      atmosphereId: "intimate",
      moodId: "gold",
      cards,
      note: "test",
    });
    expect(frames.map((frame) => frame.id)).toEqual(cards);
    expect(frames[0].index).toBe(1);
    expect(frames[1].index).toBe(2);
    expect(frames[0].mood.id).toBe("gold");
  });

  it("ignores cards that do not belong to the theme", () => {
    const other = STORY_THEMES[1].beats[0].id;
    const frames = buildStoryboard({
      themeId: theme.id,
      atmosphereId: "intimate",
      moodId: "gold",
      cards: [theme.beats[0].id, other],
      note: "",
    });
    expect(frames).toHaveLength(1);
  });

  it("never duplicates a scene or exceeds the cap", () => {
    let sequence: string[] = [];
    for (let round = 0; round < 3; round += 1) {
      for (const beat of theme.beats) {
        sequence = addCard(sequence, beat.id, theme);
      }
    }
    expect(sequence).toHaveLength(theme.beats.length);
    expect(new Set(sequence).size).toBe(sequence.length);
    expect(sequence.length).toBeLessThanOrEqual(MAX_STORY_CARDS);
  });

  it("reorders and removes within bounds", () => {
    const base = theme.beats.slice(0, 3).map((beat) => beat.id);
    expect(moveCard(base, 0, 2)).toEqual([base[1], base[2], base[0]]);
    expect(moveCard(base, 0, 5)).toEqual(base);
    expect(moveCard(base, -1, 1)).toEqual(base);
    expect(removeCard(base, base[1])).toEqual([base[0], base[2]]);
  });

  it("round-trips a local draft", () => {
    const draft = createDraft({
      themeId: theme.id,
      atmosphereId: "lyrical",
      moodId: "archive",
      cards: [theme.beats[0].id],
      note: "ملاحظة",
    });
    const parsed = parseDraft(JSON.stringify(draft));
    expect(parsed).not.toBeNull();
    expect(parsed?.cards).toEqual([theme.beats[0].id]);
    expect(parsed?.note).toBe("ملاحظة");
  });

  it("rejects corrupt, stale or hostile drafts instead of crashing", () => {
    expect(parseDraft(null)).toBeNull();
    expect(parseDraft("{not json")).toBeNull();
    expect(parseDraft(JSON.stringify({ version: 2 }))).toBeNull();
    expect(
      parseDraft(
        JSON.stringify({
          version: 1,
          themeId: "unknown",
          atmosphereId: "intimate",
          moodId: "gold",
          cards: [],
          note: "",
        }),
      ),
    ).toBeNull();
    const scrubbed = parseDraft(
      JSON.stringify({
        version: 1,
        themeId: theme.id,
        atmosphereId: "intimate",
        moodId: "gold",
        cards: ["made-up", theme.beats[0].id, 42],
        note: 123,
      }),
    );
    expect(scrubbed?.cards).toEqual([theme.beats[0].id]);
    expect(scrubbed?.note).toBe("");
  });

  it("keeps the draft key stable for the workspace", () => {
    expect(ATELIER_DRAFT_KEY).toBe("bm-atelier-draft-v1");
    expect(themeById(theme.id)?.beats.length).toBeGreaterThanOrEqual(4);
  });
});
