import 'server-only';

import React from 'react';
import PDFTemplate, { PDFLeadData } from '@/pdf/PDFTemplate';

// =============================================================================
// PDF GENERATION CONFIGURATION
// =============================================================================

// Use fallback if env var is set or if Playwright/Chromium fails
const USE_FALLBACK = process.env.PDF_FALLBACK === 'true';

// Storage configuration
const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'soc2-pdfs';

// =============================================================================
// PDF GENERATION
// =============================================================================

export interface PDFGenerationResult {
  success: boolean;
  pdfBuffer?: Buffer;
  error?: string;
  method: 'playwright' | 'fallback';
}

/**
 * Render PDF Template to HTML string
 * Uses dynamic import to avoid bundling react-dom/server in RSC context
 */
export async function renderPDFToHTML(lead: PDFLeadData): Promise<string> {
  // Dynamic import to avoid RSC bundling issues with react-dom/server
  const { renderToStaticMarkup } = await import('react-dom/server');
  const element = React.createElement(PDFTemplate, { lead });
  return renderToStaticMarkup(element);
}

/**
 * Generate PDF from lead data
 * Attempts Playwright first, falls back to alternative method if it fails
 */
export async function generatePDF(lead: PDFLeadData): Promise<PDFGenerationResult> {
  const html = await renderPDFToHTML(lead);

  // Use fallback if explicitly configured
  if (USE_FALLBACK) {
    console.log('PDF_FALLBACK=true, using fallback method');
    return generatePDFFallback(html);
  }

  // Try Playwright first
  try {
    const result = await generatePDFWithPlaywright(html);
    return result;
  } catch (error) {
    console.error('Playwright PDF generation failed, using fallback:', error);
    
    // Log specific error for debugging
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('Could not find browser')) {
        console.log('NOTE: Set PDF_FALLBACK=true to skip Playwright, or configure Chromium binary for serverless.');
      }
    }

    return generatePDFFallback(html);
  }
}

/**
 * Generate PDF using Playwright + Chromium
 * 
 * NOTE: On Vercel, you may need to:
 * 1. Enable large binary support in vercel.json
 * 2. Use @sparticuz/chromium which provides serverless-compatible binaries
 * 3. Increase function memory to 1024MB+
 * 
 * If this consistently fails on your deployment, set PDF_FALLBACK=true
 */
async function generatePDFWithPlaywright(html: string): Promise<PDFGenerationResult> {
  // Dynamically import to avoid loading when not needed
  const playwright = await import('playwright-core');
  
  let chromiumModule: Record<string, unknown> | null = null;
  try {
    // Try to use @sparticuz/chromium for serverless environments
    chromiumModule = await import('@sparticuz/chromium');
  } catch {
    console.log('@sparticuz/chromium not available, using system chromium');
  }

  let browser;
  try {
    // Launch browser with appropriate configuration
    const launchOptions: Parameters<typeof playwright.chromium.launch>[0] = {
      headless: true,
    };

    if (chromiumModule) {
      // Serverless configuration with @sparticuz/chromium
      const chromium = chromiumModule.default as {
        args: string[];
        executablePath: () => Promise<string>;
      };
      if (chromium && chromium.args && chromium.executablePath) {
        launchOptions.args = chromium.args;
        launchOptions.executablePath = await chromium.executablePath();
      }
    }

    browser = await playwright.chromium.launch(launchOptions);
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

    return {
      success: true,
      pdfBuffer: Buffer.from(pdfBuffer),
      method: 'playwright',
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Fallback PDF generation method
 * 
 * This uses a simpler approach that doesn't require Chromium.
 * For production, you might want to:
 * 1. Use a third-party PDF API (like PDFShift, DocRaptor, or Prince)
 * 2. Use a different library that doesn't need a browser
 * 
 * Current implementation returns a placeholder - implement your preferred fallback
 */
async function generatePDFFallback(html: string): Promise<PDFGenerationResult> {
  // PLACEHOLDER: Implement your preferred fallback method
  // 
  // Option 1: Use a third-party API
  // const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Basic ${process.env.PDFSHIFT_API_KEY}` },
  //   body: JSON.stringify({ source: html })
  // });
  // const pdfBuffer = Buffer.from(await response.arrayBuffer());
  //
  // Option 2: Use html-pdf-node (requires some system dependencies)
  // const htmlPdf = require('html-pdf-node');
  // const file = { content: html };
  // const pdfBuffer = await htmlPdf.generatePdf(file, { format: 'Letter' });
  //
  // For now, we return an error indicating fallback needs configuration
  
  console.warn('PDF fallback method not fully implemented. Please configure a fallback provider.');
  
  // Create a minimal PDF with just text as a placeholder
  // In production, implement one of the options above
  
  return {
    success: false,
    error: 'PDF fallback method needs configuration. See lib/pdf.ts for options.',
    method: 'fallback',
  };
}

// Signed URL expiry: 7 days in seconds
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 7;

/**
 * Upload PDF to Supabase Storage (private bucket)
 * Returns the storage path and a signed URL for download
 */
export async function uploadPDFToStorage(
  pdfBuffer: Buffer,
  fileName: string,
  leadId: string
): Promise<{ path: string; signedUrl: string }> {
  // Dynamically import to avoid circular dependencies
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

