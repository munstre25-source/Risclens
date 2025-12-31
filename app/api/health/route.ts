import { NextResponse } from 'next/server';
import { getHealthMetrics } from '@/lib/supabase';

// GET /api/health - Health check endpoint with DB metrics
export async function GET() {
  try {
    // Get metrics from database
    const metrics = await getHealthMetrics();

    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      metrics: {
        lead_count: metrics.lead_count,
        pdf_count: metrics.pdf_count,
      },
    };

    return NextResponse.json(health);
  } catch (error) {
    console.error('Health check error:', error);
    
    // Return degraded status but don't fail completely
    return NextResponse.json({
      status: 'DEGRADED',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      error: error instanceof Error ? error.message : 'Database connection failed',
      metrics: {
        lead_count: -1,
        pdf_count: -1,
      },
    }, { status: 503 });
  }
}
