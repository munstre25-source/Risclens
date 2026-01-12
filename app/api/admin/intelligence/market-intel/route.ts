import { NextRequest, NextResponse } from 'next/server';
import { extractSignalsForCompany } from '@/lib/intelligence';

export async function POST(req: NextRequest) {
  try {
    const { domains } = await req.json();
    const openaiApiKey = process.env.OPENAI_API_KEY || '';

    if (!Array.isArray(domains)) {
      return NextResponse.json({ error: 'Domains must be an array' }, { status: 400 });
    }

    const results = [];
    // Process in small batches or sequentially to avoid timeouts/rate limits
    for (const domain of domains.slice(0, 10)) { // Limit to 10 for safety in this demo
      try {
        const signals = await extractSignalsForCompany(domain, openaiApiKey);
        results.push({ domain, ...signals });
      } catch (err: any) {
        results.push({ domain, status: 'error', error: err.message });
      }
    }

    return NextResponse.json({ results });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
