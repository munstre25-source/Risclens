import { Metadata } from 'next';
import TechStackSOC2Page from '@/components/TechStackSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 Compliance for GitHub: Implementation Guide | RiscLens',
  description: 'Learn how to secure your GitHub organization for SOC 2. Map GitHub features (Branch Protection, Actions, Audit Logs) to SOC 2 controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack/github',
  },
};

export default function GitHubSoc2Page() {
  return (
    <TechStackSOC2Page
      platformName="GitHub"
      platformSlug="github"
      heroDescription="GitHub is often the source of truth for your code and deployment workflows. For SOC 2, focus on enforcing peer reviews, securing CI/CD pipelines, and monitoring access logs."
      keyControls={[
        {
          title: 'Branch Protection Rules',
          implementation: 'Enforce branch protection on all production branches. Require signed commits, peer reviews, and passing status checks before merging code.',
        },
        {
          title: 'Access Management & MFA',
          implementation: 'Enforce MFA for the entire organization. Use GitHub Teams and Roles (Owner, Member) to follow the principle of least privilege for repository access.',
        },
        {
          title: 'GitHub Actions Security',
          implementation: 'Secure your CI/CD by using OpenID Connect (OIDC) for cloud authentication (avoiding long-lived secrets) and auditing workflow permissions.',
        },
        {
          title: 'Organization Audit Logs',
          implementation: 'Use GitHub Audit Logs to track administrative changes, repository access, and membership events. Export logs to your SIEM for compliance retention.',
        },
      ]}
      bestPractices={[
        'Enable "Secret Scanning" and "Push Protection" to prevent sensitive data (API keys, secrets) from ever reaching your repositories.',
        'Regularly audit third-party GitHub Apps and OAuth integrations for potential security risks and over-privileged access.',
        'Implement "CODEOWNERS" files to ensure the right subject matter experts review changes to sensitive parts of the codebase.',
        'Use GitHub Enterprise for advanced compliance features like custom repository roles and centralized audit log streaming.',
      ]}
    />
  );
}
