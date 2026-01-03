# SEO Guide

## Programmatic/Key Pages
- `/`, `/soc-2-readiness-index`
- Cost: `/soc-2-cost`, `/soc-2-cost/saas`, `/soc-2-cost/fintech`, `/soc-2-cost-breakdown`
- Timeline: `/soc-2-timeline`
- Type: `/soc-2-type-i-vs-type-ii`
- Checklist: `/soc-2-readiness-checklist`
- Timing: `/when-do-you-need-soc-2`
- Audience: `/soc-2-readiness/saas`, `/soc-2-readiness/fintech`, `/soc-2-readiness/startups`, `/soc-2-readiness/enterprise-sales`
- Comparison: `/soc-2-vs-iso-27001`
- Evergreen explainer: `/learn/soc-2-readiness`

## Internal Linking
- Header “Guides” and “Industries” dropdowns link to all major pages.
- Bottom `AssessmentCTA` funnels guide pages to readiness index.
- Inline links (cost → timeline, readiness variants → Type I vs II) maintained where present.

## Metadata
- Per-page metadata via Next.js `metadata` export.
- OG/Twitter image: `/public/og.png`.
- Sitemap at `app/sitemap.ts` includes current routes.

## Tone & Content
- Enterprise, concise, non-salesy; no hype or AI claims in scoring.
- Unique copy per page to avoid duplication.

## Rationale
- Target high-intent SOC 2 queries (cost, timeline, type, readiness, ISO comparison, industries).
- Preserve single primary CTA to reduce dilution.
