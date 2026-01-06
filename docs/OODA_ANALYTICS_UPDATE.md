# OODA Analytics Update

## Decisive Weekly Question
**"Which page has the highest buyer intent but lowest conversion?"**

## Implementation Details
The `/admin/ooda` dashboard has been updated with a "Decisive Weekly Question" table that answers this exactly.

### Derived Metric
`conversion_rate = lead_submitted / results_viewed`

### Table Columns
- **Page / Tool**: The specific calculator or landing page.
- **Results Viewed**: Total impressions/views of the results (high intent).
- **Leads Submitted**: Number of users who successfully submitted the form.
- **Conversion Rate**: Percentage of viewers who became leads.
- **Monetization CTA Clicks**: Real-time tracking of intent to buy/request partner intro.

### Default Sort Logic
1.  **Highest Traffic** (`resultsViewed`): Focus where the volume is.
2.  **Lowest Conversion Rate** (`conversionRate`): Identify the leak.

### Tracking
- Monetization clicks are now logged to the `REVENUE_EVENTS` table via the `/api/lead/request-review` endpoint.
- Analytics API (`/api/admin/analytics`) aggregates these real events.

## Manual Test Checklist
- [ ] Visit a calculator and reach the results page.
- [ ] Click "Request Intro" in the `MonetizationCTA`.
- [ ] Log in as admin and visit `/admin/ooda`.
- [ ] Verify the click is reflected in the "Monetization CTA Clicks" column.
- [ ] Confirm the table is sorted by highest traffic first.
