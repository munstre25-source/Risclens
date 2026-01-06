import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID, sanitizeString, sanitizeBoolean } from '@/lib/validation';
import { triggerBuyerWebhooks } from '@/lib/webhooks';
import { auditLog } from '@/lib/audit-logger';

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/lead/set-email - Set email and consent on an existing lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await request.json().catch(() => ({}));
  const { lead_id, debug_session_id } = body;
  const opts = { lead_id, debug_session_id, route: '/api/lead/set-email' };

  try {
    const emailRaw = body.email;
    const email = sanitizeString(emailRaw || "").toLowerCase();
    const consent = sanitizeBoolean(body.consent);

    await auditLog('email_pipeline_started', {
      lead_id,
      source: 'set_email',
      has_email: !!email
    }, opts);

    // Validate lead_id
    if (!lead_id || !isValidUUID(lead_id)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'validation',
        error: 'Invalid email'
      }, opts);

      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Validate consent
    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Consent is required to send emails' },
        { status: 400 }
      );
    }

    // Fetch lead to verify it exists
    const lead = await getLeadById(lead_id);
    if (!lead) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'fetch_lead',
        error: 'Lead not found'
      }, opts);

      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update lead with email and consent, and clear is_partial
    await updateLead(lead_id, {
      email: email,
      consent: consent,
      is_partial: false,
      status: 'new', // Change from partial to new
    } as any);

    // Trigger buyer webhooks in background
    triggerBuyerWebhooks(lead_id).catch(console.error);

    // Log audit event
    await logAuditEvent('lead_email_set', {
      lead_id,
      email: email,
      consent: consent,
      timestamp: new Date().toISOString(),
    });

    console.log('Email set for lead:', lead_id, email);

    return NextResponse.json({
      success: true,
      lead_id,
      email: email,
    });
  } catch (error) {
    console.error('Set email error:', error);

    await auditLog('email_pipeline_completed', {
      outcome: 'failed',
      stage_failed: 'unhandled_exception',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, opts);

    await logAuditEvent('lead_email_set_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Failed to update email' },
      { status: 500 }
    );
  }
}

