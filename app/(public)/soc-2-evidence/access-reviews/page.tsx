import { Metadata } from 'next';
import EvidenceCategoryPage from '@/components/EvidenceCategoryPage';

export const metadata: Metadata = {
  title: 'SOC 2 Access Review Evidence Guide | RiscLens',
  description: 'Master the SOC 2 access review process. Learn what evidence auditors require, how to document user access, and how to automate the review cycle.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-evidence/access-reviews',
  },
};

export default function AccessReviewsEvidencePage() {
  return (
    <EvidenceCategoryPage
      categoryName="Access Reviews"
      categorySlug="access-reviews"
      heroDescription="Access reviews are the most scrutinized part of a SOC 2 audit. Auditors need to see that you've systematically reviewed who has access to what, and that you've removed access for those who no longer need it."
      requirements={[
        {
          title: 'User Access Listings',
          description: 'A point-in-time export of all active users from critical systems (AWS, GitHub, GSuite, Slack) including their permission levels/roles.',
          auditorExpectation: 'Show me the population of all users with access to production systems as of October 1st.',
        },
        {
          title: 'Manager Approval Logs',
          description: 'Documented evidence (Slack, Email, or GRC Tool) that a manager or system owner reviewed the access list and approved or revoked each user.',
          auditorExpectation: 'Where is the record showing the CTO signed off on this list of GitHub contributors?',
        },
        {
          title: 'Termination/Offboarding Evidence',
          description: 'A list of employees who left during the audit period, compared against their access removal dates in critical systems.',
          auditorExpectation: 'This employee left on June 15th. Provide evidence their AWS access was revoked within 24 hours.',
        },
      ]}
      automationTips={[
        'Connect your HRIS (Gusto, Rippling) to your GRC tool to automatically flag departures.',
        'Use SSO groups (Okta/Google) to manage permissions globally rather than system-by-system.',
        'Set up automated quarterly Slack notifications for managers to "thumb-up" access lists.',
        'Automate the generation of "diff" reports between review cycles to highlight changes.',
      ]}
    />
  );
}
