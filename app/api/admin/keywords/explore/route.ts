import { NextResponse } from 'next/server';

const MODIFIERS = {
  questions: ['who', 'what', 'why', 'how', 'can', 'are', 'which', 'when', 'where'],
  prepositions: ['for', 'can', 'is', 'near', 'to', 'with', 'without'],
  comparisons: ['vs', 'versus', 'or', 'and', 'like'],
  alphabet: 'abcdefghijklmnopqrstuvwxyz'.split(''),
};

async function getGoogleSuggestions(query: string) {
  const url = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data[1] || [];
  } catch (error) {
    console.error(`Error fetching suggestions for ${query}:`, error);
    return [];
  }
}

async function analyzeKeywords(keywords: string[], openaiApiKey: string) {
  const prompt = `
    Analyze the following SEO keywords and categorize them. 
    For each keyword, determine:
    1. Search Intent (Informational, Commercial, Navigational, Transactional)
    2. Revenue Potential Score (1-100, where 100 is high intent to buy compliance services like SOC 2, Pentest, etc.)
    3. Main Question Category (if applicable: Who, What, Why, How, Can, vs, etc.)

    Keywords:
    ${keywords.slice(0, 50).join('\n')}

    Provide the result in JSON format as an array of objects:
    {
      "results": [
        {
          "keyword": "string",
          "intent": "string",
          "revenue_score": number,
          "category": "string"
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
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    if (!result.choices?.[0]?.message?.content) return [];
    const parsed = JSON.parse(result.choices[0].message.content);
    return parsed.results || [];
  } catch (error) {
    console.error('Error analyzing keywords with AI:', error);
    return [];
  }
}

export async function POST(request: Request) {
  const { seed } = await request.json();
  const openaiApiKey = process.env.OPENAI_API_KEY;

  if (!seed) {
    return NextResponse.json({ error: 'Seed keyword is required' }, { status: 400 });
  }

  if (!openaiApiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  const queries: string[] = [seed];
  
  // Build a selection of queries to get a broad range of results
  MODIFIERS.questions.forEach(q => queries.push(`${q} ${seed}`));
  MODIFIERS.prepositions.forEach(p => queries.push(`${seed} ${p}`));
  MODIFIERS.comparisons.forEach(c => queries.push(`${seed} ${c}`));

  const allSuggestions = new Set<string>();
  
  // Fetch in batches to avoid overwhelming or taking too long
  // We'll just do a subset to keep it fast for the demo/implementation
  const selectedQueries = queries.slice(0, 15); 

  await Promise.all(selectedQueries.map(async (query) => {
    const suggestions = await getGoogleSuggestions(query);
    suggestions.forEach((s: string) => allSuggestions.add(s.toLowerCase()));
  }));

  const uniqueKeywords = Array.from(allSuggestions);
  const analyzedResults = await analyzeKeywords(uniqueKeywords, openaiApiKey);

  return NextResponse.json({
    seed,
    total_found: uniqueKeywords.length,
    results: analyzedResults
  });
}
