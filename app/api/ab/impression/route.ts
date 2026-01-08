import { NextRequest, NextResponse } from 'next/server';
import { incrementABCounter, logAuditEvent } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/validation';

// POST /api/ab/impression - Record A/B variant impression
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

    try {
      // Safely handle body reading in case it's disturbed or not JSON
      let body: any = {};
      if (request.body && !request.bodyUsed) {
        try {
          body = await request.json();
        } catch (e) {
          console.warn('Body disturbed or invalid JSON, using empty body');
        }
      }
      
      const variation_id = sanitizeString(body.variation_id);


    if (!variation_id) {
      return NextResponse.json(
        { success: false, error: 'variation_id is required' },
        { status: 400 }
      );
    }

    const isTest = request.cookies.get('rls_test_mode')?.value === '1';
    // Skip counting impressions when in test mode to avoid polluting metrics
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
    
    // Don't log every impression failure to avoid log spam
    return NextResponse.json(
      { success: false, error: 'Failed to record impression' },
      { status: 500 }
    );
  }
}
