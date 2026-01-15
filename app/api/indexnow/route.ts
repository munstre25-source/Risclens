import { NextRequest, NextResponse } from 'next/server';

/**
 * IndexNow API - Instantly notify search engines when content changes
 * This dramatically speeds up indexing for new or updated pages
 * 
 * Usage: POST /api/indexnow with { urls: ['/path1', '/path2'] }
 */

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'risclens-indexnow-key-2026';
const BASE_URL = 'https://risclens.com';

// IndexNow endpoints for major search engines
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

export async function POST(request: NextRequest) {
  try {
    const { urls } = await request.json();
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 });
    }

    // Normalize URLs to absolute paths
    const absoluteUrls = urls.map((url: string) => 
      url.startsWith('http') ? url : `${BASE_URL}${url.startsWith('/') ? url : `/${url}`}`
    );

    // Limit to 10,000 URLs per batch (IndexNow limit)
    const batchedUrls = absoluteUrls.slice(0, 10000);

    const payload = {
      host: 'risclens.com',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: batchedUrls,
    };

    // Submit to all IndexNow endpoints in parallel
    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(async (endpoint) => {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        return { endpoint, status: response.status, ok: response.ok };
      })
    );

    const successCount = results.filter(
      (r) => r.status === 'fulfilled' && r.value.ok
    ).length;

    return NextResponse.json({
      success: true,
      submitted: batchedUrls.length,
      endpoints: results.map((r) => 
        r.status === 'fulfilled' ? r.value : { error: 'failed' }
      ),
      message: `Submitted ${batchedUrls.length} URLs to ${successCount}/${INDEXNOW_ENDPOINTS.length} endpoints`,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json({ error: 'Failed to submit URLs' }, { status: 500 });
  }
}

// GET endpoint to verify key
export async function GET() {
  return NextResponse.json({
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    instructions: 'POST to this endpoint with { urls: ["/path1", "/path2"] } to notify search engines',
  });
}
