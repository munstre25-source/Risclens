# Database & Supabase

## Overview
- Postgres via Supabase.
- RLS enabled on all primary tables.
- Storage bucket for PDFs (name via `SUPABASE_STORAGE_BUCKET`).

## Key Tables (sql/00_init.sql, 01_add_context_note.sql, 02_admin_enhancements.sql)

### SOC2_Leads
- Columns: `id uuid`, `company_name text`, `industry text`, `num_employees int`, `data_types text[]`, `audit_date date`, `role text`, `email text nullable`, `utm_source text`, `variation_id text`, `readiness_score int`, `estimated_cost_low/high int`, `lead_score int`, `keep_or_sell text`, `pdf_url text`, `email_sent bool`, `email_delivery_status text`, `consent bool`, `sold bool`, `buyer_email text`, `sale_amount numeric`, `followup_day3_sent bool`, `followup_day7_sent bool`, `is_test bool`, `context_note text`, `soc2_requirers text[]`, `lead_status text`, `pdf_path text`, timestamps.
- RLS: enabled; policy grants service_role full access. Public insert historically allowed; now routed through server API.
- Indexes: email, created_at, keep_or_sell, industry, followup flags.

### REVENUE_EVENTS
- Track revenue events linked to leads; RLS enabled; service_role full access policy.

### KEYWORDS
- Placeholder SEO keywords; RLS enabled.

### AUDIT_LOGS
- Event payloads; RLS enabled.

### AB_VARIANTS
- A/B variants; RLS enabled.

### UNSUBSCRIBED_EMAILS
- Unsubscribes; RLS enabled.

### Admin Enhancements (02_admin_enhancements.sql)
- Adds `lead_status`, `soc2_requirers`, system status tables (see file).

## Policies
- Service role policies for all key tables (`auth.role() = 'service_role'`).
- Public policies are minimal; rely on server-side insert to avoid exposing service key.

## Migrations
- `sql/00_init.sql` — Base schema and RLS.
- `sql/01_add_context_note.sql` — Adds context note column.
- `sql/02_admin_enhancements.sql` — Lead status, PDF tracking, admin KPIs.

## Supabase Clients (`lib/supabase.ts`)
- `getSupabaseClient` (anon) for client-safe reads (rarely used).
- `getSupabaseAdmin` (service role) for server-only operations (PDF/email/update).
- Helper functions: insertLead, updateLead, getLeadById, etc.

## Storage
- Bucket `soc2-pdfs` (or env-provided) for generated PDFs; referenced in PDF/email flows.

## Data Flow
- Lead insertion now via `/api/soc2-lead` (anon server client) or legacy `/api/submit` (service role scoring insert).
- PDF generation uploads to storage and updates lead record with path/url.

## Public vs Private
- Public SELECT is blocked by RLS.
- Inserts are permitted server-side; client direct insert should be avoided (moved to API).
- Admin routes rely on service role for full access.
