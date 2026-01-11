import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import pdf from "pdf-parse";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const email = formData.get("email") as string;

    if (!file || !email) {
      return NextResponse.json({ error: "Missing file or email" }, { status: 400 });
    }

    // 1. Extract text from PDF
    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfData = await pdf(buffer);
    const text = pdfData.text;

    // 2. Call OpenAI for Analysis
    const prompt = `
      You are a SOC 2 Compliance Expert. Analyze the following security policy text and map it against SOC 2 Trust Services Criteria (TSC).
      
      Tasks:
      1. Provide a coverage score (0-100) based on how well it addresses SOC 2 controls.
      2. List the specific SOC 2 controls covered (e.g., CC6.1, CC7.1).
      3. Identify specific gaps and provide actionable recommendations.
      
      Return the result ONLY as a JSON object with the following structure:
      {
        "coverage_score": number,
        "controls_covered": string[],
        "gaps": [
          { "control": "string", "issue": "string", "recommendation": "string" }
        ]
      }
      
      Policy Text:
      ${text.substring(0, 15000)} // Truncate to stay within context limits
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are a SOC 2 expert." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(response.choices[0].message.content || "{}");

    // 3. Save as a lead in Supabase
    await supabase.from("leads").insert({
      email,
      lead_type: "evidence_gap_analyzer",
      lead_payload: analysis,
      source_url: req.headers.get("referer") || "evidence-gap-analyzer",
    });

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Error in evidence-gap-analyzer:", error);
    return NextResponse.json({ error: "Analysis failed: " + error.message }, { status: 500 });
  }
}
