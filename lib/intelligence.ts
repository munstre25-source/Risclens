import { scrapeCompanySecurityPages, detectSignalsFromContent } from './browser';

const SCORING_LOGIC = {
  has_security_page: 20,
  has_trust_page: 20,
  mentions_soc2: 20,
  has_responsible_disclosure: 15,
  mentions_compliance_tool: 15,
  has_security_contact: 10,
};

export function normalizeDomain(domain: string): string {
  try {
    let d = domain.toLowerCase().trim();
    if (d.includes('://')) {
      d = new URL(d).hostname;
    }
    d = d.split('/')[0];
    return d.replace(/^www\./, '');
  } catch {
    return domain.toLowerCase().trim();
  }
}

export async function extractSignalsForCompany(domain: string, openaiApiKey: string) {
  const normalized = normalizeDomain(domain);

  const scrapeResult = await scrapeCompanySecurityPages(normalized);

  const markers: Record<string, boolean> = {
    has_security_page: false,
    has_trust_page: false,
    mentions_soc2: false,
    mentions_compliance_tool: false,
    has_responsible_disclosure: false,
    has_security_contact: false,
  };

  for (const url of scrapeResult.discoveredUrls) {
    if (url.includes('security') || url.includes('compliance')) {
      markers.has_security_page = true;
    }
    if (url.includes('trust')) {
      markers.has_trust_page = true;
    }
  }

  let combinedHtml = '';
  for (const page of scrapeResult.pages) {
    combinedHtml += page.html;
  }

  const detected = detectSignalsFromContent(scrapeResult.combinedText, combinedHtml);

  markers.mentions_soc2 = detected.mentions_soc2;
  markers.mentions_compliance_tool = detected.mentions_compliance_tool;
  markers.has_responsible_disclosure = detected.has_responsible_disclosure;
  markers.has_security_contact = detected.has_security_contact;

  let ai_summary = '';
  
  if (scrapeResult.combinedText.length > 10 || scrapeResult.pages.length === 0) {
    const defaultSummary = `${normalized} is a technology company with an established online presence.`;
    
    if (openaiApiKey && openaiApiKey !== 'sk-...') {
      try {
        const contextSnippet = scrapeResult.combinedText.slice(0, 3000) || `Domain: ${normalized}`;
        
        const prompt = `
You are analyzing a company's security posture based on their public web pages.

Domain: ${normalized}
${scrapeResult.pages.length > 0 ? `Pages found: ${scrapeResult.discoveredUrls.join(', ')}` : 'No security pages found.'}
${detected.detected_tools.length > 0 ? `Compliance tools detected: ${detected.detected_tools.join(', ')}` : ''}
${detected.detected_certifications.length > 0 ? `Certifications mentioned: ${detected.detected_certifications.join(', ')}` : ''}

Content snippet:
${contextSnippet}

Provide a brief 1-2 sentence summary of this company's apparent business and security posture. Be factual and neutral. If no content was found, base it on the domain name.

Format as JSON:
{
  "ai_summary": "string"
}`;

        const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            max_tokens: 150,
          })
        });

        if (aiResponse.ok) {
          const aiResult: any = await aiResponse.json();
          if (aiResult.choices?.[0]?.message?.content) {
            const aiData = JSON.parse(aiResult.choices[0].message.content);
            ai_summary = aiData.ai_summary || '';
          }
        } else {
          ai_summary = defaultSummary;
        }
      } catch (err: any) {
        console.error('AI summary failed:', err.message);
        ai_summary = defaultSummary;
      }
    } else {
      // Heuristic fallback
      const certs = detected.detected_certifications.join(', ');
      const tools = detected.detected_tools.join(', ');
      ai_summary = `${normalized} demonstrates a strong security posture ${certs ? `with certifications like ${certs}` : ''}${tools ? ` and utilizes ${tools} for compliance` : ''}.`;
      if (!certs && !tools) {
        ai_summary = defaultSummary;
      }
    }
  }

  const score_breakdown: Record<string, number> = {};
  let final_score = 0;

  Object.entries(SCORING_LOGIC).forEach(([key, weight]) => {
    if (markers[key]) {
      score_breakdown[key] = weight;
      final_score += weight;
    } else {
      score_breakdown[key] = 0;
    }
  });

  final_score = Math.min(100, Math.max(0, final_score));

  return {
    status: 'success' as const,
    markers,
    score_breakdown,
    final_score,
    ai_summary,
    discoveredUrls: scrapeResult.discoveredUrls,
    securityLinks: scrapeResult.securityLinks,
    detected_tools: detected.detected_tools,
    detected_certifications: detected.detected_certifications,
    indexable: final_score >= 30,
    scrape_method: process.env.BROWSERLESS_API_KEY ? 'browserless' : 'fetch',
  };
}
