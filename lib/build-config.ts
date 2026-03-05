function intEnv(name: string, fallback: number): number {
  const value = process.env[name];
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const DIRECTORY_BUILD_LIMIT = intEnv('DIRECTORY_BUILD_LIMIT', 800);
const SOC2_BUILD_LIMIT = intEnv('SOC2_BUILD_LIMIT', 200);
const SITEMAP_MAX_URLS = intEnv('SITEMAP_MAX_URLS', 1000);

export const BUILD_CONFIG = {
  SOC2_DIRECTORY_FOCUS_MODE: true,
  MAX_STATIC_PAGES: DIRECTORY_BUILD_LIMIT + SOC2_BUILD_LIMIT,
  REVALIDATE_SECONDS: 86400,
  SITEMAP_MAX_URLS,
  DIRECTORY_BUILD_LIMIT,
  SOC2_BUILD_LIMIT,
  PRIORITY_FRAMEWORKS: ['soc-2'],
  PRIORITY_INDUSTRIES: ['saas', 'fintech', 'healthcare', 'ai-ml'],
  PRIORITY_TOOLS: ['vanta', 'drata', 'secureframe', 'sprinto', 'thoropass'],
  ROUTE_LIMITS: {
    frameworkMatrix: 0,
    roleMatrix: 0,
    compareIndustry: 0,
    directory: DIRECTORY_BUILD_LIMIT,
    soc2Framework: SOC2_BUILD_LIMIT,
    other: 0,
  },
  DECISIONS_PER_FRAMEWORK: 0,
  INDUSTRIES_PER_ROUTE: 0,
  ROLES_LIMIT: 0,
};

export function limitStaticParams<T>(params: T[], limit: number): T[] {
  return params.slice(0, limit);
}

export function isPriorityFramework(slug: string): boolean {
  return BUILD_CONFIG.PRIORITY_FRAMEWORKS.includes(slug);
}

export function isPriorityIndustry(slug: string): boolean {
  return BUILD_CONFIG.PRIORITY_INDUSTRIES.includes(slug);
}

export function isPriorityTool(slug: string): boolean {
  return BUILD_CONFIG.PRIORITY_TOOLS.includes(slug);
}
