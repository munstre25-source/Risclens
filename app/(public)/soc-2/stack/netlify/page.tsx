import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Netlify: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Netlify sites for SOC 2. Map Netlify features (Audit Logs, Netlify Access, Environment Variables) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/netlify',
  },
};

export default function NetlifySoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Netlify"
      platformSlug="netlify"
      heroDescription="Netlify simplifies frontend deployments. Achieving SOC 2 involves securing your build pipelines, managing team access, and ensuring robust environment secret handling."
      keyControls={[
        {
          title: 'Netlify Audit Logs',
          implementation: 'Use Enterprise Audit Logs to track every change to your sites, builds, and team settings for security oversight and incident response.',
        },
        {
          title: 'Access Control (MFA & SSO)',
          implementation: 'Enforce MFA for all team members. Use SSO integration for centralized identity management and automated user offboarding.',
        },
        {
          title: 'Environment Variables',
          implementation: 'Use Netlify\'s scoped environment variables to ensure secrets are only available to the necessary build and runtime contexts, following least privilege.',
        },
        {
          title: 'Custom Domains & SSL',
          implementation: 'Enforce HTTPS for all sites and use Netlify\'s managed SSL to ensure secure communication and protect data in transit.',
        },
      ]}
      bestPractices={[
        'Use Netlify\'s "Deploy Previews" to review security changes and configurations before they are merged into production.',
        'Enable "Branch Protection" in your git provider to ensure all changes to production sites are peer-reviewed and authorized.',
        'Regularly audit third-party integrations and build plugins for potential security risks to your supply chain.',
        'Implement Netlify\'s Firewall Rules via Edge Functions for custom security logic and traffic filtering at the network edge.',
      ]}
    />
  );
}
