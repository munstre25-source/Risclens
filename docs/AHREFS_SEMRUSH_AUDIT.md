# Ahrefs & SEMrush Audit Workflow

Use this workflow to run site audits and competitive analysis, then act on outputs in code and content.

## Ahrefs

### Site Audit
- Run on `risclens.com`.
- Fix in order: crawl errors, Core Web Vitals, duplicate or thin titles/descriptions, broken internal links, canonicals.
- Use Health score; address critical/errors first.

### Content Gap
- Add competitors: vanta.com, drata.com, secureframe.com, thoropass.com.
- Export: "Keywords they rank for, we don't" and "Striking-distance keywords" (we rank 11–20).
- Use lists to: add new pSEO pages/sections; adjust title/description templates in `scripts/analyze-competitors.ts` (40–60 chars, power words, year).

### Keywords Explorer
- Seed terms: "soc 2 readiness", "soc 2 cost", "vanta vs drata", "soc 2 cost for 10 employees".
- Pull KD, volume, CPC. Prioritize high-intent (comparison, cost, checklist, calculator) and long-tail.
- Feed into `docs/KEYWORD_LIST.md` and `lib/kgrData.ts`-style mapping.

### Organic Traffic
- Identify top pages; ensure each has one primary CTA and links to flagship calculator or relevant tool (readiness, pentest, VRA).

## SEMrush

### Keyword Gap
- Compare risclens.com vs 2–4 competitors.
- Export "Unique to competitor" keywords; map to intent (informational vs commercial).
- Create or enhance routes for high-intent terms you're missing.

### Position Tracking
- Track: readiness, cost, timeline, comparison, pentest, vendor risk.
- Use data to prioritize which pages get layout/CTA/on-page SEO improvements first.

### Site Audit
- Cross-check with Ahrefs (indexability, duplicates, internal linking).
- Align fix list with `docs/SEO.md` and `src/seo/routes.ts`.

## Outputs to Produce

1. **Keyword list**: High-intent and compact head terms with target URL and priority → `docs/KEYWORD_LIST.md`.
2. **Title/meta backlog**: Pages with weak CTR potential; apply `scripts/analyze-competitors.ts` patterns (POWER_WORDS, 40–60 chars).
3. **Content gap list**: New pages or sections; assign to existing route structure or new pSEO silos per `docs/pSEO.md`.
4. **Top entry pages + CTA**: Document in `docs/ENTRY_PAGES_CTA_AUDIT.md` (template below).
