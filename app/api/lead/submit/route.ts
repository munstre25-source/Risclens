import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/leads';
import { logAuditEvent } from '@/lib/supabase';
import { calculateLeadScore } from '@/lib/scoring';
import { enrichLead } from '@/lib/enrichment';
import { dispatchLeadToBuyers } from '@/lib/monetization';

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

    // 1. Calculate lead score
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
        ...otherData
      },
    });

    if (!leadResult.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to create lead' }, { status: 500 });
    }

    // 2. Routing Logic: If high value lead, trigger immediate enrichment and alert
    if (scoringResult.keep_or_sell === 'keep' || scoringResult.lead_score >= 8) {
      console.log(`[ALERT] High-value lead detected: ${email} (Score: ${scoringResult.lead_score})`);
      // In a real app, send Slack/Discord webhook here
    }

    // 3. Background Enrichment and Monetization Dispatch
    // We don't await these to keep the response fast for the user
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
