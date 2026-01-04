# DECISIONS

Short ADR-style entries (latest at top). Cross-links: [ARCHITECTURE.md](ARCHITECTURE.md), [SEO.md](SEO.md).

- **Mobile nav as portal-based drawer (2024-xx-xx)**: Drawer renders fixed `inset-0` with backdrop and accordion; closes on route change/backdrop/ESC to avoid scroll-position bugs.
- **Single primary CTA rule (2024-xx-xx)**: One dominant CTA per hero; secondary link allowed only as guide link to reduce funnel friction.
- **Deterministic scoring only (2024-xx-xx)**: Scoring engines in `lib/scoring.ts`, `lib/pentestEstimator.ts`, `lib/vendorRisk.ts` remain rules-based; AI limited to phrasing, not decisions.
- **Server-side lead ingestion (2024-xx-xx)**: All calculators submit via API routes with zod validation; no direct client Supabase inserts.
- **Unified leads table (2024-xx-xx)**: All tools write to `leads` to simplify reporting and follow-up automation.
- **Centralized “Learn more” links (2024-xx-xx)**: Map lives in `lib/learnMoreLinks.ts` + helper component to prevent broken hrefs.
- **Sitemap deduplication (2024-xx-xx)**: `app/sitemap.ts` normalizes paths, removes trailing slashes, dedupes URLs, and omits fake `lastmod`.
- **Accordion-first supporting content (2024-xx-xx)**: “How it works” and methodology blocks collapse by default to keep calculators focused.
- **PDF/email optional (2024-xx-xx)**: Results shown immediately; email only required for sending PDF or follow-up consent.
- **In-memory rate limit placeholder (2024-xx-xx)**: `lib/rate-limit.ts` used as stopgap; production should replace with Redis/WAF.
