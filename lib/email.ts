import 'server-only';

import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { getSupabaseAdmin } from './supabase';

// =============================================================================
// EMAIL CONFIGURATION
// =============================================================================

// Initialize SendGrid if API key is available
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

// Email sender addresses
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@risclens.com';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || EMAIL_FROM;

// App URL for links
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// =============================================================================
// EMAIL TEMPLATES
// =============================================================================

interface EmailTemplateData {
  company_name: string;
  pdf_url: string;
  readiness_score: number;
  email: string;
  unsubscribe_token?: string;
}

/**
 * Email 1: Immediate delivery with PDF link
 */
function getEmail1Template(data: EmailTemplateData): { subject: string; html: string; text: string } {
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?email=${encodeURIComponent(data.email)}&token=${data.unsubscribe_token || 'placeholder'}`;

  return {
    subject: `Your SOC 2 Cost Estimate + Roadmap (PDF)`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0369a1; margin: 0;">RiscLens</h1>
        </div>
        
        <h2 style="color: #1f2937;">Hi there! 👋</h2>
        
        <p>Your personalized SOC 2 Readiness Report for <strong>${data.company_name}</strong> is ready.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0 0 10px 0; color: #6b7280;">Your Readiness Score</p>
          <div style="font-size: 36px; font-weight: bold; color: #0369a1;">${data.readiness_score}/100</div>
        </div>
        
        <p style="text-align: center;">
          <a href="${data.pdf_url}" style="display: inline-block; background: #0369a1; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Download Your PDF Report
          </a>
        </p>
        
        <p>Your report includes:</p>
        <ul>
          <li>Detailed readiness assessment</li>
          <li>Personalized compliance checklist</li>
          <li>Month-by-month timeline</li>
          <li>Cost breakdown and estimates</li>
          <li>Evidence templates and examples</li>
        </ul>
        
        <p>If you have any questions about your report, just reply to this email.</p>
        
        <p>Best regards,<br>The RiscLens Team</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          You're receiving this because you requested a SOC 2 assessment at risclens.com.<br>
          <a href="${unsubscribeUrl}" style="color: #9ca3af;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `,
    text: `
Hi there!

Your personalized SOC 2 Readiness Report for ${data.company_name} is ready.

Your Readiness Score: ${data.readiness_score}/100

Download your PDF report here: ${data.pdf_url}

Your report includes:
- Detailed readiness assessment
- Personalized compliance checklist
- Month-by-month timeline
- Cost breakdown and estimates
- Evidence templates and examples

If you have any questions about your report, just reply to this email.

Best regards,
The RiscLens Team

---
You're receiving this because you requested a SOC 2 assessment at risclens.com.
Unsubscribe: ${unsubscribeUrl}
    `.trim(),
  };
}

/**
 * Email 2: Day 3 follow-up (soft ask)
 */
function getEmail2Template(data: EmailTemplateData): { subject: string; html: string; text: string } {
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?email=${encodeURIComponent(data.email)}&token=${data.unsubscribe_token || 'placeholder'}`;

  return {
    subject: `Quick question about ${data.company_name}'s SOC 2 journey`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0369a1; margin: 0;">RiscLens</h1>
        </div>
        
        <h2 style="color: #1f2937;">Hi again! 👋</h2>
        
        <p>Hope you had a chance to review your SOC 2 Readiness Report.</p>
        
        <p>Quick question: Are you planning to handle SOC 2 compliance internally, or would you like some help getting started?</p>
        
        <p>Either way is totally fine! If you're going the DIY route, here are some resources that might help:</p>
        
        <ul>
          <li>AICPA SOC 2 Framework Overview</li>
          <li>Evidence collection best practices</li>
          <li>Common pitfalls to avoid</li>
        </ul>
        
        <p>If you'd like expert guidance, I'd be happy to schedule a quick 15-minute call to discuss your options.</p>
        
        <p>Just reply to this email either way — I'd love to hear how things are going!</p>
        
        <p>Best,<br>The RiscLens Team</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          <a href="${unsubscribeUrl}" style="color: #9ca3af;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `,
    text: `
Hi again!

Hope you had a chance to review your SOC 2 Readiness Report.

Quick question: Are you planning to handle SOC 2 compliance internally, or would you like some help getting started?

Either way is totally fine! If you're going the DIY route, here are some resources that might help:
- AICPA SOC 2 Framework Overview
- Evidence collection best practices
- Common pitfalls to avoid

If you'd like expert guidance, I'd be happy to schedule a quick 15-minute call to discuss your options.

Just reply to this email either way — I'd love to hear how things are going!

Best,
The RiscLens Team

---
Unsubscribe: ${unsubscribeUrl}
    `.trim(),
  };
}

/**
 * Email 3: Day 7 beta invite
 */
function getEmail3Template(data: EmailTemplateData): { subject: string; html: string; text: string } {
  const unsubscribeUrl = `${APP_URL}/api/unsubscribe?email=${encodeURIComponent(data.email)}&token=${data.unsubscribe_token || 'placeholder'}`;

  return {
    subject: `${data.company_name}: Join our SOC 2 automation beta`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0369a1; margin: 0;">RiscLens</h1>
        </div>
        
        <h2 style="color: #1f2937;">One more thing... 🚀</h2>
        
        <p>We're building something new: an AI-powered SOC 2 compliance platform that automates the boring parts so you can focus on what matters.</p>
        
        <p>Based on your assessment for <strong>${data.company_name}</strong>, you'd be a perfect fit for our early access program.</p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; font-weight: 600; color: #0369a1;">What beta users get:</p>
          <ul style="margin: 10px 0 0 0; padding-left: 20px;">
            <li>Automated evidence collection</li>
            <li>Policy template generator</li>
            <li>Real-time compliance dashboard</li>
            <li>Direct access to our team</li>
            <li>Founding member pricing</li>
          </ul>
        </div>
        
        <p>Interested? Just reply with "I'm in" and I'll add you to the list.</p>
        
        <p>No pressure if not — I just wanted to make sure you knew about it!</p>
        
        <p>Cheers,<br>The RiscLens Team</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          <a href="${unsubscribeUrl}" style="color: #9ca3af;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `,
    text: `
One more thing... 🚀

We're building something new: an AI-powered SOC 2 compliance platform that automates the boring parts so you can focus on what matters.

Based on your assessment for ${data.company_name}, you'd be a perfect fit for our early access program.

What beta users get:
- Automated evidence collection
- Policy template generator
- Real-time compliance dashboard
- Direct access to our team
- Founding member pricing

Interested? Just reply with "I'm in" and I'll add you to the list.

No pressure if not — I just wanted to make sure you knew about it!

Cheers,
The RiscLens Team

---
Unsubscribe: ${unsubscribeUrl}
    `.trim(),
  };
}

// =============================================================================
// EMAIL SENDING FUNCTIONS
// =============================================================================

export type EmailType = 'email1' | 'email2' | 'email3';

export interface SendEmailResult {
  success: boolean;
  provider: 'sendgrid' | 'smtp';
  messageId?: string;
  error?: string;
}

/**
 * Send an email using SendGrid (preferred) or SMTP fallback
 */
export async function sendEmail(
  to: string,
  emailType: EmailType,
  data: EmailTemplateData
): Promise<SendEmailResult> {
  // Get the appropriate template
  let template: { subject: string; html: string; text: string };
  switch (emailType) {
    case 'email1':
      template = getEmail1Template(data);
      break;
    case 'email2':
      template = getEmail2Template(data);
      break;
    case 'email3':
      template = getEmail3Template(data);
      break;
    default:
      throw new Error(`Unknown email type: ${emailType}`);
  }

  // Try SendGrid first
  if (sendgridApiKey) {
    try {
      const result = await sendWithSendGrid(to, template);
      return result;
    } catch (error) {
      console.error('SendGrid failed, falling back to SMTP:', error);
    }
  }

  // Fallback to SMTP
  try {
    const result = await sendWithSMTP(to, template);
    return result;
  } catch (error) {
    console.error('SMTP also failed:', error);
    return {
      success: false,
      provider: 'smtp',
      error: error instanceof Error ? error.message : 'Email sending failed',
    };
  }
}

/**
 * Send email via SendGrid
 */
async function sendWithSendGrid(
  to: string,
  template: { subject: string; html: string; text: string }
): Promise<SendEmailResult> {
  const msg = {
    to,
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    subject: template.subject,
    text: template.text,
    html: template.html,
  };

  const [response] = await sgMail.send(msg);

  return {
    success: response.statusCode >= 200 && response.statusCode < 300,
    provider: 'sendgrid',
    messageId: response.headers['x-message-id'] as string,
  };
}

/**
 * Send email via SMTP (fallback)
 */
async function sendWithSMTP(
  to: string,
  template: { subject: string; html: string; text: string }
): Promise<SendEmailResult> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    throw new Error('SMTP not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const result = await transporter.sendMail({
    from: EMAIL_FROM,
    replyTo: EMAIL_REPLY_TO,
    to,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });

  return {
    success: true,
    provider: 'smtp',
    messageId: result.messageId,
  };
}

/**
 * Check if email is unsubscribed
 */
export async function isUnsubscribed(email: string): Promise<boolean> {
  try {
    const supabase = getSupabaseAdmin();
    
    const { data, error } = await supabase
      .from('UNSUBSCRIBED_EMAILS')
      .select('id')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      // PGRST116 = no rows found, which means not unsubscribed
      if (error.code === 'PGRST116') {
        return false;
      }
      console.error('Error checking unsubscribe status:', error);
      return false; // Fail open - allow sending if check fails
    }

    return !!data;
  } catch (error) {
    console.error('isUnsubscribed error:', error);
    return false; // Fail open
  }
}

/**
 * Add email to unsubscribe list
 */
export async function addToUnsubscribeList(email: string): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    
    const { error } = await supabase
      .from('UNSUBSCRIBED_EMAILS')
      .upsert(
        { email: email.toLowerCase(), unsubscribed_at: new Date().toISOString() },
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Failed to add to unsubscribe list:', error);
      throw error;
    }

    console.log('Added to unsubscribe list:', email);
  } catch (error) {
    console.error('addToUnsubscribeList error:', error);
    throw error;
  }
}
