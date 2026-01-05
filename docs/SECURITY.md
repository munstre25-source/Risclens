# SECURITY

**Note:** A public-facing Trust Center is available at `/security`.

See [THREAT_MODEL.md](THREAT_MODEL.md) for risk analysis and [DATA.md](DATA.md) for collection scope.

## Posture (Current)
- Supabase service role stays server-side (`getSupabaseAdmin`); anon key used server-side only when needed. RLS expected on all tables; no client SELECTs.
- Public APIs validate via zod, reject unknown fields, and include honeypot fields. Rate limiting helper exists (in-memory, single instance).
- PDF/email handled server-side; PDFs stored in private Supabase bucket with signed URLs.
- Admin access controlled by `ADMIN_SECRET` (cookie or header via `lib/supabase-auth.ts`); no SSO/MFA yet.

## Controls
- **Input validation**: zod schemas on lead endpoints; payload size guardrails.
- **Abuse mitigation**: honeypot, optional rate limit (`RATE_LIMIT_PER_MIN`), consent flag for email, unsubscribe endpoint.
- **Secrets management**: env-only; `SUPABASE_SERVICE_ROLE_KEY` never exposed to the client.
- **Auditability**: `audit_logs` entries for admin-sensitive operations (variant toggle, mark-sold, purge, resend email).
- **Access separation**: Admin pages/APIs gated; public calculators write via server-only Supabase admin client.

## Known Gaps / TODO
- Rate limit is in-memory and per-instance; production should move to Redis/WAF.
- Legacy `/api/submit` still accepts submissions; monitor and migrate callers to hardened endpoints.
- No automated retention/purge policy; only test-mode purge exists. Define production retention.
- Admin auth is shared-secret; upgrade to IdP or at least IP allowlisting.

## Environment Hygiene
- Required: Supabase URL/keys, email/PDF provider keys, `ADMIN_SECRET`, `NEXT_PUBLIC_APP_URL`.
- Optional: Redis keys for distributed rate limiting, `CRON_SECRET`, analytics IDs.
- Keep `NEXT_PUBLIC_*` limited to non-sensitive values.

## Access Summary
- Public users: calculators/guides without auth; writes only through server APIs.
- Admin users: authenticated via `ADMIN_SECRET`; access admin pages and `/api/admin/*`.
- Storage: PDFs in private bucket; ensure bucket stays non-public and URLs are signed.
