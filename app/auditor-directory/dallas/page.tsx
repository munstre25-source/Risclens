import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Dallas, TX | RiscLens',
  description: 'Find SOC 2 auditors and CPA firms in Dallas. Get matched with auditors experienced in SaaS, fintech, and logistics.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/dallas',
  },
};

export default function DallasAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Dallas"
      citySlug="dallas"
      heroDescription="Dallas auditors cover SaaS, fintech, and logistics. Get matched with firms that balance speed, cost, and enterprise expectations."
      localInsights={[
        'Cost-competitive SOC 2 options with enterprise-ready reporting.',
        'Experience across SaaS, fintech, and supply-chain heavy teams.',
        'Remote-first with optional onsite for physical controls.',
      ]}
      pricingNotes={[
        'Type I: ~$11k-$17k with regional firms; national brands may be higher.',
        'Type II: $17k-$30k depending on scope and evidence readiness.',
        'Rush fees for accelerated procurement timelines—book early.',
      ]}
      onsitePolicy="Remote is standard. Onsite walkthroughs are available for teams with offices or facilities needing physical security review."
      industries={['SaaS', 'Fintech', 'Logistics', 'E-commerce']}
      faqs={[
        {
          question: 'Do Dallas auditors work remote?',
          answer: 'Yes—remote is standard; onsite is optional for physical security scope.',
        },
        {
          question: 'How does pricing compare?',
          answer: 'Often lower than coastal hubs for similar scope, especially with regional firms.',
        },
        {
          question: 'Which industries are best supported?',
          answer: 'SaaS, fintech, logistics, and e-commerce are common; pick a firm with matching experience.',
        },
      ]}
      nearbyCities={[
        { name: 'Austin', href: '/auditor-directory/austin' },
        { name: 'Houston', href: '/auditor-directory/houston' },
      ]}
    />
  );
}
