# Product Overview

## What RiscLens Is
RiscLens is a Next.js (App Router) site that delivers SOC 2 readiness guidance and cost/timeline calculators for early-stage SaaS/fintech teams. Primary goals:
- Quickly estimate readiness score, cost range, and timeline.
- Educate on SOC 2 expectations (Type I vs Type II, timelines, costs, readiness checklist).
- Capture leads for follow-up via Supabase while keeping user experience lightweight and transparent.

## Who It’s For
- Founders, CTOs, and compliance leads at early-stage or growth-stage companies pursuing SOC 2.
- Teams evaluating whether to start SOC 2 now vs later (cost, timing, audit type).

## Key Public Pages (non-exhaustive)
- `/` — Main landing with readiness CTA.
- `/soc-2-readiness-index` — Multi-step readiness assessment (client form → server scoring → on-page results).
- `/soc-2-cost`, `/soc-2-cost/saas`, `/soc-2-cost/fintech` — Cost guides.
- `/soc-2-timeline` — Timeline guidance (new SEO page).
- `/soc-2-type-i-vs-type-ii` — Type I vs Type II overview (new SEO page).
- `/soc-2-readiness-checklist` — Practical checklist (new SEO page).
- `/soc-2-cost-breakdown` — Cost components (new SEO page).
- `/when-do-you-need-soc-2` — Readiness timing guidance (new SEO page).
- `/soc-2-readiness/startups` — Startup-focused readiness guidance (new SEO page).
- `/soc-2-readiness/enterprise-sales` — Enterprise sales readiness guidance (new SEO page).
- `/soc-2-vs-iso-27001` — SOC 2 vs ISO 27001 comparison (new SEO page).
- `/soc-2-readiness/saas`, `/soc-2-readiness/fintech` — Industry-specific variants.
- `/privacy`, `/terms` — Policies.
- `/admin` (and nested) — Admin dashboard for leads/metrics.

## Core Flows
- **Readiness Assessment**: Multi-step form → server scoring (`/api/submit` legacy and `/api/soc2-lead` hardened) → results card with score/cost → optional PDF/email flow.
- **Lead Capture**: Leads stored in Supabase `SOC2_Leads` with RLS; submission now proxied through server API with validation + rate-limit + honeypot.
- **PDF/Email**: From results view, user can provide email, trigger PDF generation (`/api/generate-pdf`) and email send (`/api/send-email`).

## Value Props
- Fast, deterministic scoring (no AI in scoring).
- Clear costs/timelines and expectations.
- Transparent data use (privacy notes, optional email).
- Enterprise-grade posture (RLS, validation, rate limiting, spam controls).
