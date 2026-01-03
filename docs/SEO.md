# SEO

## Metadata Patterns
- Global defaults in `app/layout.tsx` (title/description, OpenGraph, Twitter).
- Page-specific metadata in route files (e.g., cost pages, readiness index, industry pages).
- OG image: `/public/og.png`.

## Sitemap
- Generated via `app/sitemap.ts`; includes main site pages, cost variants, timeline, type I vs II, readiness checklist, cost breakdown, when-do-you-need-soc-2, industry pages, privacy/terms.
- If sitemap is hard-coded, new SEO routes were appended accordingly.

## Robots
- Default behavior; no explicit `robots.txt` override present.

## JSON-LD
- FAQ/schema present historically (see earlier commits); ensure `app/page.tsx` or related components if JSON-LD remains needed.

## Internal Linking
- Guides dropdown in `Header.tsx` links to calculators/guides.
- Bottom `AssessmentCTA` funnels from guide pages to readiness index.
- Cost pages link to timeline; readiness variants link to Type I vs II.
- Hero secondary text link points to guides/cost/timeline.

## Content Strategy
- Distinct high-intent pages: cost, timeline, Type I vs II, readiness checklist, cost breakdown, timing guidance.
- Unique titles/descriptions per page to avoid duplication.

## Performance/UX
- Sticky header with blur; avoid layout shift (logo wrapper fixed height).
- Mobile CTA visible above the fold; reduced hero whitespace.
