
const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY;

export interface ScrapeResult {
  success: boolean;
  url: string;
  html?: string;
  text?: string;
  title?: string;
  error?: string;
  statusCode?: number;
}

export interface ScrapedPage {
  url: string;
  html: string;
  text: string;
  title: string;
  links: string[];
}

async function scrapeWithBrowserless(url: string, timeout = 15000): Promise<ScrapeResult> {
  if (!BROWSERLESS_API_KEY) {
    throw new Error('BROWSERLESS_API_KEY is not configured');
  }

  try {
    const response = await fetch(`https://chrome.browserless.io/content?token=${BROWSERLESS_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        waitFor: 3000,
        gotoOptions: {
          timeout,
          waitUntil: 'networkidle2',
        },
        rejectResourceTypes: ['image', 'media', 'font', 'stylesheet'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        url,
        error: `Browserless error (${response.status}): ${errorText}`,
        statusCode: response.status,
      };
    }

    const html = await response.text();
    
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const text = extractCleanText(html);

    return {
      success: true,
      url,
      html,
      text,
      title,
      statusCode: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      url,
      error: error.message,
    };
  }
}

async function scrapeWithFetch(url: string, timeout = 8000): Promise<ScrapeResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 RiscLens-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        url,
        error: `HTTP ${response.status}`,
        statusCode: response.status,
      };
    }

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    const text = extractCleanText(html);

    return {
      success: true,
      url,
      html,
      text,
      title,
      statusCode: response.status,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    return {
      success: false,
      url,
      error: error.message,
    };
  }
}

function extractCleanText(html: string): string {
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

function extractLinks(html: string, baseUrl: string): string[] {
  const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
  const links: string[] = [];
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    try {
      const href = match[1];
      if (href.startsWith('http')) {
        links.push(href);
      } else if (href.startsWith('/')) {
        const base = new URL(baseUrl);
        links.push(`${base.protocol}//${base.host}${href}`);
      }
    } catch {}
  }

  return Array.from(new Set(links));
}

export async function scrapePage(url: string, useBrowser = true): Promise<ScrapeResult> {
  if (useBrowser && BROWSERLESS_API_KEY) {
    const result = await scrapeWithBrowserless(url);
    if (result.success) {
      return result;
    }
    console.log(`Browserless failed for ${url}, falling back to fetch:`, result.error);
  }

  return scrapeWithFetch(url);
}

export async function scrapeCompanySecurityPages(domain: string): Promise<{
  pages: ScrapedPage[];
  combinedText: string;
  discoveredUrls: string[];
  securityLinks: string[];
}> {
  const normalized = domain.toLowerCase().replace(/^www\./, '').split('/')[0];
  
  const pathsToProbe = [
    `https://${normalized}/security`,
    `https://${normalized}/trust`,
    `https://${normalized}/trust-center`,
    `https://${normalized}/compliance`,
    `https://${normalized}/pricing`,
    `https://${normalized}/plans`,
    `https://${normalized}/.well-known/security.txt`,
    `https://${normalized}/security.txt`,
  ];

  const pages: ScrapedPage[] = [];
  const discoveredUrls: string[] = [];
  let combinedText = '';
  const allLinks: string[] = [];

  const useBrowser = !!BROWSERLESS_API_KEY;

  for (const url of pathsToProbe) {
    const isSecurityTxt = url.includes('security.txt');
    
    const result = isSecurityTxt
      ? await scrapeWithFetch(url)
      : await scrapePage(url, useBrowser);

    if (result.success && result.html) {
      discoveredUrls.push(url);
      
      const links = extractLinks(result.html, url);
      allLinks.push(...links);

      pages.push({
        url,
        html: result.html,
        text: result.text || '',
        title: result.title || '',
        links,
      });

      combinedText += `\n\n=== ${url} ===\n${result.text || ''}`;
    }
  }

  const securityKeywords = ['security', 'trust', 'compliance', 'soc', 'iso', 'gdpr', 'hipaa', 'privacy', 'pentest', 'vulnerability', 'disclosure', 'bug-bounty'];
  const securityLinks = allLinks.filter(link => {
    const lower = link.toLowerCase();
    return securityKeywords.some(kw => lower.includes(kw));
  });

  return {
    pages,
    combinedText: combinedText.slice(0, 15000),
    discoveredUrls,
    securityLinks: Array.from(new Set(securityLinks)),
  };
}

export function detectSignalsFromContent(text: string, html: string): {
  mentions_soc2: boolean;
  mentions_compliance_tool: boolean;
  has_responsible_disclosure: boolean;
  has_security_contact: boolean;
  detected_tools: string[];
  detected_certifications: string[];
} {
  const lowerText = text.toLowerCase();
  const lowerHtml = html.toLowerCase();
  const combined = lowerText + ' ' + lowerHtml;

  const soc2Patterns = [
    /soc\s*2/i,
    /soc\s*ii/i,
    /soc2/i,
    /type\s*(1|2|i|ii)\s*(report|certification|audit)/i,
    /aicpa/i,
  ];
  const mentions_soc2 = soc2Patterns.some(p => p.test(combined));

  const complianceTools = [
    { name: 'Vanta', patterns: [/vanta/i, /app\.vanta\.com/i, /trust\.vanta/i] },
    { name: 'Drata', patterns: [/drata/i, /app\.drata\.com/i] },
    { name: 'Secureframe', patterns: [/secureframe/i] },
    { name: 'Laika', patterns: [/heylaika/i, /laika\.so/i] },
    { name: 'Thoropass', patterns: [/thoropass/i] },
    { name: 'Sprinto', patterns: [/sprinto/i] },
    { name: 'Tugboat Logic', patterns: [/tugboat\s*logic/i] },
    { name: 'Anecdotes', patterns: [/anecdotes/i] },
    { name: 'SafeBase', patterns: [/safebase/i] },
    { name: 'Conveyor', patterns: [/conveyor\.com/i, /withconveyor/i] },
  ];

  const detected_tools: string[] = [];
  for (const tool of complianceTools) {
    if (tool.patterns.some(p => p.test(combined))) {
      detected_tools.push(tool.name);
    }
  }
  const mentions_compliance_tool = detected_tools.length > 0;

  const disclosurePatterns = [
    /responsible\s*disclosure/i,
    /bug\s*bounty/i,
    /vulnerability\s*disclosure/i,
    /security\s*researcher/i,
    /hackerone/i,
    /bugcrowd/i,
    /report\s*a\s*vulnerability/i,
  ];
  const has_responsible_disclosure = disclosurePatterns.some(p => p.test(combined));

  const contactPatterns = [
    /security@/i,
    /mailto:security/i,
    /security\s*team/i,
    /security\s*contact/i,
  ];
  const has_security_contact = contactPatterns.some(p => p.test(combined));

  const certPatterns = [
    { name: 'SOC 2 Type I', pattern: /soc\s*2?\s*type\s*(1|i)\b/i },
    { name: 'SOC 2 Type II', pattern: /soc\s*2?\s*type\s*(2|ii)\b/i },
    { name: 'SOC 2', pattern: /soc\s*2/i },
    { name: 'ISO 27001', pattern: /iso\s*27001/i },
    { name: 'ISO 27017', pattern: /iso\s*27017/i },
    { name: 'ISO 27018', pattern: /iso\s*27018/i },
    { name: 'HIPAA', pattern: /hipaa/i },
    { name: 'GDPR', pattern: /gdpr/i },
    { name: 'PCI DSS', pattern: /pci[\s-]?dss/i },
    { name: 'FedRAMP', pattern: /fedramp/i },
    { name: 'CSA STAR', pattern: /csa\s*star/i },
    { name: 'SOX', pattern: /\bsox\b/i },
  ];

  const detected_certifications: string[] = [];
  for (const cert of certPatterns) {
    if (cert.pattern.test(combined) && !detected_certifications.includes(cert.name)) {
      if (cert.name === 'SOC 2' && (detected_certifications.includes('SOC 2 Type I') || detected_certifications.includes('SOC 2 Type II'))) {
        continue;
      }
      detected_certifications.push(cert.name);
    }
  }

  return {
    mentions_soc2,
    mentions_compliance_tool,
    has_responsible_disclosure,
    has_security_contact,
    detected_tools,
    detected_certifications,
  };
}
