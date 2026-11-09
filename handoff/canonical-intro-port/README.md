# Handoff — cinematic intro port to the canonical repo

Date: 2026-11-09 · Prepared in the Base44 sandbox.

## Why this folder exists

The canonical product repository is `daynightae-cmyk/Basma-Moussa-Media-Universe`
(TanStack Start + Base44 SDK, JavaScript). This workspace is bound to a **different**
repository, `daynightae-cmyk/Basma-Moussa` (Next.js), and the sandbox has **no write
credentials** for the canonical repository:

```
$ git push --dry-run https://github.com/daynightae-cmyk/Basma-Moussa-Media-Universe
fatal: could not read Username for 'https://github.com': terminal prompts disabled
```

Because the work must not be lost, the verified port is preserved here as a patch
series against canonical `main` at `3f21bbd3c486f49e6e083e128979c2c198fdaf0d`
("fix: label abstract hero artwork accurately").

## What this workspace contains

| | |
| --- | --- |
| remote | `https://github.com/daynightae-cmyk/Basma-Moussa` |
| branch | `initialize-media-universe` |
| HEAD | `9894835` — "Fix router synchronization and disable smooth scrolling during transitions" |
| tree | clean (the two router fixes from the previous turn are committed, not lost) |

Unique work on this branch, on top of `origin/main` (`290afb9`):

- `65104bb` — interactive studio set (`components/studio/*`, 3D CSS furniture, camera
  presets, lighting), broadcast lifecycle machine, brand intro state machine,
  soundroom console with Web Audio metering, Story Atelier workspace, unit tests.
- `f176759` — hydration fix in motion components (`lib/motion/use-motion-policy.ts`).
- `5cfe605` — cinematic arrival hero (`components/home/arrival-hero.tsx`,
  `styles/arrival.css`), header glass/scroll state, font-variable wiring.
- `9894835` — router history-state fix on intro replay, `data-scroll-behavior="smooth"`.

## Comparison with the canonical repository

| Area | Canonical `main` @ 3f21bbd | This branch | Transfer |
| --- | --- | --- | --- |
| Brand intro | `src/components/brand/GoldenThreadSplash.jsx`: one abstract sketch, auto-dismiss after 4.2 s, no invitation step | phased THREAD → MASK → SCALES → LOGO → INVITATION, explicit bilingual Enter button, skip, focus trap, session replay | **ported** (patch below) |
| Studio | image pan/zoom presets over a still | CSS-3D set with independent chairs, table, camera presets, lighting states | **not yet ported** — largest remaining item |
| Soundroom | `AudioPlayer`, `Rooms` | Web Audio metering console | not yet ported |
| Story Atelier | absent | concept workspace with local drafts | not yet ported |
| Arrival hero | `CinematicHero` — a `HERO_SCENES` carousel with pause/play and arrow-key control over `HeroScene` | `ArrivalHero` — one full-bleed scene with a pointer-driven light | canonical carousel is the richer surface; the single-scene hero adds nothing it lacks — no port |

Next.js source is **not** copied: the port re-implements the behaviour with this
app's own dependencies (`framer-motion`, Tailwind tokens, `useI18n`, `ASSETS`),
plain JSX, and its `@/` import style. No Next.js API (`next/image`,
`next/navigation`, `next/font`) is used.

## The patch

`0001-golden-thread-invitation.patch` (commit `c6f96ee` in a clone of canonical `main`):

- `src/lib/experience/intro-sequence.js` — **new**: deterministic phase machine,
  hold timings, reduced-motion and seen-gating rules (plain JS, unit tested).
- `src/components/brand/GoldenThreadSplash.jsx` — **rewritten**: thread-drawn theatre
  mask and justice scales, convergence into the approved logo master, invitation that
  waits for the visitor, focus trap, scroll lock, Escape/skip, reduced motion opens on
  the static invitation, and the existing `requestIntroReplay()` / `bm:replay-intro`
  API is unchanged.
- `tests/intro-sequence.test.mjs` — **new**: chain order, timer table, gating.

Apply it:

```bash
git clone https://github.com/daynightae-cmyk/Basma-Moussa-Media-Universe
cd Basma-Moussa-Media-Universe
git checkout -b feat/golden-thread-invitation 3f21bbd
git am /path/to/0001-golden-thread-invitation.patch
npm ci && npm test && npm run lint && npm run build
```

## Verification run in this turn (canonical clone)

| Check | Before the patch | After the patch |
| --- | --- | --- |
| `npm test` (node --test) | pass | **9 tests, 9 pass, 0 fail** |
| `npm run lint` (eslint) | clean | **clean** |
| `npm run build` (vite + Cloudflare plugin) | ✓ built in 2.17 s | **✓ built in 1.69 s** |

Not verified: browser rendering of the canonical app. Its dev server needs
`base44 link` against the canonical project, which this sandbox cannot do, and the
preview browser only reaches host port 3000, which runs this Next.js app. The
component is therefore proven by unit tests, lint and a successful production build,
not by a screenshot.

## Remaining priorities for the canonical repo

1. **Studio seating and camera controls** — port `lib/experience/studio-scene.ts`
   (scene layouts, furniture models, camera presets, lighting presets), then
   `components/studio/{studio-stage,furniture,set-console,director-room}.tsx` and
   `styles/studio.css` into `src/routes/_site/studio.jsx`'s stage area, keeping the
   canonical ON AIR state machine honest (preview only until a real transport exists).
2. **Splash sound cue** — the Next version has an optional Web Audio cue toggle; the
   canonical port omits it, which is a deliberate accessibility-first default.
3. **Soundroom metering** and the **Story Atelier** workspace, if product direction
   still wants them.

## Router error status (this workspace)

`Internal Next.js error: Router action dispatched before initialization` was logged once,
at `04:39:18`, before the previous turn's fix. It has not recurred in any run since.
Do not treat it as closed:

- Reproducing the navigation sequence that preceded it (programmatic route change right
  after a document load) did **not** raise it, although the preview harness reported
  "content did not change" while the studio route had in fact rendered.
- The earlier hypothesis "nulling `history.state` desyncs the router" was **disproven**
  by direct experiment: after `history.replaceState(null, "", …)` the entry still holds
  `__NA` and `__PRIVATE_NEXTJS_INTERNALS_TREE` (Next re-inserts its keys) and the next
  click-based navigation worked with no error. The one-line change that keeps
  `history.state` instead of `null` stays as a harmless correctness improvement; it is
  not the root cause and is no longer described as one in the code.
- The splash entry itself **was** verified: invitation phase reached, control
  interactive, click dispatched, router pushed `/ar/studio` → `/ar`, overlay dismissed,
  body scroll restored, zero console errors.

Remaining unexplained: the single occurrence. The only candidate left is an action
dispatched by tooling before the App Router initialised.

## Unblocking integration

To have Base44 work directly in the canonical repository, import
`daynightae-cmyk/Basma-Moussa-Media-Universe` as the connected repository for this
app (the sandbox then gets write access and can open a branch and PR against its
`main`). Until then this patch is the transfer vehicle; no force push, merge or
rewrite of either repository happened in this turn.
