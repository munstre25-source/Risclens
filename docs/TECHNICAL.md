# TECHNICAL OVERVIEW

Developer-facing details. Pair with [ARCHITECTURE.md](ARCHITECTURE.md) and [DEVELOPER_WORKFLOW.md](DEVELOPER_WORKFLOW.md).

## Stack
- Next.js App Router (TypeScript), Tailwind CSS.
- Supabase Postgres + Storage via `lib/supabase.ts` (admin on server only).
- Email/PDF generation via server routes, no client-side secrets.

## Patterns & Components
- Navigation: `components/Header.tsx` (desktop dropdowns, mobile portal drawer with accordion). CTA text switches based on path.
- Calculators: Forms live inside route components; server handlers validate with `lib/validation.ts`, compute with `lib/scoring.ts`, `lib/pentestEstimator.ts`, or `lib/vendorRisk.ts`, then store with `lib/leads.ts`.
- Results: Shared result cards and CTA blocks; optional email/PDF handled server-side.
- Content catalogs: `lib/soc2Guides.ts`, `soc2Industries.ts`, `soc2Evidence.ts`, `seoClusters.ts`, `learnMoreLinks.ts` drive guide lists and nav consistency.
- SEO: `app/sitemap.ts` (deduped, sorted, no blanket lastmod), metadata exports per page, OG image via `app/opengraph-image.tsx`.

## Adding a New Tool/Page
1. Create `app/<route>/page.tsx` using the standard structure (hero with one CTA, form, results, “How it works” accordion, FAQ/related).
2. Add links to nav data in `components/Header.tsx` and, if needed, to `lib/learnMoreLinks.ts`.
3. If collecting input, add validation in `lib/validation.ts` and server handler under `app/api/...`.
4. Persist via `lib/leads.ts` (extend type if needed) and update Supabase schema accordingly (see [DATABASE_AND_SUPABASE.md](DATABASE_AND_SUPABASE.md)).
5. Include route in `src/seo/routes.ts` so `app/sitemap.ts` picks it up.

## Data Flows (summary)
- Readiness: client form → `/api/soc2-lead` or `/api/submit` → zod validate → deterministic scoring → insert `leads` → response → optional email/PDF via `/api/lead/set-email`, `/api/generate-pdf`, `/api/send-email`.
- Pentest/Vendor risk: similar flow to `/api/pentest-lead` and `/api/vendor-risk-assessment`.
- Admin: SSR pages fetch via Supabase admin client; mutations through `/api/admin/*`.

## Security & Validation
- Supabase service_role never sent to client; anon key only used server-side for inserts when needed.
- Input validation via zod in API routes; optional honeypot fields on forms.
- In-memory rate limit helper (`lib/rate-limit.ts`) available; not yet swapped for Redis.

## Styling & Accessibility
- Tailwind utilities; enterprise palette; focus-visible outlines on interactive elements.
- Mobile drawer uses fixed inset-0 with safe-area padding and scroll-lock.

## Metadata & SEO
- Per-route metadata exports; OG via `app/opengraph-image.tsx`.
- Sitemap dedupes/normalizes URLs; no fake `lastmod` (see [SEO.md](SEO.md)).
