import { describe, expect, it } from "vitest";
import { dictionaries } from "@/lib/i18n/dictionary";
import {
  defaultLocale,
  direction,
  htmlLang,
  isLocale,
  locales,
  openGraphLocale,
  otherLocale,
} from "@/lib/i18n/config";
import {
  localizedPath,
  pathWithoutLocale,
  switchLocalePath,
} from "@/lib/i18n/paths";
import {
  isKnownLocalizedPath,
  isProgramSlug,
  LOST_PATH,
  STATIC_LOCALIZED_PATHS,
} from "@/lib/routes";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { programSlugs } from "@/lib/content/programs";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

function flatten(value: unknown, trail: string[] = []): Map<string, string> {
  if (typeof value === "string") return new Map([[trail.join("."), value]]);
  if (value && typeof value === "object") {
    return new Map(
      Object.entries(value).flatMap(([key, item]) =>
        [...flatten(item, [...trail, key]).entries()],
      ),
    );
  }
  return new Map();
}

describe("bilingual dictionary", () => {
  it("has exactly two locales with matching text keys", () => {
    expect(locales).toEqual(["ar", "en"]);
    expect(defaultLocale).toBe("ar");
    const ar = flatten(dictionaries.ar);
    const en = flatten(dictionaries.en);
    expect([...ar.keys()].sort()).toEqual([...en.keys()].sort());
  });

  it("never ships an empty or whitespace-only label", () => {
    for (const locale of locales) {
      for (const [key, value] of flatten(dictionaries[locale])) {
        expect(value.trim().length, `${locale}:${key}`).toBeGreaterThan(0);
        expect(value, `${locale}:${key}`).not.toMatch(/undefined|null/);
      }
    }
  });

  it("keeps the locale metadata coherent", () => {
    expect(isLocale("ar")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(direction).toEqual({ ar: "rtl", en: "ltr" });
    expect(htmlLang).toEqual({ ar: "ar", en: "en" });
    expect(otherLocale).toEqual({ ar: "en", en: "ar" });
    expect(openGraphLocale).toEqual({ ar: "ar_AE", en: "en_AE" });
  });
});

describe("localized paths", () => {
  it("builds locale-prefixed paths without doubling slashes", () => {
    expect(localizedPath("ar")).toBe("/ar");
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("ar", "media")).toBe("/ar/media");
    expect(localizedPath("en", "/programs/soundroom")).toBe(
      "/en/programs/soundroom",
    );
  });

  it("switches locale while preserving the rest of the path", () => {
    expect(switchLocalePath("/ar/about", "en")).toBe("/en/about");
    expect(switchLocalePath("/en/programs/beyond-the-frame", "ar")).toBe(
      "/ar/programs/beyond-the-frame",
    );
    expect(switchLocalePath("/", "ar")).toBe("/ar");
    expect(switchLocalePath("/about", "en")).toBe("/en");
  });

  it("strips the locale segment for navigation matching", () => {
    expect(pathWithoutLocale("/ar")).toBe("/");
    expect(pathWithoutLocale("/en/programs/soundroom")).toBe(
      "/programs/soundroom",
    );
    expect(pathWithoutLocale("/about")).toBe("/about");
    expect(pathWithoutLocale("")).toBe("/");
  });
});

describe("known route gate", () => {
  it("accepts only real localized routes", () => {
    expect(isKnownLocalizedPath([])).toBe(true);
    for (const route of STATIC_LOCALIZED_PATHS) {
      expect(isKnownLocalizedPath([route.slice(1)]), route).toBe(true);
    }
    expect(isKnownLocalizedPath([LOST_PATH.slice(1)])).toBe(true);
    for (const slug of programSlugs) {
      expect(isKnownLocalizedPath(["programs", slug]), slug).toBe(true);
      expect(isProgramSlug(slug)).toBe(true);
    }
  });

  it("rejects unknown segments, deep unknown paths and missing program slugs", () => {
    expect(isKnownLocalizedPath(["programs"])).toBe(false);
    expect(isKnownLocalizedPath(["programs", "unknown"])).toBe(false);
    expect(isKnownLocalizedPath(["about", "extra"])).toBe(false);
    expect(isKnownLocalizedPath(["foo"])).toBe(false);
    expect(isKnownLocalizedPath(["foo", "bar"])).toBe(false);
    expect(isKnownLocalizedPath(["media", ""])).toBe(false);
    expect(isProgramSlug("unknown")).toBe(false);
  });
});

describe("SEO", () => {
  it("builds canonical, hreflang and social metadata per locale", () => {
    const metadata = buildPageMetadata({
      locale: "en",
      path: "/programs/soundroom",
      title: "Soundroom",
      description: "A concept, not a published audio show.",
      image: "/brand/og-soundroom.jpg",
      imageAlt: "Soundroom concept",
    });

    expect(metadata.title).toBe("Soundroom");
    expect(metadata.description).toBe(
      "A concept, not a published audio show.",
    );
    expect(metadata.alternates?.canonical).toBe(
      `${SITE_URL}/en/programs/soundroom`,
    );
    expect(metadata.alternates?.languages).toMatchObject({
      ar: `${SITE_URL}/ar/programs/soundroom`,
      en: `${SITE_URL}/en/programs/soundroom`,
      "x-default": `${SITE_URL}/ar/programs/soundroom`,
    });
    expect(metadata.openGraph?.url).toBe(
      `${SITE_URL}/en/programs/soundroom`,
    );
    expect(metadata.openGraph?.locale).toBe("en_AE");
    expect(metadata.openGraph?.alternateLocale).toEqual(["ar_AE"]);
    const images = metadata.openGraph?.images as { url: string }[];
    expect(images[0]?.url).toBe(`${SITE_URL}/brand/og-soundroom.jpg`);
    const twitterImages = metadata.twitter?.images as string[];
    expect(twitterImages[0]).toBe(`${SITE_URL}/brand/og-soundroom.jpg`);
  });

  it("keeps absolute titles absolute and locale home canonical clean", () => {
    const metadata = buildPageMetadata({
      locale: "ar",
      path: "/",
      title: "بسمة موسى — عالم الإعلام",
      description: "وصف",
      absoluteTitle: true,
    });
    expect(metadata.title).toEqual({ absolute: "بسمة موسى — عالم الإعلام" });
    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/ar`);
    expect(metadata.alternates?.languages).toMatchObject({
      ar: `${SITE_URL}/ar`,
      en: `${SITE_URL}/en`,
    });
  });

  it("lists every localized route once in the sitemap, with alternates", () => {
    const entries = sitemap();
    const expectedCount =
      (STATIC_LOCALIZED_PATHS.length + 1 + programSlugs.length) * locales.length;
    expect(entries).toHaveLength(expectedCount);

    const urls = entries.map((entry) => entry.url);
    expect(new Set(urls).size).toBe(entries.length);
    expect(urls).toContain(`${SITE_URL}/ar`);
    expect(urls).toContain(`${SITE_URL}/en/media`);
    expect(urls).toContain(`${SITE_URL}/ar/programs/soundroom`);
    expect(urls).toContain(`${SITE_URL}/en/privacy`);

    const home = entries.find((entry) => entry.url === `${SITE_URL}/ar`);
    expect(home?.alternates?.languages).toMatchObject({
      ar: `${SITE_URL}/ar`,
      en: `${SITE_URL}/en`,
    });
  });

  it("advertises the sitemap and allows crawling", () => {
    const rules = robots();
    expect(rules.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(rules.host).toBe(SITE_URL);
    expect(rules.rules).toMatchObject([{ userAgent: "*", allow: "/" }]);
  });
});
