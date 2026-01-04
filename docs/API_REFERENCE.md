# API REFERENCE

All routes live under `app/api/*`. JSON only unless noted. Validation uses zod; errors return `4xx { error, details? }`. In-memory rate limit helper exists but is not globally applied; production deployments should front with Redis/WAF if needed.

## Lead Capture & Results
- **POST `/api/soc2-lead`** — SOC 2 readiness submission and scoring. Body: company_name?, industry?, num_employees?, data_types?, audit_date?, role?, email?, utm_source?, variation_id?, soc2_requirers?, honeypot `website?`. Returns `{ success, lead_id, results }` with readiness score, cost band, timeline band, and recommendations. Unknown fields rejected.
- **POST `/api/submit`** — Legacy readiness handler (kept for compatibility); similar body, uses same scoring, inserts into `leads`, may call webhook. Uses in-memory rate limit if enabled by caller.
- **POST `/api/pentest-lead`** — Pentest estimator submission. Body: company, app type/targets, timeline, email? etc. Computes cost band via `lib/pentestEstimator.ts` and stores lead row.
- **POST `/api/vendor-risk-assessment`** — Vendor risk triage submission. Body: vendor type/tier inputs, optional email. Returns scoring/prioritized fixes from `lib/vendorRisk.ts`.
- **POST `/api/lead/set-email`** — Attach email + consent to an existing lead (used when user adds email after seeing results).
- **POST `/api/lead/request-review`** — Signal user wants human follow-up; adds admin note/audit entry.

## Output & Notifications
- **POST `/api/generate-pdf`** — Input `{ lead_id }`. Renders PDF from stored lead data, uploads to Supabase Storage, updates lead with `pdf_path`/`pdf_url`.
- **POST `/api/send-email`** — Input `{ lead_id }`. Sends PDF/email via configured provider; logs audit event.
- **POST `/api/unsubscribe`** — Input `{ email }`. Marks email in unsubscribe list.

## A/B Testing
- **POST `/api/ab/impression`**, **POST `/api/ab/submit`** — Track variant impressions/submissions; calls Supabase RPCs to increment counters.
- **GET/POST `/api/admin/variants`**, **POST `/api/admin/toggle-variant`** — Admin management of variants (auth required).

## Admin & Ops (auth required)
- Leads: `/api/admin/leads`, `/api/admin/leads/[id]/notes`, `/api/admin/leads/[id]/status`, `/api/admin/export-csv`, `/api/admin/filters`.
- Audit logs: `/api/admin/audit/list`, `/api/admin/audit/log`.
- Revenue/mark sold: `/api/admin/mark-sold`.
- Email ops: `/api/admin/resend-email`.
- Data hygiene: `/api/admin/purge-retention`, `/api/admin/test-mode/*` (seed/toggle/clear).
- Auth: `/api/admin/login`, `/api/admin/logout`.
- Cron: `/api/cron/day-3`, `/api/cron/day-7` (follow-up emails).
- Health: `/api/health`.

## Common Validation / Error Handling
- Strict zod schemas per route; unknown fields rejected on hardened endpoints (`.strict()`).
- Honeypot: `website` field is silently accepted but ignored; non-empty may short-circuit insert.
- Typical errors: `validation_error`, `rate_limited` (if applied), `insert_failed`, `not_authorized` (admin routes), `email_failed`, `pdf_failed`.
