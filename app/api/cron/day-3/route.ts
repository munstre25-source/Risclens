import { NextRequest, NextResponse } from 'next/server';

// POST /api/cron/day-3 - Day 3 follow-up email batch job
// Intended for Vercel Cron - full implementation in Pass B
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Day-3 cron job triggered at:', new Date().toISOString());

    /*
     * Logic to implement in Pass B:
     * 1. Query leads where:
     *    - created_at is approximately 3 days ago
     *    - email_sent = true (initial email sent)
     *    - followup_day3_sent = false
     * 2. For each lead, send Email 2 (soft ask)
     * 3. Update lead record with followup_day3_sent = true
     * 4. Log to AUDIT_LOGS
     * 5. Respect rate limits (configurable)
     */

    // Placeholder response
    return NextResponse.json({
      success: true,
      message: 'Day-3 cron endpoint placeholder',
      processed: 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Day-3 cron error:', error);
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

