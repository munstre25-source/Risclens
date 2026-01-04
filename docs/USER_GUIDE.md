# USER GUIDE

How to use risclens.com tools as an end user. See [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) for UX standards.

## Getting Started
1. Open `/` (or any guide). Heroes show one primary CTA (e.g., “Get Readiness Score”, “Run Pentest Cost Estimator”).
2. Review the “What you’ll get” bullets and trust line.
3. Tap the CTA to start the relevant calculator.

## SOC 2 Readiness Index
- Steps: company context → size/data handling → audit timing/role → optional requirers.
- Submission: posts to `/api/soc2-lead` (validation + honeypot). Email is optional; results render immediately.
- Results: readiness score + band, cost/timeline bands, top fixes, results preview card.
- Optional email/PDF: add email + consent to receive PDF via `/api/generate-pdf` + `/api/send-email`.

## Pentest Cost Estimator
- Route: `/penetration-testing/cost-estimator`.
- Inputs: targets/app types, urgency, size; optional email.
- Output: estimated cost range + notes; optional email for breakdown (saved to `leads`).

## Vendor Risk Triage
- Route: `/vendor-risk-assessment/triage`.
- Inputs: vendor tier/context; optional email.
- Output: prioritized next steps/evidence expectations; optional email capture.

## Guides & Hubs
- SOC 2 cost/timeline/type/checklist/breakdown/industries/ISO comparisons under `/soc-2-*`.
- Pentest guides under `/penetration-testing/[slug]`.
- Vendor risk guides under `/vendor-risk-assessment/*`.
- Each guide links back to the primary tool CTA and related guides.

## Data Collected (per submission)
- Company and assessment inputs, optional email + consent, UTM/variant tags.
- Honeypot `website` is ignored if filled; unknown fields rejected on hardened endpoints.
- Email is only required if you want a PDF or email follow-up.

## Privacy & Safety
- All writes go through server APIs; Supabase service role is server-only.
- PDFs are private and delivered via signed URLs.
- Unsubscribe at any time via the link handled by `/api/unsubscribe`.
