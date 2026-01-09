const fs = require('fs');
const content = fs.readFileSync('app/admin/AdminDashboard.tsx', 'utf8');

let braces = 0;
let parens = 0;
let brackets = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '{') braces++;
  else if (char === '}') braces--;
  else if (char === '(') parens++;
  else if (char === ')') parens--;
  else if (char === '[') brackets++;
  else if (char === ']') brackets--;

  if (braces < 0) console.log(`Extra closing brace at char ${i}`);
  if (parens < 0) console.log(`Extra closing paren at char ${i}`);
  if (brackets < 0) console.log(`Extra closing bracket at char ${i}`);
}

console.log(`Final counts: braces=${braces}, parens=${parens}, brackets=${brackets}`);
