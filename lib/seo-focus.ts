import { getSupabaseAdmin } from '@/lib/supabase';
import { baseUrl, getUrlPriority, hasSupabaseAdmin } from '@/lib/sitemap-utils';
import { BUILD_CONFIG } from '@/lib/build-config';

type Soc2Candidate = {
  path: string;
  updatedAt: string | null;
};

const SOC2_STATIC_HIGH_INTENT_ROUTES = [
  '/soc-2',
  '/soc-2-readiness-calculator',
  '/soc-2-readiness-index',
  '/soc-2-cost',
  '/soc-2-cost-calculator',
  '/soc-2-timeline',
  '/soc-2/guides',
  '/soc-2/industries',
  '/soc-2/stack',
  '/soc-2-sales',
  '/soc-2-audit-delay-cost',
  '/soc-2-cost-breakdown',
  '/soc-2-type-i-vs-type-ii',
  '/soc-2-vs-iso-27001',
  '/when-do-you-need-soc-2',
  '/soc-2-evidence/vault',
  '/learn/soc-2-readiness',
  '/soc-2-readiness-checklist',
];

function dedupeByPath(candidates: Soc2Candidate[]): Soc2Candidate[] {
  const seen = new Set<string>();
  const out: Soc2Candidate[] = [];

  for (const candidate of candidates) {
    if (seen.has(candidate.path)) continue;
    seen.add(candidate.path);
    out.push(candidate);
  }

  return out;
}

function sortSoc2Candidates(candidates: Soc2Candidate[]): Soc2Candidate[] {
  return [...candidates].sort((a, b) => {
    const aPriority = getUrlPriority(a.path).priority;
    const bPriority = getUrlPriority(b.path).priority;

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    const aUpdated = a.updatedAt ? Date.parse(a.updatedAt) : 0;
    const bUpdated = b.updatedAt ? Date.parse(b.updatedAt) : 0;

    if (aUpdated !== bUpdated) {
      return bUpdated - aUpdated;
    }

    return a.path.localeCompare(b.path);
  });
}

async function getSoc2DynamicCandidates(): Promise<Soc2Candidate[]> {
  if (!hasSupabaseAdmin) return [];

  const supabase = getSupabaseAdmin();
  const { data: framework } = await supabase
    .from('pseo_frameworks')
    .select('id')
    .eq('slug', 'soc-2')
    .maybeSingle();

  if (!framework?.id) return [];

  const [{ data: pages }, { data: decisions }, { data: roles }] = await Promise.all([
    supabase
      .from('pseo_pages')
      .select('slug, updated_at')
      .eq('framework_id', framework.id)
      .order('updated_at', { ascending: false }),
    supabase.from('pseo_decision_types').select('slug').order('slug', { ascending: true }),
    supabase.from('pseo_roles').select('slug').order('slug', { ascending: true }),
  ]);

  const pageCandidates: Soc2Candidate[] = (pages || [])
    .filter((page) => page.slug && !page.slug.includes('/'))
    .map((page) => ({
      path: `/soc-2/${page.slug}`,
      updatedAt: page.updated_at || null,
    }));

  const decisionCandidates: Soc2Candidate[] = (decisions || [])
    .filter((decision) => decision.slug && !decision.slug.includes('/'))
    .map((decision) => ({
      path: `/soc-2/${decision.slug}`,
      updatedAt: null,
    }));

  const roleCandidates: Soc2Candidate[] = (roles || [])
    .filter((role) => role.slug && !role.slug.includes('/'))
    .map((role) => ({
      path: `/soc-2/${role.slug}`,
      updatedAt: null,
    }));

  const combined = dedupeByPath([...pageCandidates, ...decisionCandidates, ...roleCandidates]);
  return sortSoc2Candidates(combined);
}

export async function getTopDirectorySlugs(limit = BUILD_CONFIG.DIRECTORY_BUILD_LIMIT): Promise<string[]> {
  if (!hasSupabaseAdmin) return [];

  const supabase = getSupabaseAdmin();
  const { data: companies } = await supabase
    .from('company_signals')
    .select('slug')
    .eq('indexable', true)
    .order('signal_score', { ascending: false })
    .order('updated_at', { ascending: false })
    .order('slug', { ascending: true })
    .limit(limit);

  return (companies || [])
    .map((company) => company.slug)
    .filter((slug): slug is string => Boolean(slug));
}

export async function getTopSoc2FrameworkSlugs(limit = BUILD_CONFIG.SOC2_BUILD_LIMIT): Promise<string[]> {
  const candidates = await getSoc2DynamicCandidates();

  return candidates
    .slice(0, limit)
    .map((candidate) => candidate.path.replace('/soc-2/', ''));
}

export async function getTopSoc2Routes(limit = BUILD_CONFIG.SOC2_BUILD_LIMIT): Promise<string[]> {
  const dynamicCandidates = await getSoc2DynamicCandidates();
  const staticCandidates: Soc2Candidate[] = SOC2_STATIC_HIGH_INTENT_ROUTES.map((path) => ({
    path,
    updatedAt: null,
  }));

  const candidates = dedupeByPath([...dynamicCandidates, ...staticCandidates]);
  const sorted = sortSoc2Candidates(candidates);

  return sorted.slice(0, limit).map((candidate) => candidate.path);
}

export async function getFocusedSitemapUrls(): Promise<string[]> {
  const directorySlugs = await getTopDirectorySlugs(BUILD_CONFIG.DIRECTORY_BUILD_LIMIT);
  const soc2Routes = await getTopSoc2Routes(BUILD_CONFIG.SOC2_BUILD_LIMIT);

  const directoryUrls = directorySlugs.map((slug) => `${baseUrl}/compliance/directory/${slug}`);
  const soc2Urls = soc2Routes.map((route) => `${baseUrl}${route}`);

  return [...directoryUrls, ...soc2Urls].slice(0, BUILD_CONFIG.SITEMAP_MAX_URLS);
}
