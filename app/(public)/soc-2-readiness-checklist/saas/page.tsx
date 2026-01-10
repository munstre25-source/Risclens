import { Metadata } from 'next';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';

export const metadata: Metadata = {
  title: 'SOC 2 Checklist for SaaS Startups | RiscLens',
  description: 'The definitive SOC 2 checklist for SaaS startups. Learn how to secure your multi-tenant architecture, CI/CD, and customer data.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-checklist/saas',
  },
};

export default function SaaSChecklistPage() {
  return (
    <IndustryChecklistPage
      industryName="SaaS"
      industrySlug="saas"
      heroDescription="For SaaS startups, SOC 2 is the 'golden ticket' to enterprise deals. Your checklist focuses on securing your software delivery lifecycle and maintaining data isolation."
      criticalControls={[
        'CI/CD Branch Protection',
        'Multi-Tenant Isolation',
        'Vulnerability Scanning (SAST/DAST)',
        'Infrastructure as Code (IaC)',
        'Customer Support RBAC',
        'Uptime Monitoring (SLA)',
      ]}
      checklistData={[
        {
          category: 'Software Delivery Lifecycle (SDLC)',
          items: [
            'Mandatory peer review for all code changes via GitHub/GitLab PRs.',
            'Automated testing (unit, integration) required for all production builds.',
            'Deployment to production restricted to automated CI/CD pipelines.',
            'Documented roll-back procedure for failed deployments.',
          ],
        },
        {
          category: 'Cloud Infrastructure & Security',
          items: [
            'All infrastructure managed via Terraform, Pulumi, or CloudFormation.',
            'Production environment logically separated from dev/staging.',
            'Container image scanning for vulnerabilities before deployment.',
            'Cloud configuration logging (CloudTrail) and alerting enabled.',
          ],
        },
        {
          category: 'Customer Data & Access',
          items: [
            'Logical separation of customer data at the database layer.',
            'Customer support access to production data is logged and time-limited.',
            'Customer-facing security features (MFA, SSO, API keys) documented.',
            'Regular penetration testing of public-facing application endpoints.',
          ],
        },
      ]}
      commonPitfalls={[
        'Lack of formal documentation for automated CI/CD security checks.',
        'Giving developers permanent "admin" access to production environments.',
        'Not having a formal process for vetting third-party libraries (NPM/PyPI).',
        'Inconsistent encryption of customer backups and database snapshots.',
      ]}
    />
  );
}
