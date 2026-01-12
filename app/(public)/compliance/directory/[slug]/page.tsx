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
  const { data: companies } = await supabase
    .from('company_signals')
    .select('slug')
    .eq('indexable', true);

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

  return {
    title: `${company.name} Security & SOC 2 Signals | Public Security Profile`,
    description: `View ${company.name}'s public SOC 2 and security signals: trust center, security page, disclosures, and transparency markers.`,
    robots: {
      index: company.indexable ? true : false,
      follow: true,
    },
    alternates: {
      canonical: `https://risclens.com/compliance/directory/${params.slug}`,
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

export const dynamic = "force-static";
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
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-black shadow-sm" title="RiscLens Verified Profile">
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

              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-shrink-0">
                <SignalScore score={company.signal_score} size="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
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
                
                  {/* Educational Context */}
                  <section className="bg-blue-50 rounded-xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">About Public Disclosures</h3>
                    <div className="prose prose-blue text-blue-800">
                      <p>
                        Public disclosures help with <Link href="/vendor-risk-assessment" className="underline font-bold">vendor risk reviews</Link> by providing a baseline of transparency. 
                        A lack of public disclosure does not necessarily indicate a lack of security controls, 
                        but it may require more direct inquiry during a procurement process.
                      </p>
                      <p className="mt-4">
                        Many companies use automation platforms like <Link href="/pricing/vanta" className="underline">Vanta</Link> or <Link href="/pricing/drata" className="underline">Drata</Link> to maintain their <Link href="/soc-2" className="underline font-bold">SOC 2 compliance</Link> and generate these public-facing trust pages.
                      </p>
                      <p className="mt-4 font-medium italic">
                        Note: This profile is based only on publicly observable data and automated discovery.
                      </p>
                      </div>
                    </section>

                <EditorialPolicyBadge variant="footer" />
  
                <SOC2ReadinessSignals companyName={company.name} />

              {/* CTA */}
              <section className="text-center py-8">
                <Link 
                  href="/readiness-review"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1"
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
                    <div className="p-6 bg-brand-50 rounded-2xl border border-brand-100 shadow-sm">
                      <h4 className="font-bold text-brand-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                        <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Platform Comparisons
                      </h4>
                      <p className="text-xs text-brand-800 mb-4">
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
                              className="flex items-center justify-between p-3 bg-white rounded-xl border border-brand-100 hover:border-brand-300 transition-all group"
                            >
                              <span className="text-sm font-bold text-slate-700 group-hover:text-brand-700">vs {otherName}</span>
                              <svg className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          );
                        })}
                        <Link 
                          href="/compare"
                          className="block text-center text-xs font-bold text-brand-600 hover:text-brand-700 pt-2"
                        >
                          View all 24+ comparisons →
                        </Link>
                        </div>
                      </div>
                    )}

                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-600" />
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
                            className="flex items-center justify-center p-2 bg-white rounded-lg border border-slate-200 hover:border-brand-300 hover:text-brand-600 transition-all text-[11px] font-bold text-slate-700"
                          >
                            {role.name}
                          </Link>
                        ))}
                      </div>
                      <Link 
                        href="/soc-2/guides"
                        className="block text-center text-[10px] font-bold text-brand-600 hover:text-brand-700 pt-3 uppercase tracking-tighter"
                      >
                        View all 50+ role guides →
                      </Link>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">


                  <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-wider">Intelligence Actions</h4>
                  <CompanyActionButtons 
                    companySlug={company.slug} 
                    companyName={company.name} 
                    isVerified={company.is_verified} 
                  />
                </div>

                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-wider">Company Details</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-400 block uppercase">Legal Name</label>
                    <span className="font-medium text-gray-900">{company.name}</span>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block uppercase">Domain</label>
                    <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                      {company.domain}
                    </a>
                  </div>
                    <div>
                      <label className="text-xs text-gray-400 block uppercase">Last Updated</label>
                      <span className="text-gray-600 text-sm flex items-center gap-1.5">
                        {new Date(company.updated_at).toLocaleDateString()}
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-50 text-green-700 rounded border border-green-100 text-[10px] font-bold uppercase">
                          <CheckCircle className="w-2.5 h-2.5" />
                          Verified
                        </span>
                      </span>
                    </div>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                <h4 className="font-bold text-yellow-900 mb-2 text-sm">Disclaimer</h4>
                <p className="text-xs text-yellow-800 leading-relaxed">
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
