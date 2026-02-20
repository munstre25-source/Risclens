import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

type ClassifiedFamily =
  | 'matrix_framework_industry'
  | 'framework_slug'
  | 'compliance_framework_slug'
  | 'role_page'
  | 'pricing_page'
  | 'compare_page'
  | 'alternatives_page'
  | 'readiness_hub'
  | 'directory_legacy'
  | 'other';

type RestoreAction =
  | 'restore_via_matrix_normalization'
  | 'restore_via_framework_fallback'
  | 'restore_via_role_page_upsert'
  | 'restore_via_pricing_page_or_tool_fallback'
  | 'restore_via_compare_synth_fallback'
  | 'restore_via_alternatives_upsert'
  | 'restore_via_readiness_hub_route'
  | 'redirect_structural_directory_target'
  | 'manual_review';

interface RestoreEntry {
  url: string;
  pathname: string;
  linkCount: number;
  family: ClassifiedFamily;
  action: RestoreAction;
  framework?: string;
  primarySlug?: string;
  secondarySlug?: string;
  approvedRedirectTarget?: string;
}

interface RestoreReport {
  generatedAt: string;
  inputFile: string;
  totals: {
    total404Links: number;
    unique404Targets: number;
  };
  frameworksPresent: string[];
  countsByFamily: Record<string, number>;
  countsByAction: Record<string, number>;
  topTargets: Array<{ url: string; linkCount: number }>;
  restoreSet: RestoreEntry[];
}

const FRAMEWORKS = [
  'soc-2',
  'iso-27001',
  'pci-dss',
  'ai-governance',
  'hipaa',
  'gdpr',
  'nist-csf',
  'iso-42001',
  'nist-ai-rmf',
  'soc-3',
  'eu-ai-act',
  'tisax',
];

const STRUCTURAL_DIRECTORY_REDIRECTS: Record<string, string> = {
  '/compliance/directory/san-francisco': '/auditor-directory/san-francisco',
  '/compliance/directory/fintech': '/compliance/directory',
  '/compliance/directory/healthcare': '/compliance/directory',
};

function decodeCsvBuffer(buffer: Buffer): string {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.slice(2).toString('utf16le');
  }

  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    const swapped = Buffer.allocUnsafe(buffer.length - 2);
    for (let i = 2; i < buffer.length; i += 2) {
      swapped[i - 2] = buffer[i + 1];
      swapped[i - 1] = buffer[i];
    }
    return swapped.toString('utf16le');
  }

  return buffer.toString('utf8');
}

function splitQuotedLine(line: string, delimiter: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === delimiter && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseDelimitedFile(rawText: string): { headers: string[]; rows: string[][] } {
  const normalized = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = normalized.split('\n').filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const sampleHeader = lines[0];
  const delimiter = sampleHeader.includes('\t') ? '\t' : ',';
  const headers = splitQuotedLine(sampleHeader, delimiter);
  const rows = lines.slice(1).map((line) => splitQuotedLine(line, delimiter));

  return { headers, rows };
}

function normalizePathname(input: string): string {
  try {
    const parsed = new URL(input);
    const pathname = parsed.pathname || '/';
    return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  } catch {
    if (!input) return '/';
    const pathname = input.startsWith('/') ? input : `/${input}`;
    return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  }
}

function classifyTarget(url: string): Omit<RestoreEntry, 'url' | 'linkCount'> {
  const pathname = normalizePathname(url);

  if (pathname === '/soc-2-readiness') {
    return {
      pathname,
      family: 'readiness_hub',
      action: 'restore_via_readiness_hub_route',
    };
  }

  if (/^\/soc-2-readiness\/[^/]+$/.test(pathname)) {
    return {
      pathname,
      family: 'readiness_hub',
      action: 'restore_via_readiness_hub_route',
      framework: 'soc-2',
      primarySlug: pathname.split('/')[2],
    };
  }

  if (pathname in STRUCTURAL_DIRECTORY_REDIRECTS) {
    return {
      pathname,
      family: 'directory_legacy',
      action: 'redirect_structural_directory_target',
      approvedRedirectTarget: STRUCTURAL_DIRECTORY_REDIRECTS[pathname],
    };
  }

  const roleMatch = pathname.match(/^\/soc-2\/for\/([^/]+)$/);
  if (roleMatch) {
    return {
      pathname,
      family: 'role_page',
      action: 'restore_via_role_page_upsert',
      framework: 'soc-2',
      primarySlug: roleMatch[1],
    };
  }

  const pricingMatch = pathname.match(/^\/pricing\/([^/]+)$/);
  if (pricingMatch) {
    return {
      pathname,
      family: 'pricing_page',
      action: 'restore_via_pricing_page_or_tool_fallback',
      primarySlug: pricingMatch[1],
    };
  }

  const compareMatch = pathname.match(/^\/compare\/([^/]+)$/);
  if (compareMatch) {
    const compareSlug = compareMatch[1];
    if (compareSlug.endsWith('-alternatives')) {
      return {
        pathname,
        family: 'alternatives_page',
        action: 'restore_via_alternatives_upsert',
        primarySlug: compareSlug.replace(/-alternatives$/, ''),
      };
    }

    if (compareSlug.includes('-vs-')) {
      const [toolA, toolB] = compareSlug.split('-vs-');
      return {
        pathname,
        family: 'compare_page',
        action: 'restore_via_compare_synth_fallback',
        primarySlug: toolA,
        secondarySlug: toolB,
      };
    }
  }

  const matrixMatch = pathname.match(/^\/([^/]+)\/([^/]+)\/([^/]+)$/);
  if (matrixMatch && FRAMEWORKS.includes(matrixMatch[1])) {
    return {
      pathname,
      family: 'matrix_framework_industry',
      action: 'restore_via_matrix_normalization',
      framework: matrixMatch[1],
      primarySlug: matrixMatch[2],
      secondarySlug: matrixMatch[3],
    };
  }

  const roleMatrixMatch = pathname.match(/^\/([^/]+)\/for\/([^/]+)\/([^/]+)$/);
  if (roleMatrixMatch && FRAMEWORKS.includes(roleMatrixMatch[1])) {
    return {
      pathname,
      family: 'matrix_framework_industry',
      action: 'restore_via_matrix_normalization',
      framework: roleMatrixMatch[1],
      primarySlug: roleMatrixMatch[2],
      secondarySlug: roleMatrixMatch[3],
    };
  }

  const frameworkSlugMatch = pathname.match(/^\/([^/]+)\/([^/]+)$/);
  if (frameworkSlugMatch && FRAMEWORKS.includes(frameworkSlugMatch[1])) {
    return {
      pathname,
      family: 'framework_slug',
      action: 'restore_via_framework_fallback',
      framework: frameworkSlugMatch[1],
      primarySlug: frameworkSlugMatch[2],
    };
  }

  const complianceFrameworkSlugMatch = pathname.match(/^\/compliance\/([^/]+)\/([^/]+)$/);
  if (complianceFrameworkSlugMatch && FRAMEWORKS.includes(complianceFrameworkSlugMatch[1])) {
    return {
      pathname,
      family: 'compliance_framework_slug',
      action: 'restore_via_framework_fallback',
      framework: complianceFrameworkSlugMatch[1],
      primarySlug: complianceFrameworkSlugMatch[2],
    };
  }

  return {
    pathname,
    family: 'other',
    action: 'manual_review',
  };
}

function toCountMap(entries: RestoreEntry[], key: 'family' | 'action'): Record<string, number> {
  const countMap: Record<string, number> = {};

  entries.forEach((entry) => {
    const token = entry[key];
    countMap[token] = (countMap[token] || 0) + entry.linkCount;
  });

  return Object.fromEntries(Object.entries(countMap).sort((a, b) => b[1] - a[1]));
}

async function main() {
  const inputArg = process.argv[2];
  const inputFile = inputArg ? path.resolve(inputArg) : path.resolve('href2.csv');
  const outputFile = path.resolve('reports', 'ahrefs-404-restore-plan.json');

  const rawBuffer = await fs.readFile(inputFile);
  const parsed = parseDelimitedFile(decodeCsvBuffer(rawBuffer));

  if (!parsed.headers.length) {
    throw new Error(`Unable to parse headers from ${inputFile}`);
  }

  const targetUrlIndex = parsed.headers.indexOf('Target URL');
  const statusIndex = parsed.headers.indexOf('Target HTTP status code');

  if (targetUrlIndex === -1 || statusIndex === -1) {
    throw new Error('Missing expected Ahrefs columns: Target URL / Target HTTP status code');
  }

  const linkCountByTarget = new Map<string, number>();

  parsed.rows.forEach((row) => {
    const targetUrl = row[targetUrlIndex]?.trim();
    const statusCode = row[statusIndex]?.trim();

    if (!targetUrl) return;
    if (statusCode && statusCode !== '404') return;

    linkCountByTarget.set(targetUrl, (linkCountByTarget.get(targetUrl) || 0) + 1);
  });

  const restoreSet: RestoreEntry[] = [...linkCountByTarget.entries()]
    .map(([url, linkCount]) => {
      const classified = classifyTarget(url);
      return {
        url,
        linkCount,
        ...classified,
      };
    })
    .sort((a, b) => b.linkCount - a.linkCount);

  const frameworksPresent = Array.from(
    new Set(
      restoreSet
        .map((entry) => entry.framework)
        .filter((framework): framework is string => Boolean(framework))
    )
  ).sort();

  const report: RestoreReport = {
    generatedAt: new Date().toISOString(),
    inputFile,
    totals: {
      total404Links: restoreSet.reduce((acc, entry) => acc + entry.linkCount, 0),
      unique404Targets: restoreSet.length,
    },
    frameworksPresent,
    countsByFamily: toCountMap(restoreSet, 'family'),
    countsByAction: toCountMap(restoreSet, 'action'),
    topTargets: restoreSet.slice(0, 40).map((entry) => ({ url: entry.url, linkCount: entry.linkCount })),
    restoreSet,
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  console.log(`Generated restore plan: ${outputFile}`);
  console.log(`Total 404 links: ${report.totals.total404Links}`);
  console.log(`Unique 404 targets: ${report.totals.unique404Targets}`);
  console.log(`Frameworks in restore set: ${frameworksPresent.join(', ') || 'none'}`);
}

main().catch((error) => {
  console.error('restore-ahrefs-404-content failed');
  console.error(error);
  process.exit(1);
});
