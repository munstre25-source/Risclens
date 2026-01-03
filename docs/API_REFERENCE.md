# API Reference

All routes are Next.js App Router handlers under `app/api`.

## Common Behaviors
- JSON only; `Content-Type: application/json`.
- Validation errors: `400 { ok:false, error:"validation_error", details?:... }`.
- Rate limiting: `/api/soc2-lead` (10 req/min/IP via Upstash Redis).
- Honeypot: `website` field; if present/non-empty → `{ ok:true }` without insert.

## `/api/soc2-lead` (POST)
- Purpose: Hardened lead submission + scoring.
- Body (zod strict, max ~12kb):
  - `email` (required, email, lowercase, max 254)
  - `company_name` (optional, max 120)
  - `industry` (optional, max 60)
  - `num_employees` (optional, int 1–100000)
  - `data_types` (optional array strings, max 10, each max 32)
  - `audit_date` (optional YYYY-MM-DD)
  - `role` (optional, max 60)
  - `utm_source` (optional, max 80)
  - `variation_id` (optional, max 40, default “default”)
  - `website` (honeypot)
- Responses:
  - `200 { ok:true, lead_id?, results? }`
  - `400 validation_error | payload_too_large | invalid_json | missing_required_fields`
  - `429 rate_limited`
  - `500 insert_failed | submission_failed`
- Inserts only public fields into `SOC2_Leads` using anon server client; computed fields are not written here.

## `/api/submit` (POST)
- Legacy assessment handler (still used for PDF/email flow expectations).
- Validates via `lib/validation` (email optional), scores, and inserts lead with computed fields and flags.
- Returns `{ success, lead_id, results }`.
- Rate limiting via legacy in-memory `lib/rate-limit` (single instance).

## `/api/generate-pdf` (POST)
- Input: `{ lead_id }`.
- Generates readiness PDF (PDFShift/Browserless) and stores in Supabase storage bucket.
- Updates lead with PDF path/url.
- Errors: validation, storage, rendering.

## `/api/send-email` (POST)
- Input: `{ lead_id }`.
- Sends PDF email via SendGrid/SMTP (env driven).
- Errors: email send failures.

## `/api/lead/set-email` (POST)
- Input: `{ lead_id, email, consent }`.
- Updates lead record.

## `/api/unsubscribe` (POST)
- Input: `{ email }`.
- Marks email unsubscribed (table: `UNSUBSCRIBED_EMAILS`).

## `/api/health` (GET)
- Basic health/status.

## Webhook
- Internal webhook call in `/api/submit` to `/api/webhook/new-lead` (not exposed externally) for internal events; ensure route exists/disabled as needed.

## Validation Rules (Highlights)
- Strict zod in `/api/soc2-lead`; `.strict()` rejects unknown keys.
- Max payload enforced in `/api/soc2-lead`.
- Honeypot checked before insert.

## Error Codes (typical)
- `validation_error`, `payload_too_large`, `invalid_json`, `missing_required_fields`, `rate_limited`, `insert_failed`, `submission_failed`.
