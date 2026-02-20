import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Clock,
  Briefcase,
  Users,
  BarChart3,
  Star,
  DollarSign,
  PlusCircle,
  ArrowRight,
  HelpCircle,
  Globe,
  Zap,
  AlertCircle,
  X,
  XCircle,
  Calculator,
  Info,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Award,
  Lock,
  Search
} from 'lucide-react';
import { toolPricing } from '@/src/content/pricing';
import { AuthorBio } from '@/components/AuthorBio';
import { getSupabaseAdmin } from '@/lib/supabase';
import ToolPricingPageContent from '@/components/ToolPricingPage';
import {
  generatePricingTitleOptimized,
  generatePricingDescriptionOptimized,
  generatePricingFAQs,
  CURRENT_YEAR,
} from '@/lib/seo-enhancements';
import { FAQSection } from '@/components/FAQSection';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { getToolBySlug } from '@/lib/compliance-tools';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const LEGACY_PRICING_SLUG_ALIASES: Record<string, string> = {
  'credo-ai-pricing': 'credo-ai',
  'holistic-ai-pricing': 'holistic-ai',
  'onetrust-ai-governance-pricing': 'onetrust-ai-governance',
  'ibm-watsonx-governance-pricing': 'ibm-watsonx-governance',
};

const LEGACY_PRICING_TOOL_NAMES: Record<string, string> = {
  'onetrust-ai-governance': 'OneTrust AI Governance',
  'ibm-watsonx-governance': 'IBM watsonx.governance',
  'credo-ai': 'Credo AI',
  'holistic-ai': 'Holistic AI',
};

function normalizePricingSlug(slug: string): string {
  if (LEGACY_PRICING_SLUG_ALIASES[slug]) {
    return LEGACY_PRICING_SLUG_ALIASES[slug];
  }
  if (slug.endsWith('-pricing')) {
    return slug.replace(/-pricing$/, '');
  }
  return slug;
}

function getPricingDisplayName(slug: string): string {
  if (LEGACY_PRICING_TOOL_NAMES[slug]) {
    return LEGACY_PRICING_TOOL_NAMES[slug];
  }

  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function getPseoPricingData(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('*')
    .eq('category', 'pricing')
    .eq('slug', slug)
    .single();
  
  return data;
}

function buildFallbackPricingContent(tool: Awaited<ReturnType<typeof getToolBySlug>>, slug: string) {
  const defaultTiers = [
    {
      name: 'Starter',
      estimatedPrice: tool?.pricing_starting || 'Contact Sales',
      targetAudience: tool?.target_market || 'Growth-stage teams',
      features: [
        `Frameworks supported: ${tool?.frameworks_supported?.slice(0, 3).join(', ') || 'SOC 2, ISO 27001, HIPAA'}`,
        `Automation level: ${tool?.automation_level || 'Standard'}`,
        `Integrations: ${tool?.integrations_count ? `${tool.integrations_count}+` : 'Core integrations'}`,
      ],
    },
    {
      name: 'Growth',
      estimatedPrice: tool?.pricing_range || 'Custom pricing',
      targetAudience: tool?.target_market || 'Scaling compliance programs',
      features: [
        'Expanded controls and evidence automation',
        'Cross-framework mapping and monitoring',
        'Dedicated onboarding and implementation support',
      ],
    },
    {
      name: 'Enterprise',
      estimatedPrice: 'Custom Quote',
      targetAudience: 'Complex multi-entity programs',
      features: [
        'Advanced governance and reporting',
        'Custom workflows and integrations',
        'Dedicated success and audit support',
      ],
    },
  ];

  const hiddenCosts = tool?.hidden_costs
    ? tool.hidden_costs
        .split(/;|,/)
        .map((item) => item.trim())
        .filter(Boolean)
    : ['Ask for implementation, auditor, and module add-on pricing in writing.'];

  const negotiationTips = [
    `Ask ${tool?.name || 'the vendor'} to break down base license vs implementation fees.`,
    'Request annual and multi-year pricing with all add-ons listed.',
    'Confirm what evidence automation and audit support are included at each tier.',
  ];

  const comparisonLinks = [
    { name: `${tool?.name || slug} Alternatives`, href: `/compare/${slug}-alternatives` },
    { name: `${tool?.name || slug} vs Vanta`, href: `/compare/${[slug, 'vanta'].sort().join('-vs-')}` },
    { name: `${tool?.name || slug} vs Drata`, href: `/compare/${[slug, 'drata'].sort().join('-vs-')}` },
    { name: `${tool?.name || slug} vs Secureframe`, href: `/compare/${[slug, 'secureframe'].sort().join('-vs-')}` },
  ];

  return {
    toolName: tool?.name || getPricingDisplayName(slug),
    toolSlug: slug,
    heroDescription:
      tool?.description ||
      `Independent pricing analysis for ${tool?.name || slug}, including plan structure, cost drivers, and negotiation guidance.`,
    pricingTiers: defaultTiers,
    hiddenCosts,
    negotiationTips,
    comparisonLinks,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: requestedSlug } = await params;
  const slug = normalizePricingSlug(requestedSlug);
  
  // Try pSEO database first
  const pseoData = await getPseoPricingData(slug);
  if (pseoData?.content_json) {
    const { toolName, heroDescription, pricingTiers } = pseoData.content_json;
    // Only use pSEO data if toolName exists
    if (toolName && toolName.trim() !== '') {
      const startingPrice = pricingTiers?.[0]?.estimatedPrice;
      const title = generatePricingTitleOptimized(toolName, startingPrice);
      const description = generatePricingDescriptionOptimized(toolName, startingPrice);
      
      return {
        title,
        description: heroDescription || description,
        keywords: [
          `${toolName} pricing`,
          `${toolName} pricing ${CURRENT_YEAR}`,
          `${toolName} cost`,
          `how much does ${toolName} cost`,
          'compliance software pricing',
        ],
        alternates: {
          canonical: `https://risclens.com/pricing/${slug}`,
        }
      };
    }
  }

  // Fallback to static content
  const tool = toolPricing.find(t => t.slug === slug);
  if (tool) {
    const title = generatePricingTitleOptimized(tool.name, tool.startingPrice);
    const description = generatePricingDescriptionOptimized(tool.name, tool.startingPrice, tool.targetMarket);

    return {
      title,
      description,
      keywords: [
        `${tool.name} pricing`,
        `${tool.name} pricing ${CURRENT_YEAR}`,
        `${tool.name} cost`,
        `how much does ${tool.name} cost`,
        `${tool.name} plans`,
      ],
      alternates: {
        canonical: `https://risclens.com/pricing/${slug}`,
      }
    };
  }

  const complianceTool = await getToolBySlug(slug);
  if (!complianceTool) {
    if (requestedSlug !== slug) {
      const toolName = getPricingDisplayName(slug);
      const title = generatePricingTitleOptimized(toolName, 'Contact Sales');
      const description = generatePricingDescriptionOptimized(toolName, 'Contact Sales');

      return {
        title,
        description,
        keywords: [
          `${toolName} pricing`,
          `${toolName} pricing ${CURRENT_YEAR}`,
          `${toolName} cost`,
          `how much does ${toolName} cost`,
          `${toolName} plans`,
        ],
        alternates: {
          canonical: `https://risclens.com/pricing/${slug}`,
        }
      };
    }

    return { title: 'Pricing Not Found', robots: { index: false } };
  }
  const title = generatePricingTitleOptimized(complianceTool.name, complianceTool.pricing_starting || 'Contact Sales');
  const description = generatePricingDescriptionOptimized(
    complianceTool.name,
    complianceTool.pricing_starting || 'Contact Sales',
    complianceTool.target_market || undefined
  );

  return {
    title,
    description,
    keywords: [
      `${complianceTool.name} pricing`,
      `${complianceTool.name} pricing ${CURRENT_YEAR}`,
      `${complianceTool.name} cost`,
      `how much does ${complianceTool.name} cost`,
      `${complianceTool.name} plans`,
    ],
    alternates: {
      canonical: `https://risclens.com/pricing/${slug}`,
    }
  };
}

  export async function generateStaticParams() {
    const supabase = getSupabaseAdmin();
    const [{ data: pseoPages }, { data: activeTools }] = await Promise.all([
      supabase
        .from('pseo_pages')
        .select('slug, content_json')
        .eq('category', 'pricing'),
      supabase
        .from('compliance_tools')
        .select('slug')
        .eq('is_active', true),
    ]);

    // Filter out pSEO pages with missing or empty toolName
    const pseoSlugs = pseoPages
      ?.filter(p => p.slug && p.content_json?.toolName && p.content_json.toolName.trim() !== '')
      .map(p => ({ slug: p.slug })) || [];
    
    const staticSlugs = toolPricing.filter(t => t.slug).map((tool) => ({
      slug: tool.slug,
    }));
    const activeToolSlugs = (activeTools || [])
      .filter((tool) => Boolean(tool.slug))
      .map((tool) => ({ slug: tool.slug }));

    // Merge and deduplicate
    const allSlugs = [...staticSlugs];
    [pseoSlugs, activeToolSlugs].forEach((group) => {
      group.forEach((slugRow) => {
        if (!allSlugs.find((existing) => existing.slug === slugRow.slug)) {
          allSlugs.push(slugRow);
        }
      });
    });

    return allSlugs;
  }


export default async function ToolPricingPage({ params }: PageProps) {
  const { slug: requestedSlug } = await params;
  const slug = normalizePricingSlug(requestedSlug);
  
  // 1. Try pSEO database first
  const pseoData = await getPseoPricingData(slug);
  if (pseoData?.content_json) {
    const content = pseoData.content_json;
    
    // Validate required fields exist - prevent "undefined" pages
    if (!content.toolName || content.toolName.trim() === '') {
      console.warn(`[Pricing] Missing toolName for slug: ${slug}`);
      // Fall through to static content or 404
    } else {
      return (
        <ToolPricingPageContent 
          toolName={content.toolName}
          toolSlug={slug}
          heroDescription={content.heroDescription || `Expert breakdown of ${content.toolName} pricing, tiers, and negotiation tips.`}
          pricingTiers={content.pricingTiers || []}
          hiddenCosts={content.hiddenCosts || []}
          negotiationTips={content.negotiationTips || []}
          comparisonLinks={content.comparisonLinks || []}
        />
      );
    }
  }

  // 2. Fallback to static content
  const staticTool = toolPricing.find(t => t.slug === slug);
  const complianceTool = staticTool ? null : await getToolBySlug(slug);

  if (!staticTool && !complianceTool) {
    if (requestedSlug !== slug) {
      const content = buildFallbackPricingContent(null, slug);
      return (
        <ToolPricingPageContent
          toolName={content.toolName}
          toolSlug={slug}
          heroDescription={content.heroDescription}
          pricingTiers={content.pricingTiers}
          hiddenCosts={content.hiddenCosts}
          negotiationTips={content.negotiationTips}
          comparisonLinks={content.comparisonLinks}
        />
      );
    }
    notFound();
  }

  if (!staticTool && complianceTool) {
    const content = buildFallbackPricingContent(complianceTool, slug);
    return (
      <ToolPricingPageContent
        toolName={content.toolName}
        toolSlug={slug}
        heroDescription={content.heroDescription}
        pricingTiers={content.pricingTiers}
        hiddenCosts={content.hiddenCosts}
        negotiationTips={content.negotiationTips}
        comparisonLinks={content.comparisonLinks}
      />
    );
  }

    const tool = staticTool as NonNullable<typeof staticTool>;

    const otherGuides = toolPricing
      .filter(t => t.slug !== slug)
      .slice(0, 6);
  
    const comparisons = toolPricing
      .filter(t => t.slug !== slug)
      .slice(0, 8);
  
    const linkify = (text: string) => {
      if (!text) return [];
      let result: (string | JSX.Element)[] = [text];
      
      // Linkify tool names to external pricing pages
      toolPricing.forEach(t => {
        if (!t.name || !t.slug) return;
        const newResult: (string | JSX.Element)[] = [];
        result.forEach(part => {
          if (typeof part === 'string') {
            const segments = part.split(new RegExp(`(${t.name})`, 'g'));
              segments.forEach((seg, i) => {
                if (seg === t.name) {
                  newResult.push(<Link key={`${t.slug}-${i}`} href={`/pricing/${t.slug}`} className="text-[#2563EB] hover:underline decoration-blue-200">{seg}</Link>);
                } else if (seg) {

                newResult.push(seg);
              }
            });
          } else {
            newResult.push(part);
          }
        });
        result = newResult;
      });
  
      // Linkify "auditor fees"
      const finalResult: (string | JSX.Element)[] = [];
      result.forEach(part => {
        if (typeof part === 'string') {
          const segments = part.split(/(auditor fees)/gi);
          segments.forEach((seg, i) => {
            if (seg.toLowerCase() === 'auditor fees') {
              finalResult.push(<Link key={`auditor-fees-${i}`} href="/auditor-match" className="text-[#2563EB] hover:underline decoration-blue-200">{seg}</Link>);
            } else if (seg) {
              finalResult.push(seg);
            }
          });
        } else {
          finalResult.push(part);
        }
      });
  
      return finalResult;
    };

      return (
      <main className="min-h-screen flex flex-col bg-white">
        <Header />
        <GeneralPageSchema
          title={generatePricingTitleOptimized(tool.name, tool.startingPrice)}
          description={generatePricingDescriptionOptimized(tool.name, tool.startingPrice, tool.targetMarket)}
          url={`https://risclens.com/pricing/${slug}`}
          breadcrumbs={[
            { name: 'Home', item: 'https://risclens.com' },
            { name: 'Pricing Intelligence', item: 'https://risclens.com/pricing' },
            { name: `${tool.name} Pricing`, item: `https://risclens.com/pricing/${slug}` },
          ]}
          faqs={generatePricingFAQs(tool.name, tool.startingPrice)}
        />
        
        <div className="flex-grow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <nav className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                <Link href="/" className="hover:text-[#2563EB]">Home</Link>
                <span className="text-slate-300">/</span>
                <Link href="/pricing" className="hover:text-[#2563EB]">Pricing</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900">{tool.name} Pricing</span>
              </nav>
            </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Main Content (Left) */}
              <div className="lg:w-[70%]">
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 text-[#22C55E] font-bold text-[11px] uppercase tracking-wider mb-6">
                    <DollarSign className="w-4 h-4" />
                    Pricing Guide 2026
                  </div>
                  
                  <h1 className="text-5xl lg:text-6xl font-black text-[#002B49] mb-6 tracking-tight">
                    {tool.name} Pricing
                  </h1>
                  
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
                    {tool.name} is a {tool.category.toLowerCase()} designed to {tool.bestFor.toLowerCase()}.
                  </p>
                  
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-slate-500 border-t border-b border-slate-100 py-4 mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Last verified: <span className="font-bold text-slate-900">January 12, 2026</span>
                      </div>
                      <Link href="#research-team" className="flex items-center gap-2 hover:text-[#2563EB] transition-colors group">
                        <Users className="w-4 h-4 text-blue-500" />
                        By: <span className="font-bold text-slate-900 underline decoration-slate-200 group-hover:decoration-blue-200">RiscLens Research Team</span>
                      </Link>
                      <Link href="/methodology" className="flex items-center gap-2 cursor-pointer hover:text-[#2563EB] transition-colors group">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="underline decoration-slate-200 group-hover:decoration-blue-200">Our Methodology</span>
                      </Link>
                      <Link href="https://g2.com" target="_blank" className="flex items-center gap-2 hover:text-[#2563EB] transition-colors group">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        Based on <span className="font-bold text-slate-900 underline decoration-slate-200 group-hover:decoration-blue-200">450 user reviews</span>
                      </Link>
                    </div>
                    <div className="text-[11px] text-slate-400 italic mb-10">
                      Sources: <Link href={tool.website} target="_blank" className="hover:text-slate-600 underline decoration-slate-200">Vendor Pricing Pages</Link>, <Link href="https://g2.com" target="_blank" className="hover:text-slate-600 underline decoration-slate-200">G2 Crowd</Link>, Customer Interviews
                    </div>

                  {/* Hero Pricing Card */}
                  <div className="bg-[#0A1628] rounded-xl p-8 lg:p-12 text-white mb-8">
                    <div className="text-slate-400 text-sm font-medium mb-2">Starting at</div>
                    <div className="text-6xl lg:text-7xl font-black tracking-tighter mb-0">
                      {tool.startingPrice}/year
                    </div>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-20 px-4">
                    <div className="flex gap-4">
                      <div className="text-[#0070B8] shrink-0">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002B49] text-base mb-2">Pricing Model</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.priceModel}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-[#0070B8] shrink-0">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002B49] text-base mb-2">Typical Range</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.typicalRange}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-[#0070B8] shrink-0">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002B49] text-base mb-2">Target Market</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.targetMarket}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-[#0070B8] shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002B49] text-base mb-2">Hidden Costs</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{tool.hiddenCosts}</p>
                      </div>
                    </div>
                  </div>

                    {/* Pricing Tiers Section */}
                    <div className="mb-20">
                      <h2 className="text-2xl lg:text-3xl font-black text-[#002B49] mb-10 tracking-tight">
                        Estimated Pricing Tiers
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tool.tiers?.map((tier, i) => (
                          <div key={i} className="border border-slate-100 rounded-xl p-8 bg-white flex flex-col h-full shadow-sm">
                            <div className="mb-6">
                              <h3 className="text-xl font-black text-[#002B49] mb-1">{tier.name}</h3>
                              <p className="text-slate-500 text-xs font-medium">{tier.description}</p>
                            </div>
                            {tier.price && (
                              <div className="mb-8">
                                <span className="text-2xl font-black text-[#0070B8]">{tier.price}</span>
                              </div>
                            )}
                            <div className="space-y-4">
                              {tier.features?.map((feature, j) => (
                                <div key={j} className="flex items-start gap-3 text-slate-600 text-xs font-bold">
                                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Negotiation Tips */}
                    {tool.negotiationTips && tool.negotiationTips.length > 0 && (
                      <div className="mb-20 bg-[#F0F7FF] rounded-xl p-8 lg:p-10">
                        <div className="flex items-center gap-4 mb-10">
                          <div className="w-10 h-10 rounded-lg bg-[#0070B8] flex items-center justify-center text-white">
                            <Lightbulb className="w-6 h-6" />
                          </div>
                          <h2 className="text-2xl font-black text-[#002B49] tracking-tight">How to Negotiate {tool.name} Pricing</h2>
                        </div>
                        <div className="space-y-4">
                          {tool.negotiationTips?.map((tip, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-blue-100 flex items-center gap-6">
                              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#0070B8] font-black text-sm shrink-0">
                                {i + 1}
                              </div>
                                <p className="text-slate-700 font-bold text-sm leading-relaxed">
                                  {typeof tip === 'string' ? linkify(tip) : linkify(tip.description)}
                                </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}


                  {/* Pricing Drivers */}
                  <div className="mb-20">
                    <h2 className="text-2xl lg:text-3xl font-black text-[#002B49] mb-8 tracking-tight">
                      What Drives {tool.name} Pricing?
                    </h2>
                    <div className="space-y-4">
                      {tool.pricingDrivers?.map((driver, i) => (
                        <div key={i} className={`p-6 rounded-xl border ${driver.title.includes('Auditor Fees') ? 'bg-amber-50/50 border-amber-100' : 'bg-slate-50/30 border-slate-100'}`}>
                          <h3 className={`font-black text-base mb-2 ${driver.title.includes('Auditor Fees') ? 'text-amber-700' : 'text-[#002B49]'}`}>
                            {driver.title}
                          </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{linkify(driver.description)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hidden Costs to Watch For */}
                    <div className="mb-20 bg-[#FFFBEB] rounded-xl p-8 lg:p-10 border border-amber-100">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                          <Info className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-black text-[#002B49] tracking-tight">Hidden Costs to Watch For</h2>
                      </div>
                      <div className="space-y-4">
                        {tool.detailedHiddenCosts?.map((cost, i) => (
                          <div key={i} className="bg-white p-6 rounded-xl border border-amber-200/50 flex items-start gap-4">
                            <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-slate-900 font-bold text-sm mb-1">{cost.title}</p>
                              {cost.description && <p className="text-slate-600 text-sm leading-relaxed">{linkify(cost.description)}</p>}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Features Overview */}
                  <div className="mb-20">
                    <h2 className="text-2xl lg:text-3xl font-black text-[#002B49] mb-8 tracking-tight">
                      {tool.name} Features Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      {tool.featuresOverview?.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                          <span className="text-sm font-bold text-slate-700">
                            {typeof feature === 'string' ? feature : feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                      <div>
                        <h3 className="text-xl font-black text-emerald-600 mb-6">Pros</h3>
                        <div className="space-y-4">
                          {tool.pros?.map((pro, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              <p className="text-slate-600 text-sm font-bold">{pro}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-red-600 mb-6">Cons</h3>
                        <div className="space-y-4">
                          {tool.cons?.map((con, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                              <p className="text-slate-600 text-sm font-bold">{con}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>


                  {/* Verdict Card */}
                  <div className="bg-[#0A1628] rounded-xl p-10 text-white mb-20">
                    <p className="text-lg font-medium leading-relaxed mb-6">
                      {tool.risclensVerdict}
                    </p>
                    <div className="text-slate-400 text-sm font-bold">
                      Best for: {tool.targetMarket}
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="mb-20">
                    <h2 className="text-2xl lg:text-3xl font-black text-[#002B49] mb-10 tracking-tight">
                      Compare {tool.name} Pricing
                    </h2>
                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-6 text-[11px] font-black text-[#002B49] uppercase tracking-widest">Platform</th>
                            <th className="p-6 text-[11px] font-black text-[#002B49] uppercase tracking-widest">Starting Price</th>
                            <th className="p-6 text-[11px] font-black text-[#002B49] uppercase tracking-widest">Auditor Included</th>
                            <th className="p-6 text-[11px] font-black text-[#002B49] uppercase tracking-widest">Target Market</th>
                          </tr>
                        </thead>
                          <tbody className="divide-y divide-slate-50">
                            {tool.compareData?.map((row, i) => (
                              <tr key={i} className={row.platform === tool.name ? 'bg-blue-50/30' : ''}>
                                  <td className="p-6 text-sm font-black text-slate-900">
                                    {(() => {
                                      const matchedTool = toolPricing.find(t => t.name === row.platform);
                                      if (matchedTool) {
                                        return <Link href={`/pricing/${matchedTool.slug}`} className="text-[#2563EB] hover:underline">{row.platform}</Link>;
                                      }
                                      return row.platform;
                                    })()}
                                  </td>
                                  <td className="p-6 text-sm font-bold text-slate-600">
                                    {(() => {
                                      const matchedTool = toolPricing.find(t => t.name === row.platform);
                                      if (matchedTool) {
                                        return <Link href={`/pricing/${matchedTool.slug}`} className="text-[#2563EB] hover:underline">{row.startingPrice}</Link>;
                                      }
                                      return row.startingPrice;
                                    })()}
                                  </td>

                              <td className="p-6 text-center">
                                {row.auditorIncluded ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                  <X className="w-5 h-5 text-slate-200 mx-auto" />
                                )}
                              </td>
                              <td className="p-6 text-xs font-bold text-slate-400 uppercase tracking-tight">{row.targetMarket}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                    {/* Research Team Box */}
                    <div id="research-team" className="bg-slate-50 rounded-xl p-8 border border-slate-100 mb-10 scroll-mt-20">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xl font-black shrink-0">
                        R
                      </div>
                      <div>
                        <h4 className="font-black text-[#002B49] text-lg mb-1">RiscLens Research Team</h4>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                          Our team of compliance experts and former auditors reviews and verifies all platform data. We maintain direct relationships with vendors and continuously monitor the compliance automation market.
                        </p>
                        <div className="flex items-center gap-8 mt-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            SOC 2 & ISO 27001 expertise
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Updated weekly
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Signals Row */}
                  <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-12">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                      <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                      Independent research
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                      <div className="w-5 h-5 rounded-full bg-[#EBF5FF] flex items-center justify-center">
                        <DollarSign className="w-3 h-3 text-[#2563EB]" />
                      </div>
                      No vendor payments
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                      <div className="w-5 h-5 rounded-full bg-[#F5F3FF] flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-[#7C3AED]" />
                      </div>
                      Verified data
                    </div>
                    <div className="flex items-center gap-2 text-[13px] font-bold text-slate-500">
                      <Clock className="w-5 h-5 text-[#F59E0B]" />
                      Updated Jan 2026
                    </div>
                  </div>

                  {/* Cost Estimate CTA */}
                  <div className="mb-24">
                    <div className="bg-slate-900 rounded-xl p-12 lg:p-16 text-center text-white shadow-sm">
                      <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight">Get a Full Cost Estimate</h2>
                      <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                        Our SOC 2 Cost Calculator factors in platform costs, auditor fees, and your specific requirements.
                      </p>
                      <Link 
                        href="/soc-2-cost-calculator" 
                        className="inline-flex items-center gap-3 bg-white text-slate-900 px-12 py-5 rounded-lg font-black hover:bg-slate-50 transition-all shadow-sm text-lg group"
                      >
                        Calculate Total Costs <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Other Pricing Guides Grid */}
                  <div className="mb-20">
                    <h2 className="text-2xl lg:text-3xl font-black text-[#002B49] mb-10 tracking-tight">
                      Other Pricing Guides
                    </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {toolPricing.filter(t => t.slug !== tool.slug).slice(0, 6).map((guide) => {
                            return (
                              <Link 
                                key={guide.slug}
                                href={`/pricing/${guide.slug}`}
                                className="group p-8 bg-white border border-slate-100 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all flex flex-col h-full"
                              >
                                <h4 className="text-slate-900 font-black text-lg mb-2 group-hover:text-[#2563EB] transition-colors">{guide.name}</h4>

                              <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow">
                                {guide.id === 'vanta' ? 'Automate your security compliance' : 
                                 guide.id === 'drata' ? 'Put security compliance on autopilot' : 
                                 guide.id === 'secureframe' ? 'Expert-guided compliance automation' :
                                 guide.id === 'sprinto' ? 'Get audit-ready in weeks, not months' :
                                 guide.id === 'thoropass' ? 'Compliance and audit in one' :
                                 guide.id === 'hyperproof' ? 'Compliance operations software' : guide.category}
                              </p>
                              <p className="text-[#2563EB] font-black text-sm uppercase tracking-widest">From {guide.startingPrice}/year</p>
                            </Link>
                          );
                        })}
                      </div>
                  </div>

                </div>
              </div>

                {/* Sidebar (Right) */}
                <div className="lg:w-[30%] space-y-8">
                  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-[11px] font-black text-[#002B49] uppercase tracking-[0.2em] mb-8">COMPARE PRICING</h3>
                    <div className="space-y-5">
                      {comparisons.slice(0, 8).map((comp) => (
                        <Link 
                          key={comp.slug}
                          href={`/compare/${[tool.slug, comp.slug].sort().join('-vs-')}`}
                          className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight"
                        >
                          {tool.name} vs {comp.name} Pricing
                        </Link>
                      ))}
                    </div>
                  </div>

                      <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-[11px] font-black text-[#002B49] uppercase tracking-[0.2em] mb-8">OTHER PRICING GUIDES</h3>
                        <div className="space-y-5">
                          {otherGuides.map((guide) => {
                            return (
                              <Link 
                                key={guide.slug}
                                href={`/pricing/${guide.slug}`}
                                className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-tight"
                              >
                                {guide.name} Pricing
                              </Link>
                            );
                          })}
                        </div>
                      </div>


                  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-[11px] font-black text-[#002B49] uppercase tracking-[0.2em] mb-8">COMPLIANCE BY INDUSTRY</h3>
                    <div className="space-y-5">
                      <Link href="/soc-2-readiness/healthcare" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        SOC 2 Compliance for Healthcare Companies | Complete Guide
                      </Link>
                      <Link href="/soc-2-readiness/saas" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        SOC 2 Compliance for SaaS Companies | Complete Guide
                      </Link>
                      <Link href="/soc-2-readiness/fintech" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        SOC 2 Compliance for Fintech Companies | Complete Guide
                      </Link>
                      <Link href="/soc-2-readiness/startups" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        SOC 2 Compliance for Startup Teams | Complete Guide
                      </Link>
                      <Link href="/iso-27001/compliance/fintech" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        ISO 27001 Compliance for Fintech Companies | Complete Guide
                      </Link>
                      <Link href="/iso-27001/compliance/healthcare" className="block text-[14px] font-bold text-slate-500 hover:text-[#2563EB] leading-snug">
                        ISO 27001 Compliance for Healthcare Companies | Complete Guide
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-[11px] font-black text-[#002B49] uppercase tracking-[0.2em] mb-8">RELATED RESOURCES</h3>
                    <div className="space-y-5">
                      <Link href={`/compare/${tool.slug}-alternatives`} className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        {tool.name} Alternatives
                      </Link>
                      <Link href="/soc-2-cost-calculator" className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        SOC 2 Cost Calculator
                      </Link>
                      <Link href="/soc-2-cost-breakdown" className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        SOC 2 Cost Breakdown
                      </Link>
                      <Link href="/auditor-match" className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        Find an Auditor
                      </Link>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-[11px] font-black text-[#002B49] uppercase tracking-[0.2em] mb-8">Quick Links</h3>
                    <div className="space-y-5">
                      <Link href={`/compare/${tool.slug}-alternatives`} className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        {tool.name} Alternatives
                      </Link>
                      <Link href="/soc-2-cost-calculator" className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        SOC 2 Cost Calculator
                      </Link>
                      <Link href="/auditor-match" className="block text-[14px] font-bold text-[#2563EB] hover:underline leading-tight">
                        Find an Auditor
                      </Link>
                    </div>
                  </div>

                  </div>
              </div>
            </div>
          </div>

          <FAQSection 
            faqs={generatePricingFAQs(tool.name, tool.startingPrice)}
            showSchema={false}
          />

          <Footer />
        </main>
      );
    }
  
