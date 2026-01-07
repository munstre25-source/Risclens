import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateAdminAuth } from '@/lib/validation';

const SCORING_LOGIC = {
  has_security_page: 20,
  has_trust_page: 20,
  mentions_soc2: 20,
  has_responsible_disclosure: 15,
  mentions_compliance_tool: 15,
  has_security_contact: 10,
};

function normalizeDomain(domain: string): string {
  try {
    let d = domain.toLowerCase().trim();
    if (d.includes('://')) {
      d = new URL(d).hostname;
    }
    d = d.split('/')[0]; // Remove path if any
    return d.replace(/^www\./, '');
  } catch {
    return domain.toLowerCase().trim();
  }
}

async function probeUrl(url: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  
  try {
    const response = await fetch(url, { 
      method: 'GET', // Using GET because some servers block HEAD
      signal: controller.signal,
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 RiscLens-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      }
    });
    clearTimeout(timeoutId);
    
    if (response.status === 403 || response.status === 429) {
      throw new Error(`Blocked (${response.status})`);
    }

    return { 
      ok: response.ok, 
      status: response.status, 
      url: response.url,
      text: response.ok ? await response.text() : '',
      error: null as string | null
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    return { 
      ok: false, 
      status: 0, 
      url: url,
      text: '',
      error: error.message as string
    };
  }
}

async function extractSignalsForCompany(domain: string, openaiApiKey: string) {
  const normalized = normalizeDomain(domain);
  const probeResults: Record<string, any> = {};
  
  const pathsToProbe = [
    `https://${normalized}/security`,
    `https://${normalized}/trust`,
    `https://${normalized}/trust-center`,
    `https://${normalized}/compliance`,
    `https://${normalized}/security.txt`,
    `https://${normalized}/.well-known/security.txt`,
    `https://${normalized}/legal/security`,
  ];

  const markers = {
    has_security_page: false,
    has_trust_page: false,
    mentions_soc2: false,
    mentions_compliance_tool: false,
    has_responsible_disclosure: false,
    has_security_contact: false,
  };

  const discoveredUrls: string[] = [];
  let combinedText = "";

  for (const url of pathsToProbe) {
    const res = await probeUrl(url);
    probeResults[url] = { status: res.status, ok: res.ok, error: res.error };
    if (res.ok) {
      discoveredUrls.push(res.url);
      combinedText += (res.text || "").slice(0, 5000); // Sample text for analysis
      
      if (url.includes('security')) markers.has_security_page = true;
      if (url.includes('trust')) markers.has_trust_page = true;
      if (url.includes('compliance')) markers.has_security_page = true; // Often interchangeable
    }
    if (res.error?.includes('Blocked')) {
       return { error: res.error, status: 'error' };
    }
  }

  // AI analysis for deeper signals if we have text or just domain context
  const prompt = `
    Analyze the company domain: ${normalized}
    ${combinedText ? `Content snippets: ${combinedText.slice(0, 2000)}` : "No direct content snippets available."}
    
    Based on the domain and any snippets, determine:
    1. mentions_soc2: Do they mention SOC 2 (Type I or II)?
    2. mentions_compliance_tool: Do they mention using Vanta, Drata, Secureframe, or similar?
    3. has_responsible_disclosure: Do they have a bug bounty or disclosure program?
    4. has_security_contact: Is there a security@ or similar contact mentioned?
    5. ai_summary: 1-2 sentence neutral overview of their business.

    Format the result as JSON:
    {
      "mentions_soc2": boolean,
      "mentions_compliance_tool": boolean,
      "has_responsible_disclosure": boolean,
      "has_security_contact": boolean,
      "ai_summary": string
    }
  `;

  try {
    const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

    const aiResult = await aiResponse.json();
    
    if (!aiResult.choices?.[0]?.message?.content) {
      const errorMsg = aiResult.error?.message || "AI extraction failed: No response content";
      throw new Error(errorMsg);
    }

    const aiData = JSON.parse(aiResult.choices[0].message.content);

    // Merge AI findings
    markers.mentions_soc2 = markers.mentions_soc2 || aiData.mentions_soc2;
    markers.mentions_compliance_tool = markers.mentions_compliance_tool || aiData.mentions_compliance_tool;
    markers.has_responsible_disclosure = markers.has_responsible_disclosure || aiData.has_responsible_disclosure;
    markers.has_security_contact = markers.has_security_contact || aiData.has_security_contact;

    const score_breakdown: Record<string, number> = {};
    let final_score = 0;

    Object.entries(SCORING_LOGIC).forEach(([key, weight]) => {
      if (markers[key as keyof typeof markers]) {
        score_breakdown[key] = weight;
        final_score += weight;
      } else {
        score_breakdown[key] = 0;
      }
    });

    final_score = Math.min(100, Math.max(0, final_score));

    return {
      status: 'success',
      markers,
      score_breakdown,
      final_score,
      ai_summary: aiData.ai_summary,
      discoveredUrls,
      probeResults,
      indexable: final_score >= 30
    };
  } catch (err: any) {
    return { error: err.message, status: 'error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const adminSecret = process.env.ADMIN_SECRET;
    const authHeader = request.headers.get('authorization') || request.headers.get('x-admin-secret');
    const cookieToken = request.cookies.get('admin_token')?.value;
    
    const isAuthed = 
      (adminSecret && cookieToken === adminSecret) ||
      (adminSecret && validateAdminAuth(authHeader, adminSecret));
    
    if (!isAuthed) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { companies, dryRun = false } = await request.json();
    
    if (!Array.isArray(companies)) {
      return NextResponse.json({ error: 'Companies must be an array' }, { status: 400 });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      return NextResponse.json({ error: 'Missing OpenAI configuration' }, { status: 500 });
    }

    const supabase = getSupabaseAdmin();
    const results = [];

    for (const company of companies) {
      const domain = normalizeDomain(company.domain);
      if (!domain) continue;

      const name = company.name || domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // 1. Initial status update
      if (!dryRun) {
        await supabase.from('company_signals').upsert({
          company_name: name,
          domain: domain,
          slug,
          last_run_status: 'running',
          last_run_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }, { onConflict: 'slug' });
      }

      const extraction = await extractSignalsForCompany(domain, openaiApiKey);

      if (dryRun) {
        results.push({ company: name, domain, ...extraction });
        continue;
      }

      // Check if indexable is locked
      const { data: existing } = await supabase
        .from('company_signals')
        .select('indexable_locked, indexable')
        .eq('slug', slug)
        .single();

      const updateData: any = {
        last_run_status: extraction.status,
        last_run_error: extraction.error || null,
        last_run_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (extraction.status === 'success') {
        updateData.signal_score = extraction.final_score;
        updateData.markers = extraction.markers;
        updateData.public_signals = extraction.markers;
        updateData.signals = extraction.markers;
        updateData.score_breakdown = extraction.score_breakdown;
        updateData.ai_summary = extraction.ai_summary;
        
        if (!existing?.indexable_locked) {
          updateData.indexable = extraction.indexable;
        }
      }

      await supabase.from('company_signals').update(updateData).eq('slug', slug);
      results.push({ company: name, domain, success: extraction.status === 'success', ...extraction });
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
