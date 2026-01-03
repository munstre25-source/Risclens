# Routes and Pages

## Public Routes
- `/` — Landing page with hero CTA, collapsible definitions, trust blocks.
- `/soc-2-readiness-index` — Main assessment flow (multi-step form, results).
- `/soc-2-cost`, `/soc-2-cost/saas`, `/soc-2-cost/fintech`, `/soc-2-cost-breakdown` — Cost guides.
- `/soc-2-timeline` — Timeline guide.
- `/soc-2-type-i-vs-type-ii` — Type comparison.
- `/soc-2-readiness-checklist` — Checklist guide.
- `/when-do-you-need-soc-2` — Timing guidance.
- `/soc-2-readiness/saas`, `/soc-2-readiness/fintech` — Industry-specific readiness pages.
- `/privacy`, `/terms` — Policies.
- `/learn/soc-2-readiness` — Evergreen explainer.
- Sitemap: `/sitemap.xml` from `app/sitemap.ts`.
- Robots: handled by Next defaults (no custom file present).

## Admin
- `/admin` and nested routes (dashboard, leads management, KPIs).

## API Routes
- `/api/soc2-lead` — Lead submission with validation + rate limit + scoring.
- `/api/submit` — Legacy submission with scoring/insert (still used for PDF/email flow).
- `/api/generate-pdf` — Generate PDF for a lead.
- `/api/send-email` — Send PDF email.
- `/api/lead/set-email` — Update lead with email/consent (used by FreeResults).
- `/api/unsubscribe` — Handle unsubscribes.
- `/api/health` — Health check.

## Shared Components (by path)
- `components/Header.tsx` — Global nav, sticky/blur, mobile menu overlay, guides dropdown.
- `components/CalculatorForm.tsx` — Multi-step form.
- `components/FreeResults.tsx` — Results + PDF/email.
- `components/AssessmentCTA.tsx` — Bottom funnel CTA block reused across guides.
- `components/InfoDisclosure.tsx` — Collapsible info block.

## Notes
- Guides dropdown links configured in `components/Header.tsx`.
- Bottom CTA section reused across specified guide pages.
