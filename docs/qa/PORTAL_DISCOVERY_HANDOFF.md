# Portal & Discovery Continuation — T04 / T05

## Repository reality

- Handoff attachment reviewed: `basma-moussa-cinematic-overhaul.json` (265 messages).
- Attachment ends at historical feature SHA `9e7215405a6e0584f47d8f151d715911486cc123`.
- Actual Dyad workspace began on `main` at `9473d65a34ea8c288f42ba0d9789b610f029ff09`.
- This checkout does not contain the handoff's `components/cinematic/CinematicHeroSlider.tsx`, `CinematicSceneDirector.tsx`, or `GoldenParticleField.tsx`. Do not claim that the handoff branch was synchronized.
- `next-env.d.ts` and `package-lock.json` already had working-tree changes before this segment; they were not edited by this implementation.
- No remote push, PR, CI status or deployment was verified in this segment. Dyad manages the subsequent local commit.

## Implemented code

### T04 — Portal doors

- Replaced fixed dismissal timers with a reducer lifecycle: preparing → expanding → waiting (only if needed) → opening → arriving → complete.
- Readiness requires matching destination pathname and a new real heading in `#main`. A MutationObserver covers streamed content arriving after the pathname update.
- Animation completion drives visual phase progression; bounded animation fallbacks and a 6.5-second navigation watchdog prevent indefinite decoration.
- Captured card geometry expands into a full stage, then image-backed physical halves part with perspective. RTL does not reverse the source image pixels.
- Native Next Link navigation and prefetching remain intact; modifier clicks, normal history and direct routes do not require the door engine.
- Escape, skip, browser history changes, resize, hidden documents and newly requested reduced motion cancel the decoration and clean up its animation/timer/listener work.
- Arrival focuses the destination heading unless the visitor has deliberately focused another control.
- A timeout releases the full-screen decoration, without claiming successful navigation, and offers a direct destination link plus dismiss control.
- Fixed nested anchors in home/media portal cards and the home portal image's incompatible priority/lazy properties.

### T05 — Media discovery

- Added `WorldDiscoveryStage` before the existing search/filter interface.
- Uses `PORTAL_WORLDS`, the asset registry, localized paths, actual publication status and localized alt/provenance labels.
- Four selectable scenes: conversation studio, legal gallery, documentary waterfront and audio identity.
- Real next/previous controls, world-selection buttons, direction-aware arrow keys, Home/End and horizontal pointer/touch gestures; no automatic advancement.
- Scene changes retain the focused portal link. A horizontal drag does not activate the link.
- Mobile uses a separate image/text composition, not a scaled-down desktop overlay.
- The existing search, filters, no-results UI and four searchable cards remain present.
- Asset accessor typing now retains the registry's existing focal-point data.

## Checks actually performed

- Workspace TypeScript diagnostics: no errors after final source edits.
- Isolated production build: passed (`next build`, Next.js 16.4.5).
- Build output: successful compilation, TypeScript stage and page generation.
- Existing middleware-deprecation warning remains; middleware migration was out of scope.
- Generated development CSS was inspected: the new stylesheets exist and their referenced shared color/font variables are emitted.
- Preview server logs show `/ar` returning HTTP 200 after the source changes. This is not a visual review.

## Tests added, NOT executed here

- `tests/unit/portal-machine.test.ts`: 10 reducer cases covering readiness order, early arrival, cancellation, timeout, restart and stale callbacks.
- `tests/e2e/portal-experience.e2e.spec.ts`: 21 browser cases covering AR/EN discovery, keyboard/focus, real navigation/back, Escape, reduced motion, horizontal drag and a six-viewport capture matrix.
- Capture matrix: 360, 390, 768, 1024, 1440 and 1920px, both locales, all four discovery scenes. Tests write screenshots to Playwright's test output and attach them to the report.
- No Vitest, ESLint or Playwright execution result is claimed: those execution capabilities were not available in this segment.

## Acceptance gaps and next safe slice

- T04/T05 code is implemented and passes type/build checks, but full behavioral and visual acceptance is still pending.
- No browser screenshots or motion recordings were captured/reviewed in this environment. No Lighthouse or Core Web Vitals measurements were performed.
- T06–T12 route-specific experiences/content presentation remain to be continued; T13 QA and T14 integration are not completed.
- Genuine recordings, validated comparison imagery and configured delivery/deployment are still absent; none was fabricated.
- Preserve this segment, reconcile the missing cinematic handoff work before claiming home parity, then continue T06 (Beyond the Frame) and perform the pending browser acceptance checks.
