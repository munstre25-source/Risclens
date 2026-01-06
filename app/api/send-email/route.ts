import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { sendEmail, isUnsubscribed } from '@/lib/email';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID } from '@/lib/validation';
import { auditLog } from '@/lib/audit-logger';

// POST /api/send-email - Send PDF email to lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await request.json().catch(() => ({}));
  const { lead_id, debug_session_id } = body;
  const opts = { lead_id, debug_session_id, route: '/api/send-email' };

  try {
    await auditLog('email_pipeline_started', {
      lead_id,
      source: 'api_call',
      has_lead_id: !!lead_id
    }, opts);

    // Validate lead_id
    if (!lead_id || !isValidUUID(lead_id)) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'validation',
        error: 'Invalid lead_id'
      }, opts);

      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Fetch lead from database
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

    // Check if lead has email set
    if (!lead.email) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'check_email',
        error: 'Email missing'
      }, opts);

      return NextResponse.json(
        { success: false, error: 'Lead has no email. Set email first via /api/lead/set-email.' },
        { status: 400 }
      );
    }

    // Check if PDF path exists (required for private bucket signed URL)
    if (!lead.pdf_path) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'check_pdf',
        error: 'PDF path missing'
      }, opts);

      return NextResponse.json(
        { success: false, error: 'PDF not generated yet. Call /api/generate-pdf first.' },
        { status: 400 }
      );
    }

    // Check if email is unsubscribed
    const unsubscribed = await isUnsubscribed(lead.email);

    // Now log the detailed start since we have lead and unsubscribed status
    await auditLog('email_pipeline_started_detailed', {
      lead_id,
      lead_type: lead.lead_type || 'readiness',
      has_email: !!lead.email,
      is_unsubscribed: unsubscribed
    }, opts);
    if (unsubscribed) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'unsubscribe_check',
        error: 'Unsubscribed'
      }, opts);

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
    const freshPdfUrl = await createSignedUrlFromPath(lead.pdf_path, lead_id, opts);

    // Generate unsubscribe token (simple hash for now)
    const unsubscribeToken = Buffer.from(`${lead.email}:${lead.id}`).toString('base64');

    // Send email with fresh signed URL
    const emailResult = await sendEmail(lead.email, 'email1', {
      company_name: lead.company_name,
      pdf_url: freshPdfUrl,
      readiness_score: lead.readiness_score,
      email: lead.email,
      unsubscribe_token: unsubscribeToken,
    }, opts);

    if (!emailResult.success) {
      await auditLog('email_pipeline_completed', {
        outcome: 'failed',
        stage_failed: 'send_email',
        error: emailResult.error
      }, opts);

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

    await auditLog('email_pipeline_completed', {
      outcome: 'sent',
      lead_id,
      request_id: opts.debug_session_id
    }, opts);

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

    await auditLog('email_pipeline_completed', {
      outcome: 'failed',
      stage_failed: 'unhandled_exception',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, opts);

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
