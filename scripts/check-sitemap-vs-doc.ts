// Quick consistency check between sitemap output and docs/ROUTE_COUNTS.md
// Usage: npx tsx scripts/check-sitemap-vs-doc.ts

import fs from 'fs';
import path from 'path';
import sitemap from '../app/sitemap';

const docPath = path.join(process.cwd(), 'docs', 'ROUTE_COUNTS.md');

function parseDocCounts(md: string) {
  const match = md.match(/All sitemap URLs\*\*: (\d+)/);
  if (!match) return null;
  const total = Number(match[1]);
  const soc = Number(md.match(/- SOC 2: (\d+)/)?.[1] ?? NaN);
  const pentest = Number(md.match(/- Pentest: (\d+)/)?.[1] ?? NaN);
  const vr =
    Number(md.match(/- Vendor Risk \(VAR\): (\d+)/)?.[1] ?? NaN) ||
    Number(md.match(/## Vendor Risk \(VAR\) — (\d+)/)?.[1] ?? NaN);
  const other = Number(md.match(/- Other: (\d+)/)?.[1] ?? NaN);
  return { total, soc, pentest, vr, other };
}

function countSitemap() {
  const data = sitemap().map((d) => d.url.replace('https://risclens.com', ''));
  const soc = data.filter((u) => u.startsWith('/soc-2') || u.startsWith('/learn/soc-2') || u.startsWith('/when-do-you-need-soc-2')).length;
  const pentest = data.filter((u) => u.startsWith('/penetration-testing')).length;
  const vr = data.filter((u) => u.startsWith('/vendor-risk-assessment')).length;
  const other = data.length - soc - pentest - vr;
  return { total: data.length, soc, pentest, vr, other };
}

function main() {
  const md = fs.readFileSync(docPath, 'utf8');
  const doc = parseDocCounts(md);
  if (!doc) {
    console.error('Could not parse counts from docs/ROUTE_COUNTS.md');
    process.exit(1);
  }
  const map = countSitemap();

  const mismatch = Object.entries(doc).filter(([k, v]) => map[k as keyof typeof map] !== v);
  if (mismatch.length) {
    console.error('Mismatch between sitemap and docs/ROUTE_COUNTS.md:');
    mismatch.forEach(([k]) => {
      console.error(`  ${k}: doc=${doc[k as keyof typeof doc]} sitemap=${map[k as keyof typeof map]}`);
    });
    process.exit(1);
  } else {
    console.log('Sitemap and docs/ROUTE_COUNTS.md are aligned:', map);
  }
}

main();
