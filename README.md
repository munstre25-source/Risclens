# RiscLens SOC 2 Cost Calculator

A production-ready SOC 2 compliance cost calculator built with Next.js (App Router), Supabase, and optimized for Vercel deployment.

## Features

- 📊 **Interactive Calculator**: Multi-step form with real-time validation
- 📈 **Lead Scoring**: Deterministic scoring logic for lead qualification
- 📄 **PDF Generation**: Automated PDF report generation with Playwright
- 📧 **Email Automation**: SendGrid + SMTP fallback with follow-up sequences
- 👤 **Admin Dashboard**: Lead management, CSV export, A/B testing controls
- 🔄 **A/B Testing**: Built-in variation tracking and conversion metrics
- ⏰ **Scheduled Follow-ups**: Vercel Cron-compatible day-3 and day-7 emails

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
- SendGrid account (optional, for email)

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

### Environment Variables

Create `.env.local` with these required variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_BUCKET=soc2-pdfs

# Admin
ADMIN_SECRET=your-secure-admin-secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email (optional for local dev)
SENDGRID_API_KEY=SG.xxx
EMAIL_FROM=noreply@yourdomain.com

# Optional SMTP fallback
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=pass

# PDF (set to true if Playwright fails)
PDF_FALLBACK=false

# Cron authentication
CRON_SECRET=your-cron-secret

# Rate limiting
RATE_LIMIT_PER_MIN=60
```

### Database Setup

1. **Create Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.

2. **Run Migrations**:
   ```bash
   # Option A: Using psql
   export DATABASE_URL='postgresql://postgres:password@db.xxx.supabase.co:5432/postgres'
   npm run migrate
   
   # Option B: Using Supabase Dashboard
   # Copy contents of sql/00_init.sql and run in SQL Editor
   ```

3. **Create Storage Bucket**:
   - Go to Supabase Dashboard > Storage
   - Create bucket named `soc2-pdfs`
   - Set as public bucket

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

### Local Smoke Tests

1. **Calculator Flow**:
   - Visit `http://localhost:3000/soc-2-cost-calculator`
   - Complete the form with test data
   - Verify results display correctly
   - Click "Send Me the Full PDF" (requires email setup)

2. **Admin Panel**:
   - Visit `http://localhost:3000/admin`
   - Enter your ADMIN_SECRET to login
   - View leads, export CSV, test resend

3. **API Health**:
   ```bash
   curl http://localhost:3000/api/health
   ```

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

The project includes two cron endpoints for follow-up emails. To enable them:

1. Go to Vercel Dashboard > Your Project > Settings > Cron Jobs
2. Add these cron jobs (or they're auto-configured via vercel.json):

| Path | Schedule | Description |
|------|----------|-------------|
| `/api/cron/day-3` | `0 9 * * *` | Day 3 follow-up emails |
| `/api/cron/day-7` | `0 9 * * *` | Day 7 beta invite emails |

3. Set `CRON_SECRET` in environment variables
4. The cron endpoints verify the secret via Authorization header

### PDF Generation on Vercel

The project uses Playwright + @sparticuz/chromium for PDF generation. This works on Vercel but requires:

1. Function memory set to 1024MB+ (configured in vercel.json)
2. If issues occur, set `PDF_FALLBACK=true` to use alternative method

### Environment Variables on Vercel

Add all variables from `.env.local` to Vercel Dashboard > Settings > Environment Variables.

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

## API Reference

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/submit` | Submit calculator form |
| POST | `/api/generate-pdf` | Generate PDF for lead |
| POST | `/api/send-email` | Send email with PDF |
| GET | `/api/health` | Health check |
| GET | `/api/unsubscribe` | Handle unsubscribe |

### Admin Endpoints (require ADMIN_SECRET)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/resend-email` | Resend PDF email |
| GET | `/api/admin/export-csv` | Export leads to CSV |

### A/B Testing Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ab/impression` | Record variant impression |
| POST | `/api/ab/submit` | Record variant submission |

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

## Admin Runbook

### Viewing Leads

1. Go to `/admin`
2. Login with ADMIN_SECRET
3. Use filters to find specific leads
4. Click row to expand details

### Exporting Leads

1. Apply desired filters
2. Click "Export CSV"
3. CSV downloads with filtered leads

### Selling a Lead

1. Find lead marked as "sell"
2. Click "Sell" button
3. Enter sale amount and buyer email
4. Click "Confirm Sale"
5. Revenue event is recorded

### Resending PDF Email

1. Find lead in admin panel
2. Click "Resend" button
3. Email is re-sent with PDF link

### Data Retention

To purge old leads (implement in admin UI):

```sql
-- Delete leads older than 90 days
DELETE FROM "SOC2_Leads" 
WHERE created_at < NOW() - INTERVAL '90 days'
  AND sold = false;
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
| CTO/CEO/Security role | +2 |

**Keep threshold**: Score ≥ 5 = "keep", otherwise "sell"

## Troubleshooting

### PDF Generation Fails

1. Check function memory is 1024MB+
2. Set `PDF_FALLBACK=true` to use alternative method
3. Check Vercel function logs for specific errors

### Emails Not Sending

1. Verify SENDGRID_API_KEY is set
2. Check sender email is verified in SendGrid
3. Check SMTP fallback configuration
4. View AUDIT_LOGS for email send attempts

### Database Connection Issues

1. Verify SUPABASE_SERVICE_ROLE_KEY is correct
2. Check RLS policies are applied
3. Ensure storage bucket exists and is public

## License

Private - RiscLens

## Support

For issues, contact: support@risclens.com

