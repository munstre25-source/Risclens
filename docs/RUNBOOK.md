# RUNBOOK (COMMON TASKS)

Operational playbook. See [DEPLOYMENT.md](DEPLOYMENT.md) for environment setup and [SECURITY.md](SECURITY.md) for controls.

## Health & Monitoring
- Health endpoint: `/api/health`.
- Cron follow-ups: `/api/cron/day-3`, `/api/cron/day-7` (protect via hosting/secret).
- Logs: Vercel function logs; Supabase dashboard for DB/storage errors; email/PDF provider dashboards.

## Admin Access
- Admin UI at `/admin/*` guarded by `ADMIN_SECRET` cookie/header. If locked out, set the cookie manually via browser devtools using the secret value.
- CSV export: `/api/admin/export-csv` (auth required).

## Lead & Output Issues
- Submission errors: check API route logs; validate env vars (Supabase keys, RATE_LIMIT_PER_MIN).
- PDF/email failures: ensure `SUPABASE_STORAGE_BUCKET`, PDF provider key, and email provider key set; confirm lead has `email` + `consent`; retry via `/api/admin/resend-email`.
- Unsubscribe handling: verify `/api/unsubscribe` works and table `unsubscribed_emails` populated.

## Adding/Updating Pages
1. Create route under `app/<slug>/page.tsx` following calculator spine.
2. Add metadata export; ensure one primary CTA.
3. Update nav data (`components/Header.tsx`), `lib/learnMoreLinks.ts`, and `src/seo/routes.ts`.
4. Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:sitemap`.

## Scoring/Estimator Changes
1. SOC 2: update `lib/scoring-config.ts` (weights, cost bounds, readiness bands).
2. Pentest: update `lib/pentestEstimator.ts`.
3. Vendor risk: update `lib/vendorRisk.ts`.
4. Keep deterministic; adjust recommendations in `lib/recommendations-library.ts` if needed; manually test calculators.

## Database & RLS Changes
1. Modify/create SQL migration in `sql/`.
2. Apply via Supabase SQL runner; verify RLS still blocks public access.
3. Update types in `lib/supabase.ts`/`lib/leads.ts` if columns change.

## Key Rotation
1. Rotate Supabase (anon/service) keys and provider secrets.
2. Update Vercel env + `.env.local`.
3. Redeploy; invalidate old keys in providers.

## Incident Checklist
- Identify failing route (logs, health endpoint).
- Confirm env vars and Supabase availability.
- Temporarily disable cron/follow-up if causing volume.
- Communicate impact; track in `audit_logs` if admin actions are taken.
