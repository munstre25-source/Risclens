import { SEARCH_INDEX, SearchDoc } from './searchIndex';

export interface SearchResult extends SearchDoc {
  score: number;
}

const SYNONYMS: Record<string, string[]> = {
  'pentest': ['pen test', 'penetration test', 'penetration testing'],
  'soc2': ['soc 2', 'soc ii'],
  'type1': ['type 1', 'type i'],
  'type2': ['type 2', 'type ii'],
  'vendor risk': ['third party risk', 'vrm', 'tprm'],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

function expandSynonyms(tokens: string[]): string[] {
  const expanded = new Set(tokens);
  for (const token of tokens) {
    for (const [key, synonyms] of Object.entries(SYNONYMS)) {
      if (token === key || synonyms.includes(token)) {
        expanded.add(key);
        synonyms.forEach(s => expanded.add(s));
      }
    }
  }
  return Array.from(expanded);
}

export function search(query: string, categoryFilter: string = 'All'): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const queryTokens = expandSynonyms(tokenize(query));
  const results: SearchResult[] = [];

  for (const doc of SEARCH_INDEX) {
    if (categoryFilter !== 'All' && doc.category !== categoryFilter) continue;

    let score = 0;
    const titleLower = doc.title.toLowerCase();
    const descLower = doc.description.toLowerCase();
    const urlLower = doc.url.toLowerCase();
    const keywords = (doc.keywords || []).map(k => k.toLowerCase());

    // Exact title match (huge boost)
    if (titleLower === query.toLowerCase()) score += 100;

    for (const token of queryTokens) {
      // Title matches
      if (titleLower.includes(token)) {
        score += 60;
        // Bonus for starting with token
        if (titleLower.startsWith(token)) score += 10;
        // Bonus for early occurrence
        score += Math.max(0, 10 - titleLower.indexOf(token) / 10);
      }

      // Keyword matches
      if (keywords.some(k => k.includes(token))) {
        score += 35;
      }

      // Description matches
      if (descLower.includes(token)) {
        score += 20;
      }

      // URL matches
      if (urlLower.includes(token)) {
        score += 10;
      }
    }

    if (score > 0) {
      results.push({ ...doc, score });
    }
  }

  return results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  });
}
