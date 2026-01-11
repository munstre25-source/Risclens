const https = require('https');

const supabaseUrl = 'txbluzobjjlpbocpyygt.supabase.co';
const serviceKey = 'sb_secret_F-QiN2cnIka26QAk2Dwsbw_qDTlM2tu';

const pages = [
  {
    slug: 'fintech',
    title: 'SOC 2 Cost for Fintech',
    description: 'Specialized breakdown of audit fees and implementation costs for fintech and payment platforms.',
    content_json: {
      highlights: [
        'Pay-fac and PII scope considerations for audit pricing.',
        'Cost of layered monitoring and high-availability evidence.',
        'Vendor risk budget for critical financial sub-processors.'
      ]
    },
    last_reviewed_at: new Date().toISOString(),
    framework_version: 'SOC 2 (2026)'
  },
  {
    slug: 'saas',
    title: 'SOC 2 Cost for SaaS',
    description: 'Budgeting for multi-tenant architectures, CI/CD pipelines, and cloud-native security controls.',
    content_json: {
      highlights: [
        'Balancing rapid release cycles with evidence collection costs.',
        'Automation ROI for high-growth SaaS platforms.',
        'Tenant isolation and data residency cost factors.'
      ]
    },
    last_reviewed_at: new Date().toISOString(),
    framework_version: 'SOC 2 (2026)'
  }
];

async function seed() {
  for (const page of pages) {
    const data = JSON.stringify(page);
    const options = {
      hostname: supabaseUrl,
      port: 443,
      path: '/rest/v1/content_pages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'resolution=merge-duplicates'
      }
    };

    const req = https.request(options, (res) => {
      console.log(`Page ${page.slug}: ${res.statusCode}`);
    });

    req.on('error', (error) => {
      console.error(`Error ${page.slug}:`, error);
    });

    req.write(data);
    req.end();
  }
}

seed();
