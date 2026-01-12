const fs = require('fs');
const path = require('path');

const target = path.join('app', '(public)', 'soc-2', 'for', '[slug]');
if (fs.existsSync(target)) {
  fs.rmSync(target, { recursive: true, force: true });
  console.log(`Deleted ${target}`);
} else {
  console.log(`${target} does not exist`);
}
