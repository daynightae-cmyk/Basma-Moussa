# Editorial Guardrails & Data Safety

## Provenance and claims
The source material includes a professional legal CV, bilingual executive portfolio, a proposed media vision, image references, and personal/academic records. Those sources were provided to guide the work, not to authorize public disclosure of every detail.

**Verified at project-vision level:** The intended subject is **Basma Moussa** (بسمة موسى), based in the United Arab Emirates; her public-facing concept combines media storytelling and legal perspective. The supplied professional files describe legal research, Egyptian professional experience, UAE legal-workflow training and postgraduate legal qualifications. Individual educational or employment claims must be confirmed with the subject before publication.

**Not currently substantiated:** Operating registered broadcast network, existing episodes, active viewers, professional awards, signed partnerships, guests/interviews, public speaking events, UAE legal practice license, custom studio facilities or production staff. Never invent any of these.

## Editorial status model
`DRAFT` → `FACT_CHECK` → `SUBJECT_REVIEW` → `APPROVED` → `PUBLISHED`.

Every program/content record should have `status`, `sourceType`, `locale`, `publishedAt` (nullable), `reviewedBy` (nullable), and a meaningful `contentWarning` or `disclaimer` if needed.

The user interface must distinguish:
- **Program concept / In Development**: aspirational pitch, no faux episodes.
- **Sample/illustrative**: synthetic imagery explicitly labelled if confusion is possible.
- **Published**: genuinely available and approved media.
- **Unavailable**: no link/action pretending playback.

## Legal research boundaries
- Educational content only unless separately verified and authorized.
- No jurisdiction-specific legal advice generated without sources and legal review.
- Cite effective date, jurisdiction and sources when discussing UAE/Egyptian law.
- No implication of Bar admission or UAE licensed representation without explicit evidence appropriate to the jurisdiction.
- Cite actual sources for legal summaries; corrections and publication dates must be visible.

## Identity and media ethics
- Preserve authentic photo identity. No altered face to manufacture biography.
- Label AI 'studio' / 'field interview' visuals as illustrative when presenting them as concepts.
- Obtain consent for identifiable guests and third parties.
- No fake verified social handles or testimonials.
- No fake live-stream banners, view counters, engagement statistics or episode metadata.

## Privacy and Git
The repository is public. Do **not** store raw private scans, IDs, passport data, visa documents, personal phone/email lists, or unredacted credentials. Use environment variables for contact/form integrations; public phone information can be included only after approved for that purpose. If an asset includes identifying background text or EXIF location, remove or redact it before publication.

## Operational truth and QA
- Never claim form delivered without success from a real endpoint.
- No unconnected CTA that looks operational.
- Real media source missing = show concept state, not fake playback.
- Mark staging/deployed status only with URL, commit SHA and a successful smoke check.
- Build, tests, CI, accessibility, and visual runtime are separate acceptance gates.
