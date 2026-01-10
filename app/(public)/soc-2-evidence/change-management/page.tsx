import { Metadata } from 'next';
import EvidenceCategoryPage from '@/components/EvidenceCategoryPage';

export const metadata: Metadata = {
  title: 'SOC 2 Change Management Evidence Guide | RiscLens',
  description: 'Master the SOC 2 change management process. Learn how to document code reviews, branch protection, and production deployments for auditors.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-evidence/change-management',
  },
};

export default function ChangeManagementEvidencePage() {
  return (
    <EvidenceCategoryPage
      categoryName="Change Management"
      categorySlug="change-management"
      heroDescription="Change management is where engineering velocity meets auditor scrutiny. You need to prove that every change to production was reviewed, tested, and authorized before being deployed."
      requirements={[
        {
          title: 'Code Review Evidence (PRs)',
          description: 'A sample of Pull Requests (PRs) from the audit period showing that at least one peer reviewed and approved the changes.',
          auditorExpectation: 'Show me 5 PRs from last month. Can you prove that the author was not the one who approved the code?',
        },
        {
          title: 'CI/CD Configuration',
          description: 'Screenshots or code exports of branch protection settings (e.g., GitHub Branch Protection) showing that direct pushes to main/master are blocked.',
          auditorExpectation: 'Prove to me that a rogue developer cannot bypass the review process and push code directly to production.',
        },
        {
          title: 'Deployment Authorization',
          description: 'Logs showing who triggered the deployment to production and that it matches the authorized deployment process (e.g., Jenkins/GitHub Actions logs).',
          auditorExpectation: 'Who authorized this specific deployment on Tuesday at 2 PM?',
        },
      ]}
      automationTips={[
        'Use GitHub "CODEOWNERS" to ensure the right subject matter experts review specific parts of the codebase.',
        'Implement automated "Security Gates" in your CI/CD that block deployments if SAST/DAST scans fail.',
        'Use an "Emergency Change" process that is documented and triggers a retrospective review after the fact.',
        'Automate the export of PR history into your GRC tool to avoid manual screenshotting during the audit.',
      ]}
    />
  );
}
