import { Metadata } from 'next';
import ToolPricingPage from '@/components/ToolPricingPage';

export const metadata: Metadata = {
  title: 'Drata Pricing 2026: Cost Breakdown & Negotiation Guide | RiscLens',
  description: 'How much does Drata actually cost in 2026? See our estimated pricing tiers, hidden fees, and tips for negotiating your Drata contract.',
  alternates: {
    canonical: 'https://risclens.com/pricing/drata',
  },
};

export default function DrataPricingPage() {
  return (
    <ToolPricingPage
      toolName="Drata"
      toolSlug="drata"
      heroDescription="Drata is known for its deep automation and 'Auto-Pilot' features. Their pricing is competitive with Vanta but often includes more granular seat-based pricing for larger teams."
      pricingTiers={[
        {
          name: 'Foundation',
          targetAudience: 'Early-stage < 25 employees',
          estimatedPrice: '$8,000 - $13,000',
          features: [
            'SOC 2 Type I & II',
            'Unlimited integrations',
            'Automated evidence collection',
            'Basic risk management',
          ],
        },
        {
          name: 'Scale',
          targetAudience: 'Growth 26-150 employees',
          estimatedPrice: '$18,000 - $30,000',
          features: [
            'Multi-framework (SOC 2, ISO, HIPAA)',
            'Advanced access reviews',
            'Custom control mapping',
            'Standard support',
          ],
        },
        {
          name: 'Enterprise',
          targetAudience: 'Global orgs 150+ employees',
          estimatedPrice: '$40,000+',
          features: [
            'Unlimited frameworks',
            'Custom dashboards & reporting',
            'Third-party risk management',
            'Premium 24/7 support',
          ],
        },
      ]}
      hiddenCosts={[
        'Auditor fees (independent of Drata)',
        'Premium support add-ons',
        'Seat-based overages for employee access reviews',
        'Trust Center / Security Page subscription',
      ]}
      negotiationTips={[
        'Switching incentive: Drata often offers deep discounts if you are moving from a competitor like Vanta.',
        'Auditor bundle: Ask about their preferred auditor network; sometimes auditors offer a discount if you use Drata.',
        'Platform fee vs Seat fee: Negotiate the base platform fee first before looking at seat counts.',
        'Referral credits: If you have a large network, ask about their referral program for future credits.',
      ]}
      comparisonLinks={[
        { name: 'Drata vs Vanta', href: '/compliance/compare/vanta-vs-drata' },
        { name: 'Drata vs Secureframe', href: '/compliance/compare/drata-vs-secureframe' },
        { name: 'All Drata Alternatives', href: '/compare/drata-alternatives' },
      ]}
    />
  );
}
