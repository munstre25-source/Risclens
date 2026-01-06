
import { ROUTES } from './src/seo/routes';

function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.trim();
  if (trimmed === '/') return '/';
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, '');
}

const data = Array.from(new Set(ROUTES.map(normalizePath)));

const soc = data.filter((u) => u.startsWith('/soc-2') || u.startsWith('/learn/soc-2') || u.startsWith('/when-do-you-need-soc-2') || u.startsWith('/compliance-roi-calculator') || u.startsWith('/iso-27001-checklist') || u.startsWith('/auditor-directory')).length;
// Wait, the script in check-sitemap-vs-doc.ts defines SOC category as:
// const soc = data.filter((u) => u.startsWith('/soc-2') || u.startsWith('/learn/soc-2') || u.startsWith('/when-do-you-need-soc-2')).length;

const pentest = data.filter((u) => u.startsWith('/penetration-testing')).length;
const vr = data.filter((u) => u.startsWith('/vendor-risk-assessment')).length;
const other = data.length - soc - pentest - vr;

console.log('Total:', data.length);
console.log('SOC 2:', soc);
console.log('Pentest:', pentest);
console.log('Vendor Risk:', vr);
console.log('Other:', other);

// Categories for report
const soc2Sales = data.filter(u => u.startsWith('/soc-2-sales')).length;
console.log('SOC 2 Sales:', soc2Sales);
