# Runbook (Common Tasks)

## Add a New Calculator/Guide Page
1. Duplicate a guide page pattern (e.g., `app/soc-2-timeline/page.tsx`).
2. Set unique metadata/title/description.
3. Single CTA to `/soc-2-readiness-index`; include trust line and AssessmentCTA at bottom.
4. Add route to Guides dropdown (`components/Header.tsx`) and sitemap if needed.

## Add a New Industry Page
1. Create route under `app/(public)/soc-2-readiness/<industry>/page.tsx`.
2. Mirror existing SaaS/Fintech structure and copy tone.
3. Update internal links (related guides) and sitemap if required.

## Update Scoring Weights
1. Edit `lib/scoring-config.ts` (weights, bands, cost parameters).
2. Ensure deterministic behavior; avoid AI/LLM logic.
3. Verify recommendations still align (`lib/recommendations-library.ts`).
4. Manually test `/soc-2-readiness-index` submission.

## Export Leads
1. Use admin routes (see `/admin`) or Supabase console.
2. Ensure RLS policies allow service_role access; avoid exposing data via public policies.
3. For CSV export, use existing admin API if present; otherwise query Supabase directly.

## Update RLS
1. Modify SQL in `sql/00_init.sql` or new migration.
2. Add/adjust policies; keep service_role full access.
3. Deploy migration via Supabase SQL runner.

## Rotate Keys
1. Generate new Supabase keys (anon + service) and provider keys (SendGrid/PDF/Redis).
2. Update Vercel env vars and `.env.local` for dev.
3. Redeploy to propagate; invalidate old keys.

## Add Cross-links
1. Header dropdown: edit `components/Header.tsx`.
2. Bottom CTA: ensure `AssessmentCTA` present on target pages.
3. Inline links: follow existing patterns (cost pages link to timeline, readiness pages link to Type I vs II).

## PDF/Email Troubleshooting
1. Check `/api/generate-pdf` and `/api/send-email` logs.
2. Verify `SUPABASE_STORAGE_BUCKET`, PDF provider keys, and email provider keys.
3. Confirm lead has email/consent set via `/api/lead/set-email`.
