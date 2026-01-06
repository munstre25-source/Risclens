# Analytics Events Instrumentation

We use `trackEvent` from `lib/analytics.ts` to capture buyer-intent signals.

## Core Events

| Event Name | Properties | Description |
|------------|------------|-------------|
| `page_view` | `page` | Automatic page view tracking. |
| `cta_click` | `cta_label`, `destination`, `page` | Fires when a primary CTA is clicked. |
| `calculator_started` | `tool_id` | Fires when the first field of a calculator is interacted with. |
| `calculator_completed` | `tool_id`, `score`, `industry` | Fires on successful calculator submission. |
| `results_viewed` | `tool_id`, `score` | Fires when the results page is loaded. |
| `gate_viewed` | `tool_id` | Fires when a lead gate/form is shown. |
| `lead_submitted` | `tool_id`, `lead_type` | Fires on successful lead form submission. |
| `outbound_click` | `destination`, `partner_name` | Fires when a user clicks a link to an external tool or partner. |

## Implementation Notes
- **Tool IDs**: `soc2_readiness`, `soc2_cost`, `pentest_scoping`, `vendor_risk_roi`.
- **Conversion Funnel**: `impressions` -> `calculator_started` -> `calculator_completed` -> `lead_submitted`.
- **Instrumentation Wrapper**: Use `trackEvent(name, props)` from `@/lib/analytics`.
