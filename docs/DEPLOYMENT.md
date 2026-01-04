# DEPLOYMENT

Assumes Vercel hosting for App Router. All envs documented in `env.example`.

## Environment Variables (core)
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_STORAGE_BUCKET`.
- App: `NEXT_PUBLIC_APP_URL`, `ADMIN_SECRET`, `RATE_LIMIT_PER_MIN`.
- Email/PDF: `SENDGRID_API_KEY`, `EMAIL_FROM`, `EMAIL_REPLY_TO` (optional), or SMTP fallbacks; `PDFSHIFT_API_KEY` or `BROWSERLESS_API_KEY`.
- Optional infra: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (not wired in code yet; rate limit currently in-memory), `CRON_SECRET`, `CRON_BATCH_SIZE`, analytics IDs.

## Local Development
```bash
cp env.example .env.local
npm install
npm run dev
```

## Production Deploy (Vercel)
1. Set all required env vars in Vercel project settings.
2. Apply Supabase migrations in `sql/` (`00_init.sql`, `01_add_context_note.sql`, `02_admin_enhancements.sql`).
3. `npm run lint && npm run typecheck && npm run build` must pass.
4. Optional: provision Redis if upgrading rate limiting; otherwise accept in-memory limits per function instance.

## Monitoring & Operations
- Vercel logs for API routes and build output.
- Supabase logs for DB/storage; watch RLS policies and function errors.
- Email/PDF provider dashboards for deliverability.
- Health endpoint: `/api/health`; cron follow-ups: `/api/cron/day-3`, `/api/cron/day-7` (protect with `CRON_SECRET` via hosting layer).
