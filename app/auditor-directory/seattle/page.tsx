import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Seattle, WA | RiscLens',
  description: 'Find vetted SOC 2 auditors and CPA firms in Seattle. Get matched with auditors experienced in cloud, devtools, and enterprise SaaS stacks.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/seattle',
  },
};

export default function SeattleAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Seattle"
      citySlug="seattle"
      heroDescription="Seattle auditors see cloud-first stacks every day. Get matched with firms that understand AWS-heavy environments, devtools, and enterprise SaaS."
      localInsights={[
        'Strong cloud-native expertise (AWS/GCP/Azure) across firms.',
        'Comfort with infrastructure-as-code and automated evidence exports.',
        'Enterprise-ready: auditors familiar with Fortune 500 procurement expectations.',
      ]}
      pricingNotes={[
        'Type I: ~$11k-$17k with regional firms; national firms slightly higher.',
        'Type II: $18k-$32k depending on Trust Service Criteria and evidence quality.',
        'Rush fees can apply for quarter-end procurement deadlines; plan 6–8 weeks ahead.',
      ]}
      onsitePolicy="Seattle firms are remote-first. Onsite walkthroughs are available but typically unnecessary for cloud-native teams without offices or data centers."
      industries={['Cloud & DevTools', 'Enterprise SaaS', 'Fintech', 'AI/ML', 'E-commerce']}
      faqs={[
        {
          question: 'Do Seattle auditors require onsite visits?',
          answer: 'No—remote is standard. Onsite is rarely needed unless you have physical facilities to include in scope.',
        },
        {
          question: 'Are Seattle auditors strong on cloud-native evidence?',
          answer: 'Yes—most are comfortable with IaC, CI/CD logs, and automated evidence exports from AWS/GCP/Azure.',
        },
        {
          question: 'How fast can a Type II be completed?',
          answer: 'With solid evidence, 10–14 weeks is common; faster if controls are mature and scoped tightly.',
        },
      ]}
      nearbyCities={[
        { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
        { name: 'Los Angeles', href: '/auditor-directory/los-angeles' },
      ]}
    />
  );
}
