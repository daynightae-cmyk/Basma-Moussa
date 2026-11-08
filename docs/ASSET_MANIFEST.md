# Asset Manifest — approved identity & site media

**Important:** This is an **asset request and mapping**, not a claim that the files have been uploaded to GitHub. The user has supplied multiple references and AI-created scenes in the private project conversation. All final media files require curated selection, visual inspection, subject consent, rights review and optimization.

## Brand / source hierarchy
1. The **latest** gold-on-navy Basma Moussa logo with subtle Egyptian touch and a **circular edge-free web icon** is the target direction.
2. Basma's user-provided headshot(s) are the identity source; prefer the authentic, unaltered picture for professional biography.
3. AI-generated scene portraits can illustrate *future program concepts* only, not actual interviews or legal practice.
4. User-provided CV, credentials, legal documents and personal records are **verification sources**, **not public website assets**.
5. Brand spelling: **Basma Moussa** / **بسمة موسى**, including alt text and filenames.

## Suggested repository destinations

| ID | Proposed path | Purpose / scene | Recommended master format | Text-safe composition |
|---|---|---|---|---|
| B01 | `public/brand/basma-logo-master.webp` | Approved full brand lockup | PNG/WebP 1:1 or suitable aspect | Centered safe margins |
| B02 | `public/brand/basma-icon-circle.png` | Round edge-free favicon/avatar | Transparent PNG, 1024×1024 source | Large mark, no tiny words |
| B03 | `public/brand/basma-icon-circle.svg` | Vector icon **if true vector source available** | SVG | Never auto-trace into broken paths |
| M01 | `public/media/01-home-hero.webp` | Broadcast cinematic homepage, Basma | 2400×1350 16:9 | Arabic copy on left/right per composition |
| M02 | `public/media/02-about-portrait.webp` | Authentic human editorial portrait | 1200×1600 3:4 | Clear eyes/face; portrait crop |
| M03 | `public/media/03-media-universe.webp` | Expansive broadcast/newsroom identity | 1920×1080 16:9 | Center scene, broad view |
| M04 | `public/media/04-interview-studio.webp` | Interview and conversation concept | 1920×1080 16:9 | Two-chair studio, no false guests |
| M05 | `public/media/05-soundroom.webp` | Podcast studio and microphone | 1600×1200 4:3 | Clean central media subject |
| M06 | `public/media/06-legal-lens.webp` | Books/justice/editorial visual | 1920×1080 16:9 | Quiet negative space for legal copy |
| M07 | `public/media/07-city-voices.webp` | UAE field journalism concept | 1200×1600 3:4 | Respect documentary vs illustrative label |
| M08 | `public/media/08-voice-identity.webp` | Abstract gold-on-navy voice / soundwave visual, no face needed | 2560×1080 panoramic | Empty space for UI overlays |
| M09 | `public/media/09-uae-stories.webp` | Authentic/licensed contemporary UAE media-context architecture; no face needed | 1920×1080 16:9 | Real location imagery, safe for text overlays |
| M10 | `public/media/10-contact-portrait.webp` | Contact editorial portrait | 1200×1600 3:4 | Warm expression, safe crop |

**Additional derivatives:** output AVIF/WebP responsive variants at 480, 768, 1280, 1920 sizes where beneficial, but preserve original master off the public web bundle. Use `next/image` with explicit aspect and `sizes`. Check EXIF stripping and privacy before publish.

## Art direction & evolution

The original HTML proposed a distinct set of ten visuals. The new design **may adjust the number, composition and allocation of media assets** if a stronger site experience results. Cover the key themes (home/basma, media studio, podcast, legal lens, UAE, human story, sound identity, contact) without repeating her face in every image.

The **new navy/metallic-gold palette and approved Egyptian-accent logo are authoritative**. Do not reinstate old magenta/violet/orange branding from the historical mockup.

Documentary archive and behind-the-scenes images are worthwhile additions if they serve real sections. Assets listed here are a planning manifest, not files verified to exist.

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
