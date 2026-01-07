import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

async function discoverBuyers(openaiApiKey: string, painSignals: any[]) {
  const painContext = painSignals.length > 0 
    ? `Recent market pain signals identified:\n${painSignals.map(s => `- ${s.normalized_theme}: ${s.raw_text}`).join('\n')}`
    : 'No specific market pain signals identified yet.';

  const prompt = `
    Research and identify potential lead buyers for SOC 2 and Penetration Testing leads.
    Focus on three categories:
    1. CPA Audit Firms (e.g., Schellman, Prescient Assurance, A-LIGN)
    2. Compliance Automation Platforms (e.g., Vanta, Drata, Secureframe)
    3. Cyber Security Consultants / MSSPs

    ${painContext}

    For each potential buyer, provide:
    - Company Name
    - Type (Audit Firm, Software, Consultant)
    - Typical Lead Fit Score (1-100)
    - Key Services they offer
    - A brief "Sales Pitch" for why they should buy leads from RiscLens (tailored to their business and the specific PAIN SIGNALS mentioned above).
    - Pain Affinity: Which specific pain signals (from the list provided) this buyer is best equipped to solve.

    Provide the result in JSON format as an array of objects:
    {
      "buyers": [
        {
          "company_name": "string",
          "type": "string",
          "fit_score": number,
          "services": ["string"],
          "pitch": "string",
          "pain_affinity": ["string"]
        }
      ]
    }
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    if (!result.choices?.[0]?.message?.content) return [];
    const parsed = JSON.parse(result.choices[0].message.content);
    return parsed.buyers || [];
  } catch (error) {
    console.error('Error discovering buyers with AI:', error);
    return [];
  }
}

export async function POST() {
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!openaiApiKey) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
  }

  const supabase = getSupabaseAdmin();

  // Fetch recent pain signals to inform discovery
  const { data: painSignals } = await supabase
    .from('PAIN_SIGNALS')
    .select('normalized_theme, raw_text')
    .order('created_at', { ascending: false })
    .limit(10);

  const buyers = await discoverBuyers(openaiApiKey, painSignals || []);

  return NextResponse.json({
    count: buyers.length,
    buyers: buyers
  });
}
