# User Guide

## Getting Started (Visitor)
1. Land on `/` or any guide (cost, timeline, Type I vs II, checklist).
2. Review “What you’ll get” bullets and trust notes.
3. Start the main CTA “Get Your Readiness Score →” (single primary CTA).

## Readiness Assessment Flow
- **Steps**: Company info → Size & data handling → Audit timing/role.
- **Required inputs**: company name, industry, num_employees range, data_types, planned audit date, role. Optional: who requires SOC 2, specific requests.
- **Submission**: Form POSTs to `/api/soc2-lead` (server validation + rate limit).
- **Results**: Shows readiness score, cost band, recommendations, interpretation block, and link to cost guide. No email required to view results.
- **PDF/Email (optional)**: From results, user can add email/consent to receive PDF (`/api/generate-pdf` + `/api/send-email`).

## Other Guides/Calculators
- **Cost pages**: `/soc-2-cost`, `/soc-2-cost/saas`, `/soc-2-cost/fintech`, `/soc-2-cost-breakdown`.
- **Timeline**: `/soc-2-timeline`.
- **Type I vs Type II**: `/soc-2-type-i-vs-type-ii`.
- **Readiness checklist**: `/soc-2-readiness-checklist`.
- **Timing guidance**: `/when-do-you-need-soc-2`.
- Each page has one CTA pointing to `/soc-2-readiness-index` and a subtle trust line.

## Data Collected
- Lead submission: email (required by API), company_name, industry, num_employees, data_types, audit_date, role, utm_source, variation_id; optional context is trimmed/limited. Honeypot `website` ignored if filled.
- Results view: scoring performed server-side; readiness score and cost band returned.
- PDF/email: email + consent captured after results.

## Privacy Notes
- RLS on Supabase; public SELECT blocked; insert proxied via server.
- Email optional for results; only required to send PDF.
- Honeypot + rate limiting mitigate abuse.
- Trust copy on hero and trust/privacy blocks explain “why free” and data use.
