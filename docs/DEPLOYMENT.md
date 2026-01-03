# Deployment Guide

## Hosting
- Vercel (App Router). API routes run as serverless functions.

## Environment Variables (core)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_APP_URL`
- `SENDGRID_API_KEY` (or SMTP creds)
- `PDFSHIFT_API_KEY` or `BROWSERLESS_API_KEY`
- `ADMIN_SECRET`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Optional: GA ID, CRON secrets (see `env.example`).

## Local Development
```bash
cp env.example .env.local
npm install
npm run dev
```

## Production Deploy
- Set env vars in Vercel dashboard.
- `npm run build` should pass without extra steps.
- Ensure Upstash Redis provisioned for rate limiting `/api/soc2-lead`.
- Supabase: apply SQL migrations in `sql/` (00_init, 01_add_context_note, 02_admin_enhancements).

## Monitoring/Logging
- Vercel function logs for API routes.
- Supabase dashboard for DB/storage activity.
- Email/PDF provider dashboards for deliverability.
