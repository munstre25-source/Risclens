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
  return renderToStaticMarkup(element);
}

/**
 * Generate PDF from HTML string using Playwright + Chromium
 * Configured for Vercel serverless environment using @sparticuz/chromium
 */
export async function generatePdf(html: string): Promise<Buffer> {
  const playwright = await import('playwright-core');
  const chromium = await import('@sparticuz/chromium');

  let browser;
  try {
    // Configure chromium for serverless
    chromium.default.setHeadlessMode = true;
    chromium.default.setGraphicsMode = false;

    // Launch browser with serverless-compatible configuration
    browser = await playwright.chromium.launch({
      args: chromium.default.args,
      executablePath: await chromium.default.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // Set content and wait for rendering
    await page.setContent(html, { waitUntil: 'networkidle' });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
      printBackground: true,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
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
