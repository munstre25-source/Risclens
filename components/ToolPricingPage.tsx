import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Check, ArrowRight } from 'lucide-react';
import { getAlternativesHref } from '@/lib/pseo-links';
import { ContextualLinks } from '@/components/compliance/ContextualLinks';
import { EditorialPolicyBadge } from '@/components/compliance/AuthorByline';
import TopicalClusterLinks from '@/components/TopicalClusterLinks';

interface PricingTier {
  name: string;
  estimatedPrice: string;
  targetAudience: string;
  features: string[];
}

interface ToolPricingPageProps {
  toolName: string;
  toolSlug: string;
  heroDescription: string;
  pricingTiers: PricingTier[];
  hiddenCosts: string[];
  negotiationTips: string[];
  comparisonLinks: { name: string; href: string }[];
}

export default function ToolPricingPage({
  toolName,
  toolSlug,
  heroDescription,
  pricingTiers,
  hiddenCosts,
  negotiationTips,
  comparisonLinks,
}: ToolPricingPageProps) {
  const pageUrl = `https://risclens.com/pricing/${toolSlug}`;
  const pageTitle = `${toolName} Pricing Breakdown 2026 | RiscLens`;
  const lastUpdated = "January 10, 2026";
  const pricingDrivers = [
    `${toolName} pricing scales with team size and audit scope`,
    'Number of frameworks and evidence sources connected',
    'Automation depth for controls, evidence, and monitoring',
    'Level of implementation support and audit guidance',
    'Contract length and multi-year discounts'
  ];
  const buyerChecklist = [
    'Confirm which frameworks are included at each tier',
    'Ask for a full list of integrations in your stack',
    'Validate the evidence collection cadence and audit readiness workflow',
    'Clarify implementation timelines and support availability',
    'Request a written breakdown of add-ons and services'
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Pricing Intelligence', item: 'https://risclens.com/pricing' },
          { name: `${toolName} Pricing`, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="mb-12">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Pricing', href: '/pricing' },
                { label: `${toolName} Pricing` }
              ]} 
            />
            <div className="flex items-center gap-4 text-sm text-slate-500 mt-4 mb-6">
              <span>Updated {lastUpdated}</span>
              <span>·</span>
              <VerifiedBy authorId="raphael" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              {toolName} Pricing
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              {heroDescription}
            </p>
          </div>

          {/* Pricing Table - Above fold */}
          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Tier</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Best for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricingTiers?.map((tier, idx) => (
                  <tr key={idx} className={idx === 1 ? 'bg-slate-50' : ''}>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{tier.name}</span>
                      {idx === 1 && <span className="ml-2 text-xs text-slate-500">(most common)</span>}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{tier.estimatedPrice}</td>
                    <td className="px-6 py-4 text-slate-600">{tier.targetAudience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Tier Breakdown */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {pricingTiers?.map((tier, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{tier.estimatedPrice}/year</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {tier.features?.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">What changes the price</h2>
              <ul className="space-y-3 text-sm text-slate-600">
                {pricingDrivers.map((driver, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-slate-400">•</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Buyer checklist</h2>
              <ol className="space-y-3 text-sm text-slate-600">
                {buyerChecklist.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-slate-400 font-medium">{idx + 1}.</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Hidden Costs</h2>
              <ul className="space-y-3">
                {hiddenCosts?.map((cost, idx) => (
                  <li key={idx} className="text-slate-600 text-sm pl-4 border-l-2 border-slate-200">
                    {cost}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Negotiation Tips</h2>
              <ol className="space-y-3">
                {negotiationTips?.map((tip, idx) => (
                  <li key={idx} className="text-slate-600 text-sm flex gap-3">
                    <span className="text-slate-400 font-medium">{idx + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <AuthorBio authorId="raphael" />
            <EditorialPolicyBadge variant="footer" />
          </div>
        </div>
      </section>

      {/* Related Section */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Compare alternatives</h2>
            <Link 
              href={getAlternativesHref(toolSlug)}
              className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
            >
              View all {toolName} alternatives →
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {comparisonLinks.slice(0, 4).map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm text-slate-700 hover:border-slate-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Related pricing pages */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h3 className="text-sm font-medium text-slate-500 mb-4">More pricing guides</h3>
            <div className="flex flex-wrap gap-3">
              {['Vanta', 'Drata', 'Secureframe', 'Thoropass'].filter(t => t !== toolName).map((tool) => (
                <Link
                  key={tool}
                  href={`/pricing/${tool.toLowerCase()}`}
                  className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
                >
                  {tool} pricing
                </Link>
              ))}
            </div>
          </div>

          <ContextualLinks currentPageType="pricing" currentSlug={toolSlug} />

          <TopicalClusterLinks 
            pageType="pricing" 
            currentPath={`/pricing/${toolSlug}`}
            variant="footer"
          />
        </div>
      </section>

      <AboutSection />

      <Footer />
      
      <StickyCTA 
        label="Calculate SOC 2 cost" 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
