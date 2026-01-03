# Security

## Posture
- **RLS enabled** on all primary tables; service_role-only policies defined.
- **Server-side lead submission**: `/api/soc2-lead` uses zod validation, payload size limits, honeypot, and IP rate limiting (Upstash Redis).
- **Legacy /api/submit**: still present; uses in-memory rate limiting; keep behind appropriate traffic controls.
- **No client-side service key exposure**: service role used server-only via `getSupabaseAdmin`.
- **Headers**: Default Next.js security; no custom middleware required.

## OWASP-style Risks Addressed
- **Injection**: Uses Supabase client queries; inputs validated via zod in `/api/soc2-lead` and via validation helpers in `/api/submit`.
- **XSS**: No raw HTML injection; copy is static. User text (specific_requests) trimmed and stored; avoid rendering unescaped.
- **CSRF**: API expects JSON POST; Next.js uses same-site defaults; no cookies relied on for auth in public flow.
- **Rate Limiting**: 10 req/min/IP on `/api/soc2-lead`; in-memory fallback if Redis absent.
- **Spam/Abuse**: Honeypot field `website`; rate limit; payload size cap.
- **Secrets**: Kept in env vars; service role key server-only.
- **RLS**: Public SELECT blocked; service_role required for admin tasks.
- **PDF/Email**: Emails sent server-side; PDF stored in private bucket (access controlled via signed URLs).

## Known Gaps / Watchouts
- `/api/submit` still accepts inserts with more fields; keep monitored or migrate all traffic to `/api/soc2-lead`.
- In-memory rate limit fallback is single-instance only; rely on Upstash in production.
- Ensure storage bucket permissions stay private if PDFs should not be public.
- Admin area assumes authenticated access via `ADMIN_SECRET`; enforce deployment-level protection (basic auth or edge middleware) if needed.

## Environment Variable Hygiene
- Required secrets: Supabase URL/keys, SendGrid/SMTP keys, PDF provider keys, Upstash Redis.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` client-side.
- Keep `NEXT_PUBLIC_*` limited to values safe for clients (URL, anon key).

## Access Control
- Public users: access calculators and guides; no authentication required.
- Admin: behind `ADMIN_SECRET` checks (see admin routes).
- API: open but rate-limited; honeypot and validation reduce abuse.
