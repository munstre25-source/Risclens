import { Metadata } from 'next';
import EvidenceCategoryPage from '@/components/EvidenceCategoryPage';

export const metadata: Metadata = {
  title: 'SOC 2 Incident Response Evidence Guide | RiscLens',
  description: 'Master the SOC 2 incident response requirements. Learn how to document your IR plan, tabletop exercises, and incident retrospectives for auditors.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-evidence/incident-response',
  },
};

export default function IncidentResponseEvidencePage() {
  return (
    <EvidenceCategoryPage
      categoryName="Incident Response"
      categorySlug="incident-response"
      heroDescription="Auditors want to see that you have a plan for when things go wrong, and that you actually follow it. They look for evidence of preparedness (plans/tests) and execution (real-world incident logs)."
      requirements={[
        {
          title: 'Incident Response Plan (IRP)',
          description: 'A formalized document outlining roles, responsibilities, escalation paths, and communication strategies during a security incident.',
          auditorExpectation: 'Who is your designated Security Officer and what is your internal SLA for responding to a critical breach?',
        },
        {
          title: 'Tabletop Exercise (TTX) Results',
          description: 'Evidence that your team conducted a mock security incident drill within the last 12 months, including a summary of findings and remediations.',
          auditorExpectation: 'Show me the meeting notes and "after-action report" from your last incident response simulation.',
        },
        {
          title: 'Incident Retrospectives',
          description: 'For any real incidents that occurred during the audit period, auditors require a full post-mortem including root cause analysis and remediation steps.',
          auditorExpectation: 'Show me the ticket and resolution for the database connection failure that occurred in August.',
        },
      ]}
      automationTips={[
        'Use an incident management tool (PagerDuty, Incident.io) to automatically create audit trails for every incident.',
        'Integrate your alerting system (Datadog, New Relic) with Slack to provide timestamps for when issues were first identified.',
        'Create a "Tabletop Exercise" template in your GRC tool to ensure all required auditor fields are captured during drills.',
        'Automate the tagging of security-related incidents so they can be easily filtered during an audit.',
      ]}
    />
  );
}
