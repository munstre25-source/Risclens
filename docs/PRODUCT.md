# PRODUCT

Single source of truth for positioning, ICP, and success metrics. See also [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) for UX flows and [GLOSSARY.md](GLOSSARY.md) for terminology.

## Vision
Deliver instant, credible readiness signals for security/compliance buyers (SOC 2, pentesting, vendor risk) that convert into high-intent leads without heavy onboarding.

## Ideal Customer Profile
- Early-stage to growth B2B software companies under SOC 2 pressure (sales-driven or auditor-driven).
- Security/eng leaders needing fast scoping for pentests and vendor risk assessments.
- RevOps/solutions teams wanting self-serve signals they can forward to buyers.

## Core Value Props
- SOC 2 Readiness Index: 0–100 score + band (Early-stage / Near-ready / Audit-ready) with cost/timeline ranges.
- SOC 2 cost & timeline calculators with audience/size variants and detailed breakdowns.
- Pentest & Vendor Risk tools: triage/estimators plus evidence/monitoring guidance.
- Guides and hubs (cost, timeline, industries, evidence) for SEO + education.
- Results preview + “one primary CTA” rule to keep conversion focus.

## Monetization Approach
- Lead generation with optional email capture (PDF delivery, follow-up).
- No paywall or accounts; consent captured per submission.
- Revenue events tracked in Supabase `revenue_events` (see [DATABASE_AND_SUPABASE.md](DATABASE_AND_SUPABASE.md)).

## What We Explicitly Do Not Do
- No automated control monitoring or auditor attestation.
- No persistent user accounts or dashboards.
- No AI-driven scoring; all scores are deterministic (see [ARCHITECTURE.md](ARCHITECTURE.md)).

## Success Metrics
- Submission conversion rate per tool (readiness index, pentest estimator, vendor risk triage).
- Lead quality: readiness score distribution, email capture rate, PDF delivery success.
- SEO health: indexed pages, sitemap cleanliness, internal link engagement.
- Page performance and nav usability on mobile (drawer open/close rates).

## CTA Standards
- One primary CTA per hero (e.g., “Get Readiness Score”, “Run Pentest Cost Estimator”).
- Secondary link allowed only as contextual guide link; no competing CTAs in hero.
