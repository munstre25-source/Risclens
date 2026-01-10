import { Metadata } from 'next';
import ToolAlternativePage from '@/components/ToolAlternativePage';

export const metadata: Metadata = {
  title: 'Top Drata Alternatives for 2026: Comparison & Reviews | RiscLens',
  description: 'Looking for an alternative to Drata? Compare Drata against Vanta, Secureframe, and Sprinto. See which compliance automation tool is right for your startup.',
  alternates: {
    canonical: 'https://risclens.com/compare/drata-alternatives',
  },
};

export default function DrataAlternativesPage() {
  return (
    <ToolAlternativePage
      toolName="Drata"
      toolSlug="drata"
      heroDescription="Drata is a powerhouse in compliance automation, but its pricing and seat-based model may not be for everyone. Explore these top-tier alternatives that offer different approaches to SOC 2, ISO 27001, and HIPAA compliance."
      alternatives={[
        {
          name: 'Vanta',
          slug: 'vanta',
          bestFor: 'Market leadership & Integrations',
          keyStrength: 'Largest integration ecosystem',
          estimatedPrice: '$7,500+',
        },
        {
          name: 'Secureframe',
          slug: 'secureframe',
          bestFor: 'High-growth startups',
          keyStrength: 'Excellent UI/UX',
          estimatedPrice: '$7,000+',
        },
        {
          name: 'Sprinto',
          slug: 'sprinto',
          bestFor: 'Efficiency & Automation',
          keyStrength: 'Fastest time-to-value',
          estimatedPrice: '$6,000+',
        },
        {
          name: 'Thoropass',
          slug: 'thoropass',
          bestFor: 'Audit certainty',
          keyStrength: 'Bundled audits',
          estimatedPrice: '$18,000+',
        },
      ]}
      comparisonFactors={[
        'Automation Depth: How much of the evidence collection is truly hands-off?',
        'Seat Pricing: Does the cost scale with your headcount or is it a flat platform fee?',
        'Custom Control Support: How easy is it to add controls that are unique to your business?',
        'Renewal Experience: Have existing customers reported significant price hikes at renewal?',
      ]}
    />
  );
}
