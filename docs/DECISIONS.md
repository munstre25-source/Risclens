# Decisions (Inferred)

- **Next.js App Router**: Chosen for filesystem routing and serverless compatibility with Vercel.
- **Supabase**: Selected for managed Postgres + RLS + storage; service role used server-side only.
- **Deterministic Scoring**: No AI in scoring; rule-based for auditability and explainability.
- **Single Primary CTA**: Keep pages focused; secondary links are text-only to reduce friction.
- **Sticky Header with Reserved Logo Space**: Prevent CLS and maintain brand presence.
- **Server-Side Lead Ingestion**: Moved from client insert to `/api/soc2-lead` for validation, rate limiting, and spam protection.
- **Guides Dropdown + Bottom CTA**: Standardize funnels from SEO pages to readiness index.
- **Lightweight Accordions (InfoDisclosure)**: Provide explanations without clutter; collapsed by default for hero area.
- **RLS-First Schema**: RLS enabled on all core tables; service_role-only policies.
- **PDF/Email Optional**: Results available without email; email only required for PDF delivery to reduce friction.
