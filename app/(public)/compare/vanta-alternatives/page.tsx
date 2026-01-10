import { Metadata } from 'next';
import ToolAlternativePage from '@/components/ToolAlternativePage';

export const metadata: Metadata = {
  title: 'Top Vanta Alternatives for 2026: Comparison & Reviews | RiscLens',
  description: 'Looking for an alternative to Vanta? Compare Vanta against Drata, Secureframe, and Sprinto. See which compliance automation tool is right for your startup.',
  alternates: {
    canonical: 'https://risclens.com/compare/vanta-alternatives',
  },
};

export default function VantaAlternativesPage() {
  return (
    <ToolAlternativePage
      toolName="Vanta"
      toolSlug="vanta"
      heroDescription="While Vanta is the market leader, it may not be the perfect fit for every team. Whether you're looking for deeper automation, lower pricing, or better auditor flexibility, these top-rated alternatives provide compelling options for 2026."
      alternatives={[
        {
          name: 'Drata',
          slug: 'drata',
          bestFor: 'High-growth startups',
          keyStrength: 'Deep automation & Auto-pilot',
          estimatedPrice: '$8,000+',
        },
        {
          name: 'Secureframe',
          slug: 'secureframe',
          bestFor: 'Ease of use & Speed',
          keyStrength: 'Highly rated UX',
          estimatedPrice: '$7,000+',
        },
        {
          name: 'Sprinto',
          slug: 'sprinto',
          bestFor: 'Cost-conscious SaaS',
          keyStrength: 'Efficiency & Low overhead',
          estimatedPrice: '$6,000+',
        },
        {
          name: 'Thoropass',
          slug: 'thoropass',
          bestFor: 'All-in-one audit + platform',
          keyStrength: 'Audit certainty',
          estimatedPrice: '$18,000+',
        },
      ]}
      comparisonFactors={[
        'Auditor Flexibility: Does the tool force you to use their auditors, or can you bring your own?',
        'Integration Depth: Does the tool just read your settings, or can it actually help remediate issues?',
        'Framework Breadth: How easily can you add ISO 27001, HIPAA, or GDPR later?',
        'Customer Support: Do you get a dedicated compliance manager or just a ticketing system?',
      ]}
    />
  );
}
