import { NextResponse } from 'next/server';

// GET /api/health - Basic health check endpoint
export async function GET() {
  try {
    // Placeholder - will add DB queries in Pass B
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      metrics: {
        lead_count: 0,
        pdf_count: 0,
      },
    };

    return NextResponse.json(health);
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { status: 'ERROR', error: 'Health check failed' },
      { status: 500 }
    );
  }
}

