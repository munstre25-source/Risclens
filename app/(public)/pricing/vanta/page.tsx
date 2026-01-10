import { Metadata } from 'next';
import ToolPricingPage from '@/components/ToolPricingPage';

export const metadata: Metadata = {
  title: 'Vanta Pricing 2026: Cost Breakdown & Negotiation Guide | RiscLens',
  description: 'How much does Vanta actually cost in 2026? See our estimated pricing tiers, hidden fees, and tips for negotiating your Vanta contract.',
  alternates: {
    canonical: 'https://risclens.com/pricing/vanta',
  },
};

export default function VantaPricingPage() {
  return (
    <ToolPricingPage
      toolName="Vanta"
      toolSlug="vanta"
      heroDescription="Vanta is the market leader in compliance automation. Their pricing is typically tiered based on employee count and the number of frameworks (SOC 2, ISO 27001, etc.) you need."
      pricingTiers={[
        {
          name: 'Starter',
          targetAudience: 'Startups < 20 employees',
          estimatedPrice: '$7,500 - $12,000',
          features: [
            'SOC 2 Type I or II',
            'Core integrations (AWS, GitHub, GSuite)',
            'Standard policy templates',
            'Basic support',
          ],
        },
        {
          name: 'Growth',
          targetAudience: 'Mid-market 21-100 employees',
          estimatedPrice: '$15,000 - $25,000',
          features: [
            'Multiple frameworks (SOC 2 + HIPAA/ISO)',
            'Customizable risk assessment',
            'Advanced access reviews',
            'Dedicated success manager',
          ],
        },
        {
          name: 'Enterprise',
          targetAudience: 'Large orgs 100+ employees',
          estimatedPrice: '$35,000+',
          features: [
            'Unlimited frameworks',
            'Trust Center / Security Page',
            'Questionnaire automation',
            'Enterprise-grade RBAC & API access',
          ],
        },
      ]}
      hiddenCosts={[
        'Auditor fees (Vanta does not include the audit cost)',
        'Implementation partner fees (if using a consultant)',
        'Additional cost for Trust Center / Security Page',
        'Renewal price increases (typically 5-10% annually)',
      ]}
      negotiationTips={[
        'Multi-year discounts: Vanta often gives 15-20% off for a 2 or 3-year commitment.',
        'Bundled frameworks: Add ISO 27001 or HIPAA during initial sign-up for better rates than adding them later.',
        'End of quarter: Sales teams are more flexible in the last 2 weeks of March, June, September, and December.',
        'Startup programs: Ask if you qualify for their startup discount (usually requires <$1M funding).',
      ]}
      comparisonLinks={[
        { name: 'Vanta vs Drata', href: '/compliance/compare/vanta-vs-drata' },
        { name: 'Vanta vs Secureframe', href: '/compliance/compare/vanta-vs-secureframe' },
        { name: 'All Vanta Alternatives', href: '/compare/vanta-alternatives' },
      ]}
    />
  );
}
