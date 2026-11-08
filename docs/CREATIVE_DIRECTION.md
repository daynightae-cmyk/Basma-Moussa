# Creative Direction — BASMA MOUSSA
**Status:** Proposed art direction grounded in supplied references; final assets require approval.

## 1. What we are building
A premium, **editorial-first media universe** — the emotional presence of a global broadcast network, the credibility of a research publication, and the warmth of a human-centered personal brand. Do not confuse aspirational cinematic design with proof of actual broadcaster operations.

**Experience formula:** Broadcast-grade cinematography × Egyptian-gold heritage restraint × UAE editorial relevance × legal-research credibility.

### Verbal identity
- Primary: **Basma Moussa** / **بسمة موسى**.
- Product concept: **Media Universe**.
- Brand line: **Where Stories Find Their Voice** / **لكل حكاية صوت... ولكل صوت رؤية**.
- Be thoughtful, factual, warm, cinematic, accessible, authoritative without arrogance.
- Avoid invented professional titles, registered-company claims, superlatives or audience statistics.

## 2. Egyptian heritage — understated, NOT a collage
The latest supplied concept uses a gold feminine profile and broadcast microphone over navy, with an **Egyptian-inspired motif**: fine pyramidal forms, a stylized lotus/papyrus or a single subtle architectural line. Integrate heritage as architectural linework at **small visual weight**. Do **not** turn every page into pyramids, Egyptian flags or pharaonic cliché. Preserve a contemporary international media identity.

Use **one** heritage accent near the mark; no bright red/white/black stripe overlays, no visual confusion with the UAE location.

Logo system:
1. **Master brand lockup**: recognizable portrait silhouette + mic/play + waveform + `Basma Moussa` wordmark.
2. **Favicon/avatar**: truly circular, edge-free, textless simplified icon, optimized for 16–64px readability; *no square background corners*.
3. **Mono mark**: 1-color gold/white for overlays.
4. **Dark and light variants**, each manually reviewed.
5. **Do not crop arbitrary complex wordmark into favicon**; simplify properly.
6. Verify text spelling exactly; generated-text errors must be fixed before use.

## 3. Tokens
```css
:root {
  --bm-navy-950: #070B18;
  --bm-navy-900: #0B1124;
  --bm-navy-800: #142039;
  --bm-gold-500: #D7AB62;
  --bm-gold-300: #F2D7A0;
  --bm-champagne: #EADCC9;
  --bm-ivory: #FBF7EF;
  --bm-muted: #AAAEC0;
  --bm-burgundy-accent: #51202D;
  --bm-outline: rgba(242,215,160,.25);
}
```

**Palette ratio**: 72% navy/near-black, 20% ivory/champagne, 8% gold/light details. Burgundy only occasional cinematic accent, not a primary theme. No electric rainbow or unrelated neon.

**Surfaces**: polished editorial, deliberate glass layers, sophisticated gradients, subtle metals; avoid gold everywhere and excessive specular glow.

**Typography**: select a well-rendered Arabic family (Alexandria / IBM Plex Sans Arabic / suitable tested equivalent), a contemporary English sans (Manrope / Sora), and one optional display serif for English editorial moments; support Arabic diacritics, punctuation, mixed numerals and graceful line wrapping. Ensure font licenses.

## 4. Experience design / page cues
| Page | Hero art direction | Mood | Priority action |
|---|---|---|---|
| Home | Basma in cinematic broadcast set; natural portrait + negative space | Editorial / broadcast prestige | Explore + collaborate |
| About | Authentic human-scale portrait and biography | Intimate, credible | Discover background |
| Media Universe | Gold-accented studio/newsroom overview | Immersive discovery | Browse concepts |
| Programs | Twin-chair interview studio, distinct concept cards | Conversational | View concepts |
| Soundroom | Warm condenser mic, acoustic surfaces, real audio waveform | Focused | Listen, only if content exists |
| Legal Lens | Gold scales and books with editorial emphasis | Trust | Read reviewed explainers |
| City Voices | UAE location photography / simulated field-reporting clearly marked | Human / vibrant | Explore people and place |
| Documentary Archive | Research desk, manuscripts/film, provenance labels | Exploratory | Browse approved stories |
| Behind the Scenes | Camera/lighting/control room, creative workflow | Craft | Meet production vision |
| Contact | Refined portrait with reserved message space | Warm / clear | Verified WhatsApp or email |

Do **not** repeat the same shot, pose, composition and background for ten pages. Every scene should have a specific role and responsive focal-point guide.

## 5. Motion language
- *Opening* (~subtle, no forced delay): logo light reveal, headline fade/slide, portrait mask — no cinematic preloader blocking content.
- *During scroll*: stagger reveal limited to short distances and transform/opacity; no scrolljacking.
- *Media controls*: truthful playback feedback, accessible state, visible buttons and controls.
- *Hover/focus*: micro-elevation and warm gold accent; no pointer-dependent essential interactions.
- Honor `prefers-reduced-motion`, keep keyboard/focus navigation and touch actions complete.
- Never autoplay audible media.

## 6. Layout & components
- Hero: designed at 1440/1920 and 390/360, with headline safe space and unbroken mobile crop.
- Navigation: sticky understated glass, no overlap with notch/status bars, Arabic-first RTL.
- Editorial cards: unequal compositions, varied scales, a genuine hierarchy; no 10 identical rectangles.
- Use prose + gallery + media components with clear states: **published**, **in development**, **coming soon**, **unavailable**.
- Preserve scroll position when toggling language where possible; complete localized UI strings.
- Contrast text against glass/hero; focus-visible treatment must be visible against both themes.

## 7. Anti-patterns
No 'LIVE' labels without an actual streaming session; no dead CTA; no fake episode metrics; no empty marquee; no full-screen blocking animation; no AI facial substitutions; no billboard of legal documents; no heavy JS animation engine to move static decorations; no indiscriminate images repeated with different filters.

## 8. Visual acceptance
Review screenshots across widths **360, 390, 768, 1024, 1440, 1920px** and both **AR/EN**. Compare face identity, logo integrity, contrast, cropping, text baseline, hover/focus, reduced-motion and dark/light (if implemented). A passing build alone is not design acceptance.
