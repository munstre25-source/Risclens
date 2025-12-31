import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { generateAndUploadPDF } from '@/lib/pdf';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID } from '@/lib/validation';

// POST /api/generate-pdf - Generate PDF for a lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { lead_id } = await request.json();

    // Validate lead_id
    if (!lead_id || !isValidUUID(lead_id)) {
      return NextResponse.json(
        { success: false, error: 'Valid lead_id is required' },
        { status: 400 }
      );
    }

    // Log PDF generation start
    await logAuditEvent('pdf_generation_started', {
      lead_id,
      timestamp: new Date().toISOString(),
    });

    // Fetch lead from database
    const lead = await getLeadById(lead_id);
    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Check if lead has email set (required for PDF delivery)
    if (!lead.email) {
      return NextResponse.json(
        { success: false, error: 'Lead has no email. Set email first via /api/lead/set-email.' },
        { status: 400 }
      );
    }

    // Check if PDF already exists - regenerate signed URL from path if so
    if (lead.pdf_path) {
      console.log('PDF already exists for lead:', lead_id, 'at path:', lead.pdf_path);
      
      // Import createSignedUrlFromPath dynamically
      const { createSignedUrlFromPath } = await import('@/lib/pdf');
      const freshSignedUrl = await createSignedUrlFromPath(lead.pdf_path, lead_id);
      
      // Update cached pdf_url with fresh signed URL
      await updateLead(lead_id, { pdf_url: freshSignedUrl });
      
      return NextResponse.json({
        success: true,
        lead_id,
        pdf_path: lead.pdf_path,
        pdf_url: freshSignedUrl,
        cached: true,
      });
    }

    // Generate and upload PDF
    const pdfResult = await generateAndUploadPDF({
      id: lead.id,
      company_name: lead.company_name,
      industry: lead.industry,
      num_employees: lead.num_employees,
      data_types: lead.data_types,
      audit_date: lead.audit_date,
      role: lead.role,
      email: lead.email,
      readiness_score: lead.readiness_score,
      estimated_cost_low: lead.estimated_cost_low,
      estimated_cost_high: lead.estimated_cost_high,
      lead_score: lead.lead_score,
    });

    if (!pdfResult.success || !pdfResult.pdfPath || !pdfResult.pdfUrl) {
      // Log failure
      await logAuditEvent('pdf_generation_failed', {
        lead_id,
        error: pdfResult.error,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { success: false, error: pdfResult.error || 'PDF generation failed' },
        { status: 500 }
      );
    }

    // Update lead with PDF path and signed URL
    await updateLead(lead_id, { 
      pdf_path: pdfResult.pdfPath,
      pdf_url: pdfResult.pdfUrl,
    });

    // Log success
    await logAuditEvent('pdf_generated', {
      lead_id,
      pdf_path: pdfResult.pdfPath,
      pdf_url: pdfResult.pdfUrl,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      lead_id,
      pdf_path: pdfResult.pdfPath,
      pdf_url: pdfResult.pdfUrl,
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    // Log error
    await logAuditEvent('pdf_generation_error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
