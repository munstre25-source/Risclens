import { NextResponse } from 'next/server';
import { getPricingBenchmarks } from '@/lib/content';

export async function GET() {
  try {
    const benchmarks = await getPricingBenchmarks();
    return NextResponse.json({ ok: true, benchmarks });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Failed to fetch benchmarks' }, { status: 500 });
  }
}
