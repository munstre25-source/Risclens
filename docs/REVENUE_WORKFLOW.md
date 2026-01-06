# End-to-End Revenue Workflow

This document outlines the revenue-generating lifecycle of a lead on RiscLens, from initial tool engagement to the final sale event.

## Phase 1: High-Intent Lead Capture
The workflow begins when a user interacts with one of our flagship calculators or assessments. These tools are designed to filter for users with immediate SOC 2 or compliance needs.

*   **Entry Points**:
    *   **SOC 2 Readiness Calculator**: Determines readiness and gap analysis.
    *   **SOC 2 Cost Calculator**: Estimates audit and implementation costs.
    *   **Pentest Estimator**: Scoping for mandatory penetration tests.
    *   **Vendor Risk Assessment**: Managing third-party compliance.
*   **Data Captured**: Company size, tech stack, data sensitivity, and contact info (email).
*   **Storage**: Data is saved to the `leads` table in Supabase.

## Phase 2: Engagement & Intent Signal
After receiving their result, users are presented with a **Monetization CTA**.
*   **Action**: "Request Strategic Auditor Introduction" or "Request Expert Review."
*   **Outcome**: If clicked, the lead's status is updated to `REVIEW_REQUESTED`.

## Phase 3: Admin Enrichment (The OODA Loop)
The Admin team uses the `/admin/leads` dashboard to analyze and enrich the incoming leads.
*   **Intelligence Extraction**: Using AI (OpenAI) to extract recent company news and LinkedIn posts from the lead's domain.
*   **Contextual Analysis**: Admin reviews the enriched data to determine the urgency of the compliance requirement (e.g., "Recently raised Series A" or "Expanding into Healthcare").

## Phase 4: Conversion (Lead to Buyer)
When a lead is successfully referred to a partner (Auditor or Pen-tester) and a deal is closed, the Admin manually records the conversion.
*   **Mechanism**: The "Mark as Sold" action in the Admin UI.
*   **API**: `/api/admin/mark-sold`.
*   **Database Updates**:
    *   `leads.sold` set to `true`.
    *   `leads.sale_amount` recorded.
    *   `leads.buyer_email` linked.
    *   **Revenue Event**: A new record is added to `REVENUE_EVENTS` for financial tracking and attribution.

## Phase 5: Buyer Management & Attribution
Sold leads are promoted to the **Buyers** list.
*   **Buyer Portal**: Admin reviews active buyers at `/admin/buyers`.
*   **Attribution**: Revenue events are linked back to the original `keyword_id` and `calculator_page` to determine which marketing channels are most profitable.

## Summary of Data Flow
1.  **Public Site** (Next.js) -> `leads` (Supabase)
2.  **Admin UI** (Enrichment) -> `lead_notes` & AI Insights
3.  **Admin UI** (Conversion) -> `leads` (sold=true) + `REVENUE_EVENTS`
4.  **Analytics** -> Attribution and ROI calculation in `/admin/analytics`
