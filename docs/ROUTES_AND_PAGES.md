# ROUTES AND PAGES

Route map with purpose, key components, and data dependencies. See [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) for flows and [TECHNICAL.md](TECHNICAL.md) for implementation patterns.

## Public Experience
| Route | Purpose | Key Components | Data / API |
| --- | --- | --- | --- |
| `/` | Landing with single CTA to readiness index, trust line, results preview card. | `Header`, hero CTA, results preview card | None (static) |
| `/soc-2-readiness-calculator` | Multi-step readiness calculator, deterministic scoring, results preview + top fixes, optional email/PDF. | form components under app route, `Header`, `LearnMoreLink`, results blocks | `/api/submit` + `/api/soc2-lead`, `/api/generate-pdf`, `/api/send-email`, Supabase `leads` |
| `/soc-2-cost` (+ `/saas`, `/fintech`, `/startups`, `/enterprise`, `/healthcare`, `/ecommerce`, `/marketplaces`, `/ai-data`, `/[slug]`) | Cost guides + breakdown variants, CTA to calculators; industry-specific cost pages linked from hub. | guide templates, `Header`, industry grid on hub, `AssessmentCTA` | Static |
| `/soc-2-cost-breakdown` | Deep dive on cost components. | Guide components | Static |
| `/soc-2-timeline` (+ `[slug]`) | Timeline guidance and size variants. | Guide components | Static |
| `/soc-2-type-i-vs-type-ii` | Type comparison. | Guide components | Static |
| `/soc-2-readiness-checklist` | Checklist. | Guide components | Static |
| `/when-do-you-need-soc-2` | Timing guidance. | Guide components | Static |
| `/soc-2-readiness/[slug]` (+ startups/enterprise-sales/saas/fintech) | Industry/vertical readiness guides. | Guide components | Static |
| `/soc-2-vs-iso-27001` (+ `[slug]`) | Framework comparison hub. | Guide components | Static |
| `/soc-2/industries` (+ `[slug]`) | Industries hub + detail pages. | `Header`, guide components | Static |
| `/soc-2-evidence/[slug]` | Evidence library entries with links to readiness pages. | Evidence content modules | Static |
| `/soc-2/guides`, `/learn/soc-2-readiness` (+ `[slug]`) | Guide hubs and learning content. | Guide list components, `LearnMoreLink` | Static |
| `/penetration-testing` | Pentest overview + CTA to estimator, definition callouts. | PT content components, `Header` | Static |
| `/penetration-testing/cost-estimator` | Pentest cost form + results + optional email. | Estimator form, results cards | `/api/pentest-lead`, Supabase `leads` |
| `/penetration-testing/[slug]` | PT pricing/report/scan-vs-pentest/SOC2 articles. | Guide components | Static |
| `/vendor-risk-assessment` | Vendor risk hub + CTA to triage. | VRA content | Static |
| `/vendor-risk-assessment/triage` | Vendor risk triage form + recommendations + optional email. | Triage form, results cards | `/api/vendor-risk-assessment`, Supabase `leads` |
| `/vendor-risk-assessment/*` (checklist, scoring-model, evidence-by-tier, monitoring-cadence, contract-clauses, common-mistakes, subprocessors-vs-vendors) | Supporting guides. | Guide components | Static |
| `/privacy`, `/terms` | Policies. | Static pages | Static |
| `/sitemap.xml` | Generated sitemap. | `app/sitemap.ts` | Static generation |

## Admin & Ops (protected)
- `/admin`, `/admin/leads`, `/admin/experiments`, `/admin/settings`, `/admin/test-mode`, `/admin/leads/[id]` notes/status (API only): Supabase-admin powered dashboards for leads, variants, CSV export, audit logs, and test-mode purge. Depends on `lib/supabase-auth.ts` guards.

## API Routes (server)
- Lead capture: `/api/submit`, `/api/soc2-lead`, `/api/pentest-lead`, `/api/vendor-risk-assessment`, `/api/lead/set-email`, `/api/lead/request-review`.
- Output: `/api/generate-pdf`, `/api/send-email`, `/api/unsubscribe`.
- AB testing: `/api/ab/impression`, `/api/ab/submit`, `/api/admin/variants`, `/api/admin/toggle-variant`.
- Admin data: `/api/admin/leads`, `/api/admin/leads/[id]/notes`, `/api/admin/leads/[id]/status`, `/api/admin/export-csv`, `/api/admin/filters`, `/api/admin/audit/list`, `/api/admin/audit/log`, `/api/admin/mark-sold`, `/api/admin/resend-email`, `/api/admin/purge-retention`, `/api/admin/login|logout`, `/api/admin/test-mode/*`.
- Ops: `/api/health`, `/api/cron/day-3`, `/api/cron/day-7`.

## Shared Navigation
- `components/Header.tsx` owns desktop dropdowns (SOC 2, Pentest, Vendor Risk, Guides, Industries) and mobile drawer/accordion with scroll-lock and backdrop. CTA targets readiness index or pentest estimator based on path.
