import type { MediaWorldEntry, ProgramCategory } from "./types";

export type MediaCategoryFilter = "all" | ProgramCategory;

export const mediaCategories: MediaCategoryFilter[] = [
  "all",
  "conversation",
  "legal",
  "documentary",
  "audio",
];

export function normalizeSearch(input: string): string {
  return input
    .toLocaleLowerCase()
    .normalize("NFKC")
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function haystack(entry: MediaWorldEntry): string {
  return normalizeSearch(
    [
      entry.title.ar,
      entry.title.en,
      entry.teaser.ar,
      entry.teaser.en,
      entry.kicker.ar,
      entry.kicker.en,
      entry.searchText.ar,
      entry.searchText.en,
    ].join(" "),
  );
}

export function filterMediaWorlds(
  worlds: MediaWorldEntry[],
  options: { query: string; category: MediaCategoryFilter },
): MediaWorldEntry[] {
  const query = normalizeSearch(options.query);
  return worlds.filter((world) => {
    if (options.category !== "all" && world.category !== options.category) {
      return false;
    }
    if (!query) return true;
    return haystack(world).includes(query);
  });
}
