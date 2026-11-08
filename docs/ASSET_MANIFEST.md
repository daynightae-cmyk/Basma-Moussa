# Asset Manifest — approved identity & site media

**Verified-media update (2026-11-08):** Fourteen owner-provided PNG URLs were fetched, image-decoded, and mapped to WebP derivatives on the local preparation branch. See [PRODUCTION_ASSET_MAP.md](PRODUCTION_ASSET_MAP.md) and [content/media-assets.json](../content/media-assets.json) for actual file paths, dimensions, source URLs and provenance. This document also preserves earlier proposed requirements; any missing-file slots must be labelled NOT SUPPLIED. These local files are not proof of a deployed application.

**Original planning note:** This was an **asset request and mapping**, not a claim of deployed web pages. The user has supplied multiple references and AI-created scenes in the private project conversation. All final media files require curated selection, visual inspection, subject consent, rights review and optimization.

## Brand / source hierarchy
1. The **latest** gold-on-navy Basma Moussa logo with subtle Egyptian touch and a **circular edge-free web icon** is the target direction.
2. Basma's user-provided headshot(s) are the identity source; prefer the authentic, unaltered picture for professional biography.
3. AI-generated scene portraits can illustrate *future program concepts* only, not actual interviews or legal practice.
4. User-provided CV, credentials, legal documents and personal records are **verification sources**, **not public website assets**.
5. Brand spelling: **Basma Moussa** / **بسمة موسى**, including alt text and filenames.

## Suggested repository destinations

| ID | Proposed path | Purpose / scene | Recommended master format | Text-safe composition |
|---|---|---|---|---|
| B01 | `public/brand/basma-logo-master.png` | Supplied approved circular gold logo | Actual 800×800 RGBA | Master image; preserve intact |
| B02 | `public/brand/basma-icon-circle.png` | 512×512 web icon derivative | Actual 512×512 RGBA | Full-logo downscale pending tiny-icon review |
| B03 | `public/brand/basma-icon-circle.svg` | Optional future true vector icon | **NOT PROVIDED** | Do not invent a false master trace |
| M01 | `public/media/01-home-hero.webp` | Cinematic homepage with Basma | Actual 1279×720 | Place text in right-hand safe area |
| M02 | `public/media/02-about-portrait.webp` | AI-concept portrait, needs likeness review | Actual 600×800 | Prefer authentic approved portrait for factual bio |
| M03 | `public/media/03-media-universe.webp` | Branded newsroom/proposed studio visual | Actual 1279×720 | Concept, not actual company studio |
| M04 | `public/media/04-interview-studio.webp` | Two-chair interview environment | Actual 1279×720 | Concept, no actual episodes implied |
| M05 | `public/media/05-soundroom.webp` | Proposed dedicated microphone photograph | **NOT PROVIDED** | Use 08 voice identity as honest visual fallback |
| M06 | `public/media/06-legal-lens.webp` | Justice/research still life | Actual 1279×720 | Add legal citations in HTML |
| M07 | `public/media/07-city-voices.webp` | Sharjah waterfront reporting concept | Actual 600×800 | Respect illustration label |
| M08 | `public/media/08-voice-identity.webp` | Gold wave, film ribbon & lotus | Actual 1280×541 | Abstract branded sound environment |
| M09 | `public/media/09-uae-stories.webp` | Proposed separate UAE panorama | **NOT PROVIDED** | Use 07 for UAE city context, avoid duplication if possible |
| M10 | `public/media/10-contact-collaboration.webp` | Elegant collaboration lounge, no subject | Actual 600×800 | Illustrative environment; contact CTA outside image |
| M11 | `public/media/11-documentary-archive.webp` | Documentary still life | Actual 1279×720 | Source-backed stories only |

**Additional supplied assets:** legal-dialogue-concept, legal-professional-portrait, legal-research-detail, about-editorial-alt. See detailed catalog.

**Additional derivatives:** output AVIF/WebP responsive variants at 480, 768, 1280, 1920 sizes where beneficial, but preserve original master off the public web bundle. Use `next/image` with explicit aspect and `sizes`. Check EXIF stripping and privacy before publish.

## Art direction & evolution

The original HTML proposed a distinct set of ten visuals. The new design **may adjust the number, composition and allocation of media assets** if a stronger site experience results. Cover the key themes (home/basma, media studio, podcast, legal lens, UAE, human story, sound identity, contact) without repeating her face in every image.

The **new navy/metallic-gold palette and approved Egyptian-accent logo are authoritative**. Do not reinstate old magenta/violet/orange branding from the historical mockup.

Documentary archive and behind-the-scenes images are worthwhile additions if they serve real sections. The source catalog (PRODUCTION_ASSET_MAP.md) distinguishes 14 locally verified web assets from proposed but not supplied slots; it is not evidence that the entire application is built or deployed.

## Asset quality gates
- Compare generated woman's face against the approved real portrait; reject significant deviation.
- Reject incorrect names/logos, deformed hands, impossible lighting, fictional news copy, disjoint architecture, generic photoreal women.
- Each image must be *one separate file*; no grid/collage for page imagery.
- Verify 16:9, portrait, and square crops where used.
- Do not place text over faces, logo, microphone, or other important focal points.
- Add `alt` attributes in AR and EN and `isIllustrative` / `sourceType` metadata for each.
- For public content: choose genuine city imagery or label AI-rendered environments accurately.
- Maintain a licensing/consent record outside public sensitive documents.

## Reference data not to commit
Never commit raw passports, visa scans, ID numbers, signatures, academic certificate scans, full unredacted resumes, private contact lists, medical or other personal records. Keep such evidence in private approved storage.

## Upload instructions for the implementation agent
1. Inspect current repo files and `public/` tree.
2. Confirm which user-supplied image masters were actually made available in the agent's workspace.
3. Never assume local ChatGPT asset paths or `sandbox:` paths exist in Gemini.
4. When assets are missing, emit a **missing-asset checklist** and maintain attractive CSS-based safe visual placeholders.
5. Integrate only approved media; map to exact manifest paths.
6. Do not publish all AI experiments indiscriminately or bulk-add 100MB+ binary files.
