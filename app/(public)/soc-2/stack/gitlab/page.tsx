import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for GitLab: Implementation Guide | RiscLens',
  description: 'Learn how to secure your GitLab instance for SOC 2. Map GitLab features (Protected Branches, Runner Security, Audit Events) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/gitlab',
  },
};

export default function GitLabSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="GitLab"
      platformSlug="gitlab"
      heroDescription="GitLab provides an all-in-one DevOps platform. Achieving SOC 2 involves configuring protected environments, securing runners, and maintaining a robust audit trail of all changes."
      keyControls={[
        {
          title: 'Protected Branches & Tags',
          implementation: 'Use Protected Branches to require merge request approvals and prevent unauthorized code pushes to production and sensitive environments.',
        },
        {
          title: 'CI/CD Variable Security',
          implementation: 'Mask and protect CI/CD variables. Use GitLab\'s integration with external secret managers (like HashiCorp Vault) for advanced security.',
        },
        {
          title: 'User Permissions & SAML',
          implementation: 'Enforce SAML SSO for centralized identity management. Use GitLab\'s granular permission levels (Guest to Owner) to limit access based on role.',
        },
        {
          title: 'Audit Events',
          implementation: 'Monitor GitLab Audit Events for system-wide changes, repository access, and user activity. Export events to external systems for long-term audit storage.',
        },
      ]}
      bestPractices={[
        'Implement "Scan Result Policies" to require security team approval if vulnerabilities are detected in a merge request.',
        'Use "Protected Environments" to restrict who can trigger deployments and access sensitive production settings.',
        'Regularly rotate GitLab Runner registration tokens and monitor runner activity for anomalies.',
        'Enable "Dependency Scanning" and "Container Scanning" as part of your GitLab CI pipelines to catch vulnerabilities early.',
      ]}
    />
  );
}
