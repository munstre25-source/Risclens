import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Houston, TX | RiscLens',
  description: 'Find SOC 2 auditors and CPA firms in Houston. Get matched with auditors experienced in SaaS, energy, and healthcare.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/houston',
  },
};

export default function HoustonAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Houston"
      citySlug="houston"
      heroDescription="Houston auditors work across SaaS, energy, and healthcare. Get matched with firms that understand regulated environments and cloud-first stacks."
      localInsights={[
        'Experience with energy and healthcare compliance requirements.',
        'Balanced pricing with enterprise-ready reporting.',
        'Remote-first with optional onsite for physical controls.',
      ]}
      pricingNotes={[
        'Type I: ~$11k-$17k with regional firms.',
        'Type II: $17k-$30k depending on scope and control maturity.',
        'Rush fees possible for procurement-driven deadlines; plan ahead.',
      ]}
      onsitePolicy="Remote audits are standard; onsite walkthroughs are available for offices or facilities when physical security is in scope."
      industries={['SaaS', 'Energy', 'Healthcare', 'E-commerce']}
      faqs={[
        {
          question: 'Do Houston auditors require onsite visits?',
          answer: 'Remote is standard. Onsite is optional if physical facilities are in scope.',
        },
        {
          question: 'How does pricing compare?',
          answer: 'Generally competitive versus coastal hubs; depends on scope and firm brand.',
        },
        {
          question: 'Which industries are best served?',
          answer: 'Energy, healthcare, and SaaS are common; choose a firm with matching experience.',
        },
      ]}
      nearbyCities={[
        { name: 'Austin', href: '/auditor-directory/austin' },
        { name: 'Dallas', href: '/auditor-directory/dallas' },
      ]}
    />
  );
}
