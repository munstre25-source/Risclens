# Threat Model

## Assets
- Lead data in `leads` (company inputs, optional email, scoring outputs).
- PDF artifacts stored in Supabase Storage (private bucket, signed URLs).
- API endpoints (lead capture for SOC 2/pentest/vendor risk, PDF/email, AB tracking).
- Admin dashboard and associated secrets (`ADMIN_SECRET`, service role key).
- Brand/SEO surface (public pages, sitemap).

## Actors
- Legitimate users submitting readiness assessments.
- Opportunistic bots/spammers.
- Malicious actors attempting data exfiltration or abusing email/PDF endpoints.
- Insider/developer accounts with service role access.

## Entry Points
- Public web forms (readiness, pentest, vendor risk calculators).
- API routes (lead submission, PDF/email, AB tracking).
- Admin routes (protected by secret).
- Supabase access (service role, anon).

## Threats & Mitigations
- **Spam/Abuse of lead form**
  - Mitigations: zod validation, payload size cap, honeypot field, optional rate limit (`RATE_LIMIT_PER_MIN`), server-side insertion only.
- **Credential/secret leakage**
  - Mitigations: env var usage, service role server-only, `env.example` documents required secrets; avoid logging secrets.
- **Unauthorized data access**
  - Mitigations: RLS enabled on all core tables; service_role-only policies; public SELECT blocked; anon insert controlled via server route.
- **DoS via API flooding**
  - Mitigations: In-memory rate limiter available; recommend WAF/Redis in production; payload size caps.
- **PDF/Email abuse**
  - Mitigations: Requires valid lead_id; email optional but must be valid to send; server-side execution; storage controlled via Supabase bucket.
- **Cross-site scripting**
  - Mitigations: Static copy; user inputs not rendered without escaping; React escapes by default.
- **CSRF**
  - Mitigations: JSON POST APIs; no cookie-based auth for public flows.
- **Data integrity (invalid scoring inputs)**
  - Mitigations: Strict validation (types, bounds); deterministic scoring; unknown fields rejected.

## Residual Risks / Follow-ups
- `/api/submit` legacy path still present; migrate callers to hardened endpoints.
- Rate limiting is per-instance; add Redis/WAF for production-level protection.
- Admin auth is shared-secret; add IP allowlist or SSO.
- Define retention/deletion policies for leads/PDFs; currently manual/test-mode purge only.
- Monitor PDF/email provider usage; enforce quotas if abused.
