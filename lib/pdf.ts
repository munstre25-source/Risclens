import 'server-only';

import React from 'react';
import PDFTemplate, { PDFLeadData } from '@/pdf/PDFTemplate';
import ROIPDFTemplate, { ROIPDFData } from '@/pdf/ROIPDFTemplate';
import GenericLeadMagnetPDF, { GenericPDFData } from '@/pdf/GenericLeadMagnetPDF';
import { auditLog } from './audit-logger';

// =============================================================================
// PDF GENERATION CONFIGURATION
// =============================================================================

// Storage configuration
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'leads-pdf';

// Signed URL expiry: 7 days in seconds
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 7;

// PDF API configuration - at least one must be set for production
const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;
const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;

// =============================================================================
// PDF GENERATION
// =============================================================================

export interface PDFGenerationResult {
  success: boolean;
  pdfBuffer?: Buffer;
  error?: string;
}

interface PDFOpts {
  lead_id?: string;
  debug_session_id?: string;
}

/**
 * Render PDF Template to HTML string
 */
export async function renderPDFToHTML(lead: any, templateType: string = 'readiness', opts: PDFOpts = {}): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  
  // Log payload snapshot (keys + nulls only)
    const keys = Object.keys(lead || {});
    const nullKeys = keys.filter(k => lead[k] === null || lead[k] === undefined);
    
    // Calculate sizes of values
    const sizes: Record<string, number> = {};
    keys.forEach(k => {
      const val = lead[k];
      if (typeof val === 'string') sizes[k] = val.length;
      else if (Array.isArray(val)) sizes[k] = val.length;
      else if (val && typeof val === 'object') sizes[k] = Object.keys(val).length;
    });
    
    await auditLog('pdf_generation_payload_snapshot', {
      template_type: templateType,
      keys_present: keys,
      null_keys: nullKeys,
      sizes,
      lead_id: lead.id,
      company_present: !!(lead.company_name || lead.company),
      email_present: !!lead.email
    }, opts);

  let element;
  let title = 'RiscLens Report';

  if (templateType === 'roi') {
    element = React.createElement(ROIPDFTemplate, { data: lead });
    title = 'Compliance ROI Report';
  } else if (templateType === 'readiness') {
    element = React.createElement(PDFTemplate, { lead });
    title = 'SOC 2 Readiness Report';
  } else if (templateType === 'audit_delay') {
    const genericData: GenericPDFData = {
      id: lead.id || 'N/A',
      company_name: lead.company_name || lead.company || 'Organization',
      email: lead.email || 'N/A',
      title: 'SOC 2 Audit Delay Analysis',
      subtitle: 'Revenue Risk & Timeline Assessment',
      description: 'An analysis of the financial and operational impact of SOC 2 audit delays on your organization.',
      resourceName: 'Audit Delay Report',
      data: {
        company_size: lead.num_employees || 'Not specified',
        current_stage: lead.lead_payload?.inputs?.soc2Stage || 'Not specified',
        delayed_revenue_low: lead.lead_payload?.result?.delayedRevenueLow || '0',
        delayed_revenue_high: lead.lead_payload?.result?.delayedRevenueHigh || '0',
        impact_summary: lead.lead_payload?.result?.impactSummary || 'N/A',
      },
    };
    element = React.createElement(GenericLeadMagnetPDF, { data: genericData });
    title = genericData.title;
  } else if (templateType === 'pentest_estimate') {
    const genericData: GenericPDFData = {
      id: lead.id || 'N/A',
      company_name: lead.company_name || lead.company || 'Organization',
      email: lead.email || 'N/A',
      title: 'Pentest Scoping & Estimate',
      subtitle: 'Technical Assessment Scoping Report',
      description: 'A preliminary scoping report and cost estimate for your upcoming penetration test.',
      resourceName: 'Pentest Scoping Report',
      data: {
        test_type: lead.lead_payload?.test_type || 'General Pentest',
        scope_size: lead.lead_payload?.scope_size || 'Standard',
        timeline: lead.lead_payload?.timeline || 'Not specified',
        compliance_target: lead.lead_payload?.compliance || 'SOC 2',
        environment: lead.lead_payload?.environment || 'Cloud/SaaS',
      },
    };
    element = React.createElement(GenericLeadMagnetPDF, { data: genericData });
    title = genericData.title;
  } else if (templateType === 'vendor_tiering') {
    const genericData: GenericPDFData = {
      id: lead.id || 'N/A',
      company_name: lead.company_name || lead.company || 'Organization',
      email: lead.email || 'N/A',
      title: 'Vendor Risk Tiering Report',
      subtitle: 'Third-Party Risk Management Assessment',
      description: 'A risk-based tiering assessment for a critical vendor, mapping security requirements to operational criticality.',
      resourceName: 'Vendor Assessment Report',
      data: {
        vendor_name: lead.lead_payload?.vendor_name || 'Vendor',
        assigned_tier: lead.lead_payload?.tier || 'Unknown',
        requirements: lead.lead_payload?.requirements || [],
        monitoring_cadence: lead.lead_payload?.monitoring_cadence || 'Annual',
      },
    };
    element = React.createElement(GenericLeadMagnetPDF, { data: genericData });
    title = genericData.title;
  } else {
    // Handle Generic Lead Magnets
    const genericData: GenericPDFData = {
      id: lead.id || 'N/A',
      company_name: lead.company_name || lead.company || 'Organization',
      email: lead.email || 'N/A',
      title: lead.title || 'Premium Compliance Resource',
      subtitle: lead.subtitle,
      description: lead.description || 'Custom security documentation generated for your organization.',
      resourceName: lead.resourceName || 'Compliance Template',
      data: lead.data || {},
    };
    element = React.createElement(GenericLeadMagnetPDF, { data: genericData });
    title = genericData.title;
  }
  
  // Return full HTML document
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - RiscLens</title>
</head>
<body>
  ${renderToStaticMarkup(element)}
</body>
</html>`;
  
  return html;
}

/**
 * Generate PDF using PDFShift API
 * Sign up at https://pdfshift.io - Free tier: 250 PDFs/month
 */
async function generatePdfWithPDFShift(html: string): Promise<Buffer> {
  if (!PDFSHIFT_API_KEY) {
    throw new Error('PDFSHIFT_API_KEY is not configured');
  }

  console.log('Generating PDF with PDFShift...');
  
  const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`api:${PDFSHIFT_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: html,
      format: 'Letter',
      margin: '0.5in',
      sandbox: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PDFShift error (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  console.log('PDF generated successfully with PDFShift');
  return Buffer.from(arrayBuffer);
}

/**
 * Generate PDF using Browserless.io API
 * Sign up at https://browserless.io - Free tier available
 */
async function generatePdfWithBrowserless(html: string): Promise<Buffer> {
  if (!BROWSERLESS_API_KEY) {
    throw new Error('BROWSERLESS_API_KEY is not configured');
  }

  console.log('Generating PDF with Browserless...');
  
  const response = await fetch(`https://chrome.browserless.io/pdf?token=${BROWSERLESS_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      html,
      options: {
        format: 'Letter',
        margin: {
          top: '0.5in',
          right: '0.5in',
          bottom: '0.5in',
          left: '0.5in',
        },
        printBackground: true,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Browserless error (${response.status}): ${errorText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  console.log('PDF generated successfully with Browserless');
  return Buffer.from(arrayBuffer);
}

/**
 * Generate PDF from HTML string using a cloud PDF API
 * 
 * IMPORTANT: You must configure one of these environment variables:
 * - PDFSHIFT_API_KEY (recommended) - https://pdfshift.io
 * - BROWSERLESS_API_KEY - https://browserless.io
 * 
 * Local Chromium does NOT work on Vercel due to missing system libraries.
 */
export async function generatePdf(html: string): Promise<Buffer> {
  // Try PDFShift first (recommended)
  if (PDFSHIFT_API_KEY) {
    return generatePdfWithPDFShift(html);
  }

  // Try Browserless as alternative
  if (BROWSERLESS_API_KEY) {
    return generatePdfWithBrowserless(html);
  }

  // No API configured - throw clear error
  throw new Error(
    'PDF generation requires a cloud API. ' +
    'Chromium cannot run on Vercel serverless functions. ' +
    'Please configure one of these environment variables:\n' +
    '  - PDFSHIFT_API_KEY (sign up at https://pdfshift.io)\n' +
    '  - BROWSERLESS_API_KEY (sign up at https://browserless.io)'
  );
}

/**
 * Generate PDF from lead data
 */
export async function generatePDF(lead: any, templateType: string = 'readiness', opts: PDFOpts = {}): Promise<PDFGenerationResult> {
  const startTime = Date.now();
  await auditLog('pdf_generation_started', {
    template_type: templateType,
    lead_id: lead.id
  }, opts);

  try {
    const html = await renderPDFToHTML(lead, templateType, opts);
    const pdfBuffer = await generatePdf(html);

    await auditLog('pdf_generation_succeeded', {
      pdf_bytes: pdfBuffer.length,
      duration_ms: Date.now() - startTime
    }, opts);

    return {
      success: true,
      pdfBuffer,
    };
  } catch (error: any) {
    console.error('PDF generation failed:', error);
    
    // Attempt to identify failing field hint
    let failing_field_hint = 'unknown';
    if (error.message.includes('toLowerCase')) {
      failing_field_hint = 'Possibly null value passed to toLowerCase()';
    }

    await auditLog('pdf_generation_error', {
      error_message: error.message,
      stack: error.stack,
      failing_field_hint,
      duration_ms: Date.now() - startTime
    }, opts);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'PDF generation failed',
    };
  }
}

/**
 * Upload PDF to Supabase Storage (private bucket)
 * Returns the storage path and a signed URL for download
 */
export async function uploadPDFToStorage(
  pdfBuffer: Buffer,
  fileName: string,
  leadId: string,
  opts: PDFOpts = {}
): Promise<{ path: string; signedUrl: string }> {
  const { getSupabaseAdmin } = await import('./supabase');
  const supabase = getSupabaseAdmin();

  const filePath = `pdfs/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });

  if (uploadError) {
    console.error('Failed to upload PDF:', uploadError);
    await auditLog('pdf_upload_error', {
      error_message: uploadError.message,
      file_path: filePath
    }, opts);
    throw new Error(`Storage error: ${uploadError.message}`);
  }

  console.log('PDF uploaded', leadId, filePath);

  // Generate signed URL (7 days)
  const { data: signedData, error: signedError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(filePath, SIGNED_URL_EXPIRY_SECONDS);

  if (signedError || !signedData?.signedUrl) {
    console.error('Failed to create signed URL:', signedError);
    throw new Error(`Signed URL error: ${signedError?.message || 'Unknown error'}`);
  }

  console.log('Signed URL generated', leadId);

  return { path: filePath, signedUrl: signedData.signedUrl };
}

/**
 * Generate a fresh signed URL from an existing pdf_path
 * Use this when sending emails to ensure the URL is valid
 */
export async function createSignedUrlFromPath(pdfPath: string, leadId: string, opts: PDFOpts = {}): Promise<string> {
  const { getSupabaseAdmin } = await import('./supabase');
  const supabase = getSupabaseAdmin();

  const { data: signedData, error: signedError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(pdfPath, SIGNED_URL_EXPIRY_SECONDS);

  if (signedError || !signedData?.signedUrl) {
    console.error('Failed to create signed URL from path:', signedError);
    await auditLog('pdf_signed_url_error', {
      error_message: signedError?.message,
      pdf_path: pdfPath
    }, opts);
    throw new Error(`Signed URL error: ${signedError?.message || 'Unknown error'}`);
  }

  console.log('Signed URL generated', leadId);

  return signedData.signedUrl;
}

/**
 * Generate PDF for a lead and upload to storage
 * Returns both the storage path (for DB) and a signed URL (for immediate use)
 */
export async function generateAndUploadPDF(lead: any, templateType: string = 'readiness', opts: PDFOpts = {}): Promise<{
  success: boolean;
  pdfPath?: string;
  pdfUrl?: string;
  error?: string;
}> {
  // Generate PDF
  const result = await generatePDF(lead, templateType, opts);

  if (!result.success || !result.pdfBuffer) {
    return {
      success: false,
      error: result.error || 'PDF generation failed',
    };
  }

  // Upload to storage
  try {
    const fileName = `${lead.id}-${Date.now()}.pdf`;
    const { path, signedUrl } = await uploadPDFToStorage(result.pdfBuffer, fileName, lead.id, opts);

    return {
      success: true,
      pdfPath: path,
      pdfUrl: signedUrl,
    };
  } catch (error) {
    console.error('PDF upload failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}
