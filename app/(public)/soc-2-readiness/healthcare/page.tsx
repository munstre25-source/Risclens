import { Metadata } from 'next';
import ReadinessIndustryPage from '@/components/ReadinessIndustryPage';
import { generateIndustryMetadata } from '@/lib/seo';

export const metadata: Metadata = generateIndustryMetadata('Healthcare Companies', 'readiness');

export default function HealthcareSoc2ReadinessPage() {
  return (
    <ReadinessIndustryPage
      industryName="Healthcare Companies"
      industrySlug="healthcare"
      heroCtaText="Get Your Healthcare Readiness Score"
      relatedLinks={[
        { label: 'Related: Penetration Testing for Healthcare', href: '/penetration-testing#healthcare' },
        { label: 'Related: Vendor Risk Assessment for Healthcare', href: '/vendor-risk-assessment#healthcare' },
      ]}
      whySoc2Scenarios={[
        {
          title: 'Enterprise healthcare procurement',
          description: 'Hospital systems and digital health buyers often require SOC 2 evidence before contracting.',
        },
        {
          title: 'Protected health data handling',
          description: 'Security controls for PHI and sensitive records are reviewed closely during diligence.',
        },
        {
          title: 'Integrations with clinical platforms',
          description: 'EHR, telehealth, and billing integrations introduce higher expectations for access and monitoring.',
        },
        {
          title: 'Regulatory overlap',
          description: 'Teams need SOC 2 readiness while also aligning with HIPAA obligations and customer-specific controls.',
        },
      ]}
      challenges={[
        {
          title: 'PHI Access Governance',
          description: 'Healthcare teams often struggle to prove least-privilege access and regular review cycles across clinical, support, and engineering roles.',
        },
        {
          title: 'Audit Trails and Monitoring',
          description: 'Auditors expect reliable audit trails for data access, system changes, and incident response. Gaps in retention or alerting are common blockers.',
        },
        {
          title: 'Third-Party Risk in Care Workflows',
          description: 'Vendors in patient communications, diagnostics, and hosting can expand scope quickly if risk reviews and contracts are inconsistent.',
        },
        {
          title: 'Policy-to-Practice Drift',
          description: 'Documented policies may not match day-to-day operations unless ownership, cadence, and evidence collection are clearly defined.',
        },
        {
          title: 'Incident Response Readiness',
          description: 'Healthcare incidents require coordinated legal, technical, and operational response. Missing playbooks and evidence can delay audits.',
        },
      ]}
      faqs={[
        {
          question: 'Do healthcare companies need both SOC 2 and HIPAA?',
          answer:
            'Most healthcare technology teams need both. HIPAA addresses legal obligations for PHI, while SOC 2 provides a broad assurance report many enterprise buyers request.',
        },
        {
          question: 'Which SOC 2 criteria are most relevant in healthcare?',
          answer:
            'Security is mandatory. Healthcare teams frequently emphasize Confidentiality and Availability as well, especially when uptime and sensitive data handling are contractual requirements.',
        },
        {
          question: 'How long does healthcare SOC 2 readiness usually take?',
          answer:
            'Teams with baseline controls in place typically reach Type I readiness in 3-6 months. Type II requires sustained operating evidence over the observation window.',
        },
        {
          question: 'What evidence should be prioritized first?',
          answer:
            'Start with access reviews, incident response records, vulnerability management, vendor risk documentation, and clear system boundary diagrams for PHI-related workflows.',
        },
        {
          question: 'Can compliance automation tools reduce effort for healthcare teams?',
          answer:
            'Yes, especially for evidence collection and monitoring. Automation helps, but auditors still evaluate whether controls are designed and operating effectively in your environment.',
        },
      ]}
      crossLinkIndustry={{ name: 'SaaS Companies', href: '/soc-2-readiness/saas' }}
    />
  );
}
