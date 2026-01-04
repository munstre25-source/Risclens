import sitemap from '../app/sitemap';

const BASE = 'https://risclens.com';

function fail(message: string): never {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function main() {
  const entries = await sitemap();
  if (!Array.isArray(entries) || entries.length === 0) {
    fail('Sitemap returned no entries.');
  }

  const urls = entries.map((entry) => entry.url);

  // Basic validations
  if (urls.some((url) => !url || typeof url !== 'string')) {
    fail('Found empty or non-string URL.');
  }

  if (urls.some((url) => !url.startsWith(BASE))) {
    fail('Found URL not starting with canonical base.');
  }

  const normalized = urls.map((url) => {
    // Normalize trailing slash: only base URL may end without a path.
    if (url === BASE) return url;
    return url.replace(/\/+$/, '');
  });

  const seen = new Set<string>();
  const duplicates: string[] = [];
  normalized.forEach((url) => {
    if (seen.has(url)) {
      duplicates.push(url);
    }
    seen.add(url);
  });

  if (duplicates.length) {
    fail(`Duplicate URLs detected: ${Array.from(new Set(duplicates)).join(', ')}`);
  }

  // Ensure deterministic ordering.
  const sorted = [...urls].sort((a, b) => a.localeCompare(b));
  for (let i = 0; i < urls.length; i += 1) {
    if (urls[i] !== sorted[i]) {
      fail('Sitemap URLs are not sorted deterministically.');
    }
  }

  console.log(`PASS: ${urls.length} URLs validated, canonical and unique.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
