import 'server-only';

import React from 'react';
import PDFTemplate, { PDFLeadData } from '@/pdf/PDFTemplate';

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

/**
 * Render PDF Template to HTML string
 * Uses dynamic import to avoid bundling react-dom/server in RSC context
 */
export async function renderPDFToHTML(lead: PDFLeadData): Promise<string> {
  const { renderToStaticMarkup } = await import('react-dom/server');
  const element = React.createElement(PDFTemplate, { lead });
  
  // Return full HTML document
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOC 2 Readiness Report</title>
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
export async function generatePDF(lead: PDFLeadData): Promise<PDFGenerationResult> {
  try {
    const html = await renderPDFToHTML(lead);
    const pdfBuffer = await generatePdf(html);

    return {
      success: true,
      pdfBuffer,
    };
  } catch (error) {
    console.error('PDF generation failed:', error);
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
  leadId: string
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
export async function createSignedUrlFromPath(pdfPath: string, leadId: string): Promise<string> {
  const { getSupabaseAdmin } = await import('./supabase');
  const supabase = getSupabaseAdmin();

  const { data: signedData, error: signedError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .createSignedUrl(pdfPath, SIGNED_URL_EXPIRY_SECONDS);

  if (signedError || !signedData?.signedUrl) {
    console.error('Failed to create signed URL from path:', signedError);
    throw new Error(`Signed URL error: ${signedError?.message || 'Unknown error'}`);
  }

  console.log('Signed URL generated', leadId);

  return signedData.signedUrl;
}

/**
 * Generate PDF for a lead and upload to storage
 * Returns both the storage path (for DB) and a signed URL (for immediate use)
 */
export async function generateAndUploadPDF(lead: PDFLeadData): Promise<{
  success: boolean;
  pdfPath?: string;
  pdfUrl?: string;
  error?: string;
}> {
  // Generate PDF
  const result = await generatePDF(lead);

  if (!result.success || !result.pdfBuffer) {
    return {
      success: false,
      error: result.error || 'PDF generation failed',
    };
  }

  // Upload to storage
  try {
    const fileName = `${lead.id}-${Date.now()}.pdf`;
    const { path, signedUrl } = await uploadPDFToStorage(result.pdfBuffer, fileName, lead.id);

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
