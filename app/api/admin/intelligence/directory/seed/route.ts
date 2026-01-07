import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    
    const companies = [
      {
        name: 'Stripe',
        slug: 'stripe',
        domain: 'stripe.com',
        signal_score: 94,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://stripe.com/docs/security',
          trust_url: 'https://stripe.com/docs/security/stripe-security',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Vercel',
        slug: 'vercel',
        domain: 'vercel.com',
        signal_score: 92,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://vercel.com/security',
          trust_url: 'https://vercel.com/security',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Auth0',
        slug: 'auth0',
        domain: 'auth0.com',
        signal_score: 91,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://auth0.com/security',
          trust_url: 'https://auth0.com/security/compliance',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Supabase',
        slug: 'supabase',
        domain: 'supabase.com',
        signal_score: 90,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://supabase.com/security',
          trust_url: 'https://supabase.com/security',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'HubSpot',
        slug: 'hubspot',
        domain: 'hubspot.com',
        signal_score: 90,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.hubspot.com/security',
          trust_url: 'https://trust.hubspot.com',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Okta',
        slug: 'okta',
        domain: 'okta.com',
        signal_score: 90,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.okta.com/security',
          trust_url: 'https://trust.okta.com',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Split',
        slug: 'split',
        domain: 'split.io',
        signal_score: 89,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.split.io/security',
          trust_url: 'https://www.split.io/trust-center',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Salesloft',
        slug: 'salesloft',
        domain: 'salesloft.com',
        signal_score: 89,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://salesloft.com/security',
          trust_url: 'https://trust.salesloft.com',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'GitHub',
        slug: 'github',
        domain: 'github.com',
        signal_score: 88,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://github.com/security',
          trust_url: 'https://github.com/security/compliance',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Slack',
        slug: 'slack',
        domain: 'slack.com',
        signal_score: 88,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://slack.com/security',
          trust_url: 'https://slack.com/trust',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Snowflake',
        slug: 'snowflake',
        domain: 'snowflake.com',
        signal_score: 88,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.snowflake.com/security',
          trust_url: 'https://www.snowflake.com/trust-center',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Datadog',
        slug: 'datadog',
        domain: 'datadoghq.com',
        signal_score: 87,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.datadoghq.com/security',
          trust_url: 'https://www.datadoghq.com/trust-center',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Drift',
        slug: 'drift',
        domain: 'drift.com',
        signal_score: 86,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.drift.com/security',
          trust_url: 'https://www.drift.com/trust',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'MongoDB',
        slug: 'mongodb',
        domain: 'mongodb.com',
        signal_score: 86,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://www.mongodb.com/security',
          trust_url: 'https://www.mongodb.com/trust-center',
          soc2_status: 'Type II'
        }
      },
      {
        name: 'Zoom',
        slug: 'zoom',
        domain: 'zoom.us',
        signal_score: 85,
        indexable: true,
        public_signals: {
          has_security_page: true,
          has_trust_page: true,
          mentions_soc2: true,
          security_url: 'https://zoom.us/security',
          trust_url: 'https://zoom.us/trust',
          soc2_status: 'Type II'
        }
      }
    ];

    const { data, error } = await supabase
      .from('company_signals')
      .upsert(companies, { onConflict: 'slug' });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: companies.length });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
