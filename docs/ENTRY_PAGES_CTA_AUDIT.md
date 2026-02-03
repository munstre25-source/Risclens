# Top Entry Pages & CTA Audit

Fill this after running Ahrefs/SEMrush Organic Traffic or Top Pages. Ensure each entry page has one primary CTA and links to the correct next step per `docs/CTA_HIERARCHY.md`.

| Rank | URL | Primary CTA (current) | Desired next step | Notes |
|------|-----|------------------------|-------------------|-------|
| 1 | / | Start Free Assessment → /soc-2-readiness-index | Readiness Index | Flagship |
| 2 | /soc-2-readiness-index | (form submit) | — | Calculator |
| 3 | /soc-2-cost | Get Readiness Score / AssessmentCTA | Readiness or cost calculator | Hub |
| 4 | /penetration-testing | Run Cost Estimator | /penetration-testing/cost-estimator | Hub |
| 5 | /vendor-risk-assessment | Triage / ROI | /vendor-risk-assessment/triage | Hub |
| 6 | | | | |
| 7 | | | | |
| 8 | | | | |
| 9 | | | | |
| 10 | | | | |
| 11 | | | | |
| 12 | | | | |
| 13 | | | | |
| 14 | | | | |
| 15 | | | | |
| 16 | | | | |
| 17 | | | | |
| 18 | | | | |
| 19 | | | | |
| 20 | | | | |

**Funnel mapping**
- SOC 2 / cost / timeline → Readiness Index (`/soc-2-readiness-index`) or cost calculator (`/soc-2-cost`).
- Pentest → `/penetration-testing/cost-estimator`.
- Vendor risk → `/vendor-risk-assessment/triage`.

**Template consistency**
- Section spacing: `py-16 lg:py-20` (standard); some guides use `py-12` or `py-14` for denser content.
- Container: `max-w-5xl mx-auto px-4 sm:px-6` (standard); some use `max-w-4xl` for long-form.
- Primary CTA: `bg-slate-900 hover:bg-slate-800` per AGENTS.md; StickyCTA used on hub and high-intent guide pages.
- Cards: `rounded-lg` or `rounded-xl` (max), `shadow-sm`, `border border-slate-200`; avoid `rounded-2xl`/`rounded-3xl` and `shadow-lg`/`shadow-xl`.
- FAQs: All pSEO templates (stack, compare, directory, migrate, auditor firm, framework comparison) use contextual FAQ generators and FAQPage JSON-LD where applicable.
