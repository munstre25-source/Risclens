import { getSupabaseAdmin } from '../lib/supabase';

const supabase = getSupabaseAdmin();
const openaiApiKey = process.env.OPENAI_API_KEY;

const SUBREDDITS = ['msp', 'startups', 'cybersecurity'];
const SEARCH_QUERIES = [
  'SOC 2 cost',
  'SOC 2 pain',
  'Vanta vs Drata',
  'compliance automation frustration',
  'SOC 2 auditor issues'
];

async function getRedditData(query: string, subreddit: string) {
  const url = `https://www.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&sort=relevance&t=year`;
  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'RiscLensBot/1.0' }
    });
    const data = await response.json();
    return data.data.children.map((child: any) => ({
      post_id: child.data.id,
      title: child.data.title,
      content: child.data.selftext,
      url: `https://www.reddit.com${child.data.permalink}`,
      subreddit: child.data.subreddit,
      author: child.data.author,
      upvotes: child.data.score
    }));
  } catch (error) {
    console.error(`Error fetching Reddit data for ${query} in ${subreddit}:`, error);
    return [];
  }
}

async function analyzeWithAI(post: any) {
  const prompt = `
    Analyze the following Reddit post about compliance/SOC 2 and extract actionable market intelligence for a compliance platform called RiscLens.
    
    Post Title: ${post.title}
    Post Content: ${post.content}
    
    Provide the result in JSON format with the following fields:
    - pain_points: (An array of strings representing specific user pains)
    - opportunities: (An array of strings representing specific features or solutions RiscLens could implement)
    - sentiment: (One word: 'positive', 'negative', or 'neutral')
  `;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        // Model gpt-4o-mini is more cost-effective for high volume extraction
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const result = await response.json();
    return JSON.parse(result.choices[0].message.content);
  } catch (error) {
    console.error('Error analyzing with AI:', error);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting WORLD CLASS Market Intelligence Extraction...');
  
  for (const subreddit of SUBREDDITS) {
    for (const query of SEARCH_QUERIES) {
      console.log(`🔍 Searching /r/${subreddit} for "${query}"...`);
      const posts = await getRedditData(query, subreddit);
      
      for (const post of posts.slice(0, 5)) {
        if (!post.content || post.content.length < 50) continue;
        
        console.log(`🤖 Analyzing: ${post.title.substring(0, 50)}...`);
        const analysis = await analyzeWithAI(post);
        
        if (analysis) {
          const { error } = await supabase.from('market_insights').upsert({
            source: 'reddit',
            subreddit: post.subreddit,
            post_id: post.post_id,
            url: post.url,
            title: post.title,
            content: post.content.substring(0, 10000),
            author: post.author,
            upvotes: post.upvotes,
            pain_points: analysis.pain_points,
            opportunities: analysis.opportunities,
            sentiment: analysis.sentiment,
            processed_at: new Date().toISOString()
          }, { onConflict: 'post_id' });

          if (error) {
            console.error('Error saving to DB:', error.message);
          } else {
            console.log('✅ World Class Insight saved!');
          }
        }
      }
    }
  }
  
  console.log('🎉 Extraction complete! Intelligence is now available in the dashboard.');
}

main().catch(console.error);
