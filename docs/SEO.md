# SEO

Focus: high-intent security/compliance queries and clean crawlability.

## Key Surfaces
  - Core funnels: `/` → `/soc-2-readiness-calculator`; pentest `/penetration-testing` → `/penetration-testing/cost-estimator`; vendor risk `/vendor-risk-assessment` → `/vendor-risk-assessment/triage`.
  - High-intent industry pages: Pentest `/penetration-testing/saas`, `/penetration-testing/fintech`.
    - High-intent tools: Vendor Risk ROI Calculator `/vendor-risk-assessment/roi-calculator`, ISO 27001 Checklist `/iso-27001-checklist`.
    - Trust & Authority: `/security` (Trust Center), `/glossary` (Compliance Glossary), `/auditor-directory` (Partner CPA firms).
- SOC 2 hubs: cost (`/soc-2-cost*`), timeline (`/soc-2-timeline*`), type (`/soc-2-type-i-vs-type-ii`), checklist, cost breakdown, when-to-start, industries (`/soc-2/industries*`), ISO comparison (`/soc-2-vs-iso-27001*`), evidence (`/soc-2-evidence/[slug]`), learning hub (`/learn/soc-2-readiness*`).
- SOC 2 Sales: `/soc-2-sales*` targeting enterprise buyers concerned with bridge letters, subservice organizations, and multi-framework mapping.
- **Security Signals Directory**: `/compliance/directory` (Index) and dynamic `/[slug]` profiles for programmatic SEO and competitor comparison.

## Content Consolidation & De-duplication

- **Primary Paths:** For control-specific informational content, `/learn/soc-2-readiness/[slug]` is the primary canonical path.
- **Industry Variants:** The `/soc-2-readiness/[slug]` surface is reserved exclusively for industry/vertical-specific readiness guides (e.g., `/saas`, `/fintech`, `/startups`).
- **Sitemap Filtering:** Redundant control pages under `/soc-2-readiness/` are excluded from `src/seo/routes.ts` to prevent index bloat and keyword cannibalization.


## Internal Linking Strategy
- Header dropdowns and mobile drawer cover SOC 2, Pentest, Vendor Risk (including ROI Calculator), Guides, Industries.
- `AssessmentCTA` and hero CTAs point to a single primary action; secondary link allowed to a relevant guide.
- “Learn more” links are centralized in `lib/learnMoreLinks.ts` to avoid broken hrefs.
- **Smart Contextual Linking (pSEO)**:
  - **Linking Loops**: We implement circular high-intent loops via `lib/pseo-links.ts`. E.g., Pricing pages link to Alternatives, and Alternatives link back to Pricing.
  - **Vertical Suggestions**: Industry-specific pages (e.g., /soc-2-readiness-checklist/fintech) provide contextual links to recommended compliance tools.
  - **Role-to-Product Bridge**: Role-based guides bridge persona-based intent with product-based solutions via dynamic "Top Tools for [Role]" modules.
  - **Market Segments**: "Related Market Intelligence" blocks at the footer of dynamic pages allow crawlers to discover sister categories (GRC, SIEM, IAM).
- **Programmatic Linking**:
  - **Related Profiles**: Profile pages use a similarity engine to link to 6-8 similar companies, improving crawl depth.
  - **Keyword-Rich Anchors**: The directory index features an "Explore" block with direct, crawlable links to high-signal companies.

## E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- **Verified Experts**: Content is reviewed and signed off by a multi-disciplinary team (CPA, CISSP, JD/CIPP) defined in `lib/authors.ts`.
- **Author Identity**: Each page injects `Schema.org/Person` and `Schema.org/Review` markup to explicitly link content to professional identities.
- **Institutional Trust**: Transparency via `/editorial-policy` and `/methodology` links sitewide.
- **Data Freshness**: Quarterly technical audits of pricing and regulatory data, reflected in "Last Updated" metadata.

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
