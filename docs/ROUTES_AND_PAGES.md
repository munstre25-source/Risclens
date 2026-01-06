# ROUTES AND PAGES

Route map with purpose, key components, and data dependencies. See [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) for flows and [TECHNICAL.md](TECHNICAL.md) for implementation patterns.

## Public Experience
| Route | Purpose | Key Components | Data / API |
| --- | --- | --- | --- |
| `/` | Landing with single CTA to readiness index, trust line, results preview card. | `Header`, hero CTA, results preview card | None (static) |
| `/soc-2-readiness-calculator` | Multi-step readiness calculator, deterministic scoring, results preview + top fixes, optional email/PDF. | form components under app route, `Header`, `LearnMoreLink`, results blocks | `/api/submit` + `/api/soc2-lead`, `/api/generate-pdf`, `/api/send-email`, Supabase `leads` |
| `/compliance-roi-calculator` | ROI calculator comparing manual, automation, and all-in-one compliance approaches. | ROI calculator components, `Header`, `Footer` | `/api/lead/partial`, `/api/generate-pdf` |
| `/soc-2-cost` (+ industry variants: `/startups`, `/saas`, `/fintech`, `/enterprise`, `/healthcare`, `/ecommerce`, `/marketplaces`, `/ai-data`, `/b2b-saas`, `/cloud-infrastructure`, `/devtools`, `/edtech`, `/payments`; listing at `/soc-2-cost/industries`; guide catch-all `/[slug]`) | Cost guides + breakdown variants, CTA to calculators; industry-specific cost pages linked from hub and listing. | guide templates, `Header`, industry grid on hub, `AssessmentCTA` | Static |
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
| `/soc-2-sales` (+ `[slug]`) | Enterprise sales enablement guides (bridge letters, qualified opinions, multi-framework mapping). | Guide components | Static |
| `/penetration-testing` | Pentest overview + CTA to estimator, definition callouts. Links to high-intent industry guides. | PT content components, `Header` | Static |
| `/penetration-testing/cost-estimator` | Pentest cost form + results + optional email. | Estimator form, results cards | `/api/pentest-lead`, Supabase `leads` |
| `/penetration-testing/saas`, `/penetration-testing/fintech` | High-intent industry-specific pentest guides. | Guide components | Static |
| `/penetration-testing/[slug]` | PT pricing/report/scan-vs-pentest/SOC2 articles. | Guide components | Static |
| `/vendor-risk-assessment` | Vendor risk hub + CTA to triage and ROI calculator. | VRA content | Static |
| `/vendor-risk-assessment/triage` | Vendor risk triage form + recommendations + optional email. | Triage form, results cards | `/api/vendor-risk-assessment`, Supabase `leads` |
| `/vendor-risk-assessment/roi-calculator` | Vendor Risk ROI Calculator for automation business case. | ROI calculator components | Static |
| `/vendor-risk-assessment/*` (checklist, scoring-model, evidence-by-tier, monitoring-cadence, contract-clauses, common-mistakes, subprocessors-vs-vendors) | Supporting guides. | Guide components | Static |
| `/about` | Company mission, methodology (deterministic scoring), and privacy stance. | `Header`, `AboutSection`, mission/methodology blocks | None (static) |
| `/privacy`, `/terms` | Policies. | Static pages | Static |
| `/glossary` | Comprehensive glossary of SOC 2, ISO 27001, and security terms. | `Header`, `Footer`, term list | Static |
| `/security` | RiscLens Trust Center explaining our own security posture. | `Header`, `Footer`, security feature blocks | Static |
| `/iso-27001-checklist` | Checklist for ISO 27001 readiness. | `Header`, `Footer`, `ChecklistDownloadForm` | Static |
| `/auditor-directory` | Curated list of reputable CPA firms for SOC 2 audits. | `Header`, `Footer`, auditor list | Static |
| `/auditor-match` | Matching tool for connecting companies with CPAs. | `AuditorMatchForm`, `AuditorMatchCTA` | Static |
| `/methodology` | Detailed explanation of deterministic scoring and RiscLens approach. | Methodology content | Static |
| `/penetration-testing/sow` | Pentest Statement of Work (SOW) generator. | `PentestSOWBuilder` | Static |
| `/penetration-testing/scoping` | Pentest scoping worksheet for requirements gathering. | `ScopingWorksheet` | Static |
| `/vendor-risk-assessment/questionnaire` | Vendor risk assessment questionnaire builder. | `VRAQuestionnaireBuilder` | Static |
| `/sitemap.xml` | Generated sitemap. | `app/sitemap.ts` | Static generation |

## Admin & Ops (protected)
- `/admin`, `/admin/leads`, `/admin/experiments`, `/admin/settings`, `/admin/test-mode`, `/admin/leads/[id]` notes/status, `/admin/ooda` (Analytics): Supabase-admin powered dashboards for leads, variants, CSV export, audit logs, test-mode purge, and OODA analytics. Depends on `lib/supabase-auth.ts` guards.

## API Routes (server)
- Lead capture: `/api/submit`, `/api/soc2-lead`, `/api/pentest-lead`, `/api/vendor-risk-assessment`, `/api/lead/set-email`, `/api/lead/request-review`.
- Output: `/api/generate-pdf`, `/api/send-email`, `/api/unsubscribe`.
- AB testing: `/api/ab/impression`, `/api/ab/submit`, `/api/admin/variants`, `/api/admin/toggle-variant`.
- Admin data: `/api/admin/leads`, `/api/admin/leads/[id]/notes`, `/api/admin/leads/[id]/status`, `/api/admin/export-csv`, `/api/admin/filters`, `/api/admin/audit/list`, `/api/admin/audit/log`, `/api/admin/mark-sold`, `/api/admin/resend-email`, `/api/admin/purge-retention`, `/api/admin/login|logout`, `/api/admin/test-mode/*`.
- Ops: `/api/health`, `/api/cron/day-3`, `/api/cron/day-7`.

## Shared Navigation
- `components/Header.tsx` owns desktop dropdowns (SOC 2, Pentest, Vendor Risk, Guides, Industries) and mobile drawer/accordion with scroll-lock and backdrop. CTA targets readiness index or pentest estimator based on path. ROI Calculator added to Vendor Risk dropdown.
