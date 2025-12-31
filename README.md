# RiscLens SOC 2 Cost Calculator

A production-ready SOC 2 compliance cost calculator built with Next.js (App Router), Supabase, and optimized for Vercel deployment.

## Features

- 📊 **Interactive Calculator**: Multi-step form with real-time validation
- 📈 **Lead Scoring**: Deterministic scoring logic for lead qualification (1-10 scale)
- 📄 **PDF Generation**: Automated PDF report generation with Playwright/Chromium
- 📧 **Email Automation**: SendGrid + SMTP fallback with day-3/day-7 follow-ups
- 👤 **Admin Dashboard**: Lead management, CSV export, A/B testing controls, mark sold
- 🔄 **A/B Testing**: Built-in variation tracking and conversion metrics
- ⏰ **Scheduled Follow-ups**: Vercel Cron-compatible batch email jobs
- 🔒 **Rate Limiting**: In-memory rate limiting on all write endpoints
- 📝 **Audit Logging**: Complete audit trail for all major events

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (Postgres)
- **Storage**: Supabase Storage
- **Email**: SendGrid (primary) / SMTP (fallback)
- **PDF**: Playwright + @sparticuz/chromium
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- SendGrid account (for email features)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd risclens

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Edit .env.local with your credentials
```

### Required Environment Variables

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=soc2-pdfs

# Admin (Required)
ADMIN_SECRET=your-secure-admin-secret

# App URL (Required)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (Required for PDF delivery)
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@yourdomain.com
EMAIL_REPLY_TO=hello@yourdomain.com

# Cron (Required for follow-up emails)
CRON_SECRET=your-cron-secret

# Rate Limiting
RATE_LIMIT_PER_MIN=60

# PDF (Optional - set to true if Playwright fails)
PDF_FALLBACK=false
```

### Database Setup

1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.

2. **Run Migrations**:
   ```bash
   # Copy contents of sql/00_init.sql and run in Supabase SQL Editor
   # OR use psql:
   psql $DATABASE_URL -f sql/00_init.sql
   ```

3. **Create Storage Bucket**:
   - Go to Supabase Dashboard > Storage
   - Create bucket named `soc2-pdfs`
   - Set as **public bucket** (for PDF links to work)

4. **Seed Test Data** (optional):
   ```bash
   npm run seed
   ```

### Development

```bash
# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production
npm run build
```

## Local Smoke Tests

After setup, verify the system works:

### 1. Submit a Lead
```bash
curl -X POST http://localhost:3000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Company",
    "industry": "saas",
    "num_employees": 25,
    "data_types": ["pii", "financial"],
    "planned_audit_date": "2025-06-15",
    "role": "cto",
    "email": "test@example.com",
    "consent": true
  }'
```

### 2. Generate PDF
```bash
curl -X POST http://localhost:3000/api/generate-pdf \
  -H "Content-Type: application/json" \
  -d '{"lead_id": "<lead_id_from_step_1>"}'
```

### 3. Send Email
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"lead_id": "<lead_id_from_step_1>"}'
```

### 4. Check Health
```bash
curl http://localhost:3000/api/health
```

### 5. Admin Dashboard
- Visit `http://localhost:3000/admin`
- Enter your ADMIN_SECRET to login
- View leads, export CSV, manage A/B variants

## Vercel Deployment

### Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
```

### Configure Cron Jobs

Add to `vercel.json` (already configured):

```json
{
  "crons": [
    {
      "path": "/api/cron/day-3",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/day-7", 
      "schedule": "0 9 * * *"
    }
  ]
}
```

The cron endpoints accept:
- Vercel cron header (`x-vercel-cron`)
- `Authorization: Bearer <CRON_SECRET>`
- `Authorization: Bearer <ADMIN_SECRET>` (fallback)

### PDF Generation on Vercel

The project uses Playwright + @sparticuz/chromium for PDF generation. Configure in `vercel.json`:

```json
{
  "functions": {
    "app/api/generate-pdf/route.ts": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

If PDF generation fails, set `PDF_FALLBACK=true` in environment.

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit` | Submit calculator form, returns results |
| POST | `/api/generate-pdf` | Generate PDF for lead |
| POST | `/api/send-email` | Send email with PDF link |
| GET | `/api/health` | Health check with metrics |
| GET | `/api/unsubscribe` | Handle email unsubscribe |

### A/B Testing Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ab/impression` | Record variant impression |
| POST | `/api/ab/submit` | Record variant submission |

### Admin Endpoints (require ADMIN_SECRET)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/leads` | List leads with filters |
| GET | `/api/admin/variants` | List A/B variants |
| GET | `/api/admin/export-csv` | Export leads to CSV |
| POST | `/api/admin/resend-email` | Resend PDF email |
| POST | `/api/admin/mark-sold` | Mark lead as sold |
| POST | `/api/admin/toggle-variant` | Toggle A/B variant |
| POST | `/api/admin/purge-retention` | Delete old leads |

### Cron Endpoints (require CRON_SECRET)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST/GET | `/api/cron/day-3` | Day 3 follow-up emails |
| POST/GET | `/api/cron/day-7` | Day 7 beta invite emails |

### Webhook Schema

`POST /api/webhook/new-lead` receives:

```json
{
  "event_type": "new_lead",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "lead": {
    "id": "uuid",
    "company_name": "Acme Inc",
    "industry": "saas",
    "num_employees": 25,
    "data_types": ["pii", "financial"],
    "audit_date": "2024-06-15",
    "role": "cto",
    "email": "user@example.com",
    "utm_source": "google",
    "variation_id": "default",
    "readiness_score": 65,
    "estimated_cost_low": 15000,
    "estimated_cost_high": 45000,
    "lead_score": 7,
    "keep_or_sell": "keep"
  }
}
```

## Lead Scoring Logic

Leads are scored 1-10 based on:

| Factor | Points |
|--------|--------|
| 1-5 employees | +3 |
| 6-20 employees | +6 |
| 21+ employees | +9 |
| Audit ≤6 months | +2 |
| Audit ≤12 months | +1 |
| PII data | +1 |
| Financial data | +1 |
| Health data | +1 |
| CTO/CEO/Founder/Security role | +2 |

**Score normalization**: Raw score (3-16) → normalized to 1-10 scale

**Keep threshold**: Score ≥ 5 = "keep", otherwise "sell"

**Readiness score**: `50 + (lead_score - 5) * 10`, clamped to 0-100

**Cost estimate**: Base + per-employee + per-data-type, with urgency multiplier

## Troubleshooting

### PDF Generation Fails

1. Check function memory is 1024MB+ in `vercel.json`
2. Set `PDF_FALLBACK=true` to use alternative method
3. Check Vercel function logs for specific errors

### Emails Not Sending

1. Verify SENDGRID_API_KEY is set correctly
2. Ensure sender email is verified in SendGrid
3. Check EMAIL_FROM matches a verified sender
4. View AUDIT_LOGS table for email send attempts

### Database Connection Issues

1. Verify SUPABASE_SERVICE_ROLE_KEY is correct
2. Ensure RLS policies are applied (run `00_init.sql`)
3. Check storage bucket exists and is public

### Rate Limiting

The in-memory rate limiter resets on cold starts. For production with multiple instances, consider using:
- Upstash Redis + @upstash/ratelimit
- See comments in `lib/rate-limit.ts`

## Project Structure

```
├── app/
│   ├── (public)/
│   │   └── soc-2-cost-calculator/  # Calculator page
│   ├── admin/                       # Admin dashboard
│   ├── api/                         # API routes
│   │   ├── submit/                  # Form submission
│   │   ├── generate-pdf/            # PDF generation
│   │   ├── send-email/              # Email sending
│   │   ├── admin/                   # Admin endpoints
│   │   ├── cron/                    # Cron job endpoints
│   │   ├── ab/                      # A/B tracking
│   │   ├── webhook/                 # Webhook handlers
│   │   └── health/                  # Health check
│   └── layout.tsx
├── components/
│   ├── CalculatorForm.tsx           # Main form component
│   ├── FreeResults.tsx              # Results display
│   └── AdminLeadRow.tsx             # Admin table row
├── lib/
│   ├── scoring.ts                   # Lead scoring logic
│   ├── supabase.ts                  # Database client
│   ├── email.ts                     # Email sending
│   ├── pdf.ts                       # PDF generation
│   ├── rate-limit.ts                # Rate limiting
│   └── validation.ts                # Input validation
├── pdf/
│   └── PDFTemplate.tsx              # PDF React template
├── sql/
│   └── 00_init.sql                  # Database schema
├── scripts/
│   ├── seed.ts                      # Seed test data
│   └── migrate.sh                   # Run migrations
└── samples/
    └── sample-lead.pdf              # Generated sample
```

## License

Private - RiscLens

## Support

For issues, contact: support@risclens.com
