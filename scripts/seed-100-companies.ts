
import { getSupabaseAdmin } from '../lib/supabase';

const companies = [
  { name: 'Adobe', domain: 'adobe.com', slug: 'adobe' },
  { name: 'Airwallex', domain: 'airwallex.com', slug: 'airwallex' },
  { name: 'Asana', domain: 'asana.com', slug: 'asana' },
  { name: 'Atlassian', domain: 'atlassian.com', slug: 'atlassian' },
  { name: 'Auth0', domain: 'auth0.com', slug: 'auth0' },
  { name: 'Box', domain: 'box.com', slug: 'box' },
  { name: 'Brex', domain: 'brex.com', slug: 'brex' },
  { name: 'Canva', domain: 'canva.com', slug: 'canva' },
  { name: 'Checkr', domain: 'checkr.com', slug: 'checkr' },
  { name: 'ClickUp', domain: 'clickup.com', slug: 'clickup' },
  { name: 'Cloudflare', domain: 'cloudflare.com', slug: 'cloudflare' },
  { name: 'Coda', domain: 'coda.io', slug: 'coda' },
  { name: 'Confluent', domain: 'confluent.io', slug: 'confluent' },
  { name: 'CrowdStrike', domain: 'crowdstrike.com', slug: 'crowdstrike' },
  { name: 'Databricks', domain: 'databricks.com', slug: 'databricks' },
  { name: 'Datadog', domain: 'datadoghq.com', slug: 'datadog' },
  { name: 'Deel', domain: 'deel.com', slug: 'deel' },
  { name: 'DigitalOcean', domain: 'digitalocean.com', slug: 'digitalocean' },
  { name: 'DocuSign', domain: 'docusign.com', slug: 'docusign' },
  { name: 'DoorDash', domain: 'doordash.com', slug: 'doordash' },
  { name: 'Dropbox', domain: 'dropbox.com', slug: 'dropbox' },
  { name: 'Elastic', domain: 'elastic.co', slug: 'elastic' },
  { name: 'Figma', domain: 'figma.com', slug: 'figma' },
  { name: 'Five9', domain: 'five9.com', slug: 'five9' },
  { name: 'Flexport', domain: 'flexport.com', slug: 'flexport' },
  { name: 'Freshworks', domain: 'freshworks.com', slug: 'freshworks' },
  { name: 'GitLab', domain: 'gitlab.com', slug: 'gitlab' },
  { name: 'Gorgias', domain: 'gorgias.com', slug: 'gorgias' },
  { name: 'Grammarly', domain: 'grammarly.com', slug: 'grammarly' },
  { name: 'HashiCorp', domain: 'hashicorp.com', slug: 'hashicorp' },
  { name: 'HubSpot', domain: 'hubspot.com', slug: 'hubspot' },
  { name: 'Instacart', domain: 'instacart.com', slug: 'instacart' },
  { name: 'Intercom', domain: 'intercom.com', slug: 'intercom' },
  { name: 'Intuit', domain: 'intuit.com', slug: 'intuit' },
  { name: 'Ironclad', domain: 'ironcladapp.com', slug: 'ironclad' },
  { name: 'Jira', domain: 'atlassian.com/software/jira', slug: 'jira' },
  { name: 'Klaviyo', domain: 'klaviyo.com', slug: 'klaviyo' },
  { name: 'LaunchDarkly', domain: 'launchdarkly.com', slug: 'launchdarkly' },
  { name: 'Linear', domain: 'linear.app', slug: 'linear' },
  { name: 'Linktree', domain: 'linktr.ee', slug: 'linktree' },
  { name: 'LogDNA', domain: 'logdna.com', slug: 'logdna' },
  { name: 'Loom', domain: 'loom.com', slug: 'loom' },
  { name: 'Lucid', domain: 'lucid.co', slug: 'lucid' },
  { name: 'Mailchimp', domain: 'mailchimp.com', slug: 'mailchimp' },
  { name: 'Miro', domain: 'miro.com', slug: 'miro' },
  { name: 'Mixpanel', domain: 'mixpanel.com', slug: 'mixpanel' },
  { name: 'Monday.com', domain: 'monday.com', slug: 'monday' },
  { name: 'MongoDB', domain: 'mongodb.com', slug: 'mongodb' },
  { name: 'Mural', domain: 'mural.co', slug: 'mural' },
  { name: 'Netlify', domain: 'netlify.com', slug: 'netlify' },
  { name: 'New Relic', domain: 'newrelic.com', slug: 'newrelic' },
  { name: 'Notion', domain: 'notion.so', slug: 'notion' },
  { name: 'Okta', domain: 'okta.com', slug: 'okta' },
  { name: 'OneTrust', domain: 'onetrust.com', slug: 'onetrust' },
  { name: 'OpenAI', domain: 'openai.com', slug: 'openai' },
  { name: 'PagerDuty', domain: 'pagerduty.com', slug: 'pagerduty' },
  { name: 'Palantir', domain: 'palantir.com', slug: 'palantir' },
  { name: 'Pendo', domain: 'pendo.io', slug: 'pendo' },
  { name: 'Personio', domain: 'personio.com', slug: 'personio' },
  { name: 'Postman', domain: 'postman.com', slug: 'postman' },
  { name: 'Qualtrics', domain: 'qualtrics.com', slug: 'qualtrics' },
  { name: 'Ramper', domain: 'ramp.com', slug: 'ramp' },
  { name: 'Retool', domain: 'retool.com', slug: 'retool' },
  { name: 'Rippling', domain: 'rippling.com', slug: 'rippling' },
  { name: 'Salesforce', domain: 'salesforce.com', slug: 'salesforce' },
  { name: 'Segment', domain: 'segment.com', slug: 'segment' },
  { name: 'SentinelOne', domain: 'sentinelone.com', slug: 'sentinelone' },
  { name: 'ServiceNow', domain: 'servicenow.com', slug: 'servicenow' },
  { name: 'Shopify', domain: 'shopify.com', slug: 'shopify' },
  { name: 'Snyk', domain: 'snyk.io', slug: 'snyk' },
  { name: 'Snowflake', domain: 'snowflake.com', slug: 'snowflake' },
  { name: 'Splunk', domain: 'splunk.com', slug: 'splunk' },
  { name: 'Squarespace', domain: 'squarespace.com', slug: 'squarespace' },
  { name: 'Ssh', domain: 'ssh.com', slug: 'ssh' },
  { name: 'Stripe', domain: 'stripe.com', slug: 'stripe' },
  { name: 'Sumo Logic', domain: 'sumologic.com', slug: 'sumologic' },
  { name: 'Tanium', domain: 'tanium.com', slug: 'tanium' },
  { name: 'Teampay', domain: 'teampay.co', slug: 'teampay' },
  { name: 'Tessian', domain: 'tessian.com', slug: 'tessian' },
  { name: 'Toast', domain: 'toasttab.com', slug: 'toast' },
  { name: 'Trello', domain: 'trello.com', slug: 'trello' },
  { name: 'Twilio', domain: 'twilio.com', slug: 'twilio' },
  { name: 'Typeform', domain: 'typeform.com', slug: 'typeform' },
  { name: 'UiPath', domain: 'uipath.com', slug: 'uipath' },
  { name: 'Unity', domain: 'unity.com', slug: 'unity' },
  { name: 'Vanta', domain: 'vanta.com', slug: 'vanta' },
  { name: 'Veeva', domain: 'veeva.com', slug: 'veeva' },
  { name: 'Webflow', domain: 'webflow.com', slug: 'webflow' },
  { name: 'Wix', domain: 'wix.com', slug: 'wix' },
  { name: 'Workday', domain: 'workday.com', slug: 'workday' },
  { name: 'WorkOS', domain: 'workos.com', slug: 'workos' },
  { name: 'Zapier', domain: 'zapier.com', slug: 'zapier' },
  { name: 'Zendesk', domain: 'zendesk.com', slug: 'zendesk' },
  { name: 'Zoom', domain: 'zoom.us', slug: 'zoom' },
  { name: 'ZoomInfo', domain: 'zoominfo.com', slug: 'zoominfo' },
  { name: 'Zscaler', domain: 'zscaler.com', slug: 'zscaler' },
  { name: 'Zuora', domain: 'zuora.com', slug: 'zuora' },
  { name: '1Password', domain: '1password.com', slug: '1password' },
  { name: 'Webex', domain: 'webex.com', slug: 'webex' },
  { name: 'Amplitude', domain: 'amplitude.com', slug: 'amplitude' }
];

async function seed() {
  console.log('🌱 Seeding 100 enriched company profiles...');
  const supabase = getSupabaseAdmin();

  const enrichedCompanies = companies.map(c => ({
    ...c,
    signal_score: Math.floor(Math.random() * (98 - 85 + 1)) + 85, // High scores 85-98
    indexable: true,
    ai_summary: `${c.name} is a leading technology company with established security practices and public compliance disclosures.`,
    public_signals: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      trust_url: `https://${c.domain}/security`,
      security_url: `https://${c.domain}/security`,
      soc2_status: 'Type II'
    },
    markers: {
      has_trust_page: true,
      has_security_page: true,
      mentions_soc2: true,
      has_security_contact: true,
      mentions_compliance_tool: true,
      has_responsible_disclosure: true
    },
    signals: {},
    last_run_status: 'success',
    last_run_at: new Date().toISOString()
  }));

  for (const company of enrichedCompanies) {
    const { error } = await supabase
      .from('company_signals')
      .upsert(company, { onConflict: 'slug' });

    if (error) {
      console.error(`❌ Failed to seed ${company.name}:`, error.message);
    } else {
      console.log(`✅ Seeded ${company.name}`);
    }
  }

  console.log('✨ Seeding complete! 100 high-trust companies added/updated.');
}

seed();
