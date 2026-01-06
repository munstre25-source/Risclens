import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUBREDDITS = ['msp', 'startups', 'cybersecurity', 'comply'];

async function getRedditData(query: string, subreddit: string) {
  // Use a small, recent sample (limit 10)
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&sort=new&t=month&limit=10`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'RiscLensBot/2.0 (Ethical Intelligence Agent)' }
    });
    const data = await response.json();
    if (!data.data?.children) return [];
    
    // Extract only necessary text, no PII (author, id, url are discarded later)
    return data.data.children.map((child: any) => ({
      title: child.data.title,
      content: child.data.selftext,
    }));
  } catch (error) {
    console.error(`Error fetching Reddit data for ${query} in ${subreddit}:`, error);
    return [];
  }
}

async function analyzeWithAI(text: string, topic: string, openaiApiKey: string) {
  const prompt = `
    You are a senior market intelligence analyst. Analyze the following Reddit content about "${topic}" to extract PRE-SEARCH PAIN SIGNALS.
    
    CONTENT:
    ${text}
    
    GUIDELINES:
    - Summarize pain WITHOUT quoting users.
    - Abstract individual statements into reusable insights.
    - Prefer themes over anecdotes.
    - Discard low-signal or generic comments.
    
    EXTRACT ONLY:
    1. Pain Points: Specific frustrations or bottlenecks.
    2. Expectations: What users believe should happen or what they want.
    3. Objections: Why they are hesitant to buy or use existing tools.
    4. Lived Experiences: Real-world outcomes (positive or negative).
    
    Provide the result as a JSON array of objects, each with:
    - signal_type: "pain" | "expectation" | "objection" | "experience"
    - normalized_theme: A short string (e.g., "audit_delay", "tool_overpromise", "pricing_confusion")
    - raw_text: A sanitized excerpt (max 500 chars) that captures the essence without identifiable info.
    - intensity_score: 1-5 (how severe or recurring the signal is)
    - confidence_score: 0.0-1.0 (how clear the signal is in the text)
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
    // Expecting { signals: [...] }
    return parsed.signals || parsed.results || Object.values(parsed)[0] || [];
  } catch (error) {
    console.error('Error analyzing with AI:', error);
    return [];
  }
}

export async function POST(request: Request) {
  const { topic = 'SOC 2' } = await request.json().catch(() => ({}));
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!supabaseUrl || !supabaseServiceKey || !openaiApiKey) {
    return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // 1. Fetch existing keywords to use as filters (if needed, though here we use them to ensure we don't duplicate efforts)
  const { data: keywords } = await supabase.from('KEYWORDS').select('keyword');
  const keywordList = keywords?.map((k: any) => k.keyword.toLowerCase()) || [];

  let totalSignals = 0;

  for (const subreddit of SUBREDDITS) {
    const posts = await getRedditData(topic, subreddit);
    
    // Combine titles and contents for a batch analysis to save tokens and respect rate limits
    const combinedText = posts
      .map((p: any) => `${p.title}\n${p.content}`)
      .join('\n---\n')
      .substring(0, 8000); // Limit context window

    if (!combinedText) continue;

    const signals = await analyzeWithAI(combinedText, topic, openaiApiKey);

    if (Array.isArray(signals)) {
      const sanitizedSignals = signals.map((s: any) => ({
        source: 'reddit',
        topic,
        signal_type: s.signal_type,
        normalized_theme: s.normalized_theme,
        raw_text: s.raw_text?.substring(0, 500),
        intensity_score: Math.min(5, Math.max(1, s.intensity_score || 3)),
        confidence_score: Math.min(1, Math.max(0, s.confidence_score || 0.5))
      })).filter(s => ['pain', 'expectation', 'objection', 'experience'].includes(s.signal_type));

      if (sanitizedSignals.length > 0) {
        const { error } = await supabase.from('PAIN_SIGNALS').insert(sanitizedSignals);
        if (!error) totalSignals += sanitizedSignals.length;
      }
    }
  }

  return NextResponse.json({
    success: true,
    signals_extracted: totalSignals,
    topic
  });
}
