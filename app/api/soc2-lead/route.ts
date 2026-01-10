import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Redis } from '@upstash/redis';
import { calculateLeadScore, generateRecommendations, ScoringInput } from '@/lib/scoring';
import { logAuditEvent } from '@/lib/supabase';
import { createLead } from '@/lib/leads';
import { enrichLead } from '@/lib/enrichment';
import { triggerBuyerWebhooks } from '@/lib/webhooks';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const RATE_LIMIT = 10;
const RATE_WINDOW_SECONDS = 60;
const MAX_PAYLOAD_BYTES = 12 * 1024; // ~12kb
const inMemoryRate = new Map<string, { count: number; reset: number }>();

const leadSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email()
      .max(254)
      .optional()
      .or(z.literal('')),
    company_name: z.string().trim().max(120).optional(),
    industry: z.string().trim().max(60).optional(),
    num_employees: z.number().int().min(1).max(100000).optional(),
    data_types: z.array(z.string().trim().max(32)).max(10).optional(),
    audit_date: z
      .string()
      .trim()
      .optional()
      .refine(
        (val) => !val || (/^\d{4}-\d{2}-\d{2}$/.test(val) && !Number.isNaN(Date.parse(val))),
        { message: 'Invalid audit_date format' }
      ),
    role: z.string().trim().max(60).optional(),
    utm_source: z.string().trim().max(80).optional(),
      variation_id: z.string().trim().max(40).optional().default('default'),
      website: z.string().trim().optional(),
      phone: z.string().trim().max(30).optional(),
      budget_range: z.string().trim().max(50).optional(),
      consent: z.boolean().optional().default(true),
    })
    .strict();


import { applyRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip =
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rawBody = await request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'payload_too_large' },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation_error', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...payload } = parsed.data;
  if (website && website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Guard: ensure required fields for scoring exist
  if (
    !payload.company_name ||
    !payload.industry ||
    !payload.data_types?.length ||
    !payload.num_employees ||
    !payload.audit_date ||
    !payload.role
  ) {
    return NextResponse.json(
      { ok: false, error: 'missing_required_fields' },
      { status: 400 }
    );
  }

  const scoringInput: ScoringInput = {
    num_employees: payload.num_employees as number,
    audit_date: payload.audit_date as string,
    data_types: payload.data_types as string[],
    role: payload.role as string,
  };

  // Fetch system settings for dynamic pricing and scoring
  const { getSystemSettings } = await import('@/lib/settings');
  const settings = await getSystemSettings();

  const scoringResult = calculateLeadScore(scoringInput, settings || undefined);
  const recommendations = generateRecommendations(scoringInput, scoringResult);

  try {
    const leadPayload = {
      inputs: payload,
      scoring: scoringResult,
      recommendations,
    };

    const leadResult = await createLead({
      email: payload.email || null,
      company: payload.company_name ?? null,
      leadType: 'soc2_readiness',
      payload: leadPayload,
      derivedFields: {
        industry: payload.industry ?? null,
        numEmployees: payload.num_employees ?? null,
        dataTypes: payload.data_types ?? [],
        auditDate: payload.audit_date ?? null,
        role: payload.role ?? null,
        utmSource: payload.utm_source ?? null,
        variationId: payload.variation_id ?? 'default',
        phone: payload.phone ?? null,
        budgetRange: payload.budget_range ?? null,
        isTest: payload.email?.includes('test') || false,
        readinessScore: scoringResult.readiness_score,
        estimatedCostLow: scoringResult.estimated_cost_low,
        estimatedCostHigh: scoringResult.estimated_cost_high,
        leadScore: scoringResult.lead_score,
        keepOrSell: scoringResult.keep_or_sell as 'keep' | 'sell',
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json(
        { ok: false, error: 'insert_failed' },
        { status: 500 }
      );
    }

    // Trigger enrichment and webhooks in background
    if (leadResult.id) {
      enrichLead(leadResult.id).catch(console.error);
      // Only trigger buyer webhooks if this isn't a placeholder email
      if (payload.email && !payload.email.includes('anonymous') && !payload.email.includes('no-email')) {
        triggerBuyerWebhooks(leadResult.id).catch(console.error);
      }
    }

    await logAuditEvent('lead_submitted', {
      lead_id: leadResult.id,
      source: 'soc2-lead-endpoint',
      ip,
      variation_id: payload.variation_id ?? 'default',
      has_email: !!payload.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      ok: true,
      lead_id: leadResult.id,
      results: {
        readiness_score: scoringResult.readiness_score,
        estimated_cost_low: scoringResult.estimated_cost_low,
        estimated_cost_high: scoringResult.estimated_cost_high,
        recommendations: recommendations.slice(0, 4),
      },
    });
  } catch (error) {
    console.error('Lead insert failed:', error);

    await logAuditEvent('lead_submission_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      ip,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { ok: false, error: 'submission_failed' },
      { status: 500 }
    );
  }
}
