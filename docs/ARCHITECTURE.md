# ARCHITECTURE

Concise view of how the system is wired. See [TECHNICAL.md](TECHNICAL.md) for conventions and [ROUTES_AND_PAGES.md](ROUTES_AND_PAGES.md) for route-level detail.

## Stack & Runtime
- Next.js App Router (TypeScript, Tailwind). SSR/SSG where possible; some pages are client-rendered due to dynamic inputs.
- Supabase (Postgres + Storage) via `lib/supabase.ts`; admin client only on server.
- Email/PDF via `/api/send-email` + `/api/generate-pdf`, stored to Supabase Storage.
- In-memory rate limit helper in `lib/rate-limit.ts` (single-instance; replace with Redis for multi-instance).

## Layout & Navigation
- `app/layout.tsx` applies fonts, global styles (`app/globals.css`), and metadata defaults.
- `components/Header.tsx` renders desktop dropdowns and a portal-based mobile drawer (fixed inset-0, scrollable, backdrop, route-change close). CTA changes per section (readiness vs pentest).

## Modules & Responsibilities
- **Scoring**: `lib/scoring.ts` + `lib/scoring-config.ts` (deterministic SOC 2 scoring), `lib/pentestEstimator.ts`, `lib/vendorRisk.ts` for other tools.
- **Content catalogs**: `lib/soc2Guides.ts`, `lib/soc2Industries.ts`, `lib/soc2Evidence.ts`, `lib/seoClusters.ts`.
- **Intelligence & Chat**: `app/api/copilot/chat` (AI context engine), `components/ComplianceCopilot.tsx` (Interactive engagement).
- **Data/Leads**: `lib/leads.ts`, `lib/supabase.ts`, `lib/email.ts`, `lib/pdf.ts`, `lib/rate-limit.ts`.
- **UI**: Pages under `app/`, shared components under `components/`, design tokens via Tailwind utilities.
- **SEO**: `app/sitemap.ts` (deduped, sorted, no global lastmod), metadata helpers in `src/seo`.

## Data Flows
### SOC 2 Readiness / Pentest / Vendor Risk
```
Client form -> POST /api/soc2-lead (or /api/submit)
  -> zod validation + optional rate limit
  -> deterministic scoring (lib/scoring.ts)
  -> insert lead into Supabase `leads` + audit log
  -> return score/cost/timeline/recommendations
Client renders results; optional email -> /api/lead/set-email -> /api/generate-pdf -> /api/send-email
```

### PPC Chat (Pay-Per-Conversation)
```
User Interaction -> POST /api/copilot/chat
  -> OpenAI GPT-4o-mini with RiscLens Context
  -> Steering logic (suggest calculators/15-page report)
  -> Lead capture via email injection
```

### Admin/Reporting
```
/admin pages -> server components fetch via Supabase admin client
CSV export and filters -> /api/admin/export-csv, /api/admin/filters
AB variants/impressions -> /api/ab/* and /api/admin/variants
Audit logs -> /api/admin/audit/*
```

## Folder Highlights
```
app/
  (public)/soc-2-readiness-calculator, soc-2-cost*, soc-2-timeline*, vendor-risk-assessment*, learn/soc-2-readiness*
  admin/* (dashboard, leads, intelligence, experiments, settings)
  api/* (lead capture, copilot, pdf/email, ab, admin, cron)
components/ (Header, mobile drawer, ComplianceCopilot, CTA blocks, results cards)
lib/ (scoring, estimators, recommendations, supabase clients, email/pdf, rate-limit)
src/seo (sitemap route list, clusters)
sql/ (migrations scaffolding)
```
