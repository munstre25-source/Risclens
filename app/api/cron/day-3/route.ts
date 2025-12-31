import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin, updateLead, logAuditEvent } from '@/lib/supabase';
import { sendEmail, isUnsubscribed } from '@/lib/email';
import { applyRateLimit } from '@/lib/rate-limit';

const BATCH_SIZE = parseInt(process.env.CRON_BATCH_SIZE || '50', 10);

// Validate cron/admin authorization
function validateCronAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const adminSecret = process.env.ADMIN_SECRET;
  
  // Check Vercel cron header
  const vercelCron = request.headers.get('x-vercel-cron');
  if (vercelCron) return true;
  
  // Check CRON_SECRET
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  
  // Fallback to ADMIN_SECRET
  if (adminSecret && authHeader === `Bearer ${adminSecret}`) return true;
  
  return false;
}

// POST /api/cron/day-3 - Day 3 follow-up email batch job
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  // Verify authorization
  if (!validateCronAuth(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const startTime = Date.now();
  console.log('Day-3 cron job started at:', new Date().toISOString());

  try {
    const supabase = getSupabaseAdmin();

    // Calculate date range (3 days ago, with 12-hour window)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const startWindow = new Date(threeDaysAgo);
    startWindow.setHours(startWindow.getHours() - 12);
    const endWindow = new Date(threeDaysAgo);
    endWindow.setHours(endWindow.getHours() + 12);

    // Query eligible leads
    const { data: leads, error } = await supabase
      .from('SOC2_Leads')
      .select('*')
      .eq('email_sent', true)
      .eq('followup_day3_sent', false)
      .gte('created_at', startWindow.toISOString())
      .lte('created_at', endWindow.toISOString())
      .limit(BATCH_SIZE);

    if (error) {
      console.error('Failed to fetch leads for day-3 cron:', error);
      throw error;
    }

    if (!leads || leads.length === 0) {
      console.log('No leads eligible for day-3 follow-up');
      return NextResponse.json({
        success: true,
        message: 'No leads to process',
        processed: 0,
        timestamp: new Date().toISOString(),
      });
    }

    console.log(`Found ${leads.length} leads for day-3 follow-up`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const lead of leads) {
      try {
        // Check if unsubscribed
        const unsubscribed = await isUnsubscribed(lead.email);
        if (unsubscribed) {
          console.log(`Skipping unsubscribed email: ${lead.email}`);
          skipCount++;
          // Mark as sent to avoid retrying
          await updateLead(lead.id, { followup_day3_sent: true });
          continue;
        }

        // Generate unsubscribe token
        const unsubscribeToken = Buffer.from(`${lead.email}:${lead.id}`).toString('base64');

        // Send day-3 follow-up email (email2)
        const result = await sendEmail(lead.email, 'email2', {
          company_name: lead.company_name,
          pdf_url: lead.pdf_url || '',
          readiness_score: lead.readiness_score,
          email: lead.email,
          unsubscribe_token: unsubscribeToken,
        });

        if (result.success) {
          await updateLead(lead.id, { followup_day3_sent: true });
          successCount++;
          console.log(`Day-3 email sent to: ${lead.email}`);
        } else {
          console.error(`Failed to send day-3 email to ${lead.email}:`, result.error);
          errorCount++;
        }
      } catch (err) {
        console.error(`Error processing lead ${lead.id}:`, err);
        errorCount++;
      }
    }

    const duration = Date.now() - startTime;

    // Log cron run
    await logAuditEvent('cron_day3_completed', {
      total_leads: leads.length,
      success_count: successCount,
      skip_count: skipCount,
      error_count: errorCount,
      duration_ms: duration,
      timestamp: new Date().toISOString(),
    });

    console.log(`Day-3 cron completed in ${duration}ms: ${successCount} sent, ${skipCount} skipped, ${errorCount} errors`);

    return NextResponse.json({
      success: true,
      message: 'Day-3 cron job completed',
      processed: leads.length,
      sent: successCount,
      skipped: skipCount,
      errors: errorCount,
      duration_ms: duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Day-3 cron error:', error);

    await logAuditEvent('cron_day3_failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }).catch(console.error);

    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 }
    );
  }
}

// Also support GET for Vercel Cron
export async function GET(request: NextRequest) {
  return POST(request);
}
