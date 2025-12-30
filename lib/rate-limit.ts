/**
 * Simple Rate Limiting Middleware
 * 
 * This is a basic in-memory rate limiter suitable for development and
 * single-instance deployments. For production with multiple instances,
 * use Redis-based rate limiting (Upstash, etc.).
 * 
 * LIMITATIONS:
 * - State is lost on function cold starts
 * - Not shared across Vercel function instances
 * - For production, consider: @upstash/ratelimit with Upstash Redis
 */

import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// CONFIGURATION
// =============================================================================

const RATE_LIMIT_PER_MIN = parseInt(process.env.RATE_LIMIT_PER_MIN || '60', 10);
const WINDOW_MS = 60 * 1000; // 1 minute window

// =============================================================================
// IN-MEMORY STORE
// Note: This will be reset on cold starts and is not shared across instances
// =============================================================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  rateLimitStore.forEach((entry, key) => {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  });
}, WINDOW_MS);

// =============================================================================
// RATE LIMITING FUNCTIONS
// =============================================================================

/**
 * Get client identifier (IP address or fallback)
 */
function getClientId(request: NextRequest): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  return cfConnectingIp || realIp || 'unknown';
}

/**
 * Check if request is rate limited
 */
export function isRateLimited(request: NextRequest): {
  limited: boolean;
  remaining: number;
  resetTime: number;
} {
  const clientId = getClientId(request);
  const now = Date.now();

  let entry = rateLimitStore.get(clientId);

  // Create new entry if doesn't exist or window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + WINDOW_MS,
    };
    rateLimitStore.set(clientId, entry);
  }

  // Increment count
  entry.count++;

  const limited = entry.count > RATE_LIMIT_PER_MIN;
  const remaining = Math.max(0, RATE_LIMIT_PER_MIN - entry.count);

  return {
    limited,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Rate limiting middleware response
 */
export function rateLimitResponse(resetTime: number): NextResponse {
  const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);

  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests. Please try again later.',
      retry_after: retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(RATE_LIMIT_PER_MIN),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Math.ceil(resetTime / 1000)),
      },
    }
  );
}

/**
 * Apply rate limiting to a request
 * Returns null if allowed, or a 429 response if limited
 */
export function applyRateLimit(request: NextRequest): NextResponse | null {
  const { limited, remaining, resetTime } = isRateLimited(request);

  if (limited) {
    console.warn(`Rate limit exceeded for ${getClientId(request)}`);
    return rateLimitResponse(resetTime);
  }

  // Return null to indicate request should proceed
  // Caller can add rate limit headers to their response
  return null;
}

/**
 * Get rate limit headers to add to successful responses
 */
export function getRateLimitHeaders(request: NextRequest): Record<string, string> {
  const { remaining, resetTime } = isRateLimited(request);

  return {
    'X-RateLimit-Limit': String(RATE_LIMIT_PER_MIN),
    'X-RateLimit-Remaining': String(Math.max(0, remaining - 1)), // -1 because we already counted this request
    'X-RateLimit-Reset': String(Math.ceil(resetTime / 1000)),
  };
}

// =============================================================================
// USAGE NOTES
// =============================================================================

/*
 * Basic usage in API routes:
 * 
 * import { applyRateLimit } from '@/lib/rate-limit';
 * 
 * export async function POST(request: NextRequest) {
 *   // Check rate limit
 *   const rateLimitResponse = applyRateLimit(request);
 *   if (rateLimitResponse) return rateLimitResponse;
 * 
 *   // Continue with normal request handling
 *   ...
 * }
 * 
 * For production rate limiting with Redis (recommended):
 * 
 * 1. Install: npm install @upstash/ratelimit @upstash/redis
 * 
 * 2. Replace this file with:
 * 
 * import { Ratelimit } from '@upstash/ratelimit';
 * import { Redis } from '@upstash/redis';
 * 
 * const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(60, '1 m'),
 * });
 * 
 * export async function applyRateLimit(request: NextRequest) {
 *   const ip = request.ip ?? 'anonymous';
 *   const { success, remaining, reset } = await ratelimit.limit(ip);
 *   
 *   if (!success) {
 *     return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
 *   }
 *   return null;
 * }
 */

