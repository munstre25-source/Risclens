import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { ArrowRight } from 'lucide-react';
import { getPricingHref } from '@/lib/pseo-links';
import TopicalClusterLinks from '@/components/TopicalClusterLinks';

interface Alternative {
  name: string;
  slug: string;
  bestFor: string;
  keyStrength: string;
  estimatedPrice: string;
}

interface ToolAlternativePageProps {
  toolName: string;
  toolSlug: string;
  heroDescription: string;
  alternatives: Alternative[];
  comparisonFactors: string[];
}

export default function ToolAlternativePage({
  toolName,
  toolSlug,
  heroDescription,
  alternatives = [],
  comparisonFactors = [],
}: ToolAlternativePageProps) {
  const pageUrl = `https://risclens.com/compare/${toolSlug}-alternatives`;
  const pageTitle = `Top ${toolName} Alternatives for 2026 | RiscLens Report`;
  const lastUpdated = "January 10, 2026";
  const selectionChecklist = (comparisonFactors.length > 0 ? comparisonFactors : [
    'Audit readiness depth and evidence coverage',
    'Integration coverage for your stack',
    'Pricing transparency and contract flexibility',
    'Implementation time and support model',
    'Reporting and auditor collaboration workflow'
  ]).slice(0, 6);
  const switchSignals = alternatives.slice(0, 4).map((alt) => ({
    name: alt.name,
    bestFor: alt.bestFor,
    keyStrength: alt.keyStrength,
  }));

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Market Comparisons', item: 'https://risclens.com/compare' },
          { name: `${toolName} Alternatives`, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
            <span>Updated {lastUpdated}</span>
            <span>·</span>
            <VerifiedBy authorId="raphael" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {toolName} Alternatives
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-6">
            {heroDescription}
          </p>
          <Link 
            href={getPricingHref(toolSlug)}
            className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
          >
            See {toolName} pricing →
          </Link>
        </div>
      </section>

      {/* Alternatives Comparison Table - Above fold */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Alternative</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Starting Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Best For</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {alternatives.map((alt, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4">
                      <Link href={`/pricing/${alt.slug}`} className="font-medium text-slate-900 hover:text-slate-700 hover:underline">
                        {alt.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">{alt.estimatedPrice}</td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{alt.bestFor}</td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/compliance/compare/${toolSlug}-vs-${alt.slug}`}
                        className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                      >
                        Compare →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detailed Alternatives */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Detailed comparison</h2>
          
          <div className="space-y-6">
            {alternatives.map((alt, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{alt.name}</h3>
                    <p className="text-sm text-slate-500">{alt.estimatedPrice}/year starting</p>
                  </div>
                  <Link 
                    href={`/pricing/${alt.slug}`}
                    className="text-sm text-slate-500 hover:text-slate-700 hover:underline"
                  >
                    View pricing
                  </Link>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Best for:</span>
                    <span className="ml-2 text-slate-700">{alt.bestFor}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Key strength:</span>
                    <span className="ml-2 text-slate-700">{alt.keyStrength}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <AuthorBio authorId="raphael" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Selection checklist</h2>
          <ol className="space-y-3 text-sm text-slate-700">
            {selectionChecklist.map((factor, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="text-slate-400 font-medium">{idx + 1}.</span>
                <span>{factor}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {switchSignals.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">Why teams switch from {toolName}</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {switchSignals.map((alt) => (
                <div key={alt.name} className="bg-white border border-slate-200 rounded-lg p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">{alt.name}</h3>
                  <div className="text-sm text-slate-600 space-y-2">
                    <p>Best for: {alt.bestFor}</p>
                    <p>Key strength: {alt.keyStrength}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Evaluate */}
      {comparisonFactors.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">How to evaluate alternatives</h2>
            <ol className="space-y-4">
              {comparisonFactors.map((factor, idx) => (
                <li key={idx} className="flex gap-4 text-sm">
                  <span className="text-slate-400 font-medium">{idx + 1}.</span>
                  <span className="text-slate-600">{factor}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Related comparisons */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-sm font-medium text-slate-500 mb-4">More alternatives</h2>
          <div className="flex flex-wrap gap-3">
            {['Drata', 'Vanta', 'Secureframe', 'Sprinto', 'Thoropass']
              .filter(t => t.toLowerCase() !== toolName.toLowerCase())
              .slice(0, 4)
              .map((tool) => (
                <Link
                  key={tool}
                  href={`/compare/${tool.toLowerCase()}-alternatives`}
                  className="text-sm text-slate-600 hover:text-slate-900 hover:underline"
                >
                  {tool} alternatives
                </Link>
              ))}
          </div>

          <TopicalClusterLinks 
            pageType="comparison" 
            currentPath={`/compare/${toolSlug}-alternatives`}
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
