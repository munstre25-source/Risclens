import { NextRequest, NextResponse } from 'next/server';
import { getLeadById, updateLead, logAuditEvent } from '@/lib/supabase';
import { generateAndUploadPDF } from '@/lib/pdf';
import { applyRateLimit } from '@/lib/rate-limit';
import { isValidUUID } from '@/lib/validation';
import { calculateLeadScore } from '@/lib/scoring';

// POST /api/generate-pdf - Generate PDF for a lead
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { lead_id, template, data: customData } = await request.json();

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

    // Recompute score/cost if missing from legacy insert
    let readinessScore = lead.readiness_score;
    let estimatedLow = lead.estimated_cost_low;
    let estimatedHigh = lead.estimated_cost_high;
    let leadScore = lead.lead_score;
    if (
      readinessScore === null ||
      readinessScore === undefined ||
      Number.isNaN(readinessScore) ||
      estimatedLow === null ||
      estimatedHigh === null
    ) {
      const recalculated = calculateLeadScore({
        num_employees: lead.num_employees,
        audit_date: lead.audit_date,
        data_types: lead.data_types || [],
        role: lead.role,
      });
      readinessScore = recalculated.readiness_score;
      estimatedLow = recalculated.estimated_cost_low;
      estimatedHigh = recalculated.estimated_cost_high;
      leadScore = recalculated.lead_score;
      await updateLead(lead_id, {
        readiness_score: readinessScore,
        estimated_cost_low: estimatedLow,
        estimated_cost_high: estimatedHigh,
        lead_score: leadScore,
        keep_or_sell: recalculated.keep_or_sell,
      });
    }

    // Generate and upload PDF
    let pdfResult;
    const templateType = template || (lead.lead_type === 'roi_calculator' ? 'roi' : 'readiness');
    
    // Prepare lead data for template
    const leadDataForTemplate = {
      id: lead.id,
      company_name: lead.company_name || lead.company,
      industry: lead.industry,
      num_employees: lead.num_employees,
      email: lead.email,
      ...customData // Allow overriding or providing extra data (e.g., from lead magnets)
    };

    if (templateType === 'roi') {
      const roiData = lead.payload || {};
      pdfResult = await generateAndUploadPDF({
        ...leadDataForTemplate,
        manualCost: roiData.manualCost,
        automationCost: roiData.automationCost,
        allInOneCost: roiData.allInOneCost,
        savings: roiData.savings,
        recommendation: roiData.recommendation,
        breakdown: roiData.breakdown,
        frameworks: lead.frameworks || [],
      }, 'roi');
    } else if (templateType === 'readiness') {
      pdfResult = await generateAndUploadPDF({
        ...leadDataForTemplate,
        data_types: lead.data_types,
        audit_date: lead.audit_date,
        role: lead.role,
        readiness_score: readinessScore,
        estimated_cost_low: estimatedLow,
        estimated_cost_high: estimatedHigh,
        lead_score: leadScore,
      }, 'readiness');
    } else {
      // Handle custom templates (Pentest SOW, VRA Magnets, etc.)
      const magnetConfigs: Record<string, any> = {
        pentest_sow: {
          title: 'Pentest SOW & Vendor Checklist',
          resourceName: 'Statement of Work',
          description: 'A custom Statement of Work and technical checklist based on your application scope.',
        },
        vra_roi: {
          title: 'Vendor Risk ROI Report',
          resourceName: 'Efficiency Analysis',
          description: 'A detailed breakdown of manual vs automated vendor risk management costs.',
        },
        vra_scoring_spreadsheet: {
          title: 'VRA Scoring Model',
          resourceName: 'Excel Template',
          description: 'Pre-weighted scoring model for standardizing vendor triage.',
        },
        vra_checklist: {
          title: 'Vendor Review Checklist',
          resourceName: 'Diligence Guide',
          description: 'Comprehensive checklist for SOC 2 vendor management compliance.',
        },
        vra_evidence_templates: {
          title: 'Evidence Request Templates',
          resourceName: 'DOCX Templates',
          description: 'Ready-to-use email and document templates for vendor evidence requests.',
        },
      };

      const config = magnetConfigs[templateType] || {
        title: 'Premium Compliance Resource',
        resourceName: 'Resource Download',
        description: 'Custom security documentation generated for your organization.',
      };

      pdfResult = await generateAndUploadPDF({
        ...leadDataForTemplate,
        ...config,
        data: customData,
      }, templateType);
    }

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
