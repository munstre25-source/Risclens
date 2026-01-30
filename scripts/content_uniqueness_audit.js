const fs = require('fs');
const path = require('path');

const root = process.cwd();
const targets = ['app', 'components', 'lib', 'src'];
const exts = new Set(['.ts', '.tsx']);

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      walk(full, files);
    } else {
      const ext = path.extname(entry.name);
      if (exts.has(ext)) files.push(full);
    }
  }
  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function extractStrings(text) {
  const results = [];
  const regex = /(['"`])((?:\\\1|\\.|(?!\1).)*?)\1/gms;
  let match;
  while ((match = regex.exec(text))) {
    const quote = match[1];
    const value = match[2];
    if (quote === '`' && value.includes('${')) continue;
    const normalized = normalize(value);
    if (normalized.length < 80) continue;
    if (!/[a-zA-Z]/.test(normalized)) continue;
    results.push({ value: normalized, index: match.index });
  }
  return results;
}

const files = targets.flatMap(t => walk(path.join(root, t)));
const occurrences = new Map();

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const strings = extractStrings(text);
  for (const s of strings) {
    if (!occurrences.has(s.value)) occurrences.set(s.value, []);
    occurrences.get(s.value).push({ file, line: lineNumber(text, s.index) });
  }
}

const duplicates = Array.from(occurrences.entries())
  .filter(([, refs]) => refs.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

const reportPath = path.join(root, 'content_uniqueness_report.csv');
const lines = ['count,text,files'];
for (const [text, refs] of duplicates.slice(0, 200)) {
  const filesList = refs.map(r => `${path.relative(root, r.file)}:${r.line}`).join(' | ');
  const safeText = `"${text.replace(/"/g, '""')}"`;
  lines.push([refs.length, safeText, `"${filesList}"`].join(','));
}
fs.writeFileSync(reportPath, lines.join('\n'));

console.log(`Scanned ${files.length} files.`);
console.log(`Duplicate long strings: ${duplicates.length}`);
console.log(`Report: ${path.relative(root, reportPath)}`);
if (duplicates.length > 0) {
  const top = duplicates.slice(0, 10).map(([text, refs]) => ({
    count: refs.length,
    sample: text.slice(0, 120)
  }));
  console.table(top);
}
