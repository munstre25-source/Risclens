import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

// Initialize Upstash Redis for caching
const redis = Redis.fromEnv();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Use Edge runtime for low latency
export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { domain: string } }
) {
  const domain = params.domain.toLowerCase().trim();

  try {
    // 1. Check Cache first
    const cacheKey = `signal:${domain}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: { "X-Cache": "HIT" },
      });
    }

    // 2. Fetch from Supabase
    const { data, error } = await supabase
      .from("company_signals")
      .select("company_name, domain, signal_score, detected_certifications, detected_tools, ai_summary, updated_at")
      .eq("domain", domain)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Signal data not found for this domain" },
        { status: 404 }
      );
    }

    // 3. Cache the result for 24 hours
    await redis.set(cacheKey, data, { ex: 86400 });

    return NextResponse.json(data, {
      headers: { "X-Cache": "MISS" },
    });
  } catch (error: any) {
    console.error("Signal API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
