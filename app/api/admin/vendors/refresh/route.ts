import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { vendorId } = await req.json();

  try {
    // 1. Get Vendor
    const { data: vendor, error: fetchError } = await supabase
      .from("pseo_vendors")
      .select("*")
      .eq("id", vendorId)
      .single();

    if (fetchError || !vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const targetUrl = vendor.pricing_url || `https://${vendor.slug}.com/pricing`;

    // 2. Scrape using Browserless
    const browserlessRes = await fetch(`https://production-sfo.browserless.io/content?token=${process.env.BROWSERLESS_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: targetUrl,
        waitFor: 3000,
      }),
    });

    const html = await browserlessRes.text();
    const isPricingFound = html.toLowerCase().includes("pricing") || html.toLowerCase().includes("plan");

    // 3. Update Vendor
    await supabase
      .from("pseo_vendors")
      .update({
        last_verified_at: new Date().toISOString(),
        last_run_status: isPricingFound ? "success" : "failed",
      })
      .eq("id", vendorId);

    return NextResponse.json({
      success: true,
      verified_at: new Date().toISOString(),
      pricing_detected: isPricingFound,
    });
  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
