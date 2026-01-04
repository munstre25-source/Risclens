# SEO

Focus: high-intent security/compliance queries and clean crawlability.

## Key Surfaces
- Core funnels: `/` → `/soc-2-readiness-calculator`; pentest `/penetration-testing` → `/penetration-testing/cost-estimator`; vendor risk `/vendor-risk-assessment` → `/vendor-risk-assessment/triage`.
- SOC 2 hubs: cost (`/soc-2-cost*`), timeline (`/soc-2-timeline*`), type (`/soc-2-type-i-vs-type-ii`), checklist, cost breakdown, when-to-start, industries (`/soc-2/industries*`), ISO comparison (`/soc-2-vs-iso-27001*`), evidence (`/soc-2-evidence/[slug]`), learning hub (`/learn/soc-2-readiness*`).
- Pentest guides under `/penetration-testing/[slug]`; vendor risk guides under `/vendor-risk-assessment/*`.

## Internal Linking Strategy
- Header dropdowns and mobile drawer cover SOC 2, Pentest, Vendor Risk, Guides, Industries.
- `AssessmentCTA` and hero CTAs point to a single primary action; secondary link allowed to a relevant guide.
- “Learn more” links are centralized in `lib/learnMoreLinks.ts` to avoid broken hrefs.
- Related/FAQ blocks kept concise; “How it works” accordions prevent content bloat above the fold.

## Metadata & Sitemap
- Per-page `metadata` exports; OG via `app/opengraph-image.tsx` (`public/og.png`).
- `app/sitemap.ts` normalizes paths, removes trailing slashes, dedupes URLs, sorts output, and omits blanket `lastmod`. Base: `https://risclens.com`.
- Robots: default Next.js; no custom blocking rules present.

## Content Standards
- Enterprise tone: concise, factual, no hype, no AI-scoring claims (scoring is deterministic).
- One primary CTA per page; avoid competing links near hero.
- FAQ/guide copy unique per page to avoid duplication.

## Measurement
- Track AB variants via `/api/ab/*`; revenue attribution via `revenue_events`; sitemap check via `npm run check:sitemap`.
