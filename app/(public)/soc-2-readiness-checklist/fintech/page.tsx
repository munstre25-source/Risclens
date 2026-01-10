import { Metadata } from 'next';
import IndustryChecklistPage from '@/components/IndustryChecklistPage';

export const metadata: Metadata = {
  title: 'SOC 2 Checklist for Fintech Companies | RiscLens',
  description: 'The definitive SOC 2 checklist for fintech startups. Learn how to secure payments, handle PII, and satisfy bank-level security requirements.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-readiness-checklist/fintech',
  },
};

export default function FintechChecklistPage() {
  return (
    <IndustryChecklistPage
      industryName="Fintech"
      industrySlug="fintech"
      heroDescription="Fintech companies face higher scrutiny from auditors and bank partners. Your SOC 2 needs to prove you handle money and sensitive financial data with ironclad controls."
      criticalControls={[
        'Encryption at Rest & Transit',
        'Data Retention Policies',
        'Access Reviews (SSO)',
        'Vulnerability Management',
        'Incident Response Plan',
        'Anti-Money Laundering (AML)',
      ]}
      checklistData={[
        {
          category: 'Data Security & Encryption',
          items: [
            'All database volumes encrypted with AWS KMS or equivalent.',
            'TLS 1.2+ enforced for all public and internal endpoints.',
            'Production secrets stored in managed vaults (Secrets Manager), not in code.',
            'PII fields obfuscated or encrypted at the application level.',
          ],
        },
        {
          category: 'Access & Identity Management',
          items: [
            'MFA enforced for all employees and contractors.',
            'Automated employee offboarding synced with HRIS.',
            'Quarterly access reviews for production databases and code repos.',
            'Least-privilege IAM roles for all service accounts.',
          ],
        },
        {
          category: 'Change Management & SDLC',
          items: [
            'Mandatory peer reviews (PRs) for all production code changes.',
            'CI/CD branch protection preventing direct pushes to main.',
            'Automated dependency scanning (Dependabot/Snyk) in every build.',
            'Separate staging and production environments with no data leakage.',
          ],
        },
      ]}
      commonPitfalls={[
        'Poor separation of duties between developers and those with production access.',
        'Incomplete vendor risk assessments for critical subprocessors (e.g., Plaid, Stripe).',
        'Failure to document manual financial reconciliation processes as security controls.',
        'Using production data in staging or development environments.',
      ]}
    />
  );
}
