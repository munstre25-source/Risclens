import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { calculatePciReadiness } from '@/lib/calculators/pci-scoring';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';

const pciLeadSchema = z.object({
  email: z.string().email(),
  company_name: z.string().min(1),
  industry: z.string(),
  transaction_volume: z.string(),
  requirements: z.record(z.boolean()),
  utm_source: z.string().optional(),
  variation_id: z.string().optional().default('default'),
});

export async function POST(request: NextRequest) {
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const parsed = pciLeadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: 'validation_error', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email, company_name, industry, transaction_volume, requirements, utm_source, variation_id } = parsed.data;

    const scoringResult = calculatePciReadiness({
      requirements,
      companyName: company_name,
      email,
      industry,
      transactionVolume: transaction_volume,
    });

    const leadResult = await createLead({
      email,
      company: company_name,
      leadType: 'pci_readiness',
      payload: {
        inputs: parsed.data,
        results: scoringResult,
      },
      derivedFields: {
        industry,
        utmSource: utm_source || null,
        variationId: variation_id,
        readinessScore: scoringResult.score,
        estimatedCostLow: scoringResult.estimatedCostLow,
        estimatedCostHigh: scoringResult.estimatedCostHigh,
      },
    });

    await logAuditEvent('pci_lead_submitted', {
      lead_id: leadResult.id,
      email,
      score: scoringResult.score,
    });

    return NextResponse.json({
      ok: true,
      lead_id: leadResult.id,
      results: scoringResult,
    });
  } catch (error) {
    console.error('PCI Lead submission failed:', error);
    return NextResponse.json(
      { ok: false, error: 'submission_failed' },
      { status: 500 }
    );
  }
}
