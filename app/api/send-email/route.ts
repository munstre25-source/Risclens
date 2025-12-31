import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { sendEmail, isUnsubscribed } from '@/lib/email';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID } from '@/lib/validation';

// POST /api/send-email - Send PDF email to lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { lead_id } = await request.json();

    // Validate lead_id
    if (!lead_id || !isValidUUID(lead_id)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Fetch lead from database
    const lead = await getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead has email set
    if (!lead.email) {
      return NextResponse.json(
        { success: false, error: 'Lead has no email. Set email first via /api/lead/set-email.' },
        { status: 400 }
      );
    }

    // Check if PDF path exists (required for private bucket signed URL)
    if (!lead.pdf_path) {
      return NextResponse.json(
        { success: false, error: 'PDF not generated yet. Call /api/generate-pdf first.' },
        { status: 400 }
      );
    }

    // Check if email is unsubscribed
    const unsubscribed = await isUnsubscribed(lead.email);
    if (unsubscribed) {
      await logAuditEvent('email_blocked_unsubscribed', {
        lead_id,
        email: lead.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, error: 'Email is unsubscribed' },
        { status: 400 }
      );
    }

    // Generate a fresh signed URL from pdf_path for email
    const { createSignedUrlFromPath } = await import('@/lib/pdf');
    const freshPdfUrl = await createSignedUrlFromPath(lead.pdf_path, lead_id);

    // Generate unsubscribe token (simple hash for now)
    const unsubscribeToken = Buffer.from(`${lead.email}:${lead.id}`).toString('base64');

    // Send email with fresh signed URL
    const emailResult = await sendEmail(lead.email, 'email1', {
      company_name: lead.company_name,
      pdf_url: freshPdfUrl,
      readiness_score: lead.readiness_score,
      email: lead.email,
      unsubscribe_token: unsubscribeToken,
    });

    if (!emailResult.success) {
      // Log failure
      await logAuditEvent('email_send_failed', {
        lead_id,
        email: lead.email,
        error: emailResult.error,
        provider: emailResult.provider,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, error: emailResult.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    // Update lead with email sent status
    await updateLead(lead_id, {
      email_sent: true,
      email_delivery_status: `${emailResult.provider}:${emailResult.messageId || 'sent'}`,
    });

    // Log success
    await logAuditEvent('email_sent', {
      lead_id,
      email: lead.email,
      provider: emailResult.provider,
      message_id: emailResult.messageId,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      lead_id,
      email: lead.email,
      provider: emailResult.provider,
    });
  } catch (error) {
    console.error('Email send error:', error);

    // Log error
    await logAuditEvent('email_send_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
