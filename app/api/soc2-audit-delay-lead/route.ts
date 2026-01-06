import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, inputs, result } = await request.json();
    const supabase = getSupabaseAdmin();

    // 1. Create the Lead
    const leadData = {
      email: email || null,
      lead_type: 'soc2_audit_delay_calculator',
      lead_payload: {
        inputs,
        result,
        tags: ['audit_delay', 'calculator_result', 'early_stage_advisory'],
        flywheel_metadata: {
          keywords: ['SOC 2 timeline', 'SOC 2 delay', 'SOC 2 audit length'],
          buyer_affinity: 'High affinity for speed-focused buyers',
          buyer_priorities: ['CPA firms', 'Compliance consultants', 'Fractional security teams']
        }
      },
      source_url: '/soc-2-audit-delay-cost',
      context_note: 'High affinity for speed-focused buyers. Pain theme: audit_delay. Intent: early_stage_advisory.',
      num_employees: parseInt(inputs.companySize) || null,
      industry: 'Unknown', // Could be inferred from company if enriched later
      status: 'new',
      lead_status: 'new',
    };

    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Error inserting lead:', leadError);
      return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }

    // 2. Trigger PDF and Email in background if email is provided
    if (email) {
      const { generateAndUploadPDF } = await import('@/lib/pdf');
      const { sendEmail } = await import('@/lib/email');
      const { updateLead } = await import('@/lib/supabase');

      // Use a background process (not awaited for response)
      (async () => {
        try {
          const pdfResult = await generateAndUploadPDF(lead, 'audit_delay');
          if (pdfResult.success && pdfResult.pdfPath && pdfResult.pdfUrl) {
            await updateLead(lead.id, { pdf_path: pdfResult.pdfPath });
            
            const unsubscribeToken = Buffer.from(`${email}:${lead.id}`).toString('base64');
            await sendEmail(email, 'audit_delay', {
              email,
              company_name: 'Your Organization',
              pdf_url: pdfResult.pdfUrl,
              delayed_revenue: `$${result.delayedRevenueLow}-$${result.delayedRevenueHigh}`,
              unsubscribe_token: unsubscribeToken,
            });
          }
        } catch (e) {
          console.error('Audit delay background processing failed:', e);
        }
      })();
    }

    // 3. Log Reinforcing Pain Signal
    const painSignal = {
      source: 'calculator',
      topic: 'SOC 2',
      signal_type: 'pain',
      raw_text: `User with ${inputs.companySize} employees at stage "${inputs.soc2Stage}" calculated revenue risk. Delayed revenue: $${result.delayedRevenueLow}-$${result.delayedRevenueHigh}.`,
      normalized_theme: 'audit_delay',
      intensity_score: 4,
      confidence_score: 1.0,
    };

    const { error: signalError } = await supabase
      .from('PAIN_SIGNALS')
      .insert(painSignal);

    if (signalError) {
      // Don't fail the request if signal logging fails, but log it
      console.error('Error logging pain signal:', signalError);
    }

    return NextResponse.json({ success: true, lead_id: lead.id });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
