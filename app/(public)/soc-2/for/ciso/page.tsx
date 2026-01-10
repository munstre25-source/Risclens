import { Metadata } from 'next';
import RoleSOC2Page from '@/components/RoleSOC2Page';

export const metadata: Metadata = {
  title: 'SOC 2 for CISOs & Security Leaders | RiscLens',
  description: 'The strategic CISO guide to SOC 2 compliance. Learn how to map controls across frameworks, manage risk, and use SOC 2 as a security foundation.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/for/ciso',
  },
};

export default function CISOSoc2Page() {
  return (
    <RoleSOC2Page
      roleName="CISO"
      roleSlug="ciso"
      heroDescription="SOC 2 is more than a checkbox. Learn how to leverage the audit to build a mature security program that satisfies both auditors and customers."
      relatedLinks={[
        { label: 'Multi-Framework Mapping', href: '/soc-2-sales/multi-framework-mapping' },
        { label: 'SOC 2 vs ISO 27001', href: '/soc-2-vs-iso-27001' },
        { label: 'Vendor Risk Management', href: '/vendor-risk-assessment' },
      ]}
      keyPriorities={[
        {
          title: 'Control Mapping & Reusability',
          description: 'Don\'t treat SOC 2 in a vacuum. Map your controls to ISO 27001, HIPAA, or NIST CSF. A "collect once, satisfy many" approach saves hundreds of hours in the long run.',
        },
        {
          title: 'Risk Assessment Maturity',
          description: 'SOC 2 requires a formal risk assessment. Use this as an opportunity to move beyond a static spreadsheet and implement a continuous risk monitoring process.',
        },
        {
          title: 'Vendor Governance',
          description: 'Your SOC 2 report is only as strong as your subprocessors. Implement a robust vendor risk program that includes reviewing their SOC 2 reports (SOUPIEs).',
        },
        {
          title: 'Continuous Compliance Monitoring',
          description: 'Shift from "point-in-time" audits to continuous monitoring. Use automated tools to alert you when controls drift out of compliance *before* the auditor arrives.',
        },
      ]}
      faqs={[
        {
          question: 'How do we handle "Exceptions" in our SOC 2 report?',
          answer: 'Exceptions happen. The key is how you respond. Auditors look for management responses that show you identified the root cause and implemented a corrective action. A report with a few remediated exceptions is often viewed as more credible than a "perfect" report with no findings.',
        },
        {
          question: 'Can we use our SOC 2 controls for ISO 27001?',
          answer: 'Yes. There is roughly an 80% overlap between SOC 2 Security criteria and ISO 27001 Annex A controls. By planning ahead, you can achieve "Co-Audit" status where one auditor reviews both frameworks simultaneously.',
        },
        {
          question: 'What is the most common reason for a Qualified Opinion?',
          answer: 'The most common issues are related to change management (missing peer reviews) and access control (failure to offboard employees within the policy timeframe). These are operational failures, not technical ones.',
        },
      ]}
    />
  );
}
