
import { scrapePage } from '../lib/browser';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test() {
  const url = 'https://vanta.com/security';
  console.log(`Testing extraction for: ${url}`);
  console.log(`BROWSERLESS_API_KEY present: ${!!process.env.BROWSERLESS_API_KEY}`);

  console.log('\n--- Scraping with Browserless ---');
  const result = await scrapePage(url, true);
  
  if (result.success) {
    console.log('Success!');
    console.log('Title:', result.title);
    console.log('Text length:', result.text?.length);
    console.log('Text snippet:', result.text?.substring(0, 500) + '...');
    
    const hasSoc2 = /soc\s*2/i.test(result.text || '');
    console.log('Mentions SOC 2:', hasSoc2);
  } else {
    console.error('Failed:', result.error);
  }
}

test().catch(console.error);
