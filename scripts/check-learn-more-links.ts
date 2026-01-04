import { learnMoreLinks } from '../lib/learnMoreLinks';

const errors: string[] = [];

Object.entries(learnMoreLinks).forEach(([key, href]) => {
  if (!href) {
    errors.push(`Key "${key}" is empty`);
    return;
  }
  if (!href.startsWith('/')) {
    errors.push(`Key "${key}" must start with "/": ${href}`);
  }
});

if (errors.length) {
  console.error('Learn more link validation failed:');
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

console.log('Learn more links are valid.');
