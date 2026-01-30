import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SignalScore } from '@/components/compliance/SignalScore';
import { SOC2ReadinessSignals } from '@/components/compliance/SOC2ReadinessSignals';
import { RelatedProfiles } from '@/components/compliance/RelatedProfiles';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CompanyActionButtons } from '@/components/compliance/CompanyActionButtons';
import { ContextualLinks } from '@/components/compliance/ContextualLinks';
import { AuthorByline, EditorialPolicyBadge } from '@/components/compliance/AuthorByline';
import Link from 'next/link';
import { Users, CheckCircle } from 'lucide-react';
import { BUILD_CONFIG, limitStaticParams } from '@/lib/build-config';
import { 
  generateDirectoryTitle, 
  generateDirectoryDescription,
  generateDirectoryFAQs,
  generateEnhancedFAQSchema
} from '@/lib/seo-enhancements';
import Script from 'next/script';

/**
 * Quick Answer Component for Directory Pages
 * Clean, professional design following Vanta/Drata style
 */
function QuickAnswer({ 
  companyName, 
  mentionsSOC2, 
  hasTrustPage,
  hasSecurityPage,
  signalScore,
  trustCenterUrl,
  updatedAt
}: { 
  companyName: string;
  mentionsSOC2: boolean;
  hasTrustPage: boolean;
  hasSecurityPage: boolean;
  signalScore: number;
  trustCenterUrl?: string;
  updatedAt?: string;
}) {
  const hasStrongSignals = mentionsSOC2 && (hasTrustPage || hasSecurityPage);
  const hasModerateSignals = hasTrustPage || hasSecurityPage || signalScore >= 50;
  
  let statusText = 'Not publicly confirmed';
  let summaryText = `Based on publicly available information, we could not confirm ${companyName}'s SOC 2 compliance status. Contact them directly for documentation.`;
  
  if (hasStrongSignals) {
    statusText = 'Public signals indicate compliance';
    summaryText = `${companyName} publicly references SOC 2 compliance and maintains security documentation. Request their SOC 2 Type II report for verification.`;
  } else if (hasModerateSignals) {
    statusText = 'Security presence detected';
    summaryText = `${companyName} maintains public security documentation, but SOC 2 status is not explicitly confirmed. Check their trust center or request compliance documentation.`;
  }
  
  const lastUpdated = updatedAt 
    ? new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Is {companyName} SOC 2 Compliant?
        </h2>
        <span className="text-xs text-slate-500">Last checked {lastUpdated}</span>
      </div>
      
      <p className="text-sm font-medium text-slate-700 mb-2">{statusText}</p>
      <p className="text-slate-600 mb-4">{summaryText}</p>
      
      {trustCenterUrl && (
        <a 
          href={trustCenterUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-slate-700 hover:text-slate-900 hover:underline"
        >
          View trust center →
        </a>
      )}
    </div>
  );
}

/**
 * FAQ Section Component for Directory Pages
 * Implements schema.org markup for rich snippets
 */
function DirectoryFAQSection({
  companyName,
  hasSOC2,
  hasTrustCenter
}: {
  companyName: string;
  hasSOC2: boolean;
  hasTrustCenter: boolean;
}) {
  const faqs = generateDirectoryFAQs(companyName, hasSOC2, hasTrustCenter);
  const faqSchema = generateEnhancedFAQSchema(faqs);

  return (
    <>
      <Script
        id="directory-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border-b border-gray-100 pb-5 last:border-0 last:pb-0"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <h3 className="font-medium text-gray-900 mb-2" itemProp="name">
                {faq.question}
              </h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-gray-600 text-sm leading-relaxed" itemProp="text">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

interface Props {
  params: { slug: string };
}
const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

interface CompanySignals {
  id: string;
  name: string;
  company_name: string;
  domain: string;
  slug: string;
  indexable: boolean;
  signal_score: number;
  public_signals: {
    has_security_page?: boolean;
    has_trust_page?: boolean;
    mentions_soc2?: boolean;
    mentions_compliance_tool?: boolean;
    has_responsible_disclosure?: boolean;
    has_security_contact?: boolean;
  };
  ai_summary?: string;
  updated_at: string;
}

export async function generateStaticParams() {
  if (!hasSupabaseAdmin) return [];

  const supabase = getSupabaseAdmin();
  // Only pre-render top companies (highest signal scores) to limit build time
  const { data: companies } = await supabase
    .from('company_signals')
    .select('slug')
    .eq('indexable', true)
    .order('signal_score', { ascending: false })
    .limit(BUILD_CONFIG.ROUTE_LIMITS.directory);

  return companies?.map((company) => ({
    slug: company.slug,
  })) || [];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!hasSupabaseAdmin) {
    return {
      title: 'Security Profile Unavailable',
      robots: { index: false, follow: false },
    };
  }

  const supabase = getSupabaseAdmin();
  const { data: company } = await supabase
    .from('company_signals')
    .select('name, indexable')
    .eq('slug', params.slug)
    .single();

  if (!company) {
    return { title: 'Company Not Found' };
  }

  // Use CTR-optimized title and description
  const title = generateDirectoryTitle(company.name);
  const description = generateDirectoryDescription(company.name);

  return {
    title,
    description,
    keywords: [
      `${company.name} SOC 2`,
      `${company.name} security`,
      `${company.name} compliance`,
      'SOC 2 compliance check',
      'vendor security assessment',
    ],
    robots: {
      index: company.indexable ? true : false,
      follow: true,
    },
    alternates: {
      canonical: `https://risclens.com/compliance/directory/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'RiscLens',
    },
  };
}

function generateJsonLd(company: CompanySignals) {
  const baseUrl = 'https://risclens.com';
  const profileUrl = `${baseUrl}/compliance/directory/${company.slug}`;

  const breadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Compliance',
        item: `${baseUrl}/compliance`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Directory',
        item: `${baseUrl}/compliance/directory`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: company.name,
        item: profileUrl,
      },
    ],
  };

  const organization = {
    '@type': 'Organization',
    '@id': `${profileUrl}#organization`,
    name: company.name,
    url: `https://${company.domain}`,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'domain',
      value: company.domain,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Public Security Signals Score',
        value: String(company.signal_score),
      },
    ],
  };

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': profileUrl,
    url: profileUrl,
    name: `${company.name} Public Security Profile`,
    description: `Public SOC 2 and security signals for ${company.name}: trust center, security page, disclosures, and transparency markers.`,
    dateModified: company.updated_at,
    mainEntity: {
      '@id': `${profileUrl}#organization`,
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbList, organization, profilePage],
  };
}

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export default async function Page({ params }: { params: { slug: string } }) {
  if (!hasSupabaseAdmin) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-grow max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Directory unavailable in this environment</h1>
          <p className="text-slate-600">Security profiles require Supabase access; set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable them.</p>
          <Link href="/" className="btn-primary inline-flex justify-center">
            Return Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: company, error } = await supabase
    .from('company_signals')
    .select('*, has_security_page, has_trust_page, mentions_soc2, mentions_compliance_tool, has_responsible_disclosure, has_security_contact')
    .eq('slug', params.slug)
    .single();

  if (error || !company) {
    notFound();
  }

  const signals = {
    ...(typeof company.public_signals === 'object' && !Array.isArray(company.public_signals) ? company.public_signals : {}),
    has_security_page: company.has_security_page,
    has_trust_page: company.has_trust_page,
    mentions_soc2: company.mentions_soc2,
    mentions_compliance_tool: company.mentions_compliance_tool,
    has_responsible_disclosure: company.has_responsible_disclosure,
    has_security_contact: company.has_security_contact
  };
  const jsonLd = generateJsonLd(company as CompanySignals);

  const signalItems = [
    { label: 'Security page detected', value: signals.has_security_page },
    { label: 'Trust / compliance page detected', value: signals.has_trust_page },
    { label: 'SOC 2 publicly mentioned (claim only)', value: signals.mentions_soc2 },
    { label: 'Compliance tooling mentioned (Vanta, Drata, Secureframe)', value: signals.mentions_compliance_tool },
    { label: 'Responsible disclosure / bug bounty', value: signals.has_responsible_disclosure },
    { label: 'Security contact email or page', value: signals.has_security_contact },
  ];
  const followUpItems = [
    !signals.has_trust_page && 'Request a trust center or compliance overview',
    !signals.mentions_soc2 && 'Ask for current SOC 2 report status and scope',
    !signals.has_security_page && 'Request a public security page or security summary',
    !signals.has_responsible_disclosure && 'Confirm vulnerability disclosure policy',
    !signals.has_security_contact && 'Ask for a dedicated security contact channel'
  ].filter(Boolean) as string[];

  const TOP_PLATFORMS = ['vanta', 'drata', 'secureframe', 'thoropass', 'laika', 'strike-graph'];
  const isComparisonPlatform = TOP_PLATFORMS.includes(params.slug);

  return (
    <div className="min-h-screen bg-white flex flex-col">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-50 border-b border-gray-100 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Directory', href: '/compliance/directory' },
                { label: company.name, href: `/compliance/directory/${company.slug}` },
              ]}
            />

            <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {company.name} Public Security Profile
                  </h1>
                  {company.is_verified && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 text-white rounded-md text-xs font-semibold shadow-sm" title="RiscLens Verified Profile">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      VERIFIED
                    </div>
                  )}
                </div>
                <div className="mt-4 text-gray-600 text-lg max-w-2xl leading-relaxed">
                  {company.ai_summary || `Analysis of publicly available security signals and disclosures for ${company.name}.`}
                </div>
              </div>


              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex-shrink-0">
                <SignalScore score={company.signal_score} size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Above-fold Quick Answer - Immediately answers "Is X SOC 2 compliant?" */}
          <QuickAnswer 
            companyName={company.name}
            mentionsSOC2={signals.mentions_soc2}
            hasTrustPage={signals.has_trust_page}
            hasSecurityPage={signals.has_security_page}
            signalScore={company.signal_score}
            trustCenterUrl={company.trust_center_url}
            updatedAt={company.updated_at}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="md:col-span-2 space-y-12">

              {/* Public Security Signals Checklist */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Public SOC 2 and Security Signals for {company.name}</h2>
                <div className="space-y-4">
                  {signalItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${item.value ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                        {item.value ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-base font-medium ${item.value ? 'text-gray-900' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {followUpItems.length > 0 && (
                <section className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What to request in procurement</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {followUpItems.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Educational Context */}
              <section className="bg-slate-50 rounded-lg p-8 border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">About Public Disclosures</h3>
                <div className="prose prose-slate text-slate-700">
                  <p>
                    Public disclosures help with <Link href="/vendor-risk-assessment" className="underline font-medium text-slate-700 hover:text-slate-900">vendor risk reviews</Link> by providing a baseline of transparency.
                    A lack of public disclosure does not necessarily indicate a lack of security controls,
                    but it may require more direct inquiry during a procurement process.
                  </p>
                  <p className="mt-4">
                    Many companies use automation platforms like <Link href="/pricing/vanta" className="underline text-slate-700 hover:text-slate-900">Vanta</Link> or <Link href="/pricing/drata" className="underline text-slate-700 hover:text-slate-900">Drata</Link> to maintain their <Link href="/soc-2" className="underline font-medium text-slate-700 hover:text-slate-900">SOC 2 compliance</Link> and generate these public-facing trust pages.
                  </p>
                  <p className="mt-4 font-medium italic">
                    Note: This profile is based only on publicly observable data and automated discovery.
                  </p>
                </div>
              </section>

              <EditorialPolicyBadge variant="footer" />

              <SOC2ReadinessSignals companyName={company.name} />

              {/* FAQ Section with Schema for Rich Snippets */}
              <DirectoryFAQSection 
                companyName={company.name}
                hasSOC2={signals.mentions_soc2}
                hasTrustCenter={signals.has_trust_page}
              />

              {/* CTA */}
              <section className="text-center py-8">
                <Link
                  href="/readiness-review"
                  className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Request a SOC 2 readiness review
                </Link>
                <p className="mt-4 text-gray-500 text-sm">
                  Get a comprehensive internal review of your security posture and compliance gaps.
                </p>
              </section>

            </div>

            {/* Sidebar / Meta info */}
            <div className="space-y-8">
              {/* Platform Comparison Sidebar Section */}
              {isComparisonPlatform && (
                <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Platform Comparisons
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Compare {company.name} against other leading compliance automation platforms.
                  </p>
                  <div className="space-y-2">
                    {TOP_PLATFORMS.filter(p => p !== params.slug).slice(0, 4).map((other) => {
                      const toolA = params.slug < other ? params.slug : other;
                      const toolB = params.slug < other ? other : params.slug;
                      const slug = `${toolA}-vs-${toolB}`;
                      const otherName = other.charAt(0).toUpperCase() + other.slice(1);
                      return (
                        <Link
                          key={slug}
                          href={`/compliance/compare/${slug}`}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors group"
                        >
                          <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">vs {otherName}</span>
                          <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      );
                    })}
                    <Link
                      href="/compare"
                      className="block text-center text-xs font-semibold text-slate-600 hover:text-slate-900 pt-2"
                    >
                      View all 24+ comparisons →
                    </Link>
                  </div>
                </div>
              )}

              <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  Role-Specific Guides
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  Custom SOC 2 roadmaps tailored for different stakeholders at {company.name}.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Founders', slug: 'founders' },
                    { name: 'CTOs', slug: 'cto' },
                    { name: 'CISOs', slug: 'ciso' },
                    { name: 'Legal', slug: 'legal-counsel' }
                  ].map((role) => (
                    <Link
                      key={role.slug}
                      href={`/soc-2/for/${role.slug}`}
                      className="flex items-center justify-center p-2 bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-[11px] font-semibold text-slate-700 hover:text-slate-900"
                    >
                      {role.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/soc-2/guides"
                  className="block text-center text-[10px] font-semibold text-slate-600 hover:text-slate-900 pt-3 uppercase tracking-tighter"
                >
                  View all 50+ role guides →
                </Link>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">


                <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-wider">Intelligence Actions</h4>
                <CompanyActionButtons
                  companySlug={company.slug}
                  companyName={company.name}
                  isVerified={company.is_verified}
                />
              </div>

              <div className="p-6 bg-white rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4 uppercase text-xs tracking-wider">Company Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block uppercase">Legal Name</label>
                    <span className="font-medium text-slate-900">{company.name}</span>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block uppercase">Domain</label>
                    <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:underline break-all">
                      {company.domain}
                    </a>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block uppercase">Last Updated</label>
                    <span className="text-slate-600 text-sm flex items-center gap-1.5">
                      {new Date(company.updated_at).toLocaleDateString()}
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded border border-green-100 text-[10px] font-bold uppercase">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Verified
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2 text-sm">Disclaimer</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The "Public Security Signals Score" reflects publicly visible security disclosures only.
                  It is not an audit, a security rating, or a confirmation of compliance status.
                  Information is discovered automatically and may be incomplete.
                </p>
              </div>
            </div>

          </div>

          <RelatedProfiles
            currentCompanySlug={params.slug}
            currentSignals={{ ...signals, signal_score: company.signal_score }}
            limit={8}
            mode="related"
          />

          <ContextualLinks currentPageType="directory" currentSlug={params.slug} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
