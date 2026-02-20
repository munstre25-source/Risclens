import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { getSupabaseAdmin } from '@/lib/supabase';
import { ROUTES } from '@/src/seo/routes';
import { toolPricing } from '@/src/content/pricing';

dotenv.config({ path: '.env.local' });

type FrameworkRow = { slug: string };
type DecisionRow = { slug: string };
type IndustryRow = { slug: string };
type RoleRow = { slug: string };
type CompanyRow = { slug: string; updated_at?: string | null };
type MigrationRow = { slug: string };
type LocationRow = { slug: string };
type ToolRow = { slug: string };
type PseoPageRow = {
  slug: string;
  category: string | null;
  updated_at?: string | null;
  framework?: { slug?: string | null } | { slug?: string | null }[] | null;
};

type VerifyResult = {
  url: string;
  status: number | null;
  ok: boolean;
  reason: string;
  finalUrl?: string;
  redirected?: boolean;
};

type CliOptions = {
  baseUrl: string;
  concurrency: number;
  timeoutMs: number;
  outputFile: string;
  inputSnapshotFile: string;
};

const MATRIX_FRAMEWORKS = new Set([
  'soc-2',
  'iso-27001',
  'hipaa',
  'gdpr',
  'pci-dss',
  'ai-governance',
  'iso-42001',
  'eu-ai-act',
  'nist-ai-rmf',
]);

const ROLE_MATRIX_FRAMEWORKS = new Set([
  'soc-2',
  'iso-27001',
  'pci-dss',
  'hipaa',
  'gdpr',
]);

const AI_CATEGORIES = new Set([
  'role-based',
  'comparison',
  'cost',
  'roi',
  'use-case',
  'readiness',
  'roadmap',
  'analysis',
  'checklist',
  'risk-assessment',
  'classification',
  'audit',
  'software',
  'best-practices',
  'budgeting',
]);

const TOP_TOOLS = ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'];

function parseArgs(): CliOptions {
  const args = process.argv.slice(2);
  const options: CliOptions = {
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com',
    concurrency: 80,
    timeoutMs: 12000,
    outputFile: path.resolve('reports', 'all-url-validation-report.json'),
    inputSnapshotFile: path.resolve('reports', 'all-url-validation-input.json'),
  };

  for (const arg of args) {
    if (arg.startsWith('--base-url=')) {
      options.baseUrl = arg.replace('--base-url=', '').trim();
      continue;
    }
    if (arg.startsWith('--concurrency=')) {
      const parsed = Number(arg.replace('--concurrency=', '').trim());
      if (!Number.isNaN(parsed) && parsed > 0) {
        options.concurrency = parsed;
      }
      continue;
    }
    if (arg.startsWith('--timeout-ms=')) {
      const parsed = Number(arg.replace('--timeout-ms=', '').trim());
      if (!Number.isNaN(parsed) && parsed > 0) {
        options.timeoutMs = parsed;
      }
      continue;
    }
    if (arg.startsWith('--output=')) {
      options.outputFile = path.resolve(arg.replace('--output=', '').trim());
      continue;
    }
    if (arg.startsWith('--input-snapshot=')) {
      options.inputSnapshotFile = path.resolve(arg.replace('--input-snapshot=', '').trim());
      continue;
    }
  }

  return options;
}

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const withSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (withSlash === '/') return '/';
  return withSlash.replace(/\/+$/, '');
}

function normalizeAbsoluteUrl(value: string, baseUrl: string): string {
  try {
    const parsed = new URL(value);
    return `${parsed.origin}${normalizePath(parsed.pathname)}${parsed.search}`;
  } catch {
    const parsed = new URL(value.startsWith('/') ? value : `/${value}`, baseUrl);
    return `${parsed.origin}${normalizePath(parsed.pathname)}${parsed.search}`;
  }
}

function addPath(set: Set<string>, pathValue: string | null | undefined) {
  if (!pathValue) return;
  const normalized = normalizePath(pathValue.trim());
  if (!normalized || normalized.includes('undefined')) return;
  set.add(normalized);
}

function getFrameworkSlug(framework: PseoPageRow['framework']): string | null {
  if (!framework) return null;
  if (Array.isArray(framework)) return framework[0]?.slug || null;
  return framework.slug || null;
}

async function fetchData() {
  const supabase = getSupabaseAdmin();
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const [
        companiesRes,
        migrationsRes,
        pseoPagesRes,
        frameworksRes,
        decisionsRes,
        industriesRes,
        rolesRes,
        locationsRes,
        toolsRes,
      ] = await Promise.all([
        supabase.from('company_signals').select('slug,updated_at').eq('indexable', true),
        supabase.from('framework_migrations').select('slug'),
        supabase.from('pseo_pages').select('slug,category,updated_at,framework:pseo_frameworks(slug)'),
        supabase.from('pseo_frameworks').select('slug'),
        supabase.from('pseo_decision_types').select('slug'),
        supabase.from('pseo_industries').select('slug'),
        supabase.from('pseo_roles').select('slug'),
        supabase.from('pseo_locations').select('slug'),
        supabase.from('compliance_tools').select('slug').eq('is_active', true),
      ]);

      const responses = [
        companiesRes,
        migrationsRes,
        pseoPagesRes,
        frameworksRes,
        decisionsRes,
        industriesRes,
        rolesRes,
        locationsRes,
        toolsRes,
      ];

      for (const response of responses) {
        if (response.error) {
          throw new Error(response.error.message);
        }
      }

      return {
        companies: (companiesRes.data || []) as CompanyRow[],
        migrations: (migrationsRes.data || []) as MigrationRow[],
        pseoPages: (pseoPagesRes.data || []) as PseoPageRow[],
        frameworks: (frameworksRes.data || []) as FrameworkRow[],
        decisions: (decisionsRes.data || []) as DecisionRow[],
        industries: (industriesRes.data || []) as IndustryRow[],
        roles: (rolesRes.data || []) as RoleRow[],
        locations: (locationsRes.data || []) as LocationRow[],
        tools: (toolsRes.data || []) as ToolRow[],
      };
    } catch (error) {
      lastError = error;
      const delay = 500 * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error('Failed to fetch Supabase data');
}

function buildPaths(data: Awaited<ReturnType<typeof fetchData>>): { paths: string[]; counts: Record<string, number> } {
  const paths = new Set<string>();
  const counters: Record<string, number> = {
    staticRoutes: 0,
    directoryCompanies: 0,
    migrations: 0,
    auditorLocations: 0,
    pseoMapped: 0,
    frameworkMatrix: 0,
    roleMatrix: 0,
    compareIndustryMatrix: 0,
    compareToolCore: 0,
  };

  for (const route of ROUTES) {
    const before = paths.size;
    addPath(paths, route);
    if (paths.size > before) counters.staticRoutes += 1;
  }

  for (const row of data.companies) {
    const before = paths.size;
    addPath(paths, `/compliance/directory/${row.slug}`);
    if (paths.size > before) counters.directoryCompanies += 1;
  }

  for (const row of data.migrations) {
    const before = paths.size;
    addPath(paths, `/compliance/migrate/${row.slug}`);
    if (paths.size > before) counters.migrations += 1;
  }

  for (const row of data.locations) {
    const before = paths.size;
    addPath(paths, `/auditor-directory/${row.slug}`);
    if (paths.size > before) counters.auditorLocations += 1;
  }

  for (const page of data.pseoPages) {
    if (!page.slug || page.slug.includes('/')) continue;
    const frameworkSlug = getFrameworkSlug(page.framework);
    let mappedPath: string | null = null;

    switch (page.category) {
      case 'role':
        mappedPath = `/soc-2/for/${page.slug}`;
        break;
      case 'industry':
        mappedPath = `/soc-2/industries/${page.slug}`;
        break;
      case 'pricing':
        mappedPath = `/pricing/${page.slug}`;
        break;
      case 'alternatives':
        mappedPath = `/compare/${page.slug}`;
        break;
      case 'directory':
        mappedPath = `/auditor-directory/${page.slug}`;
        break;
      case 'stack':
        mappedPath = `/soc-2/stack/${page.slug}`;
        break;
      case 'compliance':
        if (frameworkSlug && ['soc-2', 'iso-27001', 'pci-dss', 'hipaa', 'gdpr'].includes(frameworkSlug)) {
          mappedPath = `/compliance/${frameworkSlug}/${page.slug}`;
        } else {
          mappedPath = `/ai-governance/${page.slug}`;
        }
        break;
      default:
        if (frameworkSlug === 'ai-governance' || AI_CATEGORIES.has(page.category || '')) {
          mappedPath = `/ai-governance/${page.slug}`;
        }
        break;
    }

    if (mappedPath) {
      const before = paths.size;
      addPath(paths, mappedPath);
      if (paths.size > before) counters.pseoMapped += 1;
    }
  }

  for (const framework of data.frameworks) {
    if (!MATRIX_FRAMEWORKS.has(framework.slug)) continue;
    for (const decision of data.decisions) {
      for (const industry of data.industries) {
        const before = paths.size;
        addPath(paths, `/${framework.slug}/${decision.slug}/${industry.slug}`);
        if (paths.size > before) counters.frameworkMatrix += 1;
      }
    }
  }

  for (const framework of data.frameworks) {
    if (!ROLE_MATRIX_FRAMEWORKS.has(framework.slug)) continue;
    for (const role of data.roles) {
      for (const industry of data.industries) {
        const before = paths.size;
        addPath(paths, `/${framework.slug}/for/${role.slug}/${industry.slug}`);
        if (paths.size > before) counters.roleMatrix += 1;
      }
    }
  }

  for (const company of data.companies) {
    for (const industry of data.industries) {
      const beforeAlt = paths.size;
      addPath(paths, `/compare/${company.slug}-alternatives/for/${industry.slug}`);
      if (paths.size > beforeAlt) counters.compareIndustryMatrix += 1;

      if (TOP_TOOLS.includes(company.slug)) {
        for (const peer of TOP_TOOLS) {
          if (peer === company.slug) continue;
          const pairSlug = [company.slug, peer].sort().join('-vs-');
          const beforePair = paths.size;
          addPath(paths, `/compare/${pairSlug}/for/${industry.slug}`);
          if (paths.size > beforePair) counters.compareIndustryMatrix += 1;
        }
      }
    }
  }

  const dbToolSlugs = data.tools.map((row) => row.slug).filter(Boolean);
  const fallbackToolSlugs = toolPricing.map((row) => row.slug).filter(Boolean);
  const toolSlugs = Array.from(new Set([...dbToolSlugs, ...fallbackToolSlugs])).sort();

  for (const tool of toolSlugs) {
    const beforePricing = paths.size;
    addPath(paths, `/pricing/${tool}`);
    if (paths.size > beforePricing) counters.compareToolCore += 1;

    const beforeAlternatives = paths.size;
    addPath(paths, `/compare/${tool}-alternatives`);
    if (paths.size > beforeAlternatives) counters.compareToolCore += 1;
  }

  for (let i = 0; i < toolSlugs.length; i += 1) {
    for (let j = i + 1; j < toolSlugs.length; j += 1) {
      const before = paths.size;
      addPath(paths, `/compare/${[toolSlugs[i], toolSlugs[j]].sort().join('-vs-')}`);
      if (paths.size > before) counters.compareToolCore += 1;
    }
  }

  for (const tool of toolSlugs) {
    for (const industry of data.industries) {
      const before = paths.size;
      addPath(paths, `/compare/${tool}-alternatives/for/${industry.slug}`);
      if (paths.size > before) counters.compareToolCore += 1;
    }
  }

  return { paths: Array.from(paths).sort((a, b) => a.localeCompare(b)), counts: counters };
}

async function fetchWithTimeout(url: string, timeoutMs: number, method: 'HEAD' | 'GET'): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'RiscLens-EndToEnd-Url-Validator/1.0',
        accept: 'text/html,application/xhtml+xml',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyUrl(url: string, timeoutMs: number): Promise<VerifyResult> {
  let response: Response | null = null;
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      response = await fetchWithTimeout(url, timeoutMs, 'HEAD');
      if (response.status === 405 || response.status === 501) {
        if (response.body) {
          try {
            await response.body.cancel();
          } catch {}
        }
        response = await fetchWithTimeout(url, timeoutMs, 'GET');
      }
      break;
    } catch (error) {
      lastError = error;
      const delayMs = 200 * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  if (!response) {
    const message = lastError instanceof Error ? lastError.message : 'network_error';
    return { url, status: null, ok: false, reason: message };
  }

  const status = response.status;
  const finalUrl = response.url;
  const redirected = finalUrl !== url;

  if (response.body) {
    try {
      await response.body.cancel();
    } catch {}
  }

  if (status >= 200 && status < 300) {
    return { url, status, ok: true, reason: 'ok', finalUrl, redirected };
  }

  return {
    url,
    status,
    ok: false,
    reason: `status_${status}`,
    finalUrl,
    redirected,
  };
}

async function runBatched<T, U>(items: T[], concurrency: number, worker: (item: T) => Promise<U>): Promise<U[]> {
  const results: U[] = [];
  for (let index = 0; index < items.length; index += concurrency) {
    const batch = items.slice(index, index + concurrency);
    const batchResults = await Promise.all(batch.map((item) => worker(item)));
    results.push(...batchResults);
    if ((index / concurrency) % 10 === 0 || index + concurrency >= items.length) {
      console.log(`Validated ${Math.min(index + concurrency, items.length)} / ${items.length}`);
    }
  }
  return results;
}

async function main() {
  const options = parseArgs();
  const data = await fetchData();
  const { paths, counts } = buildPaths(data);
  const urls = paths.map((pathValue) => normalizeAbsoluteUrl(pathValue, options.baseUrl));

  await fs.mkdir(path.dirname(options.inputSnapshotFile), { recursive: true });
  await fs.writeFile(
    options.inputSnapshotFile,
    `${JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: options.baseUrl,
        totals: {
          urls: urls.length,
          frameworks: data.frameworks.length,
          decisions: data.decisions.length,
          industries: data.industries.length,
          roles: data.roles.length,
          companies: data.companies.length,
          migrations: data.migrations.length,
          pseoPages: data.pseoPages.length,
          locations: data.locations.length,
          tools: data.tools.length,
        },
        routeFamilyCounts: counts,
        urls,
      },
      null,
      2
    )}\n`,
    'utf8'
  );

  console.log(`Generated URL set: ${urls.length}`);
  console.log(`Input snapshot: ${options.inputSnapshotFile}`);

  const results = await runBatched(urls, options.concurrency, (url) => verifyUrl(url, options.timeoutMs));
  const unresolved = results.filter((result) => !result.ok);

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: options.baseUrl,
    options: {
      concurrency: options.concurrency,
      timeoutMs: options.timeoutMs,
    },
    totals: {
      checked: results.length,
      resolved: results.length - unresolved.length,
      unresolved: unresolved.length,
    },
    unresolved,
  };

  await fs.mkdir(path.dirname(options.outputFile), { recursive: true });
  await fs.writeFile(options.outputFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Validation report: ${options.outputFile}`);
  console.log(`Resolved: ${report.totals.resolved}`);
  console.log(`Unresolved: ${report.totals.unresolved}`);

  if (unresolved.length > 0) {
    console.log('Top unresolved URLs:');
    unresolved.slice(0, 30).forEach((entry) => {
      console.log(`${entry.url} | status=${entry.status ?? 'n/a'} | reason=${entry.reason}`);
    });
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('verify-all-urls-e2e failed');
  console.error(error);
  process.exit(1);
});
