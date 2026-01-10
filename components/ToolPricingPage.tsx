import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Check, Info, TrendingDown, DollarSign, Clock } from 'lucide-react';

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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
                2026 Pricing Intelligence
              </div>
              <VerifiedBy authorId="raphael" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {toolName} Pricing <span className="text-brand-600">Breakdown</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {heroDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => (
              <div key={idx} className={`bg-white rounded-2xl p-8 border ${idx === 1 ? 'border-brand-500 shadow-xl ring-1 ring-brand-500 relative' : 'border-slate-200 shadow-sm'}`}>
                {idx === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    Most Common
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{tier.targetAudience}</p>
                <div className="text-3xl font-bold text-slate-900 mb-6">
                  {tier.estimatedPrice}
                  <span className="text-sm font-normal text-slate-400 block mt-1">Estimated annual cost</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600">
                      <Check className="w-5 h-5 text-brand-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ExpertReview authorId="raphael" date={lastUpdated} />
          
          <div className="grid lg:grid-cols-2 gap-12 mt-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <DollarSign className="text-brand-600" />
                Hidden Costs to Watch For
              </h2>
              <div className="space-y-4">
                {hiddenCosts.map((cost, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <p className="text-slate-700 font-medium flex gap-3">
                      <span className="text-brand-500">•</span>
                      {cost}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <TrendingDown className="text-brand-600" />
                Negotiation Strategy
              </h2>
              <div className="space-y-4">
                {negotiationTips.map((tip, idx) => (
                  <div key={idx} className="bg-brand-50/50 border border-brand-100 rounded-xl p-5">
                    <p className="text-slate-700 font-medium flex gap-3">
                      <span className="text-brand-500 font-bold">{idx + 1}.</span>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AuthorBio authorId="raphael" />

          <div className="mt-20 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center">

            <h3 className="text-2xl font-bold mb-4">Compare {toolName} to Alternatives</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Don't make a decision based on marketing. Use our head-to-head data to see which tool actually fits your stack and budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {comparisonLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-all border border-white/10"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      <Footer />
      <StickyCTA 
        label={`Calculate Total SOC 2 Cost with ${toolName}`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
