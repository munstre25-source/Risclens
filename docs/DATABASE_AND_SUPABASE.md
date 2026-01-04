# DATABASE & SUPABASE

Schema and access model. See [DATA.md](DATA.md) for what/why we collect.

## Overview
- Postgres via Supabase; service role used only on server.
- RLS assumed on all primary tables; verify policies in Supabase UI.
- Storage bucket (env `SUPABASE_STORAGE_BUCKET`) for generated PDFs.

## Key Tables (from `sql/*.sql` and `lib/supabase.ts` types)
- `leads`: unified leads for SOC 2, pentest, vendor risk. Columns include id, company_name, industry, num_employees, data_types[], audit_date, role, email (nullable), utm_source, variation_id, soc2_requirers[], readiness_score, estimated_cost_low/high, lead_score, keep_or_sell, pdf_path/url, email_sent/email_delivery_status, consent, sold, buyer_email, sale_amount, followup_day3_sent, followup_day7_sent, is_test, context_note, lead_status, created_at/updated_at.
- `revenue_events`: lead_id, keyword_id, calculator_page, event_type/value/date, notes.
- `audit_logs`: event_type, payload JSON, created_at.
- `ab_variants`: variation_id, name, headline, cta_text, impressions, submissions, active.
- `admin_notes`: lead_id, note, author, created_at.
- `saved_filters`: name, filter_config JSON, timestamps.
- `unsubscribed_emails`: email, reason?, created_at.
- `keywords`: SEO keyword planning (optional).

## Supabase Clients (`lib/supabase.ts`)
- `getSupabaseClient` (anon) for safe client/server reads when needed.
- `getSupabaseAdmin` (service role) for server-only ops (inserts/updates, audit logging, storage).
- Helper functions: `insertLead`, `updateLead`, `getLeadById`, `recordRevenueEvent`, `logAuditEvent`, AB counters (RPC), admin filters, notes, CSV export helpers.

## Policies & Access
- Service role policies grant full access; public RLS policies should block read access. Inserts occur server-side via API routes, never directly from the browser.
- Admin routes enforce auth via `lib/supabase-auth.ts` (email/password-based admin).

## Storage
- PDFs uploaded in `/api/generate-pdf` using admin client; stored path saved to `leads.pdf_path` with signed URL cached in `pdf_url`.

## Migrations
- `sql/00_init.sql` base schema + RLS.
- `sql/01_add_context_note.sql` adds context note column.
- `sql/02_admin_enhancements.sql` adds lead_status, soc2_requirers, and admin support tables (notes, filters, variants).

## Data Flows
- Lead capture endpoints (`/api/soc2-lead`, `/api/submit`, `/api/pentest-lead`, `/api/vendor-risk-assessment`) validate → compute → insert into `leads` using admin client.
- Audit entries recorded for admin-sensitive actions (mark-sold, resend-email, purge, variant toggle).
- Unsubscribes handled in `unsubscribed_emails`; purge/test-mode helpers delete flagged rows.
