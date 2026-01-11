import { Metadata } from 'next';
import PricingHub from '@/components/PricingHub';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';

export const metadata: Metadata = {
  title: 'Compliance Pricing Intelligence Hub | SOC 2 Platform Costs 2026',
  description: 'Access verified pricing data for Vanta, Drata, Secureframe, and more. Use our cost calculators and platform comparisons to budget your compliance journey.',
};

export default function PricingPage() {
  return (
    <main>
      <GeneralPageSchema 
        title="Compliance Pricing Intelligence Hub"
        description="Verified market data and cost calculators for SOC 2 compliance platforms."
        url="https://risclens.com/pricing"
      />
      <PricingHub />
    </main>
  );
}
