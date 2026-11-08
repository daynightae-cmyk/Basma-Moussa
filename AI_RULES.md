# AI Rules — Basma Moussa Media Universe

## Tech stack
- **Runtime:** Node.js >=20.9.0 with npm; use the scripts defined in `package.json`.
- **Framework:** Next.js 16 App Router with React 19; locale-aware routes live in `app/[locale]/`.
- **Language:** TypeScript 5 in strict mode; `@/*` resolves from the repository root.
- **Styling:** Tailwind CSS v4 through `@tailwindcss/postcss`, plus the custom design system in `styles/globals.css` and cinematic styles in `app/cinematics.css`; `clsx` is available for conditional classes.
- **Localization:** Custom typed Arabic/English dictionaries and path helpers in `lib/i18n/`, with RTL/LTR support.
- **Content:** Local JSON in `content/`, typed accessors in `lib/content/`, and Zod v4 schemas for validation; no configured CMS or database.
- **Media and typography:** Next.js image/font APIs, approved assets in `public/media/` and `public/brand/`, and an asset registry with localized alt text and provenance.
- **Motion:** Native CSS/SVG animation and browser APIs, with a shared device/reduced-motion policy in `lib/motion/policy.ts`.
- **Quality:** ESLint 9 with Next.js rules, TypeScript checks, Vitest with Testing Library/jsdom, and Playwright with axe-core for browser accessibility checks.

## Library and architecture rules
- Use **Next.js App Router** for pages, layouts, metadata, and navigation. Use `next/link` for internal links and `next/navigation` for imperative routing; do not introduce React Router.
- Follow the existing root-level `app/`, `components/`, `lib/`, `content/`, and `styles/` organization. Keep reusable UI in focused components and shared content logic in `lib/content/`.
- Default to Server Components. Add `"use client"` only for stateful interactions, effects, or browser APIs. Read the relevant installed Next.js documentation under `node_modules/next/dist/docs/` before framework changes, as required by `AGENTS.md`.
- Use **Tailwind utilities** for layout and spacing; reuse existing CSS tokens and component classes for the navy/gold editorial design. Use **clsx** for conditional class composition. Do not introduce another styling system or duplicate design tokens.
- Reuse the app's existing semantic UI components. shadcn/ui, Radix, and lucide-react are not listed dependencies; do not assume they are installed or add a UI/icon library without a concrete requirement.
- Use **Zod** to validate content records and external/user input at boundaries. Reuse the schemas and typed content accessors rather than duplicating records in page components. Do not introduce a CMS, database, or global state library for existing local-content workflows.
- Use the existing **i18n helpers** for dictionaries, locale validation, and localized paths. Supply Arabic and English copy together and preserve correct `lang`, `dir`, localized metadata, and independently composed RTL/LTR layouts; do not add an i18n library unnecessarily.
- Use **next/image** for content images and **next/font** for typography. Resolve approved imagery through the asset registry, preserve focal points/provenance/alt text, and avoid conflicting eager-priority and lazy-loading behavior.
- Use **CSS/SVG and native browser APIs** for cinematic motion rather than introducing GSAP, Framer Motion, or carousel packages. Reuse portal-transition components and the shared motion policy; respect reduced motion, constrain expensive effects on low-power devices, and clean up timers/listeners/observers.
- Use **Vitest + Testing Library** for unit/component behavior and **Playwright + axe-core** for navigation, Arabic/English parity, responsiveness, and accessibility. Use the existing lint, typecheck, test, build, and E2E scripts; report only checks actually performed.

## Product and safety rules
- Preserve keyboard navigation, visible focus, skip links, pause/skip controls, and semantic HTML. Never nest anchors or other interactive controls inside portal links.
- Reuse `lib/seo.ts` and the existing sitemap/robots conventions; preserve canonical URLs, locale alternates, and real HTTP 404 behavior.
- Follow `docs/CREATIVE_DIRECTION.md`, `docs/MEDIA_WORLD_INTERACTIONS.md`, `docs/ASSET_MANIFEST.md`, and `docs/EDITORIAL_GUARDRAILS.md` for design, interactions, asset usage, and editorial policy.
- Label conceptual programs and illustrative imagery honestly. Do not invent episodes, guests, credentials, partnerships, legal authorization, testimonials, or deployment claims. Legal content is educational, not individualized advice.
- Never publish sensitive identity documents, private legal files, or unapproved contact details. Forms and audio/video players require real configured delivery or rights-cleared media; do not add simulated success or fake playback.
- Keep changes scoped to the request, preserve existing routes and working interactions, and avoid unnecessary dependencies or architectural rewrites. Keep this file as durable guidance, not a session log.
