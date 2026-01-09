import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';
import { enrichLead } from '@/lib/enrichment';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      email, 
      company,
      lead_type,
      source_url,
      ...otherData
    } = body;

    const leadResult = await createLead({
      email: email || null,
      company: company ?? null,
      sourceUrl: source_url ?? null,
      leadType: lead_type || 'partial_lead',
      payload: otherData,
      isPartial: true,
      derivedFields: {
        status: 'partial',
        ...otherData
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to create partial lead' }, { status: 500 });
    }

    // Trigger enrichment in background
    if (leadResult.id) {
      enrichLead(leadResult.id).catch(console.error);
    }

    return NextResponse.json({ ok: true, lead_id: leadResult.id });
  } catch (error) {
    console.error('Partial lead submit error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
