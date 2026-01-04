# DEVELOPER WORKFLOW

How to work on risclens.com. See [TECHNICAL.md](TECHNICAL.md) for patterns and [RUNBOOK.md](RUNBOOK.md) for ops.

## Setup
```bash
cp env.example .env.local
npm install
npm run dev
```

## Quality Gates
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- Link hygiene: `npm run check:links`
- Sitemap hygiene: `npm run check:sitemap`

## Conventions
- One primary CTA per hero; secondary link only if it points to supporting guide.
- Keep nav data in `components/Header.tsx` and `lib/learnMoreLinks.ts` in sync with new pages.
- Use deterministic scoring/estimators; no AI scoring.
- Validation via zod in API routes; add honeypot/rate-limit when exposing new public endpoints.
- Update sitemap routes in `src/seo/routes.ts` for any new public page.

## Adding/Updating Pages
1. Create `app/<slug>/page.tsx` following calculator spine (hero → form → results → “How it works” accordion → FAQ/related).
2. Add metadata export; ensure OG image coverage if needed.
3. Wire nav/learn-more links and update [ROUTES_AND_PAGES.md](ROUTES_AND_PAGES.md).
4. If data is collected, update validation, Supabase schema, and [DATA.md](DATA.md).

## Working with Supabase
- Schema changes go into `sql/` migrations.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client; use server routes with `getSupabaseAdmin`.
- Record audit events for admin-sensitive actions.

## Git & Docs
- Keep commits scoped and referenced in [CHANGELOG.md](CHANGELOG.md) / [COMMITS_SUMMARY.md](COMMITS_SUMMARY.md) when user-facing.
- Update relevant docs when flows change; link instead of duplicating content.
