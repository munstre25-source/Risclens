import { Metadata } from 'next';
import ToolPricingPage from '@/components/ToolPricingPage';

export const metadata: Metadata = {
  title: 'Secureframe Pricing 2026: Cost Breakdown & Negotiation Guide | RiscLens',
  description: 'How much does Secureframe actually cost in 2026? See our estimated pricing tiers, hidden fees, and tips for negotiating your Secureframe contract.',
  alternates: {
    canonical: 'https://risclens.com/pricing/secureframe',
  },
};

export default function SecureframePricingPage() {
  return (
    <ToolPricingPage
      toolName="Secureframe"
      toolSlug="secureframe"
      heroDescription="Secureframe is highly rated for its ease of use and automated evidence collection. Their pricing is often more flexible for smaller teams and scales linearly with complexity."
      pricingTiers={[
        {
          name: 'Essentials',
          targetAudience: 'Startups < 25 employees',
          estimatedPrice: '$7,000 - $11,000',
          features: [
            'SOC 2 Type I or II',
            'Core infrastructure integrations',
            'Pre-built policy library',
            'Email support',
          ],
        },
        {
          name: 'Professional',
          targetAudience: 'Growth 26-100 employees',
          estimatedPrice: '$15,000 - $25,000',
          features: [
            'Multi-framework support',
            'Advanced vendor risk management',
            'HRIS & SSO integrations',
            'Priority support',
          ],
        },
        {
          name: 'Enterprise',
          targetAudience: 'Large orgs 100+ employees',
          estimatedPrice: '$35,000+',
          features: [
            'Unlimited frameworks',
            'Customizable trust center',
            'API access for custom integrations',
            'Dedicated success manager',
          ],
        },
      ]}
      hiddenCosts={[
        'Independent auditor fees',
        'Trust Center add-on (monthly subscription)',
        'Additional cost for HIPAA or ISO 27001 expansions',
        'Implementation support (optional high-touch services)',
      ]}
      negotiationTips={[
        'Bundle everything: Secureframe is often willing to discount the total package if you buy SOC 2 and HIPAA together.',
        'Ask for a trial: While they don\'t always offer them, asking for a limited trial can sometimes lead to a lower initial entry price.',
        'VC discount: Check if your venture firm has a partner discount with Secureframe; these are usually 15-25%.',
        'Volume discount: If you have multiple entities, negotiate a master service agreement for better unit pricing.',
      ]}
      comparisonLinks={[
        { name: 'Secureframe vs Vanta', href: '/compliance/compare/vanta-vs-secureframe' },
        { name: 'Secureframe vs Drata', href: '/compliance/compare/drata-vs-secureframe' },
        { name: 'All Secureframe Alternatives', href: '/compare/secureframe-alternatives' },
      ]}
    />
  );
}
