import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    
    const companies = [
      { name: 'Stripe', slug: 'stripe', domain: 'stripe.com' },
      { name: 'Vercel', slug: 'vercel', domain: 'vercel.com' },
      { name: 'Auth0', slug: 'auth0', domain: 'auth0.com' },
      { name: 'Supabase', slug: 'supabase', domain: 'supabase.com' },
      { name: 'HubSpot', slug: 'hubspot', domain: 'hubspot.com' },
      { name: 'Okta', slug: 'okta', domain: 'okta.com' },
      { name: 'GitHub', slug: 'github', domain: 'github.com' },
      { name: 'Slack', slug: 'slack', domain: 'slack.com' },
      { name: 'Snowflake', slug: 'snowflake', domain: 'snowflake.com' },
      { name: 'Datadog', slug: 'datadog', domain: 'datadoghq.com' },
      { name: 'MongoDB', slug: 'mongodb', domain: 'mongodb.com' },
      { name: 'Zoom', slug: 'zoom', domain: 'zoom.us' },
      { name: 'Atlassian', slug: 'atlassian', domain: 'atlassian.com' },
      { name: 'Salesforce', slug: 'salesforce', domain: 'salesforce.com' },
      { name: 'Adobe', slug: 'adobe', domain: 'adobe.com' },
      { name: 'Shopify', slug: 'shopify', domain: 'shopify.com' },
      { name: 'ServiceNow', slug: 'servicenow', domain: 'servicenow.com' },
      { name: 'Workday', slug: 'workday', domain: 'workday.com' },
      { name: 'Square', slug: 'square', domain: 'squareup.com' },
      { name: 'Twilio', slug: 'twilio', domain: 'twilio.com' },
      { name: 'Zendesk', slug: 'zendesk', domain: 'zendesk.com' },
      { name: 'Cloudflare', slug: 'cloudflare', domain: 'cloudflare.com' },
      { name: 'ZoomInfo', slug: 'zoominfo', domain: 'zoominfo.com' },
      { name: 'DocuSign', slug: 'docusign', domain: 'docusign.com' },
      { name: 'PagerDuty', slug: 'pagerduty', domain: 'pagerduty.com' },
      { name: 'Asana', slug: 'asana', domain: 'asana.com' },
      { name: 'Monday.com', slug: 'monday', domain: 'monday.com' },
      { name: 'Notion', slug: 'notion', domain: 'notion.so' },
      { name: 'Figma', slug: 'figma', domain: 'figma.com' },
      { name: 'Canva', slug: 'canva', domain: 'canva.com' },
      { name: 'Miro', slug: 'miro', domain: 'miro.com' },
      { name: 'Airtable', slug: 'airtable', domain: 'airtable.com' },
      { name: 'Zapier', slug: 'zapier', domain: 'zapier.com' },
      { name: 'Box', slug: 'box', domain: 'box.com' },
      { name: 'Dropbox', slug: 'dropbox', domain: 'dropbox.com' },
      { name: 'Intercom', slug: 'intercom', domain: 'intercom.com' },
      { name: 'Segment', slug: 'segment', domain: 'segment.com' },
      { name: 'Postman', slug: 'postman', domain: 'postman.com' },
      { name: 'Docker', slug: 'docker', domain: 'docker.com' },
      { name: 'HashiCorp', slug: 'hashicorp', domain: 'hashicorp.com' },
      { name: 'Elastic', slug: 'elastic', domain: 'elastic.co' },
      { name: 'Confluent', slug: 'confluent', domain: 'confluent.io' },
      { name: 'Fastly', slug: 'fastly', domain: 'fastly.com' },
      { name: 'New Relic', slug: 'newrelic', domain: 'newrelic.com' },
      { name: 'Snyk', slug: 'snyk', domain: 'snyk.io' },
      { name: 'Wiz', slug: 'wiz', domain: 'wiz.io' },
      { name: 'Netskope', slug: 'netskope', domain: 'netskope.com' },
      { name: 'Zscaler', slug: 'zscaler', domain: 'zscaler.com' },
      { name: 'CrowdStrike', slug: 'crowdstrike', domain: 'crowdstrike.com' },
      { name: 'SentinelOne', slug: 'sentinelone', domain: 'sentinelone.com' }
    ].map(c => ({
      ...c,
      signal_score: 0,
      indexable: true,
      public_signals: {}
    }));

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
