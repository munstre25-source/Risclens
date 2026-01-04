# DATA

What we collect, why, and where it lands. Schema specifics live in [DATABASE_AND_SUPABASE.md](DATABASE_AND_SUPABASE.md). Privacy posture is reinforced in [SECURITY.md](SECURITY.md).

## What We Collect (per submission)
- Company context: `company_name`, `industry`, `num_employees`, `data_types`, `audit_date`, `role`, `soc2_requirers`, variation/UTM tags.
- Calculator inputs for pentest/vendor risk (targets, timelines, tiers) as plain fields.
- Contact: `email` (optional until user opts in), `consent` flag.
- Outputs: readiness score, cost/timeline bands, lead_score, keep_or_sell, recommendations summary, pdf_path/url if generated.
- Operational flags: `lead_status`, `followup_day3_sent`, `followup_day7_sent`, `email_delivery_status`, `is_test`, `sold`.

## What We Do Not Collect
- No passwords, auth tokens, or customer production data.
- No continuous telemetry or browser session recording.
- No payment details.

## Storage
- **Supabase Postgres**: primary tables `leads`, `revenue_events`, `audit_logs`, `ab_variants`, `admin_notes`, `saved_filters`, `unsubscribed_emails`, `keywords` (SEO planning), plus lead follow-up helpers. See schema details in [DATABASE_AND_SUPABASE.md](DATABASE_AND_SUPABASE.md).
- **Supabase Storage**: PDFs stored under configured bucket/path; signed URLs cached on the lead row.

## Access & Controls
- Service role key never sent to the client; admin client only used server-side.
- RLS assumed on tables (verify in Supabase); public selects not used. Inserts/updates only via server routes.
- Audit logs recorded via `logAuditEvent` for admin-sensitive actions (variant toggles, mark-sold, purge, email send).

## Retention & Deletion
- No automated deletion/retention policy implemented in code. Admin endpoint `/api/admin/purge-retention` exists to remove test data by flag; production retention must be defined in Supabase or ops playbook.
- Unsubscribe list persists emails for opt-out; no bulk purge implemented.

## Data Use
- Lead fields drive deterministic scoring and cost estimates; optional email solely for delivering results/follow-up.
- Revenue events used for attribution; AB counters for variant health.
