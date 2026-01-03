# Architecture

## High-Level
- **Framework**: Next.js 13+ App Router (TypeScript, Tailwind).
- **Hosting**: Vercel (assumed from config).
- **Data**: Supabase (Postgres + Storage), RLS enabled.
- **Edge/server**: API routes under `app/api/*`.
- **Client UI**: React components in `/components`, pages in `/app`.

## Layout & Routing
- `app/layout.tsx`: Root layout, fonts/styles, metadata defaults.
- Public pages under `app/(public)/` and root-level routes (cost, timeline, etc.).
- Admin area under `app/admin`.
- API routes under `app/api`.

## Component Overview
- `components/Header.tsx`: Global nav + CTA + guides dropdown; sticky/blur behavior, mobile menu overlay, scroll lock.
- `components/CalculatorForm.tsx`: Multi-step assessment, client state, posts to `/api/soc2-lead`.
- `components/FreeResults.tsx`: Results display, PDF/email trigger.
- `components/AssessmentCTA.tsx`: Reusable bottom CTA block.
- `components/InfoDisclosure.tsx`: Lightweight accordion/disclosure.

## Data Flow (Assessment)
```mermaid
flowchart TD
  UserForm[CalculatorForm (client)] -->|POST JSON| APISubmit[/api/soc2-lead]
  APISubmit --> Zod[Zod validation + rate limit + honeypot]
  Zod -->|valid| Supabase[(Supabase anon insert)]
  Zod -->|score| Scoring[lib/scoring + scoring-config]
  Supabase --> LeadRow[public.SOC2_Leads]
  APISubmit --> Response[{ok, lead_id, results}]
  Response --> FreeResults[FreeResults component]
  FreeResults -->|optional email| SetEmail[/api/lead/set-email]
  FreeResults --> GenPDF[/api/generate-pdf]
  GenPDF --> SendEmail[/api/send-email]
```

## Scoring
- Located in `lib/scoring.ts` and `lib/scoring-config.ts`.
- Deterministic, rule-based; inputs: num_employees, audit_date, data_types, role, optional industry/soc2_requirers.
- Outputs readiness_score (0–100), lead_score/keep_or_sell, estimated_cost_low/high, recommendations (from `recommendations-library`).

## Styling
- Tailwind via `globals.css` + utility classes.
- Cards/buttons via shared classes (`btn-primary`, etc.).

## Assets & Metadata
- `app/opengraph-image.tsx`, `/public/og.png`.
- `app/sitemap.ts` generates sitemap with SEO pages included.

## PDF/Email Flow
- `/api/generate-pdf`: Builds PDF (PDFShift/Browserless depending on env) and stores to Supabase storage bucket (`SUPABASE_STORAGE_BUCKET`).
- `/api/send-email`: Sends PDF via SendGrid/SMTP based on env.
- `/api/lead/set-email`: Updates lead with email/consent prior to PDF send (server-side).

## Diagrams
### Request Lifecycle (Assessment)
```
Client form -> /api/soc2-lead (Next.js API) -> zod validate -> rate limit (Redis) -> Supabase insert -> scoring -> return results -> client renders FreeResults -> optional PDF/email
```

### Folder Structure (key)
```
app/
  (public)/...          # Public routes including readiness index
  soc-2-cost*, timeline, type-i-vs-type-ii, checklist, cost-breakdown, when-do-you-need-soc-2
  admin/...             # Admin dashboard
  api/...               # API routes (submit, soc2-lead, pdf/email, health, unsubscribe)
components/
  Header, CalculatorForm, FreeResults, AssessmentCTA, InfoDisclosure, ...
lib/
  scoring.ts, scoring-config.ts, recommendations-library.ts
  supabase.ts           # client/admin helpers
  rate-limit.ts (legacy in-memory)
sql/
  00_init.sql, 01_add_context_note.sql, 02_admin_enhancements.sql
public/
  og.png, icons, pdf assets
```
