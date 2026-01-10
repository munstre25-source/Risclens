import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in New York City (NYC) | RiscLens',
  description: 'Find the best SOC 2 auditors and CPA firms in New York City. Get matched with vetted auditors serving the NYC tech and finance ecosystem.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/new-york',
  },
};

export default function NYCAuditorPage() {
  return (
    <CityAuditorPage
      cityName="New York City"
      citySlug="new-york"
      heroDescription="NYC is home to the world's most demanding finance and enterprise tech buyers. Ensure your SOC 2 report meets the standards of Wall Street and beyond."
      localInsights={[
        'High concentration of finance-specialized CPA firms.',
        'Auditors familiar with NYDFS Part 500 alignment.',
        'Expertise in high-scale fintech and marketplace audits.',
      ]}
      pricingNotes={[
        'Type I: ~$14k-$20k; premium firms serving banks/fintechs trend higher.',
        'Type II: $20k-$38k depending on Trust Service Criteria and evidence quality.',
        'Rush fees common for procurement-driven deadlines; book 6–8 weeks ahead if possible.',
      ]}
      onsitePolicy="NYC firms default to remote, but financial institutions sometimes expect onsite control walkthroughs; plan for a one-day visit if you have a physical office." 
      industries={['Fintech', 'Marketplace', 'Enterprise SaaS', 'E-commerce', 'Healthcare']}
      faqs={[
        {
          question: 'Do NYC auditors require onsite visits?',
          answer: 'Most work remote, but some finance buyers still expect onsite physical security checks. Many firms offer a hybrid model.',
        },
        {
          question: 'How do NYDFS/finance requirements affect SOC 2?',
          answer: 'Firms familiar with NYDFS Part 500 map controls to both frameworks and scrutinize access, logging, and vendor management more closely.',
        },
        {
          question: 'What timelines do NYC buyers expect?',
          answer: 'Enterprise buyers prefer recent reports (<12 months). Typical Type II timelines run 12–16 weeks; shorter if your evidence is automation-ready.',
        },
      ]}
      nearbyCities={[
        { name: 'Boston', href: '/auditor-directory/boston' },
        { name: 'Chicago', href: '/auditor-directory/chicago' },
      ]}
    />
  );
}
