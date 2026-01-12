import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Okta: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Okta identity management for SOC 2. Map Okta features (MFA, Lifecycle Management, System Log) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/okta',
  },
};

export default function OktaSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Okta"
      platformSlug="okta"
      heroDescription="Okta is the backbone of identity for many organizations. For SOC 2, focus on enforcing strong authentication, automating user lifecycle events, and monitoring identity logs."
      keyControls={[
        {
          title: 'MFA & Adaptive Auth',
          implementation: 'Enforce MFA for all users across all applications. Use adaptive authentication to flag and block high-risk login attempts based on location and device.',
        },
        {
          title: 'Lifecycle Management',
          implementation: 'Automate user onboarding and offboarding via Okta Lifecycle Management to ensure access is granted and revoked promptly upon employment changes.',
        },
        {
          title: 'Okta System Log',
          implementation: 'Use the Okta System Log to monitor for unauthorized access attempts and configuration changes. Export logs to your SIEM for long-term retention.',
        },
        {
          title: 'Application Access Reviews',
          implementation: 'Use Okta Access Gateway or Access Requests to perform and document periodic reviews of who has access to sensitive company applications.',
        },
      ]}
      bestPractices={[
        'Implement Okta FastPass for phishing-resistant passwordless authentication across your organization.',
        'Use Okta Workflows to automate complex security responses, such as revoking access upon a detected security event.',
        'Regularly audit Okta administrator roles and follow the principle of least privilege for tenant configuration.',
        'Connect Okta to your HRIS (e.g., Rippling, BambooHR) to ensure the source of truth for identity is centralized and accurate.',
      ]}
    />
  );
}
