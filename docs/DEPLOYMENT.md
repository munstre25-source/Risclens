# Deployment & Ops

## Environments
- **Local**: Run Next.js dev server with `.env.local`.
- **Production**: Vercel deployment (App Router).

## Running Locally
```bash
cp env.example .env.local  # fill values
npm install
npm run dev
```

## Build
```bash
npm run build
npm run start
```

## Environment Variables (critical)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`
- `SENDGRID_API_KEY` or SMTP credentials
- `PDFSHIFT_API_KEY` or `BROWSERLESS_API_KEY`
- `ADMIN_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- Others: GA ID, CRON secrets as needed (see `env.example`).

## Vercel Notes
- App Router; no custom server required.
- API routes run as serverless functions; ensure Upstash credentials set for rate limiting.
- PDF generation may require extra execution time; confirm provider limits.

## Monitoring / Logging
- Next.js logs via Vercel dashboard.
- Supabase: monitor RLS/policies and database logs.
- Email/PDF provider dashboards for deliverability/errors.

## Staging vs Production
- No explicit staging config checked in; duplicate env vars with staging Supabase project if needed.
- Ensure distinct storage buckets/keys per environment.

## Backups
- Supabase handles backups per plan; export SQL as needed.

## DNS/SEO
- `app/sitemap.ts` generates sitemap; ensure Vercel domain maps correctly.
