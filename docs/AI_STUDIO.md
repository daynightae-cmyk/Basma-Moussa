# Basma Moussa AI Studio — Operational Contract

## Routes
- Public UI: /ar/ai-studio and /en/ai-studio
- Server endpoint: POST /api/ai/chat
- Requests: JSON { "locale": "ar" | "en", "messages": [{ "role": "user" | "assistant", "content": "..." }] }
- Responses: UTF-8 Server-Sent Events (SSE) with JSON data frames:
  data: {"type":"meta","sourceIds":["vision"]}
  data: {"type":"delta","text":"..."}
  data: {"type":"done"}
  data: {"type":"error","message":"..."}

Do not send or store an API key in the browser. The AI endpoint is a server-only
proxy. Unconfigured servers return 503 with an honest error, not fabricated AI output.

## Environment (never commit live values)
- AI_API_KEY: approved provider's server-only secret
- AI_MODEL: explicitly approved, compatible chat-completions model ID
- AI_PROVIDER_BASE_URL: approved OpenAI-compatible HTTPS base URL. Defaults to https://api.openai.com/v1
- AI_APPROVED_PROVIDER_HOSTS: comma-separated exact hostnames (default api.openai.com).
  Must include the host of the configured provider. Avoid arbitrary hosts, DNS shortcuts, or private IPs.
- UPSTASH_REDIS_REST_URL: production distributed rate-limit Redis REST endpoint (*.upstash.io)
- UPSTASH_REDIS_REST_TOKEN: corresponding Redis REST token
- AI_RATE_LIMIT_SALT: private salt for hashing edge-supplied client identifiers

Production requests fail closed if no distributed rate limiter exists. Development
uses an in-memory rate limiter only; this is NOT distributed protection. Set
provider keys, model and limiter in the deployment platform's encrypted settings.

## Safety boundaries
- Strict Zod request-body validation: roles only user/assistant, alternating, last user.
- 48 KB raw body limit, 14 messages max, 2,400 chars per turn, 10,000 total chars.
- Conservative context budget, prioritizing recent complete conversation turns.
- Fixed allowlisted public references from checked-in program/vision/about/legal/contact data and official source registry. No user-supplied URLs, no external scraping, no private CVs or scans.
- Source text is explicitly treated as untrusted content. A system prompt helps resist prompt injection, but **cannot guarantee** that a generative model never violates instructions. Reviewed public sources, schema constraints, hard budgets and careful wording are additional controls.
- Approved provider HTTPS allowlist and no redirect following.
- Reject cross-site requests, enforce JSON content-type, cap output chars and tokens, abort on client disconnect, request timeout, no token/body logs, no raw upstream error forwarding.
- 12 requests/minute per trusted hashed client at the configured edge. If no trusted IP exists, share a conservative bucket.
- No sensitive documents, unverified qualifications, live media claims, individualized legal advice, or invented source references.
- The service is not a lawyer, and it does not expose internal prompts or private documents.
- Browser Web Speech API: capability detection, user-triggered dictation, editable transcription, NEVER automatic submission. Support depends on browser/HTTPS and may involve the browser's speech service.
- Conversation state stays in the browser's React memory; New Conversation clears it without reload. No server conversation storage in this feature.

## Verification and evidence
Run:
- npm run lint
- npm run typecheck
- npm run test
- npm run build
- npx playwright test tests/e2e/ai-studio.e2e.spec.ts

Validate both locale routes, mobile (390px), keyboard focus, reduced motion,
voice transcript prior to sending, the streamed SSE UI and New Conversation.
Model-provider live integration and distributed production rate limiting can be
verified **only after the deployment environment is securely configured**.
A browser test with a stubbed SSE provider is evidence of UI integration,
not evidence of a live provider or production deployment.
