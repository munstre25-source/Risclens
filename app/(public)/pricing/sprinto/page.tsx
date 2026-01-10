import { Metadata } from 'next';
import ToolPricingPage from '@/components/ToolPricingPage';

export const metadata: Metadata = {
  title: 'Sprinto Pricing 2026: Cost Breakdown & Negotiation Guide | RiscLens',
  description: 'How much does Sprinto actually cost in 2026? See our estimated pricing tiers, hidden fees, and tips for negotiating your Sprinto contract.',
  alternates: {
    canonical: 'https://risclens.com/pricing/sprinto',
  },
};

export default function SprintoPricingPage() {
  return (
    <ToolPricingPage
      toolName="Sprinto"
      toolSlug="sprinto"
      heroDescription="Sprinto is known for being highly automated and cost-effective, particularly for fast-moving SaaS startups. Their pricing model is transparent and scales with your compliance needs."
      pricingTiers={[
        {
          name: 'Basic',
          targetAudience: 'Early-stage startups < 20 employees',
          estimatedPrice: '$6,000 - $9,000',
          features: [
            'SOC 2 Type I or II support',
            'Core cloud integrations',
            'Automated checks & monitoring',
            'Standard policy templates',
          ],
        },
        {
          name: 'Growth',
          targetAudience: 'Growing teams 20-100 employees',
          estimatedPrice: '$12,000 - $20,000',
          features: [
            'Multi-framework (SOC 2, ISO, GDPR)',
            'Advanced vendor management',
            'Customizable risk assessment',
            'Priority implementation support',
          ],
        },
        {
          name: 'Enterprise',
          targetAudience: 'Global orgs 100+ employees',
          estimatedPrice: '$30,000+',
          features: [
            'Unlimited frameworks',
            'Custom dashboards & reporting',
            'Role-based access control',
            'Dedicated success manager',
          ],
        },
      ]}
      hiddenCosts={[
        'Independent auditor fees',
        'Optional high-touch implementation consulting',
        'Trust Center / Security Page add-ons',
        'Fees for adding non-standard custom integrations',
      ]}
      negotiationTips={[
        'Quarter-end deals: Sprinto sales teams are known for flexibility at the end of fiscal quarters.',
        'Multi-framework bundles: Significant savings are available if you commit to SOC 2 and ISO 27001 at the same time.',
        'Community discounts: Check for discounts via startup communities or accelerator partnerships.',
        'Feedback incentive: Sometimes they offer discounts in exchange for participating in case studies or product feedback sessions.',
      ]}
      comparisonLinks={[
        { name: 'Sprinto vs Vanta', href: '/compliance/compare/vanta-vs-sprinto' },
        { name: 'Sprinto vs Drata', href: '/compliance/compare/drata-vs-sprinto' },
        { name: 'All Sprinto Alternatives', href: '/compare/sprinto-alternatives' },
      ]}
    />
  );
}
