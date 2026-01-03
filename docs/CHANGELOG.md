# Changelog (derived from git log)

## 2024-XX-XX (latest)
- Added SEO guide pages (timeline, Type I vs Type II, checklist, cost breakdown, when-do-you-need-soc-2).
- Added Guides dropdown, cross-link CTAs, and bottom funnel CTA component.
- Hardened lead submission via `/api/soc2-lead` with zod validation, rate limiting, honeypot.
- Reduced readiness page whitespace; fixed clipping in definition blocks; header/logo stability.
- Updated sitemap to include new guides.

## Earlier Highlights
- Enhanced landing/readiness copy, added trust/privacy clarifications.
- Added industry pages (SaaS, Fintech) and SEO internal links.
- Implemented admin dashboard enhancements (KPIs, test mode, status indicators).
- Added PDF/email generation for readiness results and follow-up sequences.
- Added A/B testing scaffolding and GA tracking.
- Introduced deterministic scoring and cost estimation improvements.
- Hardened branding (logo updates, sticky header, typography polish).
- Added RLS-aware schema migrations (`sql/00_init.sql`, subsequent enhancements).

> Note: Dates are approximated from commit order; see `COMMITS_SUMMARY.md` for commit-level details.
