# AGENTS.md - RiscLens Project Guidelines

## Project Summary
RiscLens is a compliance intelligence platform for B2B startups navigating SOC 2, ISO 27001, and ISO 42001 (AI) audits. It provides deterministic roadmaps, cost calculators, auditor matching, and programmatic SEO pages across 30k+ routes targeting compliance-related keywords.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Email**: SendGrid
- **AI**: OpenAI API
- **Redis**: Upstash (caching, rate limiting)
- **Deployment**: Vercel

## Architecture
```
app/                    # Next.js App Router pages
├── (public)/           # Public-facing routes (SEO pages)
├── admin/              # Admin dashboard
├── api/                # API routes
components/             # Reusable React components
├── ui/                 # UI primitives and tokens
├── calculators/        # Calculator components
├── compliance/         # Compliance-specific components
lib/                    # Utilities, helpers, data
src/                    # Analytics, content, SEO utilities
```

## User Preferences
- **No comments in code** unless explicitly requested
- **Minimal, professional aesthetic** - no flashy gradients or colorful badges
- **Enterprise-appropriate design** - dark slate CTAs, navy brand colors

## Project Guidelines

### Design System (Updated 2026-01-27)
Based on enterprise compliance UI patterns (Vanta, Drata, Secureframe):

**Colors:**
- Primary CTA: `bg-slate-900` (dark, confident, enterprise)
- Brand accent: Navy blues (`brand-600` to `brand-900`) - use sparingly
- Trust indicator: `trust-500` (emerald) - for success states only
- Remove: coral, amber accent colors

**Typography Scale (Standardized):**
- Hero heading: `text-3xl sm:text-4xl lg:text-5xl font-bold`
- Page heading: `text-2xl sm:text-3xl font-bold`
- Section heading: `text-xl sm:text-2xl font-semibold`
- Card heading: `text-lg font-semibold`

**Spacing:**
- Section padding: `py-16 lg:py-20`
- Container width: `max-w-5xl mx-auto px-4 sm:px-6`
- Gaps: `gap-6` (small), `gap-8` (medium), `gap-12` (large)

**Border Radius:**
- Small elements: `rounded-md`
- Cards/containers: `rounded-lg`
- Dropdowns/modals: `rounded-xl` (max)
- **Never use**: `rounded-2xl`, `rounded-3xl`

**Shadows:**
- Cards: `shadow-sm` only
- **Never use**: `shadow-lg`, `shadow-xl`, `shadow-2xl` on cards

**Buttons (3 variants only):**
```typescript
// Primary: Dark slate, enterprise
"bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-lg"

// Secondary: Outlined
"border border-slate-300 hover:border-slate-400 text-slate-700 font-medium px-6 py-3 rounded-lg bg-white"

// Ghost: Text only
"text-slate-600 hover:text-slate-900 font-medium"
```

**Badges:**
```typescript
// Neutral slate only
"bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium uppercase tracking-wide rounded-md px-2.5 py-1"
```

### Code Conventions
- Named exports over default exports
- Use existing design tokens from `components/ui/uiTokens.ts`
- Follow App Router patterns with `page.tsx` in route directories
- Minimize `'use client'` directives

## Common Patterns

### Programmatic SEO Templates
5 base templates for 30k+ pages:
1. `ComparisonTemplate` - vs pages, alternatives (~500 pages)
2. `DirectoryTemplate` - Company profiles (~15,000 pages)
3. `PricingTemplate` - Tool pricing (~30 pages)
4. `ChecklistTemplate` - Industry/framework checklists (~200 pages)
5. `GuideTemplate` - Educational content (~14,000 pages)

All templates share:
- Identical header/footer
- Consistent hero pattern
- Standardized section spacing (`py-16 lg:py-20`)
- Unified CTA placement (StickyCTA at bottom)

### Component Structure
```typescript
export function ComponentName({ props }: ComponentNameProps) {
  return (
    <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Content */}
      </div>
    </section>
  );
}
```
