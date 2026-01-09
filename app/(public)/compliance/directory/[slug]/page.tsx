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
import Link from 'next/link';

interface Props {
  params: { slug: string };
}

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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = getSupabaseAdmin();
  
  const { data: company, error } = await supabase
    .from('company_signals')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !company) {
    notFound();
  }

  const signals = company.public_signals || {};
  const jsonLd = generateJsonLd(company as CompanySignals);

  const signalItems = [
    { label: 'Security page detected', value: signals.has_security_page },
    { label: 'Trust / compliance page detected', value: signals.has_trust_page },
    { label: 'SOC 2 publicly mentioned (claim only)', value: signals.mentions_soc2 },
    { label: 'Compliance tooling mentioned (Vanta, Drata, Secureframe)', value: signals.mentions_compliance_tool },
    { label: 'Responsible disclosure / bug bounty', value: signals.has_responsible_disclosure },
    { label: 'Security contact email or page', value: signals.has_security_contact },
  ];

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
                      Public disclosures help with vendor risk reviews by providing a baseline of transparency. 
                      A lack of public disclosure does not necessarily indicate a lack of security controls, 
                      but it may require more direct inquiry during a procurement process.
                    </p>
                    <p className="mt-4 font-medium italic">
                      Note: This profile is based only on publicly observable data and automated discovery.
                    </p>
                  </div>
                </section>
  
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
                    <span className="text-gray-600 text-sm">
                      {new Date(company.updated_at).toLocaleDateString()}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
