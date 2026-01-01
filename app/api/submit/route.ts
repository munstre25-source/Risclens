import { NextRequest, NextResponse } from 'next/server';
import { validateCalculatorFormWithoutEmail } from '@/lib/validation';
import { calculateLeadScore, generateRecommendations, ScoringInput } from '@/lib/scoring';
import { insertLead, logAuditEvent, incrementABCounter } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';

// POST /api/submit - Accept calculator form submission with full scoring and DB insert
// Email is OPTIONAL - can be added later via /api/lead/set-email
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();

    // Validate and sanitize input (email is optional)
    const validation = validateCalculatorFormWithoutEmail(body);
    if (!validation.valid || !validation.data) {
      console.log('Validation failed:', validation.errors);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    const input = validation.data;

    // Build scoring input
    const scoringInput: ScoringInput = {
      num_employees: input.num_employees,
      audit_date: input.planned_audit_date,
      data_types: input.data_types,
      role: input.role,
    };

    // Calculate scores using lib/scoring.ts
    const scoringResult = calculateLeadScore(scoringInput);
    const recommendations = generateRecommendations(scoringInput, scoringResult);

    // Prepare lead data for DB insert
    // Email and consent are OPTIONAL - can be NULL
    const leadData = {
      company_name: input.company_name,
      industry: input.industry,
      num_employees: input.num_employees,
      data_types: input.data_types,
      audit_date: input.planned_audit_date,
      role: input.role,
      email: input.email || null, // Optional - can be set later
      utm_source: input.utm_source || null,
      variation_id: input.variation_id || 'default',
      context_note: input.specific_requests?.trim() || null, // Optional free-text context (not used in scoring)
      readiness_score: scoringResult.readiness_score,
      estimated_cost_low: scoringResult.estimated_cost_low,
      estimated_cost_high: scoringResult.estimated_cost_high,
      lead_score: scoringResult.lead_score,
      keep_or_sell: scoringResult.keep_or_sell,
      consent: input.consent || false, // Default false if not provided
      pdf_path: null,
      pdf_url: null,
      email_sent: false,
      email_delivery_status: null,
      sold: false,
      buyer_email: null,
      sale_amount: null,
      followup_day3_sent: false,
      followup_day7_sent: false,
    };

    // Insert lead into database
    const lead = await insertLead(leadData);

    // Log audit event
    await logAuditEvent('lead_submitted', {
      lead_id: lead.id,
      company_name: lead.company_name,
      lead_score: lead.lead_score,
      keep_or_sell: lead.keep_or_sell,
      variation_id: lead.variation_id,
      has_email: !!lead.email,
      timestamp: new Date().toISOString(),
    });

    // Increment A/B submission counter if not default
    if (input.variation_id && input.variation_id !== 'default') {
      try {
        await incrementABCounter(input.variation_id, 'submissions');
      } catch (abError) {
        console.error('Failed to increment A/B counter:', abError);
        // Don't fail the request for A/B tracking errors
      }
    }

    // Call internal webhook (server-to-server)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    try {
      await fetch(`${appUrl}/api/webhook/new-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'new_lead',
          timestamp: new Date().toISOString(),
          lead: {
            id: lead.id,
            company_name: lead.company_name,
            industry: lead.industry,
            num_employees: lead.num_employees,
            data_types: lead.data_types,
            audit_date: lead.audit_date,
            role: lead.role,
            email: lead.email,
            utm_source: lead.utm_source,
            variation_id: lead.variation_id,
            readiness_score: lead.readiness_score,
            estimated_cost_low: lead.estimated_cost_low,
            estimated_cost_high: lead.estimated_cost_high,
            lead_score: lead.lead_score,
            keep_or_sell: lead.keep_or_sell,
          },
        }),
      });
      console.log('Webhook sent for lead:', lead.id);
    } catch (webhookError) {
      console.error('Webhook call failed:', webhookError);
      // Don't fail the main request for webhook errors
    }

    // Return response with results for on-page display
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      lead_id: lead.id,
      results: {
        readiness_score: scoringResult.readiness_score,
        estimated_cost_low: scoringResult.estimated_cost_low,
        estimated_cost_high: scoringResult.estimated_cost_high,
        recommendations: recommendations.slice(0, 4),
      },
    });
  } catch (error) {
    console.error('Submit error:', error);
    
    // Log failed submission
    await logAuditEvent('lead_submission_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
