# GEMINI EXECUTION PROMPT — BASMA MOUSSA MEDIA UNIVERSE

> Use this as the implementation-agent mission after receiving authorized access to the repository and the *approved* media assets. **This is not evidence the application is built.**

You are an integrated senior team: Creative Director, Broadcast Art Director, Brand Designer, Senior Next.js/React Engineer, Media UX Engineer, Arabic/English Editorial Designer, Accessibility Engineer, QA/Performance Engineer, and Release Engineer.

## HIGHEST-PRIORITY OWNER DECISION — FINAL BRAND & CREATIVE UPGRADE

**The new navy-and-metallic-gold design is the final approved identity. Do not revert to the earlier magenta/purple/orange concept.**

Latest approved brand: deep midnight navy, elegant brushed gold, refined Egyptian heritage accents, gold woman-profile + microphone/play + waveform, and exact name **Basma Moussa**.

The user also supplied an older HTML Media Universe concept. It is an **inspiration and product-vision reference, not an implementation to clone**. Read [ORIGINAL_VISION_PARITY.md](ORIGINAL_VISION_PARITY.md) for its useful visitor experience ideas: human storytelling, approachable explanations, four show concepts, a controllable quiet studio animation, simple discover → explore → connect journey, media/gallery and elegant interaction. Build something **demonstrably more polished, cinematic, contemporary and genuinely functional** where sensible.

**Your designs can improve the original hierarchy, number of pages, visual compositions, animation system, cards and image roster.** Preserve the visitor goals and truthfulness, not old CSS or exact component shapes. Give each key page a distinctive role; most imagery should be realistic non-portrait media environments, with the authentic Basma portrait appearing only where it adds value. The new source of visual truth is the approved gold logo, not the original HTML's brightly colored logo.

No superficial recoloring of the old mockup. No cheap maximalism. Build an original, exceptional broadcast-editorial system with consistent navy/gold visual discipline, excellent Arabic/English UX, performance and working behaviors.

**Deliver a concise 'vision evolution' comparison**: original value → improved implementation → evidence. Original features need not be copied when the new approach is clearly stronger and remains honest.

---

## Objective
Build a breathtaking but **real** bilingual media platform for **Basma Moussa / بسمة موسى**, using the existing repository as the sole production baseline:

**Repository:** https://github.com/daynightae-cmyk/Basma-Moussa
**Brand:** BASMA MOUSSA — MEDIA UNIVERSE / MEDIA GROUP brand concept.
**Identity:** gold feminine profile, microphone/play and waveform, elegant navy-black backdrop, tasteful Egyptian heritage linework (pyramids/lotus). Do not introduce unrelated colors.
**Position:** UAE-based media storytelling and human interviews informed by legal research — not a registered TV network or an unverified UAE legal practice.

**STRICT EXECUTION RULE:** Do not end after writing a plan, dumping static mockups or claiming DONE without real tested deliverables. If an integration requires missing secrets/assets, implement honest non-broken fallback behavior and identify it in the handoff. No fictitious assets, legal claims, audience metrics, videos, broadcast/live claims, partners, published episodes, functioning CMS or contact submission.

## Phase 0 — REPO REALITY
1. Clone/open the exact repo and inspect `git status -sb`, `HEAD`, `origin/main`, recent commits, branches, worktrees, stashes, active PRs and files relevant to current task. Do not assume repo is still empty after this document was published.
2. Read README.md and **all relevant** docs in `docs/`: CREATIVE_DIRECTION, ASSET_MANIFEST, EDITORIAL_GUARDRAILS and IMPLEMENTATION_BLUEPRINT.
3. Detect unique user/agent work before modification. Preserve all files/assets; no reset --hard, clean -fd, rebases or force pushes. No merge to main without verifying a safe integration path.
4. Record baseline SHA and missing media/access requirements.

## Phase 1 — FIRST WORKING PRODUCT
Build with Next.js App Router, React, TypeScript, responsive CSS/Tailwind, a small motion layer, accessible native audio/video and deliberate i18n. Use supported current stable versions and lock dependencies. If constrained environment prevents Next.js, use a functioning Vite React + TS alternative and explain why.

Build the real site — multi-route with AR/EN — in this coherent story order:
1. **Cinematic Home:** signature navy/gold hero; approved portrait or art-directed honest fallback, warm halo, Egyptian-gold subtle ornament, strong Arabic CTA and working collaborator link. A headline such as "صوت له رؤية... وحكاية تستحق أن تُروى." No autoplay audio and no blocking splash.
2. **About Basma:** real credentials in approved concise wording, respectful portrait, background as legal researcher and emerging media storyteller, no invented awards/titles.
3. **Media Universe:** curated discovery hub with search/filter and visually distinct interactive cards.
4. **Four concepts:** Beyond the Frame / خارج الإطار, The Legal Lens / من زاوية القانون, City Voices / صوت المدينة, Soundroom / مساحة صوت. Explicit *In Development* status until episodes are real.
5. **Programs and episodes:** separate dynamic detail routes backed by typed data, real source or explicit empty state.
6. **Studio/Soundroom:** editorial player layout. Playback only if genuine assets exist. Waveform either derives from audio or is honestly decorative. Nothing fake-live.
7. **Legal Lens:** readable, sourced, dated, jurisdiction-aware articles, reviewed before public release. Educational disclaimer.
8. **Stories/Documentary Archive:** beautiful editorial cards and research-inspired visual system, no invented journalism.
9. **Behind the Vision:** filmmaking/process/creative direction imagery, distinguish concept art from factual facilities.
10. **Contact:** working authorized WhatsApp link + real submission only when configured; never claim success for fake forms.
11. **Privacy/Legal:** clear data practices actually used by the implementation.

### Motion direction
Opening: 300–900ms soft staged reveal, not a video intro or preloader. Fine gold light traces, restrained parallax, fluid transitions, subtle waveform motif. No cursor effect blocking touch or keyboard. No heavy WebGL unless profiled and demonstrably necessary. Respect prefers-reduced-motion.

### Sound/video direction
Use genuine supported assets and accessible players; do not play copyrighted music. No autoplay audio. Optional effects enabled by user click with persistent preference if appropriate. All play/pause, volume, captions and unavailable states must be truthful and testable.

### Editorial tone
Arabic-first expressive but clear, matching premium UAE communication. English is professionally localized, not translated word-for-word. Copy creates warmth, clarity, prestige without invented media success. Every paragraph should help users orient, discover stories or collaborate.

## Phase 2 — VISUAL QUALITY
Act like a broadcast design studio, not a template installer:
- Main colors: deep navy #070B18, dark indigo #142039, polished gold #D7AB62, soft gold #F2D7A0, ivory #FBF7EF.
- 1–2 excellent Arabic fonts, consistent English typography, deliberate typographic rhythm and negative space.
- Visually distinguish 10 sections with real *scene purpose* and fresh page layouts; do not duplicate the hero photo in every section.
- Preserve authentic face identity. Use only approved final logo and media if accessible. Keep source file paths recorded and avoid fake text in art.
- The circular favicon should contain simplified profile+mic with Egyptian linework only if legible at tiny sizes, no visible square background corners.
- Mobile-first real redesign (not shrinking desktop), nav and cards ergonomically touch-friendly.
- Design dark mode fully; optional ivory Editorial Mode only if truly complete.
- Check screenshot parity on Arabic and English across 360/390/768/1024/1440/1920 widths.

## Phase 3 — TECHNICAL QUALITY
- Typed content models for programs, media assets, episodes and articles with AR/EN fields, status and source provenance.
- Centralized assets registry and status flags, never scattered hardcoded placeholders.
- Real SEO: metadata, canonical/hreflang as appropriate, OG images after approval, sitemap, robots, structured data only if accurate.
- Image optimizations, size hints, responsive source variants, lazy offscreen images, font optimization.
- Page semantic regions, heading order, link vs button correctness, focus styles, alt descriptions, meaningful landmarks and skip link.
- Handle network failure, media missing, empty states, 404, error states, loading, inactive integrations.
- No secrets in browser bundle or committed files.
- Build idempotent scripts and reproducible lockfile. Avoid unjustified dependencies and accessibility regressions.

## Phase 4 — TEST BEFORE CLAIMING READY
Run real lint/typecheck/build; run unit/component tests and Playwright E2E. At minimum verify:
- Home load AR/EN
- Locale switch and RTL/LTR
- Mobile menu open/close with keyboard
- Content cards, search/filter and detail navigation
- Missing-media behavior without fake success
- Valid contact link and form delivery conditional on real backend
- 360px no horizontal overflow and image crop
- Reduced-motion behavior
- Key accessibility checks
- No client console errors
- Visual review at desktop and mobile in both languages
If CI/deployment are authorized and available, configure and verify them; otherwise mark **NOT VERIFIED / NOT DEPLOYED**.

## Phase 5 — SAFE GIT HANDOFF
Preserve all unique work. Use a focused feature branch or a PR unless the owner explicitly requires direct integration and confirms no conflicts. Log baseline + final SHAs, changed paths, tests and their output, screenshots, missing assets, integrations and known gaps. Never claim SUCCESS merely because a code generator wrote files.

## Asset handshake
The user may provide approved photos/logos in an image-generation or chat context; they are **not automatically present** in your Gemini runtime. Check file availability. Refer to `docs/ASSET_MANIFEST.md`, ask for only truly inaccessible final approved files when required. Until then, preserve aesthetically strong built-in layouts with honest placeholders. Avoid uploading private educational/visa/passport scans to a public GitHub repo.

## Deliverable
A real inspectable application, not just instructions:
- Functional AR/EN routes and purposeful components
- Strong visual identity with approved assets
- Usable program/media discovery
- Truthful content and functioning contact paths
- Clear test/build/runtime evidence
- SHA and Git integration status
- Actual deployment proof **only if deployed**

### Creative acceptance mantra
**It must feel like a world-class media destination while telling the truth about what exists.**
