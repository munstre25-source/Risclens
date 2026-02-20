const FRAMEWORK_PREFIX_RE = /^(soc-2|iso-27001|pci-dss|hipaa|gdpr|ai-governance|iso-42001|eu-ai-act|nist-ai-rmf)-/;
const DECISION_PREFIX_RE = /^(certification|compliance|audit|security|implementation|gap|risk)-/;

const DECISION_ALIASES: Record<string, string> = {
  'certification-timeline': 'timeline',
  'certification-roadmap': 'timeline',
};

const INDUSTRY_ALIASES: Record<string, string> = {
  'ai-data': 'ai-ml',
};

const ROLE_ALIASES: Record<string, string> = {
  founders: 'founder',
  'backend-developer': 'backend-engineer',
  'security-engineers': 'security-engineer',
  'general-counsel': 'legal-counsel',
};

function sanitizeSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

function uniq(values: string[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const value of values) {
    const normalized = sanitizeSlug(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    ordered.push(normalized);
  }

  return ordered;
}

export function normalizeIndustrySlug(slug: string): string {
  const normalized = sanitizeSlug(slug);
  return INDUSTRY_ALIASES[normalized] || normalized;
}

export function normalizeRoleSlug(slug: string): string {
  const normalized = sanitizeSlug(slug);
  return ROLE_ALIASES[normalized] || normalized;
}

export function getRoleSlugCandidates(slug: string, frameworkSlug?: string): string[] {
  const base = sanitizeSlug(slug);
  const candidates = [base];

  if (frameworkSlug && base.startsWith(`${frameworkSlug}-`)) {
    candidates.push(base.slice(frameworkSlug.length + 1));
  }

  candidates.push(base.replace(FRAMEWORK_PREFIX_RE, ''));
  candidates.push(normalizeRoleSlug(base));

  const dePrefixed = base.replace(/^(ai-governance-for-|soc-2-for-|pci-dss-for-)/, '');
  if (dePrefixed !== base) {
    candidates.push(dePrefixed);
    candidates.push(normalizeRoleSlug(dePrefixed));
  }

  return uniq(candidates);
}

export function getDecisionSlugCandidates(slug: string, frameworkSlug?: string): string[] {
  const base = sanitizeSlug(slug);
  const candidates = [base];

  if (frameworkSlug && base.startsWith(`${frameworkSlug}-`)) {
    candidates.push(base.slice(frameworkSlug.length + 1));
  }

  candidates.push(base.replace(FRAMEWORK_PREFIX_RE, ''));

  for (const candidate of [...candidates]) {
    const alias = DECISION_ALIASES[candidate];
    if (alias) candidates.push(alias);

    const prefixStripped = candidate.replace(DECISION_PREFIX_RE, '');
    if (prefixStripped !== candidate) {
      candidates.push(prefixStripped);
      if (DECISION_ALIASES[prefixStripped]) {
        candidates.push(DECISION_ALIASES[prefixStripped]);
      }
    }

    const segments = candidate.split('-');
    if (segments.length > 1) {
      candidates.push(segments[segments.length - 1]);
    }
  }

  return uniq(candidates);
}

export function normalizeFrameworkSlug(slug: string): string {
  return sanitizeSlug(slug);
}

export function normalizeDecisionSlug(slug: string, frameworkSlug?: string): string {
  const [first] = getDecisionSlugCandidates(slug, frameworkSlug);
  return first || sanitizeSlug(slug);
}
