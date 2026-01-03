# Threat Model

## Assets
- Lead data in `SOC2_Leads` (company info, optional email).
- PDF artifacts in Supabase storage.
- API endpoints (`/api/soc2-lead`, `/api/submit`, PDF/email endpoints).
- Admin dashboard and associated secrets (`ADMIN_SECRET`, service role key).
- Brand/SEO surface (public pages, sitemap).

## Actors
- Legitimate users submitting readiness assessments.
- Opportunistic bots/spammers.
- Malicious actors attempting data exfiltration or abusing email/PDF endpoints.
- Insider/developer accounts with service role access.

## Entry Points
- Public web forms (readiness assessment).
- API routes (lead submission, PDF/email).
- Admin routes (protected by secret).
- Supabase access (service role, anon).

## Threats & Mitigations
- **Spam/Abuse of lead form**
  - Mitigations: zod validation, payload size cap, honeypot field, rate limiting (Upstash Redis), server-side insertion only.
- **Credential/secret leakage**
  - Mitigations: env var usage, service role server-only, `env.example` documents required secrets; avoid logging secrets.
- **Unauthorized data access**
  - Mitigations: RLS enabled on all core tables; service_role-only policies; public SELECT blocked; anon insert controlled via server route.
- **DoS via API flooding**
  - Mitigations: 10 req/min/IP rate limit with Redis; in-memory fallback (single instance) as backup.
- **PDF/Email abuse**
  - Mitigations: Requires valid lead_id; email optional but must be valid to send; server-side execution; storage controlled via Supabase bucket.
- **Cross-site scripting**
  - Mitigations: Static copy; user inputs not rendered without escaping; React escapes by default.
- **CSRF**
  - Mitigations: JSON POST APIs; no cookie-based auth for public flows.
- **Data integrity (invalid scoring inputs)**
  - Mitigations: Strict validation (types, bounds); deterministic scoring; unknown fields rejected.

## Residual Risks / Follow-ups
- `/api/submit` uses in-memory rate limiting; consider migrating all traffic to `/api/soc2-lead` and deprecating `/api/submit`.
- Ensure admin routes have additional protection (basic auth/SSO) beyond `ADMIN_SECRET`.
- Monitor PDF/email provider abuse; add quotas or auth if needed.
- Validate storage bucket access level (public vs signed URLs) based on desired privacy.
