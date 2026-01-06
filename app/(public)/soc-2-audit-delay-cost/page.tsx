import { Soc2AuditDelayCalculator } from '@/components/calculators/Soc2AuditDelayCalculator';
import ReadinessNav from '@/components/ReadinessNav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOC 2 Audit Delay Cost Calculator | RiscLens',
  description: 'Calculate the revenue impact of SOC 2 audit delays on your enterprise sales pipeline.',
  alternates: {
    canonical: 'https://risclens.com/soc-2-audit-delay-cost',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Soc2AuditDelayPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <ReadinessNav />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          SOC 2 Audit Delay Cost Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compliance delays aren't just an ops problem—they're a revenue problem. 
          See how much pipeline is at risk while you wait for your audit.
        </p>
      </div>

      <Soc2AuditDelayCalculator />

      <div className="max-w-2xl mx-auto mt-20 text-center">
        <p className="text-sm text-gray-400">
          This calculator provides directional estimates based on market benchmarks. 
          Enterprise deal cycles vary by industry and contract complexity.
        </p>
      </div>
    </div>
  );
}
