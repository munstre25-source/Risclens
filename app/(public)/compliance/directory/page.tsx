import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SignalScore } from '@/components/compliance/SignalScore';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DirectoryUsageGuide } from '@/components/compliance/DirectoryUsageGuide';
import { RelatedProfiles } from '@/components/compliance/RelatedProfiles';

export const metadata: Metadata = {
  title: 'Public Security Signals Directory | SOC 2 & Trust Center Profiles',
  description: 'Browse public security signals for technology companies: SOC 2 mentions, trust centers, security pages, and transparency disclosures.',
  alternates: {
    canonical: 'https://risclens.com/compliance/directory',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DirectoryPage() {
  const supabase = getSupabaseAdmin();

  const { data: companyRows, error } = await supabase
    .from('company_signals')
    .select('name, slug, signal_score, domain, public_signals')
    .eq('indexable', true)
    .order('signal_score', { ascending: false });

  if (error) {
    console.error('Error fetching companies:', error);
  }

  const companies = Array.isArray(companyRows) ? companyRows : [];
  const popularProfiles = companies?.slice(0, 12) || [];

    const getSignalsSummary = (signals: any) => {
      const safeSignals = signals && typeof signals === 'object' ? signals : {};
      const parts = [];
      if (safeSignals.has_trust_page) parts.push("trust center");
      if (safeSignals.has_security_page) parts.push("security page");
      if (safeSignals.mentions_soc2) parts.push("SOC 2 mention (public)");
      
      if (parts.length === 0) return "Public security signals detected (public)";
      
      let text = "";
      if (parts.length === 1) {
        text = parts[0];
      } else if (parts.length === 2) {
        text = `${parts[0]} and ${parts[1]}`;
      } else {
        // Match user example for 3: "Trust center, security page, SOC 2 mention (public)"
        text = parts.join(", ");
      }
      
      const capitalized = text.charAt(0).toUpperCase() + text.slice(1);
      return capitalized.includes("(public)") ? capitalized : `${capitalized} detected (public)`;
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: 'Directory', href: '/compliance/directory' },
            ]} 
          />
        
        <div className="mt-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Public Security Signals Directory
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            A structured directory tracking publicly observable security signals, 
            disclosures, and transparency markers across the technology ecosystem.
          </p>
        </div>

        {/* Popular Profiles Section */}
        {popularProfiles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Security Profiles</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {popularProfiles.map((company) => (
                  <Link
                    key={company.slug}
                      href={`/compliance/directory/${company.slug}`}
                      aria-label={`View ${company.name} security profile`}
                      className="block p-3 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow text-center h-full"
                    >
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {company.signal_score}
                      </span>
                        <h3 className="font-medium text-gray-900 text-xs mt-2 line-clamp-2 leading-tight">
                          {company.name} SOC 2 & Security Signals
                        </h3>
                      <p className="text-[9px] text-gray-500 mt-1 line-clamp-1">
                        {getSignalsSummary(company.public_signals)}
                      </p>
                    </Link>
                ))}

            </div>
          </section>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-6">All Company Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies?.map((company) => {
                const signals = company.public_signals && typeof company.public_signals === 'object'
                  ? company.public_signals
                  : {};

                return (
                <Link 
                  key={company.slug} 
                  href={`/compliance/directory/${company.slug}`}
                  aria-label={`View ${company.name} security profile`}
                  className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6 group h-full"
                >
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {company.name} SOC 2 & Security Signals
                      </h3>
                    <p className="text-sm text-gray-500 mt-1">{company.domain}</p>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 italic">
                      {getSignalsSummary(company.public_signals)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <SignalScore score={company.signal_score} size="sm" minimal={true} />
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">

                  {signals.has_security_page && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Security Page</span>
                  )}
                  {signals.has_trust_page && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">Trust Center</span>
                  )}
                  {signals.mentions_soc2 && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">SOC 2 Mention</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center text-blue-600 text-sm font-medium">
                View Full Profile
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
                  );
              })}
        </div>

        {(!companies || companies.length === 0) && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No indexable companies found in the directory yet.</p>
          </div>
          )}

          <RelatedProfiles mode="explore" limit={20} />

          <DirectoryUsageGuide />
        </main>


      <Footer />
    </div>
  );
}
