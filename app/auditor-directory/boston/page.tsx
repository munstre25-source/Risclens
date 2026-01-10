import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Boston, MA | RiscLens',
  description: 'Find SOC 2 auditors and CPA firms in Boston. Get matched with auditors experienced in fintech, healthcare, and enterprise SaaS.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/boston',
  },
};

export default function BostonAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Boston"
      citySlug="boston"
      heroDescription="Boston auditors specialize in fintech, healthcare, and enterprise SaaS. Get matched with firms that understand regulated buyers."
      localInsights={[
        'Deep fintech and healthcare compliance experience.',
        'Enterprise-ready reporting for procurement-heavy buyers.',
        'Remote-first with optional onsite for physical security.',
      ]}
      pricingNotes={[
        'Type I: ~$12k-$18k depending on firm and scope.',
        'Type II: $18k-$34k based on criteria and evidence quality.',
        'Rush fees common for procurement-driven deadlines.',
      ]}
      onsitePolicy="Remote is standard; onsite walkthroughs are available for teams with offices or labs where physical security is in scope."
      industries={['Fintech', 'Healthcare', 'Enterprise SaaS', 'AI/ML']}
      faqs={[
        {
          question: 'Do Boston auditors work remote?',
          answer: 'Yes—remote-first. Onsite is optional if physical controls are in scope.',
        },
        {
          question: 'Are costs higher in Boston?',
          answer: 'Pricing is mid-to-high depending on firm reputation and scope; plan ahead for procurement timelines.',
        },
        {
          question: 'Which industries see the best fit?',
          answer: 'Fintech, healthcare, and enterprise SaaS are common; pick a firm with relevant experience.',
        },
      ]}
      nearbyCities={[
        { name: 'New York City', href: '/auditor-directory/new-york' },
        { name: 'Chicago', href: '/auditor-directory/chicago' },
      ]}
    />
  );
}
