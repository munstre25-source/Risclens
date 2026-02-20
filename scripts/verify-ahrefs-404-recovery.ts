import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface VerificationResult {
  url: string;
  status: number | null;
  ok: boolean;
  reason: string;
  redirectedTo?: string;
}

const APPROVED_REDIRECTS: Record<string, string> = {
  '/compliance/directory/san-francisco': '/auditor-directory/san-francisco',
  '/compliance/directory/fintech': '/compliance/directory',
  '/compliance/directory/healthcare': '/compliance/directory',
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options: { inputFile: string; baseUrl: string; concurrency: number } = {
    inputFile: 'href2.csv',
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://risclens.com',
    concurrency: 20,
  };

  args.forEach((arg) => {
    if (arg.startsWith('--input=')) {
      options.inputFile = arg.replace('--input=', '').trim();
    }

    if (arg.startsWith('--base-url=')) {
      options.baseUrl = arg.replace('--base-url=', '').trim();
    }

    if (arg.startsWith('--concurrency=')) {
      const parsed = Number(arg.replace('--concurrency=', '').trim());
      if (!Number.isNaN(parsed) && parsed > 0) options.concurrency = parsed;
    }
  });

  return options;
}

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

  if (!lines.length) {
    return { headers: [], rows: [] };
  }

  const delimiter = lines[0].includes('\t') ? '\t' : ',';
  const headers = splitQuotedLine(lines[0], delimiter);
  const rows = lines.slice(1).map((line) => splitQuotedLine(line, delimiter));

  return { headers, rows };
}

function normalizePathname(input: string): string {
  const parsed = new URL(input);
  const pathname = parsed.pathname || '/';
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
}

function normalizeAbsoluteUrl(value: string, baseUrl: string): string {
  try {
    return new URL(value).toString();
  } catch {
    return new URL(value.startsWith('/') ? value : `/${value}`, baseUrl).toString();
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 20000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'user-agent': 'RiscLens-404-Recovery-Verification/1.0',
        accept: 'text/html,application/xhtml+xml',
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function verifyUrl(url: string): Promise<VerificationResult> {
  let response: Response | null = null;
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      response = await fetchWithTimeout(url);
      break;
    } catch (error) {
      lastError = error;
      const delay = 250 * (attempt + 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (!response) {
    const reason = lastError instanceof Error ? lastError.message : 'Network error';
    return {
      url,
      status: null,
      ok: false,
      reason,
    };
  }

  const pathname = normalizePathname(url);

  if (response.status === 200) {
    return {
      url,
      status: 200,
      ok: true,
      reason: 'ok',
    };
  }

  if (response.status >= 300 && response.status < 400) {
    const locationHeader = response.headers.get('location');

    if (!locationHeader) {
      return {
        url,
        status: response.status,
        ok: false,
        reason: 'redirect_without_location',
      };
    }

    const redirectedTo = new URL(locationHeader, url).toString();
    const redirectedPath = normalizePathname(redirectedTo);
    const approvedTarget = APPROVED_REDIRECTS[pathname];

    if (approvedTarget && redirectedPath === approvedTarget) {
      return {
        url,
        status: response.status,
        redirectedTo,
        ok: true,
        reason: 'approved_redirect',
      };
    }

    return {
      url,
      status: response.status,
      redirectedTo,
      ok: false,
      reason: approvedTarget ? 'unexpected_redirect_target' : 'unapproved_redirect',
    };
  }

  return {
    url,
    status: response.status,
    ok: false,
    reason: `status_${response.status}`,
  };
}

async function runBatched<T, U>(items: T[], concurrency: number, worker: (item: T) => Promise<U>): Promise<U[]> {
  const results: U[] = [];

  for (let index = 0; index < items.length; index += concurrency) {
    const batch = items.slice(index, index + concurrency);
    const batchResults = await Promise.all(batch.map((item) => worker(item)));
    results.push(...batchResults);
    console.log(`Verified ${Math.min(index + concurrency, items.length)} / ${items.length}`);
  }

  return results;
}

async function main() {
  const options = parseArgs();
  const inputFile = path.resolve(options.inputFile);
  const outputFile = path.resolve('reports', 'ahrefs-404-recovery-report.json');

  const rawBuffer = await fs.readFile(inputFile);
  const parsed = parseDelimitedFile(decodeCsvBuffer(rawBuffer));

  const targetIndex = parsed.headers.indexOf('Target URL');
  const statusIndex = parsed.headers.indexOf('Target HTTP status code');

  if (targetIndex === -1 || statusIndex === -1) {
    throw new Error('Missing expected Ahrefs columns: Target URL / Target HTTP status code');
  }

  const targets = Array.from(
    new Set(
      parsed.rows
        .filter((row) => {
          const statusCode = row[statusIndex]?.trim();
          return !statusCode || statusCode === '404';
        })
        .map((row) => row[targetIndex]?.trim())
        .filter((value): value is string => Boolean(value))
        .map((value) => normalizeAbsoluteUrl(value, options.baseUrl))
    )
  );

  console.log(`Verifying ${targets.length} unique targets from ${inputFile}`);

  const verificationResults = await runBatched(targets, options.concurrency, verifyUrl);
  const unresolved = verificationResults.filter((result) => !result.ok);

  const summary = {
    generatedAt: new Date().toISOString(),
    inputFile,
    baseUrl: options.baseUrl,
    totals: {
      checked: verificationResults.length,
      resolved: verificationResults.length - unresolved.length,
      unresolved: unresolved.length,
    },
    unresolved,
  };

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log(`Recovery report written to ${outputFile}`);
  console.log(`Resolved: ${summary.totals.resolved}`);
  console.log(`Unresolved: ${summary.totals.unresolved}`);

  if (unresolved.length) {
    console.log('Top unresolved targets:');
    unresolved.slice(0, 25).forEach((item) => {
      console.log(`${item.url} | status=${item.status ?? 'n/a'} | reason=${item.reason}`);
    });

    process.exit(1);
  }
}

main().catch((error) => {
  console.error('verify-ahrefs-404-recovery failed');
  console.error(error);
  process.exit(1);
});
