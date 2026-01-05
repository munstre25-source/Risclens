import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID, sanitizeString, sanitizeBoolean } from '@/lib/validation';
import { triggerBuyerWebhooks } from '@/lib/webhooks';

// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/lead/set-email - Set email and consent on an existing lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    
    const leadId = body.lead_id;
    const email = sanitizeString(body.email).toLowerCase();
    const consent = sanitizeBoolean(body.consent);

    // Validate lead_id
    if (!leadId || !isValidUUID(leadId)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
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
    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Update lead with email and consent, and clear is_partial
    await updateLead(leadId, {
      email: email,
      consent: consent,
      is_partial: false,
      status: 'new', // Change from partial to new
    } as any);

    // Trigger buyer webhooks in background
    triggerBuyerWebhooks(leadId).catch(console.error);

    // Log audit event
    await logAuditEvent('lead_email_set', {
      lead_id: leadId,
      email: email,
      consent: consent,
      timestamp: new Date().toISOString(),
    });

    console.log('Email set for lead:', leadId, email);

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      email: email,
    });
  } catch (error) {
    console.error('Set email error:', error);

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

