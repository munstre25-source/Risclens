import { NextRequest, NextResponse } from 'next/server';

// POST /api/webhook/new-lead - Internal webhook for new lead events
// Documents schema for future agent consumption
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Log the webhook event (placeholder - will write to AUDIT_LOGS in Pass B)
    console.log('New lead webhook received:', JSON.stringify(payload, null, 2));

    /*
     * Expected payload schema:
     * {
     *   event_type: 'new_lead',
     *   timestamp: string (ISO 8601),
     *   lead: {
     *     id: string (UUID),
     *     company_name: string,
     *     industry: string,
     *     num_employees: number,
     *     data_types: string[],
     *     audit_date: string (ISO date),
     *     role: string,
     *     email: string,
     *     utm_source: string | null,
     *     variation_id: string | null,
     *     readiness_score: number (0-100),
     *     estimated_cost_low: number,
     *     estimated_cost_high: number,
     *     lead_score: number (1-10),
     *     keep_or_sell: 'keep' | 'sell',
     *   }
     * }
     */

    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      event_id: 'placeholder-uuid',
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

