
import { getSupabaseAdmin } from '../lib/supabase';

const companies = [
  {
    name: 'Vercel',
    slug: 'vercel',
    domain: 'vercel.com',
    signal_score: 94,
    indexable: true,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_page_url: 'https://vercel.com/security',
      security_page_url: 'https://vercel.com/security'
    }
  },
  {
    name: 'Supabase',
    slug: 'supabase',
    domain: 'supabase.com',
    signal_score: 92,
    indexable: true,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_page_url: 'https://supabase.com/security',
      security_page_url: 'https://supabase.com/security'
    }
  },
  {
    name: 'Stripe',
    slug: 'stripe',
    domain: 'stripe.com',
    signal_score: 98,
    indexable: true,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_page_url: 'https://stripe.com/docs/security',
      security_page_url: 'https://stripe.com/docs/security'
    }
  },
  {
    name: 'Slack',
    slug: 'slack',
    domain: 'slack.com',
    signal_score: 95,
    indexable: true,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_page_url: 'https://slack.com/trust',
      security_page_url: 'https://slack.com/security'
    }
  },
  {
    name: 'GitHub',
    slug: 'github',
    domain: 'github.com',
    signal_score: 96,
    indexable: true,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_page_url: 'https://github.com/security',
      security_page_url: 'https://github.com/security'
    }
  }
];

async function seed() {
  console.log('🌱 Seeding company_signals...');
  const supabase = getSupabaseAdmin();

  for (const company of companies) {
    const { error } = await supabase
      .from('company_signals')
      .upsert(company, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Failed to seed ${company.name}:`, error.message);
    } else {
      console.log(`✅ Seeded ${company.name}`);
    }
  }
  console.log('✨ Seeding complete!');
}

seed();
