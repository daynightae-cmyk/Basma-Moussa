# Real Content & Data Sources — Honest Media Platform
**Reviewed 2026-11-08** · Public external source entry points, not promised API integrations

## Problem and solution
A cinematic site can be gorgeous while being completely empty. The initial authentic data set consists of the approved product vision, actual supplied image assets, Basma's reviewable background, and source-linked official information. The four media shows are *concepts*, not broadcast episodes.

Use an editorial engine with a source registry, correct approval states and genuine UI; never fill it with fabricated counts or fictional interviews.

## Official external source registry (verified website entry points)
1. **UAE Legislation** — https://uaelegislation.gov.ae/en
   - UAE Cabinet-supported portal for federal legislation and regulations, useful for legal-awareness source links. Public website does not imply an unrestricted API or republication license.
2. **Sharjah Government Media Bureau** — https://sgmb.ae/en
   - Official source for Sharjah government news/public updates. Use outbound attributed references; check reuse terms before excerpting/media embedding.
3. **UAE government open data overview** — https://u.ae/en/about-the-uae/digital-uae/data/Open-government-data
   - Official starting point for public government data and statistics; inspect underlying data set permissions, formats, refresh dates and provenance before a data visualization.
4. **Dubai legal-affairs portal** — https://www.dubai.ae/en/legal-affairs
   - Official entry point to Dubai legal resources and official gazette references; separate Dubai emirate law from UAE federal law.

These are research/citation **links**, NOT automatically live feed endpoints. Do not invent /api/v1, credentials, RSS availability, JSON payload schema or rights. Check the actual site terms and technical access before building source ingestion.

## Three content lanes

### 1 — Owned / approved original material
- Basma profile and personal vision, after her approval of exact wording.
- Approved brand images, provenance in PRODUCTION_ASSET_MAP.md.
- Genuine recordings, real published stories, transcripts and episode files **only when supplied and authorized**.
- Public contact number only when authorized for business publication.

### 2 — Curated external resource library
- Official legislation source cards (URL, jurisdiction, category, retrievedAt, source title, plain-language editorial context).
- Sharjah public news source links with clear publisher credit and date; **do not relabel as Basma's reporting**.
- Public data visualizations only after an actual validated, rights-compatible dataset is used.

### 3 — Program concepts / planned productions
- Beyond the Frame: conversations & human interest.
- The Legal Lens: legal-awareness editorials.
- City Voices: UAE human/community stories.
- Soundroom: audio storytelling.

Treat as real product concepts but not published episodes. Clearly label status, no fake program seasons, play icons, guest names, trending metrics or live ticker.

## Minimum typed models
~~~ts
type Locale = "ar" | "en";
type EditorialStatus = "concept" | "draft" | "fact_check" | "subject_review" | "approved" | "published";
type SourceType = "official" | "owned" | "licensed" | "illustrative-ai";
type LocalizedText = { ar: string; en: string };
interface SourceReference {
  id: string;
  publisher: LocalizedText;
  url: string;
  jurisdiction?: "UAE-federal" | "Dubai" | "Sharjah" | "Egypt" | "global";
  publishedAt?: string;
  retrievedAt: string;
  licenseReviewed: boolean;
}
interface EditorialStory {
  id: string; slug: string;
  title: LocalizedText; body?: LocalizedText;
  status: EditorialStatus;
  type: "human-story" | "legal-explainer" | "audio-story" | "resource";
  sourceIds: string[];
  reviewDate?: string;
  publishedAt?: string;
  mediaIds: string[];
}
interface Episode {
  id: string;
  programId: string;
  status: EditorialStatus;
  audioUrl?: string;
  videoUrl?: string;
  publishedAt?: string;
  captionsUrl?: string;
}
~~~

Define schemas using Zod or equivalent at API boundaries. The precise TS file location may be adjusted to the existing app structure; do not rebuild a duplicate CMS simply to imitate this outline.

## Real dynamic ingestion policy
1. Fetch only from documented, explicitly permitted APIs/files/feeds.
2. Server-side fetch with timeout, rate limiting, caching and schema validation; never embed API keys into client.
3. Preserve publication date, retrieved time, source URL, canonical publisher and license/attribution.
4. Expose last updated timestamps visibly. Stale content must say so; missing API must show "currently unavailable" not dummy headline.
5. Verify legal text version and jurisdiction at fact-check time. Source link only, not automated legal advice.
6. Keep a clear editorial approval workflow. Never publish draft AI-generated article as authoritative professional advice.
7. No automated republishing of third-party full articles without rights, no speculative summary of unknown news.
8. Local seeded concept cards and a source directory provide useful truthful content when no API is configured.
9. External data integrations are OPTIONAL for first functional release; auth, permissions, licensing and QA are gates, not excuses to block the rest.

## UX components that must use real state
- Source cards with publisher, source URL and retrieved/publication date.
- Legal article status and educational disclaimer.
- Interactive program catalog filter/search on actual typed records.
- Real absent-media player state and real play/pause only if a source exists.
- Localized editorial reading mode, accurate metadata and share/copy.
- No data-bearing counter without a grounded real measurement.

## Editorial sign-off
No professional licenses, qualifications, legal practice claims or real human interviews published until approved. Raw passports, visas, private certificates, ID scans and confidential case papers are not website assets. Any AI-rendered consultation, office, newsroom, or city film set must be labelled illustrative where ambiguity is likely.
