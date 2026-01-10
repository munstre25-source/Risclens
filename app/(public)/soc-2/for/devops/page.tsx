import { Metadata } from 'next';
import RoleSOC2Page from '@/components/RoleSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 for DevOps & Platform Engineers | RiscLens',
  description: 'A practitioner\'s guide to SOC 2 compliance for DevOps teams. Learn how to automate evidence, secure CI/CD, and maintain infrastructure compliance.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/for/devops',
  },
};

export default function DevOpsSoc2Page() {
  return (
    <RoleSOC2Page
      roleName="DevOps Engineer"
      roleSlug="devops"
      heroDescription="SOC 2 evidence should be a byproduct of your existing automation. Learn how to build a 'Compliance-as-Code' pipeline that auditors love."
      relatedLinks={[
        { label: 'SOC 2 for AWS', href: '/soc-2/stack/aws' },
        { label: 'SOC 2 for Kubernetes', href: '/soc-2/stack/kubernetes' },
        { label: 'Evidence Category: Access Reviews', href: '/soc-2-evidence/access-reviews' },
      ]}
      keyPriorities={[
        {
          title: 'Hardened CI/CD Pipelines',
          description: 'Your CI/CD pipeline is the "chokepoint" for SOC 2 controls. Implement branch protection, mandatory code reviews, and automated security scanning (SAST/DAST) as non-bypassable steps.',
        },
        {
          title: 'Infrastructure Monitoring & Logging',
          description: 'Auditors look for centralized logging (CloudWatch, ELK, Datadog) and evidence that you are alerted on security-critical events like unauthorized access attempts or configuration changes.',
        },
        {
          title: 'Incident Response Automation',
          description: 'Document your IR plan, but more importantly, show how your tooling supports it. Automated alerting, on-call rotations (PagerDuty/Opsgenie), and post-mortem templates are key evidence.',
        },
        {
          title: 'Secrets Management',
          description: 'Moving secrets out of code and into managed services (AWS Secrets Manager, HashiCorp Vault) is a critical SOC 2 control. Demonstrate that access to these secrets is logged and restricted.',
        },
      ]}
      faqs={[
        {
          question: 'How do we prove "Change Management" without manual screenshots?',
          answer: 'By using Git as the source of truth. A "GitOps" approach where all changes are PR-based, reviewed, and automatically deployed provides a perfect, immutable audit trail. You can export PR history and branch protection settings to satisfy auditors.',
        },
        {
          question: 'Does SOC 2 require us to use a specific CI/CD tool?',
          answer: 'No. Auditors are tool-agnostic. They care about the *controls* (e.g., who can push to production, how are changes tested). Whether you use GitHub Actions, GitLab CI, or Jenkins, the requirements remain the same.',
        },
        {
          question: 'What is the best way to handle Access Reviews for infrastructure?',
          answer: 'Use SSO (Okta/Google Workspace) paired with Terraform/IaC for IAM. This allows you to perform access reviews by simply reviewing your IaC code and SSO groups, which is much more reliable than manual console audits.',
        },
      ]}
    />
  );
}
