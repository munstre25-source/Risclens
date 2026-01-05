import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      company, 
      lead_type, 
      source_url,
      website, // Honeypot
      ...otherData 
    } = body;

    // Honeypot check
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 400 });
    }

    const leadResult = await createLead({
      name: name ?? null,
      email,
      company: company ?? null,
      sourceUrl: source_url ?? null,
      leadType: lead_type || 'generic_lead',
      payload: otherData,
      derivedFields: {
        status: 'new',
        contextNote: otherData.notes || `New lead from ${lead_type}`,
        ...otherData
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to create lead' }, { status: 500 });
    }

    await logAuditEvent('lead_submitted', {
      lead_id: leadResult.id,
      lead_type: lead_type || 'generic_lead',
      source: 'generic-lead-submit',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, lead_id: leadResult.id });
  } catch (error) {
    console.error('Lead submit error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
