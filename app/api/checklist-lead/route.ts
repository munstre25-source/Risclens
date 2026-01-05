import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';

const checklistLeadSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  company_name: z.string().max(120).optional(),
  source_url: z.string().optional(),
  website: z.string().optional(), // Honeypot
}).strict();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate
    const parsed = checklistLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Validation failed' }, { status: 400 });
    }

    // Honeypot check
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    // Create lead
    const result = await createLead({
      email: parsed.data.email,
      company: parsed.data.company_name || null,
      leadType: 'checklist_download',
      payload: {
        source: 'checklist_page',
        source_url: parsed.data.source_url,
      },
      derivedFields: {
        utmSource: 'checklist_download',
      }
    });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to save lead' }, { status: 500 });
    }

    await logAuditEvent('checklist_lead_captured', {
      email: parsed.data.email,
      lead_id: result.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      ok: true, 
      lead_id: result.id,
      download_url: '/SOC2_Readiness_Checklist_2026.pdf' // Placeholder for actual PDF
    });

  } catch (error) {
    console.error('Checklist lead error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}
