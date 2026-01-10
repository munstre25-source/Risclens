import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Indianapolis, IN | RiscLens',
  description: 'Find SOC 2 auditors and CPA firms in Indianapolis. Get matched with vetted auditors for SaaS, logistics, and healthcare stacks.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/indianapolis',
  },
};

export default function IndianapolisAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Indianapolis"
      citySlug="indianapolis"
      heroDescription="Indy auditors support logistics, healthcare, and SaaS teams with practical SOC 2 guidance and remote-first workflows."
      localInsights={[
        'Regional firms with logistics and healthcare compliance experience.',
        'Cost-competitive compared to coastal hubs, with solid SOC 2 depth.',
        'Hybrid-friendly: remote-first with onsite available for physical controls.',
      ]}
      pricingNotes={[
        'Type I: ~$10k-$15k with regional firms.',
        'Type II: $16k-$28k depending on scope and evidence readiness.',
        'Onsite walkthroughs are available; remote is standard for SaaS.',
      ]}
      onsitePolicy="Remote is standard. Onsite walkthroughs are available for facilities-based teams (warehousing, clinics) when physical security is in scope."
      industries={['Logistics', 'Healthcare', 'SaaS', 'E-commerce']}
      faqs={[
        {
          question: 'Do Indianapolis auditors work remote?',
          answer: 'Yes—remote is standard. Onsite is optional for teams with physical facilities.',
        },
        {
          question: 'How do Indy costs compare?',
          answer: 'Generally lower than coastal hubs for comparable scope.',
        },
        {
          question: 'Which industries are common here?',
          answer: 'Logistics, healthcare, and SaaS. Choose a firm with experience in your footprint.',
        },
      ]}
      nearbyCities={[
        { name: 'Chicago', href: '/auditor-directory/chicago' },
        { name: 'Detroit', href: '/auditor-directory/detroit' },
      ]}
    />
  );
}
