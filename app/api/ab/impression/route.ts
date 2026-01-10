import { NextRequest, NextResponse } from 'next/server';
import { incrementABCounter } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/validation';

// POST /api/ab/impression - Record A/B variant impression
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // In Next.js 14, reading the body directly is generally safe 
    // unless a middleware has already consumed it without cloning.
    let body: any = {};
    
    try {
      body = await request.json();
    } catch (e) {
      console.warn('Could not parse JSON body in /api/ab/impression');
    }
    
    const variation_id = sanitizeString(body.variation_id);

    if (!variation_id) {
      return NextResponse.json(
        { success: false, error: 'variation_id is required' },
        { status: 400 }
      );
    }

    const isTest = request.cookies.get('rls_test_mode')?.value === '1';
    
    // Skip counting impressions when in test mode
    if (!isTest) {
      await incrementABCounter(variation_id, 'impressions');
    }

    console.log('A/B impression recorded:', variation_id);

    return NextResponse.json({
      success: true,
      variation_id,
    });
  } catch (error) {
    console.error('A/B impression error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record impression' },
      { status: 500 }
    );
  }
}
