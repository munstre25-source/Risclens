# CHANGELOG (HIGH-LEVEL)

Most recent first. For commit-level notes see [COMMITS_SUMMARY.md](COMMITS_SUMMARY.md).

## 2026-01-05
- High-intent PenTest pages: Added `/penetration-testing/saas` and `/penetration-testing/fintech` industry guides.
- Vendor Risk ROI Calculator: Created `/vendor-risk-assessment/roi-calculator` to help build automation business cases.
- Navigation: Integrated ROI Calculator link into Vendor Risk dropdown (desktop/mobile), positioned under Risk Triage Tool.
- Documentation: Updated `ROUTES_AND_PAGES.md`, `PRODUCT_OVERVIEW.md`, `SEO.md`, and `CHANGELOG.md` to reflect new high-intent surfaces.

## 2024-xx-xx
- Mobile nav hardened: portal-based drawer with backdrop, scroll-lock, close on route change, and sticky close control.
- Sitemap cleaned: deduped, normalized URLs, sorted output, removed blanket `lastmod`; added `check:sitemap`.
- “Learn more” links centralized via `lib/learnMoreLinks.ts` and reusable component to prevent broken hrefs.
- Calculator UX: accordion “How it works”/methodology patterns applied across tools; trimmed post-CTA clutter.
- SOC 2 cost coverage: industry-specific cost pages added (startups, SaaS, fintech, enterprise, healthcare, e-commerce, marketplaces, AI/Data) and cost hub updated with full industry grid links.

## 2024-xx-xx
- Navigation improvements: desktop dropdown contrast/shadow fixes; mobile accordion menus for SOC 2, Pentest, Vendor Risk, Guides, Industries.
- SOC 2 landing refresh: stronger outcome headline, single secondary link, “What you’ll get” cards, trust line + results preview.
- Leads pipeline: unified leads table, deterministic scoring consistency, PDF/email automation tweaks.

## Earlier
- Added SOC 2 cost/timeline/type pages, readiness checklist, industry/vertical guides, SOC 2 vs ISO 27001 hubs.
- Pentest and Vendor Risk tools expanded (estimators/triage, checklists, evidence tiers, monitoring cadence, contract clauses, common mistakes).
- Admin dashboards for leads, variants, audit logs, CSV export; RLS-first Supabase schema.
