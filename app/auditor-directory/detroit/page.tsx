import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Detroit, MI | RiscLens',
  description: 'Find SOC 2 auditors and CPA firms in Detroit. Get matched with auditors experienced in manufacturing, mobility, and SaaS.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/detroit',
  },
};

export default function DetroitAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Detroit"
      citySlug="detroit"
      heroDescription="Detroit auditors blend manufacturing, mobility, and SaaS experience. Get matched with firms that understand complex supply chains."
      localInsights={[
        'Experience with manufacturing and mobility control environments.',
        'Remote-first audits with optional onsite for facilities-based controls.',
        'Practical pricing for mid-market SOC 2 engagements.',
      ]}
      pricingNotes={[
        'Type I: ~$10k-$15k with regional firms.',
        'Type II: $16k-$28k depending on scope and control maturity.',
        'Onsite walkthroughs available; remote is standard for SaaS.',
      ]}
      onsitePolicy="Most audits run remote; onsite is offered for teams with physical plants or offices where physical security is in scope."
      industries={['Manufacturing', 'Mobility', 'SaaS', 'Logistics']}
      faqs={[
        {
          question: 'Do Detroit auditors require onsite visits?',
          answer: 'Remote is standard; onsite is optional for physical facilities.',
        },
        {
          question: 'How do costs compare to other hubs?',
          answer: 'Typically more affordable than coastal cities for comparable scope.',
        },
        {
          question: 'Which industries are best supported?',
          answer: 'Manufacturing, mobility, and SaaS. Pick a firm that has audited stacks like yours.',
        },
      ]}
      nearbyCities={[
        { name: 'Chicago', href: '/auditor-directory/chicago' },
        { name: 'Indianapolis', href: '/auditor-directory/indianapolis' },
      ]}
    />
  );
}
