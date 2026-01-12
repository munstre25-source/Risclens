import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Auth0: Implementation Guide | RiscLens',
  description: 'Learn how to secure your customer identity with Auth0 for SOC 2. Map Auth0 features (Universal Login, MFA, Logs) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/auth0',
  },
};

export default function Auth0Soc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Auth0"
      platformSlug="auth0"
      heroDescription="Auth0 secures your customer identities. Achieving SOC 2 involves configuring secure login flows, enforcing MFA, and maintaining a clear audit trail of identity events."
      keyControls={[
        {
          title: 'Universal Login & MFA',
          implementation: 'Use Auth0 Universal Login to ensure secure, centralized authentication. Enforce MFA for users accessing sensitive data or administrative functions.',
        },
        {
          title: 'Brute Force Protection',
          implementation: 'Enable Auth0\'s Brute Force Protection and Anomaly Detection to mitigate credential stuffing and other automated attacks against your users.',
        },
        {
          title: 'Audit Logs & Streaming',
          implementation: 'Monitor Auth0 Audit Logs for authentication failures and administrative changes. Stream logs to external providers for compliance retention.',
        },
        {
          title: 'Tenant Security',
          implementation: 'Secure your Auth0 tenant with MFA for all admins and restricted IP ranges where applicable. Audit tenant configuration changes regularly.',
        },
      ]}
      bestPractices={[
        'Use Auth0 Actions to implement custom security checks and integrations during the login and registration flows.',
        'Enable "Bot Detection" to protect your sign-up and login pages from automated threats and account takeovers.',
        'Regularly review and rotate client secrets used for API authentication and ensure they are stored securely.',
        'Manage your Auth0 tenant configuration using the Auth0 Terraform provider to maintain a version-controlled audit trail.',
      ]}
    />
  );
}
