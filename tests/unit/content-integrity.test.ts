import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { assets, BRAND_LOGO, HOME_HERO, sourceAuditDate } from "@/lib/content/assets";
import { programs, programSlugs } from "@/lib/content/programs";
import { officialSources } from "@/lib/content/sources";
import { legalOutlines } from "@/lib/content/legal";
import { portalWorlds, secondaryWorlds } from "@/lib/content/worlds";
import { normalizeSearch } from "@/lib/content/media-filter";
import { aboutPageContent } from "@/lib/content/pages/about";
import { contactPageContent } from "@/lib/content/pages/contact";
import { homeContent } from "@/lib/content/pages/home";
import { legalPageContent } from "@/lib/content/pages/legal";
import { mediaPageContent } from "@/lib/content/pages/media";
import { privacyPageContent } from "@/lib/content/pages/privacy";
import { programLabels } from "@/lib/content/pages/programs";
import { soundroomPageContent } from "@/lib/content/pages/soundroom";
import { storiesPageContent } from "@/lib/content/pages/stories";
import { studioPageContent } from "@/lib/content/pages/studio";
import { SITE_URL, BRAND, WHATSAPP_NUMBER, CONTACT_CHANNELS } from "@/lib/site";

const publicDir = path.join(process.cwd(), "public");

function collectStrings(value: unknown, trail: string[] = []): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectStrings(item, [...trail, String(index)]));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectStrings(item, [...trail, key]),
    );
  }
  return [];
}

function collectKeys(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectKeys(item));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) => [
      key,
      ...collectKeys(item),
    ]);
  }
  return [];
}

const pageCopies = {
  home: homeContent,
  about: aboutPageContent,
  contact: contactPageContent,
  legal: legalPageContent,
  media: mediaPageContent,
  privacy: privacyPageContent,
  programs: programLabels,
  soundroom: soundroomPageContent,
  stories: storiesPageContent,
  studio: studioPageContent,
};

describe("content integrity", () => {
  it("keeps every approved media asset illustrative unless the brand approved it", () => {
    expect(assets).toHaveLength(14);
    for (const asset of assets) {
      expect(asset.alt.ar.trim().length).toBeGreaterThan(0);
      expect(asset.alt.en.trim().length).toBeGreaterThan(0);
      expect(asset.publishedClaimAllowed, asset.id).toBe(false);
      expect(asset.blurDataURL.startsWith("data:image/"), asset.id).toBe(true);

      if (asset.provenance === "user-supplied-ai-concept") {
        expect(asset.editorialStatus, asset.id).toBe("illustrative-review-required");
      } else {
        expect(asset.provenance, asset.id).toBe("user-approved-brand");
        expect(asset.editorialStatus, asset.id).toBe("brand-approved");
      }
    }
    expect(BRAND_LOGO.id).toBe("bm-06");
    expect(HOME_HERO.id).toBe("bm-14");
    expect(sourceAuditDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("points every asset at a file that actually exists in public/", () => {
    for (const asset of assets) {
      const file = path.join(publicDir, asset.src.replace(/^\//, ""));
      expect(fs.existsSync(file), `${asset.id} -> ${asset.src}`).toBe(true);
      expect(fs.statSync(file).size, asset.id).toBeGreaterThan(1_000);
    }
  });

  it("keeps all programs as concepts with zero published episodes", () => {
    expect(programs).toHaveLength(4);
    expect(programSlugs).toEqual([
      "beyond-the-frame",
      "the-legal-lens",
      "city-voices",
      "soundroom",
    ]);
    for (const program of programs) {
      expect(program.episodeIds, program.slug).toHaveLength(0);
      expect(program.status, program.slug).not.toBe("published");
      expect(program.title.ar.trim().length).toBeGreaterThan(0);
      expect(program.title.en.trim().length).toBeGreaterThan(0);
      expect(program.formats.length).toBeGreaterThanOrEqual(3);
      expect(program.gates.length).toBeGreaterThanOrEqual(3);
      expect(program.experienceHref.startsWith("/")).toBe(true);
      expect(assets.some((asset) => asset.id === program.heroAssetId)).toBe(true);
      expect(assets.some((asset) => asset.id === program.secondaryAssetId)).toBe(true);
    }
    const totalEpisodes = programs.reduce(
      (total, program) => total + program.episodeIds.length,
      0,
    );
    expect(totalEpisodes).toBe(0);
  });

  it("publishes official website entry points, never a claimed API", () => {
    expect(officialSources).toHaveLength(4);
    for (const source of officialSources) {
      expect(source.url.startsWith("https://")).toBe(true);
      expect(source.verifiedAsWebsiteEntryPoint).toBe(true);
      expect(source.apiVerified).toBe(false);
      expect(source.licenseReviewed).toBe(false);
    }
    const sourceIds = new Set(officialSources.map((source) => source.id));
    for (const outline of legalOutlines) {
      expect(outline.status).toBe("outline");
      expect(outline.sourceIds.length).toBeGreaterThan(0);
      for (const sourceId of outline.sourceIds) {
        expect(sourceIds.has(sourceId), `${outline.id} -> ${sourceId}`).toBe(true);
      }
      expect(outline.note.ar.trim().length).toBeGreaterThan(0);
      expect(outline.note.en.trim().length).toBeGreaterThan(0);
    }
  });

  it("connects every portal world to a real program, asset and localized route", () => {
    expect(portalWorlds).toHaveLength(4);
    for (const world of portalWorlds) {
      expect(programSlugs).toContain(world.programSlug);
      expect(assets.some((asset) => asset.id === world.assetId)).toBe(true);
      expect(world.href.startsWith("/")).toBe(true);
      expect(world.title.ar.trim().length).toBeGreaterThan(0);
      expect(world.title.en.trim().length).toBeGreaterThan(0);
      expect(normalizeSearch(world.searchText.ar).length).toBeGreaterThan(0);
      expect(normalizeSearch(world.searchText.en).length).toBeGreaterThan(0);
    }
    for (const world of secondaryWorlds) {
      expect(assets.some((asset) => asset.id === world.assetId)).toBe(true);
    }
  });

  it("has no empty copy, placeholder token or missing translation in page content", () => {
    for (const [name, copy] of Object.entries(pageCopies)) {
      for (const locale of ["ar", "en"] as const) {
        const strings = collectStrings(copy[locale]);
        expect(strings.length, name).toBeGreaterThan(0);
        for (const value of strings) {
          expect(value.trim().length, `${name}.${locale}`).toBeGreaterThan(0);
          expect(value).not.toMatch(/lorem ipsum|TODO|FIXME|\{\{|\}\}/i);
        }
      }
      expect(collectKeys(copy.ar).sort()).toEqual(collectKeys(copy.en).sort());
    }
  });

  it("keeps contact honest: one verified WhatsApp channel, no form or email", () => {
    expect(WHATSAPP_NUMBER).toBe("971507226089");
    expect(CONTACT_CHANNELS).toEqual({ whatsapp: true, email: false, form: false });
    expect(BRAND.product).toBe("Media Universe");
    expect(SITE_URL.startsWith("https://")).toBe(true);
    expect(SITE_URL.endsWith("/")).toBe(false);
  });
});
