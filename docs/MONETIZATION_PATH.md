# Monetization Path: Option B (Strategic Auditor Intro)

## Chosen Path
**Option B: Paid auditor / pen-test intro (partner lead)**

## Why
Auditor selection is the highest-friction point for B2B buyers after they realize they need SOC 2. By offering a "Strategic Auditor Introduction," we solve a primary bottleneck while creating a high-value partner lead. This path has the clearest "value-for-value" exchange for an enterprise buyer.

## Pages Affected
The `MonetizationCTA` component is integrated into all calculator result views:
- **SOC 2 Readiness**: `components/FreeResults.tsx`
- **SOC 2 Cost (ROI)**: `app/compliance-roi-calculator/page.tsx`
- **Pentest Estimator**: `components/pentest/PentestEstimatorResults.tsx`
- **Vendor Risk (VRA)**: `components/vendor-risk/VendorRiskResults.tsx`

## Phase 2: Realization (Sale)
The path is completed when a lead is marked as "Sold" in the Admin dashboard.
- **Action**: Admin uses the "Mark Sold" modal in the Lead details page.
- **Tracking**: Logs the sale amount and buyer email.
- **Event**: Triggers a `REVENUE_EVENT` for final ROI calculation.
- **Promotion**: The lead is now managed in the `/admin/buyers` section.

## Expected Buyer Outcome
- **Deal Velocity**: Unblock enterprise sales cycles faster with a vetted audit path.
- **Audit Readiness**: Align with an auditor who understands their specific tech stack and scope.
- **Time Saved**: Skip weeks of vetting firms that don't fit their budget or industry.

## Technical Implementation
- **Component**: `<MonetizationCTA />`
- **Event**: `monetization_cta_clicked`
- **Data Capture**: Logs to `REVENUE_EVENTS` table for OODA loop tracking.
- **Handoff**: Sends request to `/api/lead/request-review`.
