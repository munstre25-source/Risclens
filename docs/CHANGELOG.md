# CHANGELOG (HIGH-LEVEL)

Most recent first. For commit-level notes see [COMMITS_SUMMARY.md](COMMITS_SUMMARY.md).

## 2026-01-11
- **E-E-A-T Signal Hardening**: Implemented Google 2026 standard trust signals across all pSEO pages.
  - Expanded author roster in `lib/authors.ts` (Sarah L. - JD/CIPP, Kevin A. - CISSP).
  - Integrated `AuthorBio` components and expert verification badges.
  - Added [Editorial Policy](/editorial-policy) and enhanced [Methodology](/methodology) pages.
- **Smart Contextual Linking**: Strengthened sitewide crawling architecture.
  - Implemented high-intent linking loops (Pricing ↔ Alternatives).
  - Added Industry-to-Tool and Role-to-Product bridges.
  - Centralized link logic in `lib/pseo-links.ts`.
- **Documentation Overhaul**: Updated `pSEO.md`, `SEO.md`, `METHODOLOGY_PAGE.md` and created `EEAT_GUIDELINES.md`.

## 2026-01-06
- Auditor Match Tool: Added `/auditor-match` for connecting companies with CPAs.
- Methodology Page: Created `/methodology` to explain deterministic scoring and RiscLens approach.
- Admin OODA Dashboard: Added `/admin/ooda` for Observe, Orient, Decide, Act analytics.
- Pentest SOW Builder: Integrated Statement of Work generator at `/penetration-testing/sow`.
- Scoping Worksheet: Added `/penetration-testing/scoping` for detailed pentest requirements.
- Vendor Risk Questionnaire Builder: Added `/vendor-risk-assessment/questionnaire` for creating vendor assessments.
- Lead Magnet System: Enhanced PDF generation with `GenericLeadMagnetPDF` and updated API routes.
- Strategy & Architecture Docs: Added comprehensive documentation on flagship paths, monetization, human-in-loop patterns, and CTA hierarchy.
- Bug Fix: Fixed `Link` component import in SOC 2 readiness calculator.

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
