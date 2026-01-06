# Human-in-the-Loop Escape Hatch

## Strategy
High-intent buyers often need reassurance from a human before committing to an audit path or tool purchase. We provide a "technical escape hatch" that positions RiscLens as a trusted advisor, not just a software tool.

## Implementation Details
The `<HumanCheckCTA />` component offers a low-friction way to talk to a compliance expert.

### Key Rules Followed:
- **Not sales spam**: Explicitly labeled as "Not a sales demo" and "Purely technical guidance."
- **Visible but tasteful**: Uses a calm, trust-building UI with a secondary button style.
- **Strategic Placement**: Added below outputs on all calculator result pages to capture high-intent users who are "stuck" or "unsure."

## Pages Affected
Integrated into:
- **SOC 2 Readiness**: `components/FreeResults.tsx`
- **SOC 2 Cost (ROI)**: `app/compliance-roi-calculator/page.tsx`
- **Pentest Estimator**: `components/pentest/PentestEstimatorResults.tsx`
- **Vendor Risk (VRA)**: `components/vendor-risk/VendorRiskResults.tsx`

## Destination
Links to `/readiness-review` (or a similar booking page) with `lead_id` and `email` pre-filled via URL parameters to reduce friction.

## Technical Implementation
- **Component**: `<HumanCheckCTA />`
- **Analytics Events**:
  - `human_cta_clicked`: Tracked when the user clicks the "Talk to Expert" button.
  - `human_request_submitted`: Tracked via the destination form submission.
