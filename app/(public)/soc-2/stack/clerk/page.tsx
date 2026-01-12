import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for Clerk: Implementation Guide | RiscLens',
  description: 'Learn how to secure your Clerk authentication for SOC 2. Map Clerk features (MFA, Session Management, Audit Logs) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/clerk',
  },
};

export default function ClerkSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="Clerk"
      platformSlug="clerk"
      heroDescription="Clerk provides modern authentication and user management for Next.js and beyond. For SOC 2, focus on enforcing MFA, monitoring session activity, and ensuring robust audit logging."
      keyControls={[
        {
          title: 'Multi-Factor Authentication (MFA)',
          implementation: 'Enable and enforce MFA for all users. Support secure methods like TOTP and security keys (WebAuthn) for high-assurance environments.',
        },
        {
          title: 'Session Management',
          implementation: 'Configure session timeouts and concurrent session limits to protect against session hijacking and unauthorized access attempts.',
        },
        {
          title: 'Audit Logs',
          implementation: 'Use Clerk\'s Audit Logs to track user activity, including login events and security settings changes, for compliance monitoring and investigation.',
        },
        {
          title: 'Organization Security',
          implementation: 'Use Clerk Organizations to manage team-based access and permissions, ensuring users only access the data and features they need for their roles.',
        },
      ]}
      bestPractices={[
        'Implement "Device Verification" to alert users of new logins from unrecognized devices and browsers.',
        'Use Clerk\'s webhooks to sync identity events with your internal security and compliance monitoring systems in real-time.',
        'Regularly review organization memberships and permission levels as part of your quarterly access review process.',
        'Ensure all administrative access to the Clerk Dashboard is secured with MFA and restricted to authorized personnel.',
      ]}
    />
  );
}
