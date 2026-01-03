# Data Guide

## Supabase Tables (key)
- `SOC2_Leads`: lead data (company, industry, num_employees, data_types, audit_date, role, email optional, utm_source, variation_id, readiness_score/cost fields, lead_status, context_note, soc2_requirers, pdf fields, follow-up flags).
- `REVENUE_EVENTS`: revenue attribution linked to leads.
- `KEYWORDS`: SEO keyword placeholders.
- `AUDIT_LOGS`: system audit trail.
- `AB_VARIANTS`: A/B variant config.
- `UNSUBSCRIBED_EMAILS`: unsubscribe list.

## RLS & Access
- RLS enabled; service_role full access policies.
- Public SELECT blocked; inserts go through server endpoints.
- Client never receives service role key.

## Flows
- Lead submission: `/api/soc2-lead` validates and inserts minimal lead fields with anon key server-side; scoring returned to client.
- Legacy `/api/submit`: validates and inserts with computed fields (service role) for PDF/email flow compatibility.
- PDF storage: Supabase bucket (configured via `SUPABASE_STORAGE_BUCKET`).

## Retention Notes
- No explicit retention/deletion automation in code; rely on Supabase lifecycle policies if needed.
- Follow-up flags indicate email cadence; adjust downstream if adding automation.
