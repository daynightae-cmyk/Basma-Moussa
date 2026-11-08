# Implementation Blueprint
**Not implemented yet.** This is the engineering acceptance contract for the first working release.

## Mission
Create a **genuine, responsive, bilingual media platform**, not a marketing screenshot. Distinct identity: BASMA MOUSSA on navy/metallic gold with subtle Egyptian motif, internationally legible and UAE-relevant. Visual impact must be earned through typography, cinematic imagery, hierarchy, and interaction rather than thousands of particles.

## Information architecture
| Path | Arabic | English | Minimum honest implementation |
|---|---|---|---|
| `/[locale]` | الرئيسية | Home | Cinematic hero, editorial stories, program concepts, legal lens, authentic about and contact |
| `/[locale]/about` | عن بسمة | About | Approved biography, source distinction, quote and portrait |
| `/[locale]/media` | عالم الإعلام | Media Universe | Browse/search/filter programs, content-status labels |
| `/[locale]/programs/[slug]` | البرامج | Program detail | Typed details, optional episodes, in-development state |
| `/[locale]/soundroom` | مساحة صوت | Soundroom | Real audio component with empty state |
| `/[locale]/legal-lens` | من زاوية القانون | Legal Lens | Approved research/editorial examples, disclaimers |
| `/[locale]/stories` | القصص | Stories | Real approved articles only; useful empty state otherwise |
| `/[locale]/contact` | تواصل | Contact | Working approved contact URL, validated form only if backend |
| `/[locale]/privacy` | الخصوصية | Privacy | Accurate to real tracking/data collection |

Static localized routes or localized route segments both acceptable if consistency and SEO maintained. Do not create dozens of empty SEO pages just to inflate scope.

## Structured records
```ts
type Locale = "ar" | "en";
type PublicationStatus = "concept" | "draft" | "review" | "published" | "archived";
type AssetSource = "authentic" | "licensed" | "illustrative-ai" | "generated-graphic";
type LocalizedText = { ar: string; en: string };

type MediaAsset = {
  id: string;
  path: string;
  alt: LocalizedText;
  source: AssetSource;
  approved: boolean;
  attribution?: string;
  focalPoint?: { x: number; y: number };
};

type Program = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: PublicationStatus;
  coverAssetId?: string;
  categories: string[];
  episodes: string[]; // references to real records only
};

type Episode = {
  id: string;
  programId: string;
  title: LocalizedText;
  status: PublicationStatus;
  publishedAt?: string;
  videoUrl?: string; // real media URL, never fake
  audioUrl?: string; // real media URL, never fake
  durationSeconds?: number; // only when measured
};

type EditorialItem = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  body: LocalizedText;
  status: PublicationStatus;
  jurisdiction?: string;
  sourceLinks: string[];
  verifiedAt?: string;
  publishedAt?: string;
};
```

## Feature acceptance
1. Header / mobile menu / skip navigation / language toggle work with keyboard and screen reader semantics.
2. Full Arabic and English strings, correct `dir`, logical margins, image placement and font shaping.
3. Hero image has accurate crop and readable safe-area text; controls remain visible on 360px mobile.
4. Media cards are discoverable and have truthful status. Search/filter works on known records.
5. Audio/video controls **only** appear with actual playable sources; native controls or accessible custom wrapper. No ambient sound autoplay.
6. Contact click opens a verified target. Form should be functional only when backed by a real endpoint; otherwise hide form and retain real WhatsApp/link.
7. No content-fake counters, live badges, broadcast claims, client lists, legal credentials or fake feedback.
8. Pages use semantic metadata, unique titles/descriptions, canonical/hreflang, robots/sitemap as appropriate.
9. Have a simple content authoring flow (typed files or configured CMS). The workflow must distinguish draft and published.
10. Error/loading/empty states are designed—not just happy path.

## Quality gates
- Source baseline: `git status -sb`, `git log -1 --oneline`, local branch/worktree/remote inspection.
- No destructive reset/clean/force push; no work from other agents silently replaced.
- `npm ci` (or selected package manager equivalent), lint, typecheck, unit tests, production build.
- Playwright browser E2E: navigation, locale switch, program/filter, contact link, media states and responsive menus.
- Screenshot review: 360, 390, 768, 1024, 1440, 1920; AR and EN; at least one reduced-motion path.
- Accessibility: focus, contrast, alt text, aria labels, no keyboard traps, no touch-only features.
- Performance targets: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms **in measured target environment**.
- Dependence on external APIs or missing media must be explicitly reported, not hidden.
- CI status is separate from visual and runtime verification.
- Deployment is only claimed after public URL HTTP/navigation smoke test against reported SHA.

## Delivery evidence format
```
BASELINE:
  repository, branch, initial_sha, dirty_changes, external/parallel work
IMPLEMENTED:
  routes/components/data/models/interactive contracts
VERIFICATION:
  exact commands + outcomes, build result, e2e, screenshots, accessibility, CI
MEDIA & CLAIMS:
  used assets + provenance + approval status, missing/illustrative content
GIT:
  changed paths, committed sha, pushed sha, PR link if any, merged? yes/no
DEPLOYMENT:
  public URL + revision + smoke check or NOT DEPLOYED
GAPS:
  specific unfixed limitations
```

## Architecture strategy
Use Next.js App Router + TypeScript with feature-level separation:
```text
app/[locale]/...
components/brand/
components/navigation/
components/media/
components/editorial/
components/contact/
content/programs.ts
content/stories.ts
content/assets.ts
lib/i18n/
lib/seo/
lib/content/
styles/
public/brand/
public/media/
tests/
```

This is a target, not an assertion about existing folders. Prefer incremental implementation over architecture theatre.
