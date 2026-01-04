import { MetadataRoute } from 'next';
import { ROUTES } from '@/src/seo/routes';

const baseUrl = 'https://risclens.com';

type RouteEntry = {
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;
  lastModified?: Date;
};

const monthlyPaths = new Set(['/privacy', '/terms', '/learn/soc-2-readiness']);
const noindexPaths = new Set(['/soc-2-readiness-calculator', '/start']);

const routes: RouteEntry[] = ROUTES.map((path) => {
  const normalizedPath = normalizePath(path);
  const isRoot = normalizedPath === '/';

  if (noindexPaths.has(normalizedPath)) {
    return null as unknown as RouteEntry;
  }

  return {
    path: normalizedPath,
    changeFrequency: monthlyPaths.has(normalizedPath) ? 'monthly' : 'weekly',
    priority: isRoot ? 1 : 0.8,
    // Only include lastModified when per-page accuracy is available; omitted by default to avoid misleading metadata.
  };
})
  .filter(Boolean)
  .map((entry) => ({ ...entry, path: normalizePath(entry!.path) })) as RouteEntry[];

function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.trim();
  if (trimmed === '/') return '/';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

function toAbsoluteUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  return normalizedPath === '/' ? baseUrl : new URL(normalizedPath, baseUrl).toString();
}

function dedupeByUrl(entries: RouteEntry[]): RouteEntry[] {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  const unique: RouteEntry[] = [];

  entries.forEach((entry) => {
    const url = toAbsoluteUrl(entry.path);
    if (seen.has(url)) {
      duplicates.push(url);
      return;
    }
    seen.add(url);
    unique.push(entry);
  });

  if (duplicates.length && process.env.NODE_ENV !== 'production') {
    // Dev-only guardrail to surface accidental duplicates during local checks.
    console.warn('[sitemap] Removed duplicate URLs:', Array.from(new Set(duplicates)));
  }

  return unique;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const unique = dedupeByUrl(routes);
  const sorted = unique.sort((a, b) => {
    const urlA = toAbsoluteUrl(a.path);
    const urlB = toAbsoluteUrl(b.path);
    return urlA.localeCompare(urlB);
  });

  return sorted.map(({ path, changeFrequency, priority, lastModified }) => ({
    url: toAbsoluteUrl(path),
    changeFrequency,
    priority,
    ...(lastModified ? { lastModified } : {}),
  }));
}
