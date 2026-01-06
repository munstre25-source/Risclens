# Weekly OODA Workflow

The OODA (Observe, Orient, Decide, Act) loop is our weekly system for driving conversion improvements on RiscLens.

## 1. Observe (Monday Morning)
Review the `/admin/analytics` and `/admin/ooda` dashboards to capture the last 7 days of data:
- **Top Converting Pages**: Which tools/guides are driving the most leads?
- **Drop-off Points**: Where are users leaving the calculators? (Started vs. Completed)
- **A/B Test Results**: Are any variants showing statistical significance?
- **Industry Trends**: Which sectors (Fintech, SaaS, Healthcare) are most active?

## 2. Orient
Analyze the observations against our buyer-intent goals:
- Is the messaging on high-traffic pages aligned with affluent B2B buyers?
- Are the CTAs on comparison pages converting, or do they need to be more specific?
- Is there a specific industry segment that is underperforming despite high traffic?

## 3. Decide
Select 1-3 high-leverage changes to implement this week:
- **Example**: "Update CTA on Vanta vs. Drata comparison to 'Get Drata Pricing Guide' because of high drop-off on the generic readiness score CTA."
- **Example**: "Increase weights for 'Data Sensitivity' in the SOC 2 Readiness Calculator for Fintech users to better reflect auditor expectations."

## 4. Act
Implement the decided changes using the "Messaging Pack" (`src/content/messaging.ts`) or direct component updates:
- Update copy/headlines.
- Switch variants for A/B tests.
- Deploy new micro-disclaimers or methodology updates.
- **Revenue Realization**: Mark high-value leads as "Sold" in the Admin UI to promote them to the Buyers list and log attribution data.

## 5. Monetization Closure (Realization)
The loop closes when an action results in a sale.
- **Conversion**: Admin uses the `Mark Sold` tool on a lead.
- **Tracking**: A `REVENUE_EVENT` is logged, tying the dollar amount back to the initial entry page and keyword.
- **Feedback**: High-revenue paths are prioritized for the next OODA iteration.

## Success Metrics
- Increase in **CRO (Conversion Rate Optimization)**: Leads / Impressions.
- Increase in **CTR (Click-Through Rate)**: Submissions / Impressions.
- Increase in **Revenue per Lead (RPL)**: Total Revenue / Total Leads.
- Reduction in drop-off between `calculator_started` and `calculator_completed`.
