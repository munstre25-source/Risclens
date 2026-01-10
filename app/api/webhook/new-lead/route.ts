import { NextRequest, NextResponse } from 'next/server';
import { logAuditEvent } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';

/**
 * POST /api/webhook/new-lead - Internal webhook for new lead events
 * 
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
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload = await request.json();

    // Basic validation
    if (!payload || !payload.event_type || !payload.lead) {
      return NextResponse.json(
        { success: false, error: 'Invalid payload structure' },
        { status: 400 }
      );
    }

    // Log the webhook event to AUDIT_LOGS
    await logAuditEvent('webhook_new_lead_received', {
      event_type: payload.event_type,
      lead_id: payload.lead?.id,
      company_name: payload.lead?.company_name,
      lead_score: payload.lead?.lead_score,
      keep_or_sell: payload.lead?.keep_or_sell,
      timestamp: payload.timestamp || new Date().toISOString(),
    });

    console.log('New lead webhook processed:', {
      lead_id: payload.lead?.id,
      company_name: payload.lead?.company_name,
      lead_score: payload.lead?.lead_score,
    });

    return NextResponse.json({
      success: true,
      message: 'Webhook received and logged',
      lead_id: payload.lead?.id,
    });
  } catch (error) {
    console.error('Webhook error:', error);

    await logAuditEvent('webhook_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
