import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';
import { sendEmail, isUnsubscribed } from '@/lib/email';
import { applyRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { email, vendor_name, result } = await request.json();

    if (!email || !vendor_name || !result) {
      return NextResponse.json(
        { success: false, error: 'Email, vendor name, and result are required' },
        { status: 400 }
      );
    }

    // Check if email is unsubscribed
    const unsubscribed = await isUnsubscribed(email);
    if (unsubscribed) {
      return NextResponse.json(
        { success: false, error: 'Email is unsubscribed' },
        { status: 400 }
      );
    }

    // Create a lead in the database
    const leadResult = await createLead({
      email,
      company: 'Unknown', // We don't have this in the tiering tool yet
      leadType: 'vendor-tiering',
      payload: {
        vendor_name,
        tier: result.tier,
        requirements: result.requirements,
        monitoring_cadence: result.monitoringCadence,
      },
      sourceUrl: request.headers.get('referer') || '',
    });

    if (!leadResult.ok || !leadResult.id) {
      throw new Error(leadResult.error || 'Failed to create lead');
    }

    const leadId = leadResult.id;

    // Send the email
    const unsubscribeToken = Buffer.from(`${email}:${leadId}`).toString('base64');
    
    const emailResult = await sendEmail(email, 'vendor_tiering', {
      email,
      company_name: 'Your Company',
      vendor_name,
      vendor_tier: result.tier,
      requirements: result.requirements,
      monitoring_cadence: result.monitoringCadence,
      unsubscribe_token: unsubscribeToken,
    });

    if (!emailResult.success) {
      console.error('Email send failed:', emailResult.error);
    }

    await logAuditEvent('vendor_tiering_submitted', {
      lead_id: leadId,
      email,
      vendor_name,
      tier: result.tier,
    });

    return NextResponse.json({ success: true, lead_id: leadId });
  } catch (error) {
    console.error('Vendor tiering submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}
