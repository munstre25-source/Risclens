import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// =============================================================================
// CONFIGURATION
// =============================================================================

const RATE_LIMIT_PER_MIN = parseInt(process.env.RATE_LIMIT_PER_MIN || '60', 10);

// =============================================================================
// UPSTASH REDIS RATE LIMITER
// =============================================================================

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(RATE_LIMIT_PER_MIN, '1 m'),
    analytics: true,
    prefix: '@upstash/ratelimit/risclens',
  });
}

/**
 * Get client identifier (IP address or fallback)
 */
function getClientId(request: NextRequest): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return cfConnectingIp || realIp || 'unknown';
}

/**
 * Apply rate limiting to a request
 */
export async function applyRateLimit(request: NextRequest): Promise<NextResponse | null> {
  const clientId = getClientId(request);

  if (!ratelimit) {
    // Fallback to no-op or basic logging if Upstash is not configured
    console.warn('Upstash Redis not configured. Rate limiting is disabled.');
    return null;
  }

  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(clientId);

    if (!success) {
      console.warn(`Rate limit exceeded for ${clientId}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retry_after: Math.ceil((reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': String(remaining),
            'X-RateLimit-Reset': String(Math.ceil(reset / 1000)),
          },
        }
      );
    }

    return null;
  } catch (error) {
    console.error('Rate limit error:', error);
    return null; // Fail open if Redis is down
  }
}

/**
 * Legacy support for components using the old API
 */
export function getRateLimitHeaders(request: NextRequest): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(RATE_LIMIT_PER_MIN),
    'X-RateLimit-Remaining': String(RATE_LIMIT_PER_MIN),
    'X-RateLimit-Reset': String(Math.ceil(Date.now() / 1000) + 60),
  };
}
