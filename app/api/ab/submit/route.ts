import { NextRequest, NextResponse } from 'next/server';
import { incrementABCounter } from '@/lib/supabase';
import { applyRateLimit } from '@/lib/rate-limit';
import { sanitizeString } from '@/lib/validation';

// POST /api/ab/submit - Record A/B variant submission
export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const variation_id = sanitizeString(body.variation_id);

    if (!variation_id) {
      return NextResponse.json(
        { success: false, error: 'variation_id is required' },
        { status: 400 }
      );
    }

    const isTest = request.cookies.get('rls_test_mode')?.value === '1';
    // Skip counting submissions when in test mode to avoid polluting metrics
    if (!isTest) {
      await incrementABCounter(variation_id, 'submissions');
    }

    console.log('A/B submission recorded:', variation_id);

    return NextResponse.json({
      success: true,
      variation_id,
    });
  } catch (error) {
    console.error('A/B submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record submission' },
      { status: 500 }
    );
  }
}
