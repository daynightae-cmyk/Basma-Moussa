import { describe, it, expect } from "vitest";
import { dictionaries, getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

function keys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" && v !== null && !Array.isArray(v)
      ? keys(v as Record<string, unknown>, `${prefix}${k}.`)
      : [`${prefix}${k}`]
  );
}

function nested(obj: Record<string, unknown>, path: string[]): unknown {
  let cur: unknown = obj;
  for (const p of path) {
    cur = (cur as Record<string, unknown> | undefined)?.[p];
    if (cur === undefined) return undefined;
  }
  return cur;
}

describe("dictionary parity", () => {
  for (const locale of ["ar", "en"] as Locale[]) {
    it(`${locale}: every string is non-empty`, () => {
      const dict = getDictionary(locale);
      const bad = keys(dict).filter(
        (k) =>
          typeof nested(dict, k.split(".")) !== "string" ||
          (nested(dict, k.split(".")) as string).trim() === ""
      );
      expect(bad).toEqual([]);
    });
  }

  it("ar and en share the exact same key tree", () => {
    const arKeys = keys(dictionaries.ar).sort();
    const enKeys = keys(dictionaries.en).sort();
    expect(enKeys).toEqual(arKeys);
  });
});
