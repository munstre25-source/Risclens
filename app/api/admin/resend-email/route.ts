import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { sendEmail, isUnsubscribed } from '@/lib/email';
import { isValidUUID, validateAdminAuth } from '@/lib/validation';
import { applyRateLimit } from '@/lib/rate-limit';

// POST /api/admin/resend-email - Admin endpoint to resend PDF email
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // Admin auth check - supports both cookie and header auth
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { lead_id } = await request.json();

    if (!lead_id || !isValidUUID(lead_id)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Fetch lead
    const lead = await getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead has email
    if (!lead.email) {
      return NextResponse.json(
        { success: false, error: 'Lead does not have an email address' },
        { status: 400 }
      );
    }

    // Check if PDF path exists (required for private bucket signed URL)
    if (!lead.pdf_path) {
      return NextResponse.json(
        { success: false, error: 'No PDF available for this lead. Generate PDF first.' },
        { status: 400 }
      );
    }

    // Check if email is unsubscribed
    const unsubscribed = await isUnsubscribed(lead.email);
    if (unsubscribed) {
      await logAuditEvent('admin_resend_blocked_unsubscribed', {
        lead_id,
        email: lead.email,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, error: 'Email is unsubscribed' },
        { status: 400 }
      );
    }

    // Generate a fresh signed URL from pdf_path
    const { createSignedUrlFromPath } = await import('@/lib/pdf');
    const freshPdfUrl = await createSignedUrlFromPath(lead.pdf_path, lead_id);

    // Generate unsubscribe token
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
      await logAuditEvent('admin_resend_email_failed', {
        lead_id,
        email: lead.email,
        error: emailResult.error,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, error: emailResult.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    // Update delivery status
    await updateLead(lead_id, {
      email_delivery_status: `resent:${emailResult.provider}:${emailResult.messageId || 'sent'}`,
    });

    // Log success
    await logAuditEvent('admin_resend_email_success', {
      lead_id,
      email: lead.email,
      provider: emailResult.provider,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      lead_id,
      email: lead.email,
      provider: emailResult.provider,
    });
  } catch (error) {
    console.error('Resend email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to resend email' },
      { status: 500 }
    );
  }
}
