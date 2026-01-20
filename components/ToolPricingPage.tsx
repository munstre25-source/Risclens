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
import { Check, Info, TrendingDown, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { getAlternativesHref } from '@/lib/pseo-links';
import { ContextualLinks } from '@/components/compliance/ContextualLinks';
import { EditorialPolicyBadge } from '@/components/compliance/AuthorByline';
import { ExitIntentModal, InlineCTA } from '@/components/LeadCaptureCTA';
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center mb-6">
              <Breadcrumb 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Pricing Hub', href: '/pricing' },
                  { label: `${toolName} Pricing` }
                ]} 
              />
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
            {pricingTiers?.map((tier, idx) => (
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
                  {tier.features?.map((feature, i) => (
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
          <ExpertReview
            authorId="raphael"
            date={lastUpdated}
            title={`${toolName} Pricing Guide 2026`}
            url={`/pricing/${toolSlug}`}
          />
          
            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <DollarSign className="text-brand-600" />
                  Hidden Costs to Watch For
                </h2>
                <div className="space-y-4">
                  {hiddenCosts?.map((cost, idx) => (
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
                  {negotiationTips?.map((tip, idx) => (
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

              <EditorialPolicyBadge variant="footer" />

              <div className="mt-20 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Compare {toolName} to Alternatives</h3>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Don't make a decision based on marketing. Use our head-to-head data to see which tool actually fits your stack and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href={getAlternativesHref(toolSlug)}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  View {toolName} Alternatives
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex flex-wrap gap-4 justify-center">
                  {comparisonLinks.slice(0, 3).map((link, idx) => (
                    <Link 
                      key={idx} 
                      href={link.href}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-xl transition-all border border-white/10 text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

              {/* Related Tools Section */}
              <div className="mt-16 border-t border-slate-100 pt-16">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900">Related Pricing Intelligence</h3>
                  <Link href="/pricing" className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group">
                    View Pricing Hub
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Vanta', 'Drata', 'Secureframe', 'Thoropass'].filter(t => t !== toolName).map((tool) => (
                  <Link
                    key={tool}
                    href={`/pricing/${tool.toLowerCase()}`}
                    className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-brand-300 hover:bg-brand-50 transition-all group"
                  >
                    <span className="font-bold text-slate-700 group-hover:text-brand-700">{tool}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500" />
                  </Link>
                ))}
              </div>
              </div>

              <ContextualLinks currentPageType="pricing" currentSlug={toolSlug} />

              {/* Enhanced CTA Section */}
              <InlineCTA 
                variant="calculator" 
                context={toolName} 
                className="mt-16" 
              />

              {/* Topical cluster links for internal linking */}
              <TopicalClusterLinks 
                pageType="pricing" 
                currentPath={`/pricing/${toolSlug}`}
                variant="footer"
              />

          </div>
        </section>

      <AboutSection />

      <Footer />
      
      {/* Exit Intent Modal for lead capture */}
      <ExitIntentModal 
        variant="calculator"
        title={`Before you go: Calculate your ${toolName} costs`}
        description={`See exactly what ${toolName} will cost your organization, including hidden fees and auditor costs.`}
      />
      
      <StickyCTA 
        label={`Calculate Total SOC 2 Cost with ${toolName}`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
