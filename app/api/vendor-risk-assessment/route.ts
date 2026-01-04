import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logAuditEvent } from '@/lib/supabase';
import { createLead } from '@/lib/leads';

const payloadSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().optional(),
    source_url: z.string().trim().max(240).optional(),
    help_option: z.string().trim().max(64).optional(),
    help_notes: z.string().trim().max(1000).optional(),
    inputs: z
      .object({
        dataSensitivity: z.string(),
        accessLevel: z.string(),
        vendorCriticality: z.string(),
        integrationType: z.string(),
        dataVolume: z.string(),
        hasSubprocessors: z.boolean(),
        incidentHistory: z.string(),
      })
      .strict(),
    result: z
      .object({
        score: z.number(),
        tier: z.string(),
        evidencePackage: z.array(z.string()),
        requirements: z.array(z.string()),
        cadence: z.string(),
        why: z.array(z.string()),
      })
      .strict(),
  })
  .strict();

export async function POST(request: NextRequest) {
  const raw = await request.json().catch(() => null);
  if (!raw) {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation_error', details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  if (!data.email) {
    return NextResponse.json({ ok: true });
  }

  try {
    const leadPayload = {
      inputs: data.inputs,
      result: data.result,
      source_url: data.source_url ?? null,
      help_option: data.help_option ?? null,
      help_notes: data.help_notes ?? null,
    };

    const leadResult = await createLead({
      email: data.email,
      leadType: 'vendor_risk_assessment',
      payload: leadPayload,
      derivedFields: {
        score: data.result.score,
        leadScore: data.result.score,
        contextNote: 'Vendor risk assessment submission',
        role: 'vendor_risk',
        variationId: 'vendor_risk_assessment',
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json({ error: 'insert_failed' }, { status: 500 });
    }

    await logAuditEvent('vendor_risk_assessment_submitted', {
      email: data.email,
      score: data.result.score,
      tier: data.result.tier,
      source_url: data.source_url ?? '',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Vendor risk assessment lead failure', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
