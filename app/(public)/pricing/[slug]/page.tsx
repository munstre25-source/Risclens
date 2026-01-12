import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import { Check, X, ArrowRight, DollarSign, Users, Layers, Clock } from 'lucide-react';
import {
  getAllTools,
  getToolBySlug,
  generatePricingTitle,
  generatePricingDescription,
  ComplianceTool,
  TOP_TOOLS,
} from '@/lib/compliance-tools';
import {
  getPricingInternalLinks,
  getBreadcrumbs,
  generateToolSchema,
  generateSchemaOrgBreadcrumbs,
} from '@/lib/pseo-internal-links';
import { EEATSignals, ExpertAuthorBox, TrustSignals } from '@/components/EEATSignals';
import { InternalLinks, Breadcrumbs, RelatedToolsGrid } from '@/components/InternalLinks';

export async function generateStaticParams() {
  const tools = await getAllTools();
  return tools.map(tool => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return { title: 'Pricing | RiscLens' };

  return {
    title: generatePricingTitle(tool),
    description: generatePricingDescription(tool),
    alternates: { canonical: `https://risclens.com/pricing/${params.slug}` },
    openGraph: {
      title: generatePricingTitle(tool),
      description: generatePricingDescription(tool),
      type: 'article',
    },
  };
}

export default async function PricingPage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();

  const tools = await getAllTools();
  const internalLinks = await getPricingInternalLinks(params.slug);
  const breadcrumbs = getBreadcrumbs(`/pricing/${params.slug}`);
  
  const toolSchema = generateToolSchema(tool, `https://risclens.com/pricing/${params.slug}`);
  const breadcrumbSchema = generateSchemaOrgBreadcrumbs(breadcrumbs);

  const competitors = tools
    .filter(t => t.slug !== tool.slug && TOP_TOOLS.includes(t.slug))
    .slice(0, 4);

  return (
    <>
      <Script id="tool-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="min-h-screen bg-slate-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 mb-6">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Pricing Guide 2026</span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                  {tool.name} Pricing
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl">
                  {generatePricingDescription(tool)}
                </p>
              </div>

              <EEATSignals
                lastVerified={tool.last_verified_at}
                reviewCount={tool.g2_reviews_count || 0}
                sources={['Vendor Pricing Pages', 'G2 Crowd', 'Customer Interviews']}
              />

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden my-8">
                <div className="bg-slate-900 text-white p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Starting at</p>
                      <p className="text-4xl font-bold">{tool.pricing_starting || 'Contact Sales'}</p>
                    </div>
                    {tool.auditor_included && (
                      <div className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold">
                        Auditor Included
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                        Pricing Model
                      </h3>
                      <p className="text-slate-600">{tool.pricing_model || 'Custom pricing based on requirements'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-600" />
                        Typical Range
                      </h3>
                      <p className="text-slate-600">{tool.pricing_range || 'Contact vendor for quote'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        Target Market
                      </h3>
                      <p className="text-slate-600">{tool.target_market}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Hidden Costs
                      </h3>
                      <p className="text-slate-600">{tool.hidden_costs || 'None disclosed'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">What Drives {tool.name} Pricing?</h2>
                <div className="space-y-4">
                  <PricingFactor 
                    title="Employee Count" 
                    description="Most compliance platforms price based on the number of employees, as this affects the volume of access reviews, security training, and evidence collection required."
                  />
                  <PricingFactor 
                    title="Number of Frameworks" 
                    description="Adding frameworks like ISO 27001, HIPAA, or SOC 1 to your SOC 2 program typically increases costs by 20-40% per additional framework."
                  />
                  <PricingFactor 
                    title="Integrations Required" 
                    description="Complex tech stacks with many cloud providers and tools may require additional configuration and custom integrations."
                  />
                  {!tool.auditor_included && (
                    <PricingFactor 
                      title="Auditor Fees (Separate)" 
                      description="Remember to budget separately for auditor fees, typically $8,000-$25,000 for SOC 2 Type II depending on complexity."
                      highlighted
                    />
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">{tool.name} Features Overview</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {tool.key_features?.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-green-700 mb-4 text-lg">Pros</h3>
                  <ul className="space-y-3">
                    {tool.pros?.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-red-700 mb-4 text-lg">Cons</h3>
                  <ul className="space-y-3">
                    {tool.cons?.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-8 my-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Our Verdict on {tool.name}</h2>
                <p className="text-slate-300 text-lg">{tool.verdict}</p>
                <p className="text-slate-400 mt-4">Best for: {tool.best_for}</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Compare {tool.name} Pricing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Platform</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Starting Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Auditor Included</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900">Target Market</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50">
                        <td className="py-3 px-4 font-semibold text-slate-900">{tool.name}</td>
                        <td className="py-3 px-4">{tool.pricing_starting}</td>
                        <td className="py-3 px-4">{tool.auditor_included ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-slate-300" />}</td>
                        <td className="py-3 px-4 text-sm">{tool.target_market}</td>
                      </tr>
                      {competitors.map(comp => (
                        <tr key={comp.slug} className="border-b border-slate-100">
                          <td className="py-3 px-4">
                            <Link href={`/pricing/${comp.slug}`} className="text-blue-600 hover:underline font-medium">
                              {comp.name}
                            </Link>
                          </td>
                          <td className="py-3 px-4">{comp.pricing_starting}</td>
                          <td className="py-3 px-4">{comp.auditor_included ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-slate-300" />}</td>
                          <td className="py-3 px-4 text-sm">{comp.target_market}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ExpertAuthorBox />

              <TrustSignals />

              <div className="bg-blue-600 rounded-2xl p-8 text-white text-center my-8">
                <h2 className="text-2xl font-bold mb-4">Get a Full Cost Estimate</h2>
                <p className="text-blue-100 mb-6">Our SOC 2 Cost Calculator factors in platform costs, auditor fees, and your specific requirements.</p>
                <Link href="/soc-2-cost-calculator" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  Calculate Total Costs <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="my-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Other Pricing Guides</h2>
                <RelatedToolsGrid tools={tools} currentSlug={params.slug} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <InternalLinks clusters={internalLinks} />
                
                <div className="mt-6 bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href={`/compare/${tool.slug}-alternatives`} className="text-blue-600 hover:underline">
                        {tool.name} Alternatives
                      </Link>
                    </li>
                    <li>
                      <Link href="/soc-2-cost-calculator" className="text-blue-600 hover:underline">
                        SOC 2 Cost Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/auditor-match" className="text-blue-600 hover:underline">
                        Find an Auditor
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

function PricingFactor({ title, description, highlighted = false }: { title: string; description: string; highlighted?: boolean }) {
  return (
    <div className={`p-4 rounded-lg ${highlighted ? 'bg-orange-50 border border-orange-200' : 'bg-slate-50'}`}>
      <h4 className={`font-semibold mb-2 ${highlighted ? 'text-orange-800' : 'text-slate-900'}`}>{title}</h4>
      <p className={`text-sm ${highlighted ? 'text-orange-700' : 'text-slate-600'}`}>{description}</p>
    </div>
  );
}
