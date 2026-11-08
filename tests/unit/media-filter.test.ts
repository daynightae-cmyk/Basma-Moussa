import { describe, expect, it } from "vitest";
import {
  filterMediaWorlds,
  mediaCategories,
  normalizeSearch,
} from "@/lib/content/media-filter";
import { portalWorlds } from "@/lib/content/worlds";

describe("media search normalization", () => {
  it("removes Arabic diacritics, tatweel and unifies letter variants", () => {
    expect(normalizeSearch("خَارِج الإطَار")).toBe("خارج الاطار");
    expect(normalizeSearch("إطار")).toBe("اطار");
    expect(normalizeSearch("آفاق")).toBe("افاق");
    expect(normalizeSearch("مصطفى")).toBe("مصطفي");
    expect(normalizeSearch("حكاية")).toBe("حكايه");
    expect(normalizeSearch("مستشفى")).toBe("مستشفي");
    expect(normalizeSearch("خارجـــ الإطار")).toBe("خارج الاطار");
  });

  it("lowercases, strips punctuation and collapses whitespace", () => {
    expect(normalizeSearch("  Beyond   the FRAME! ")).toBe("beyond the frame");
    expect(normalizeSearch("Legal-Lens / law")).toBe("legal lens law");
    expect(normalizeSearch("...")).toBe("");
  });
});

describe("media filtering", () => {
  it("offers only the honest top-level categories", () => {
    expect(mediaCategories).toEqual([
      "all",
      "conversation",
      "legal",
      "documentary",
      "audio",
    ]);
  });

  it("returns every world for an empty query", () => {
    expect(
      filterMediaWorlds(portalWorlds, { query: "", category: "all" }),
    ).toHaveLength(portalWorlds.length);
    expect(
      filterMediaWorlds(portalWorlds, { query: "   ", category: "all" }),
    ).toHaveLength(portalWorlds.length);
  });

  it("matches Arabic queries without requiring exact orthography", () => {
    const results = filterMediaWorlds(portalWorlds, {
      query: "قانون",
      category: "all",
    });
    expect(results.map((world) => world.id)).toEqual(["the-legal-lens"]);

    const outside = filterMediaWorlds(portalWorlds, {
      query: "الاطار",
      category: "all",
    });
    expect(outside.map((world) => world.id)).toEqual(["beyond-the-frame"]);
  });

  it("matches English queries across title, teaser and search text", () => {
    expect(
      filterMediaWorlds(portalWorlds, { query: "city", category: "all" }).map(
        (world) => world.id,
      ),
    ).toEqual(["city-voices"]);
    expect(
      filterMediaWorlds(portalWorlds, { query: "waveform", category: "all" }).map(
        (world) => world.id,
      ),
    ).toEqual(["soundroom"]);
  });

  it("combines category and query filters", () => {
    expect(
      filterMediaWorlds(portalWorlds, {
        query: "law",
        category: "documentary",
      }),
    ).toHaveLength(0);
    expect(
      filterMediaWorlds(portalWorlds, {
        query: "city",
        category: "documentary",
      }).map((world) => world.id),
    ).toEqual(["city-voices"]);
    expect(
      filterMediaWorlds(portalWorlds, {
        query: "",
        category: "audio",
      }).map((world) => world.id),
    ).toEqual(["soundroom"]);
  });

  it("returns an empty list for text that matches nothing", () => {
    expect(
      filterMediaWorlds(portalWorlds, { query: "zzzz", category: "all" }),
    ).toEqual([]);
  });
});
