# Technical Overview

## Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- Supabase (Postgres + Storage) with RLS enabled
- Vercel hosting

## Key Components
- `components/Header.tsx`: Sticky header, dropdown navigation (Guides, Industries), keyboard/hover accessible.
- `components/CalculatorForm.tsx`: Multi-step readiness form (client state, posts to `/api/soc2-lead`).
- `components/FreeResults.tsx`: Displays score/cost results, optional PDF/email triggers.
- `components/AssessmentCTA.tsx`: Bottom-funnel CTA used across guides.
- `components/InfoDisclosure.tsx`: Lightweight accordion/disclosure.

## Data Flow (Readiness)
1. User completes form in `CalculatorForm`.
2. POST `/api/soc2-lead` (zod validation, honeypot, rate limit, server-side scoring).
3. Insert into `SOC2_Leads` (Supabase anon on server).
4. Response returns readiness score and cost band; `FreeResults` renders.
5. Optional email/PDF via `/api/lead/set-email`, `/api/generate-pdf`, `/api/send-email`.

## Security Assumptions
- RLS enabled on Supabase tables; service_role is server-only.
- Public endpoints are validated (zod) and rate-limited where applicable.
- No client exposure of service keys; anon key only on server for inserts.

## Routing
- Public pages under `app/(public)` plus top-level SEO guides (cost, timeline, Type I vs II, checklist, cost breakdown, timing, startups, enterprise sales, SOC 2 vs ISO 27001).
- Main CTA points to `/soc-2-readiness-index`.
- Admin area under `app/admin`.

## Styling
- Tailwind utility classes; calm enterprise palette.
- Header dropdowns: solid backgrounds, soft shadow, rounded corners.

## Metadata
- Per-route metadata exports; OG image `public/og.png`.

## Rate Limiting
- `/api/soc2-lead`: Upstash Redis (fallback in-memory) 10 req/min/IP.
- Legacy `/api/submit`: in-memory limiter noted in `lib/rate-limit.ts`.
