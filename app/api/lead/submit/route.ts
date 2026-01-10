import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';
import { calculateLeadScore } from '@/lib/scoring';
import { enrichLead } from '@/lib/enrichment';
import { dispatchLeadToBuyers } from '@/lib/monetization';
import { applyRateLimit } from '@/lib/rate-limit';

// Strict validation schema for lead submission
const LeadSubmitSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).nullable().optional(),
  email: z.string().email('Invalid email address').max(254),
  company: z.string().max(200).nullable().optional(),
  lead_type: z.string().max(50).default('generic_lead'),
  source_url: z.string().url().max(500).nullable().optional(),
  website: z.string().max(200).nullable().optional(), // Honeypot
  num_employees: z.union([z.number(), z.string()]).optional(),
  employees: z.union([z.number(), z.string()]).optional(),
  audit_date: z.string().optional(),
  data_types: z.array(z.string()).optional(),
  role: z.string().optional(),
  industry: z.string().optional(),
  soc2_requirers: z.array(z.string()).optional(),
  notes: z.string().max(1000).optional(),
  utm_source: z.string().max(100).nullable().optional(),
  utm_medium: z.string().max(100).nullable().optional(),
  utm_campaign: z.string().max(100).nullable().optional(),
  utm_content: z.string().max(100).nullable().optional(),
  utm_term: z.string().max(100).nullable().optional(),
  phone: z.string().max(30).nullable().optional(),
  budget_range: z.string().max(100).nullable().optional(),
  budget_comfort: z.string().max(100).nullable().optional(),
}).passthrough(); // Allow extra fields but validate the core ones

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const rateLimitResponse = await applyRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();

    // 2. Input Validation
    const validation = LeadSubmitSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        ok: false, 
        error: 'Validation failed', 
        details: validation.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { 
      name, 
      email, 
      company, 
      lead_type, 
      source_url,
      website, // Honeypot
      ...otherData 
    } = validation.data;

    // Honeypot check
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 3. Calculate lead score
    const scoringInput = {
      num_employees: Number(otherData.num_employees || otherData.employees || 0),
      audit_date: otherData.audit_date || new Date().toISOString(),
      data_types: Array.isArray(otherData.data_types) ? otherData.data_types : [],
      role: otherData.role || 'unknown',
      industry: otherData.industry || 'other',
      soc2_requirers: Array.isArray(otherData.soc2_requirers) ? otherData.soc2_requirers : [],
    };

    const scoringResult = calculateLeadScore(scoringInput);

    const leadResult = await createLead({
      name: name ?? null,
      email: email || null,
      company: company ?? null,
      sourceUrl: source_url ?? null,
      leadType: lead_type || 'generic_lead',
      payload: otherData,
      derivedFields: {
        status: 'new',
        contextNote: otherData.notes || `New lead from ${lead_type}`,
        leadScore: scoringResult.lead_score,
        keepOrSell: scoringResult.keep_or_sell,
        readinessScore: scoringResult.readiness_score,
        estimatedCostLow: scoringResult.estimated_cost_low,
        estimatedCostHigh: scoringResult.estimated_cost_high,
        utmSource: otherData.utm_source ?? null,
        utmMedium: otherData.utm_medium ?? null,
        utmCampaign: otherData.utm_campaign ?? null,
        utmContent: otherData.utm_content ?? null,
        utmTerm: otherData.utm_term ?? null,
        phone: otherData.phone ?? null,
        budgetRange: otherData.budget_range ?? otherData.budget_comfort ?? null,
        budgetComfort: otherData.budget_comfort ?? null,
        ...otherData
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to create lead' }, { status: 500 });
    }

    // 4. Routing Logic: If high value lead, trigger immediate enrichment and alert
    if (scoringResult.keep_or_sell === 'keep' || scoringResult.lead_score >= 8) {
      console.log(`[ALERT] High-value lead detected: ${email} (Score: ${scoringResult.lead_score})`);
    }

    // 5. Background Enrichment and Monetization Dispatch
    if (leadResult.id) {
      enrichLead(leadResult.id).catch(err => console.error('Background enrichment failed:', err));
      dispatchLeadToBuyers(leadResult.id).catch(err => console.error('Monetization dispatch failed:', err));
    }

    await logAuditEvent('lead_submitted', {
      lead_id: leadResult.id,
      lead_type: lead_type || 'generic_lead',
      source: 'generic-lead-submit',
      lead_score: scoringResult.lead_score,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      ok: true, 
      lead_id: leadResult.id,
      score: scoringResult.lead_score 
    });
  } catch (error) {
    console.error('Lead submit error:', error);
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 });
  }
}

