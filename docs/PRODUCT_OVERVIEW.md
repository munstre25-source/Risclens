# PRODUCT OVERVIEW

What users experience across risclens.com. See [PRODUCT.md](PRODUCT.md) for positioning and [USER_GUIDE.md](USER_GUIDE.md) for step-by-step usage.

## Audience & Outcomes
- Early-stage to growth B2B teams under SOC 2 pressure, plus security leads scoping pentests and vendor risk.
- Outcomes: instant readiness score + cost/timeline bands, pentest cost estimates, vendor risk triage guidance, and concise next steps.

## UX Standards
- One primary CTA per hero (e.g., “Get Readiness Score”, “Run Pentest Cost Estimator”); single secondary guide link allowed.
- Navigation: desktop hover dropdowns; mobile drawer + accordion with backdrop, scroll-lock, and close/route-change handling.
- Calculator pages follow the same spine: hero → form → results preview → “How it works” accordion → FAQ/related links.

## Core Tools & Hubs
- **SOC 2 Readiness Index** `/soc-2-readiness-calculator`: multi-step assessment → deterministic scoring → results preview with top fixes.
- **SOC 2 Cost** `/soc-2-cost` (+ `/saas`, `/fintech`, `/[slug]` breakdowns) and **Cost Breakdown** `/soc-2-cost-breakdown`.
- **SOC 2 Timeline** `/soc-2-timeline` (+ size variants).
- **SOC 2 Type I vs Type II**, **Readiness Checklist**, **Industries** hub `/soc-2/industries` (+ `[slug]` pages).
- **SOC 2 vs ISO 27001** hub `/soc-2-vs-iso-27001` (+ `[slug]` comparisons).
- **Pentest**: overview `/penetration-testing`, estimator `/penetration-testing/cost-estimator`, pricing, scan vs pentest, report, SOC 2-specific guidance.
- **Vendor Risk**: hub `/vendor-risk-assessment`, triage tool `/vendor-risk-assessment/triage`, checklist, scoring model, evidence by tier, monitoring cadence, contract clauses, common mistakes, subprocessors vs vendors.
- **Learning**: `/soc-2/guides`, `/learn/soc-2-readiness` (+ `[slug]`), evidence library `/soc-2-evidence/[slug]`.
- **Policies**: `/privacy`, `/terms`. Admin: `/admin` (leads, filters, audit logs, variants, CSV export, test-mode toggles).

## Lead Capture & Output
- Forms submit to server APIs (`/api/submit`, `/api/soc2-lead`, `/api/pentest-lead`, `/api/vendor-risk-assessment`) with validation and optional email capture.
- Results can be emailed as PDF (`/api/generate-pdf`, `/api/send-email`); email is optional and gated behind consent.
- Lead data stored in unified `leads` table; audit events in `audit_logs`; AB test impressions/submissions tracked in `ab_variants` and RPC helpers.

## What We Do Not Do
- No live auditor attestation, no persistent user accounts, no automated control monitoring.
- No AI scoring; AI only used for phrasing explanations, not decisions.
