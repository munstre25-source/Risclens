import { Metadata } from 'next';
import ToolPricingPage from '@/components/ToolPricingPage';

export const metadata: Metadata = {
  title: 'Thoropass Pricing 2026: Cost Breakdown & Negotiation Guide | RiscLens',
  description: 'How much does Thoropass actually cost in 2026? See our estimated pricing tiers, hidden fees, and tips for negotiating your Thoropass contract.',
  alternates: {
    canonical: 'https://risclens.com/pricing/thoropass',
  },
};

export default function ThoropassPricingPage() {
  return (
    <ToolPricingPage
      toolName="Thoropass"
      toolSlug="thoropass"
      heroDescription="Thoropass (formerly Laika) is unique because they often bundle the auditor fee directly into their platform price. This 'all-in-one' approach provides high cost certainty."
      pricingTiers={[
        {
          name: 'Starter Bundle',
          targetAudience: 'Seed-stage < 15 employees',
          estimatedPrice: '$18,000 - $25,000',
          features: [
            'SOC 2 Type I Audit Included',
            'Platform access for 1 year',
            'Policy development assistance',
            'Guided implementation',
          ],
        },
        {
          name: 'Growth Bundle',
          targetAudience: 'Series A/B < 75 employees',
          estimatedPrice: '$30,000 - $45,000',
          features: [
            'SOC 2 Type II Audit Included',
            'Continuous monitoring',
            'Dedicated compliance architect',
            'Quarterly health checks',
          ],
        },
        {
          name: 'Custom',
          targetAudience: 'Enterprise / Multi-Framework',
          estimatedPrice: '$60,000+',
          features: [
            'Multiple Audits (SOC 2 + ISO/HIPAA)',
            'Custom control implementation',
            'Premium support & training',
            'Strategic compliance roadmap',
          ],
        },
      ]}
      hiddenCosts={[
        'Renewal fees for the platform (after year 1)',
        'Additional cost for "Trust Service Criteria" beyond Security',
        'Retesting fees if the initial audit has significant findings',
        'Premium high-touch consulting services',
      ]}
      negotiationTips={[
        'Unbundle the audit: If you already have an auditor, ask for a "platform-only" price.',
        'Length of commitment: 2-year deals often see a significant reduction in the platform component of the price.',
        'Referral: Thoropass is active in the startup ecosystem; check for community-specific discount codes (e.g., YC, Techstars).',
        'Implementation speed: Ask for a discount if you can commit to a rapid 60-day implementation timeline.',
      ]}
      comparisonLinks={[
        { name: 'Thoropass vs Vanta', href: '/compliance/compare/vanta-vs-thoropass' },
        { name: 'Thoropass vs Drata', href: '/compliance/compare/drata-vs-thoropass' },
        { name: 'Thoropass vs Secureframe', href: '/compliance/compare/secureframe-vs-thoropass' },
      ]}
    />
  );
}
