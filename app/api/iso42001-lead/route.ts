import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculateISO42001Score, ISO42001Input } from '@/lib/iso42001-scoring';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';

const iso42001Schema = z.object({
  email: z.string().email().optional().or(z.literal('')),
  company_name: z.string().min(1),
  modelComplexity: z.string(),
  aiRiskProfile: z.string(),
  governanceMaturity: z.string(),
  companySize: z.number(),
  dataPrivacy: z.string(),
  utm_source: z.string().optional(),
  variation_id: z.string().optional().default('default'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = iso42001Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'validation_error', details: parsed.error.flatten() }, { status: 400 });
    }

    const input: ISO42001Input = {
      modelComplexity: parsed.data.modelComplexity,
      aiRiskProfile: parsed.data.aiRiskProfile,
      governanceMaturity: parsed.data.governanceMaturity,
      companySize: parsed.data.companySize,
      dataPrivacy: parsed.data.dataPrivacy,
    };

    const results = calculateISO42001Score(input);

    const leadResult = await createLead({
      email: parsed.data.email || null,
      company: parsed.data.company_name,
      leadType: 'iso42001_readiness',
      payload: { inputs: parsed.data, results },
      derivedFields: {
        numEmployees: parsed.data.companySize,
        readinessScore: results.readiness_score,
        estimatedCostLow: results.estimated_cost_low,
        estimatedCostHigh: results.estimated_cost_high,
        leadScore: results.lead_score,
        utmSource: parsed.data.utm_source || null,
        variationId: parsed.data.variation_id,
        keepOrSell: results.lead_score >= 5 ? 'keep' : 'sell',
      },
    });

    await logAuditEvent('iso42001_lead_submitted', {
      lead_id: leadResult.id,
      company: parsed.data.company_name,
      score: results.readiness_score
    });

    return NextResponse.json({
      ok: true,
      lead_id: leadResult.id,
      results
    });
  } catch (error) {
    console.error('ISO 42001 lead failed:', error);
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 });
  }
}
