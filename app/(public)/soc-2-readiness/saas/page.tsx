import { Metadata } from 'next';
import ReadinessIndustryPage from '@/components/ReadinessIndustryPage';
import { generateIndustryMetadata } from '@/lib/seo';

export const metadata: Metadata = generateIndustryMetadata('SaaS Companies', 'readiness');

export default function SaaSSoc2ReadinessPage() {
  return (
    <ReadinessIndustryPage
      industryName="SaaS Companies"
      industrySlug="saas"
      heroCtaText="Get Your SaaS Readiness Score"
      relatedLinks={[
        { label: 'Related: Penetration Testing for SaaS', href: '/penetration-testing#saas' },
        { label: 'Related: Vendor Risk Assessment for SaaS', href: '/vendor-risk-assessment#saas' },
      ]}
      whySoc2Scenarios={[
        { title: 'Enterprise sales cycles', description: 'Security questionnaires often stall or fail without a SOC 2 report' },
        { title: 'Handling customer data', description: 'SaaS platforms processing or storing customer data face scrutiny' },
        { title: 'Integrations and partnerships', description: 'API partners and integration ecosystems may require compliance' },
        { title: 'Investor due diligence', description: 'Growth-stage investors increasingly expect SOC 2 as table stakes' },
      ]}
      challenges={[
        {
          title: 'Cloud Infrastructure Complexity',
          description: 'Multi-cloud deployments, containerized workloads, and serverless architectures require clear documentation of security boundaries. Auditors need to understand your shared responsibility model and how you secure each layer.',
        },
        {
          title: 'Access Control at Scale',
          description: 'SaaS companies typically manage access for developers, operations, support, and customer success teams — each with different permission requirements. Implementing least-privilege access and maintaining audit trails is a common gap.',
        },
        {
          title: 'Multi-Tenant Data Isolation',
          description: 'For SaaS platforms serving multiple customers, demonstrating logical or physical data isolation is critical. Auditors evaluate how tenant data is segregated at the database, application, and infrastructure levels.',
        },
        {
          title: 'Continuous Deployment and Change Management',
          description: 'Fast-moving engineering teams often ship multiple times per day. SOC 2 requires documented change management processes, code review evidence, and deployment approval workflows — which may need formalization.',
        },
        {
          title: 'Vendor and Subprocessor Management',
          description: 'SaaS products rely on third-party services — payment processors, analytics, email providers. You need documented vendor risk assessments and evidence that critical subprocessors meet security standards.',
        },
      ]}
      faqs={[
        {
          question: 'When should a SaaS company start SOC 2?',
          answer: 'Most SaaS companies begin SOC 2 preparation when enterprise sales require it — typically when closing deals with companies that have formal vendor security requirements. Starting 3–6 months before you need the report allows time for remediation without rushing. Beginning earlier, when controls are being designed, is more cost-effective than retrofitting later.',
        },
        {
          question: 'Do we need SOC 2 Type I or Type II?',
          answer: 'Most enterprise customers prefer Type II, which demonstrates that controls operated effectively over a period (typically 6–12 months). However, many SaaS companies start with Type I to establish a baseline and satisfy immediate customer requirements, then progress to Type II. Your customers\' security teams will specify which report they accept.',
        },
        {
          question: 'What Trust Service Criteria apply to SaaS?',
          answer: 'Security is always in scope. Beyond that, the criteria depend on your product and customer commitments:',
          list: [
            'Availability — if you have uptime SLAs or availability commitments',
            'Confidentiality — if you handle confidential customer data or IP',
            'Privacy — if you process personal information with specific privacy obligations',
            'Processing Integrity — if accuracy and completeness of data processing is critical',
          ],
        },
        {
          question: 'How does cloud infrastructure affect SOC 2 scope?',
          answer: 'Cloud providers like AWS, Azure, and GCP maintain their own SOC 2 reports, which you can reference. However, your audit covers how you configure and use those services. Auditors evaluate your security configurations, access controls, monitoring, and incident response — not the underlying cloud infrastructure.',
        },
        {
          question: 'What documentation do SaaS companies typically lack?',
          answer: 'Common documentation gaps for SaaS companies include:',
          list: [
            'Formal information security policies and procedures',
            'Documented change management and code review processes',
            'Vendor risk assessments and third-party agreements',
            'Incident response plans with defined escalation paths',
            'Access review evidence and offboarding checklists',
          ],
        },
        {
          question: 'Can we use compliance automation tools?',
          answer: 'Yes. Platforms like Vanta, Drata, Secureframe, and others can streamline evidence collection and policy management. These tools integrate with your cloud infrastructure and business systems to automate monitoring. However, they are tools — not substitutes for implementing actual controls. Auditors evaluate your controls, not your tooling.',
        },
      ]}
      crossLinkIndustry={{ name: 'Fintech Companies', href: '/soc-2-readiness/fintech' }}
    />
  );
}
