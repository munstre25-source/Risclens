import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Heroku: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Heroku apps for SOC 2. Map Heroku features (Heroku Teams, Private Spaces, Logplex) to SOC 2 controls and automate evidence collection.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/heroku',
  },
};

export default function HerokuSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Heroku"
      platformSlug="heroku"
      heroDescription="Heroku abstracts away much of the infrastructure complexity, but achieving SOC 2 still requires careful configuration of access controls, logging, and environment management."
      keyControls={[
        {
          title: 'Heroku Teams & Permissions',
          implementation: 'Use Heroku Teams for organization-wide access control. Enforce MFA for all accounts and use fine-grained permissions (Admin, Member, Collaborator) to follow least privilege.',
        },
        {
          title: 'Logging & Monitoring (Logplex)',
          implementation: 'Use Heroku Logplex to drain logs to a third-party logging service (like Papertrail, Splunk, or Datadog) for long-term retention and security auditing.',
        },
        {
          title: 'Private Spaces',
          implementation: 'For enhanced security and compliance, use Heroku Private Spaces to isolate applications in a dedicated network and enforce IP whitelisting for backend services.',
        },
        {
          title: 'Environment Secrets',
          implementation: 'Use Heroku Config Vars to manage secrets. Never commit secrets to source control. Audit changes to Config Vars via the Heroku Audit Logs.',
        },
      ]}
      bestPractices={[
        'Enable Heroku\'s automated certificate management (ACM) to ensure all traffic is encrypted via SSL/TLS.',
        'Use Heroku Private Spaces if your compliance requirements demand dedicated network isolation and peering.',
        'Regularly review Heroku Team membership and permission levels as part of your quarterly access reviews.',
        'Implement a CI/CD pipeline using Heroku Pipelines to ensure consistent, auditable deployments across environments.',
      ]}
    />
  );
}
