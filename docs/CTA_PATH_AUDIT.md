# CTA and Conversion Path Audit

| Page Type | Primary CTA | Destination | Event Name | Path Map Status |
|-----------|-------------|-------------|------------|-----------------|
| Homepage | Get your readiness score | `/soc-2-readiness-calculator` | `cta_click` | ✅ Maps to Tool |
| SOC 2 Hub | Start Readiness Assessment | `/soc-2-readiness-calculator` | `cta_click` | ✅ Maps to Tool |
| Pentest Hub | Start Scoping Worksheet | `/penetration-testing/scoping` | `cta_click` | ✅ Maps to Tool |
| VRA Hub | Build Program (Lead Form) | `/api/lead/submit` | `vendor_risk_program` | ✅ Direct Lead |
| Comparison Pages | AssessmentCTA (Generic) | `/soc-2-readiness-calculator` | `cta_click` | ⚠️ Needs specific CTA |
| Cost Calculator | Estimate Audit Costs | `/soc-2-cost-calculator` | `cta_click` | ✅ Maps to Tool |

## Findings
1. **Comparison Pages**: Currently use a generic `AssessmentCTA`. These should ideally map to a specific path like "Compare [Tool] Costs" or "Get [Tool] Comparison Guide".
2. **Results Pages**: Need to ensure results pages (Post-calculator) have clear "Next Step" CTAs (e.g., "Request Review", "Download PDF").
3. **Instrumentation**: Many CTAs use a generic `cta_click` event or none at all. We need to standardize this with `trackEvent` from `lib/analytics.ts`.

## Implementation Plan
- Update `AssessmentCTA` to accept custom labels and destinations.
- instrument `CalculatorForm` and `LeadForm` with consistent events.
- Add "Request Intro / Get Quotes" CTAs to results pages.
