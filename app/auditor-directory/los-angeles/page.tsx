import { Metadata } from 'next';
import CityAuditorPage from '@/components/CityAuditorPage';

export const metadata: Metadata = {
  title: 'SOC 2 Auditors in Los Angeles (LA) | RiscLens',
  description: 'Find vetted SOC 2 auditors and CPA firms in Los Angeles. Get matched with auditors who understand media, SaaS, and AI stacks across SoCal.',
  alternates: {
    canonical: 'https://risclens.com/auditor-directory/los-angeles',
  },
};

export default function LosAngelesAuditorPage() {
  return (
    <CityAuditorPage
      cityName="Los Angeles"
      citySlug="los-angeles"
      heroDescription="LA blends media, SaaS, gaming, and AI. Work with auditors who understand cloud-native stacks and the privacy expectations of enterprise buyers."
      localInsights={[
        'Mix of regional firms and national brands with SoCal teams.',
        'Experience with media/gaming data flows and cloud-native evidence.',
        'Hybrid-friendly: remote-first with optional onsite for physical security.',
      ]}
      pricingNotes={[
        'Type I: ~$11k-$18k with regional firms; national brands may price higher.',
        'Type II: $18k-$32k depending on scope, stack complexity, and evidence readiness.',
        'Rush fees apply for accelerated timelines tied to enterprise deals; book 4–6 weeks ahead.',
      ]}
      onsitePolicy="Most LA firms are remote-first; onsite walkthroughs are available for studios or offices that need physical security validation."
      industries={['SaaS', 'AI/ML', 'Media & Streaming', 'Gaming', 'E-commerce']}
      faqs={[
        {
          question: 'Can LA audits be fully remote?',
          answer: 'Yes—remote is standard. Onsite is optional for physical security checks if you have a studio or office footprint.',
        },
        {
          question: 'How do LA costs compare to SF/NYC?',
          answer: 'Typically slightly lower than SF/NYC for similar scope; national firms may keep coastal pricing.',
        },
        {
          question: 'Which industries get the best fit in LA?',
          answer: 'Media/streaming, gaming, AI/ML, and SaaS see strong coverage—pick a firm that has audited stacks like yours.',
        },
      ]}
      nearbyCities={[
        { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
        { name: 'Seattle', href: '/auditor-directory/seattle' },
      ]}
    />
  );
}
