# Developer Workflow

## Getting Started
- Install deps: `npm install`
- Copy env: `cp env.example .env.local` and fill values.
- Run dev: `npm run dev`

## Conventions
- **Single primary CTA** per page; secondary links are text-only.
- **Typography**: lighter weights (500 headings, 400 body) per current style.
- **Header**: sticky, blur-on-scroll, consistent logo sizing; keep mobile/desktop alignment.
- **Guides nav**: keep links in `components/Header.tsx` in sync with new pages.
- **Bottom funnel CTA**: use `components/AssessmentCTA.tsx` on SOC 2 guides/estimators.
- **Metadata**: add page-specific metadata in route file.
- **Tests**: manual for flows; no automated suite present.

## Adding Pages
- Create route under `app/<slug>/page.tsx`.
- Use existing hero/section patterns from guides for consistency.
- Include single CTA to `/soc-2-readiness-index` and trust line.
- Add to Guides dropdown and sitemap if applicable.

## API Changes
- Use zod validation; keep `.strict()`.
- Add rate limiting if public-facing.
- Avoid exposing service role keys client-side.

## Supabase Changes
- Update SQL migrations in `sql/` for schema changes.
- Keep RLS policies explicit; prefer service_role server-side operations.

## Git Practices
- Commit scoped changes; reference docs updates when modifying flows.
- Changelog/commit summaries live in `/docs`.

## Code Style
- TypeScript, Tailwind utilities.
- Prefer reusable components (AssessmentCTA, InfoDisclosure).
- Keep comments concise and purpose-driven.
