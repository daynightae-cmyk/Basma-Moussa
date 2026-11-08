import { describe, it, expect } from "vitest";
import { ASSETS, getAsset, BRAND_LOGO_ID } from "@/lib/content/assets";
import { PROGRAMS } from "@/lib/content/programs";
import { OFFICIAL_SOURCES } from "@/lib/content/sources";
import { LEGAL_OUTLINES } from "@/lib/content/legal";

describe("content honesty", () => {
  it("every program is a concept with no published claims", () => {
    for (const p of PROGRAMS) {
      expect(p.status).toBe("concept");
      expect(p.episodeIds).toEqual([]);
      expect(p.worldHref).toMatch(/^\//);
    }
  });

  it("every program references an existing asset", () => {
    for (const p of PROGRAMS) {
      expect(() => getAsset(p.heroAssetId)).not.toThrow();
    }
  });

  it("only the logo is brand-approved; all others are illustrative concepts", () => {
    for (const a of ASSETS) {
      if (a.id === BRAND_LOGO_ID) {
        expect(a.editorialStatus).toBe("brand-approved");
        expect(a.provenance).toBe("user-approved-brand");
      } else {
        expect(a.provenance).toBe("user-supplied-ai-concept");
        expect(a.publishedClaimAllowed).toBe(false);
      }
    }
  });

  it("official sources are https entry points with jurisdictions", () => {
    for (const s of OFFICIAL_SOURCES) {
      expect(s.url).toMatch(/^https:\/\//);
      expect(s.verifiedAsWebsiteEntryPoint).toBe(true);
      expect(s.apiVerified).toBe(false);
      expect(s.jurisdiction).toBeTruthy();
    }
  });

  it("legal outlines are outlines only, never published claims", () => {
    for (const o of LEGAL_OUTLINES) {
      expect(o.status).toBe("outline");
      expect(o.sourceIds.length).toBeGreaterThan(0);
    }
  });
});
