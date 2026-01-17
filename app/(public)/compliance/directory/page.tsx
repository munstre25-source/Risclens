import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DirectoryUsageGuide } from '@/components/compliance/DirectoryUsageGuide';
import { RelatedProfiles } from '@/components/compliance/RelatedProfiles';
import { DirectoryIntelligence } from '@/components/compliance/DirectoryIntelligence';
import { MarketIntelligenceStats } from '@/components/compliance/MarketIntelligenceStats';

const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export const metadata: Metadata = {
  title: 'Compliance & Security Intelligence Directory | RiscLens',
  description: 'The Ground Truth for Compliance. Browse public security signals, SOC 2 disclosures, and trust centers for the technology ecosystem.',
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
  if (!hasSupabaseAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 max-w-4xl text-center space-y-6">
          <h1 className="text-4xl font-black text-gray-900">Compliance Directory unavailable</h1>
          <p className="text-lg text-gray-600">
            Supabase credentials are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable directory data.
          </p>
          <Link href="/" className="btn-primary inline-flex justify-center">
            Return to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: companies, error } = await supabase
    .from('company_signals')
    .select('name, slug, signal_score, domain, public_signals, updated_at, has_security_page, has_trust_page, mentions_soc2, mentions_compliance_tool')
    .eq('indexable', true)
    .order('signal_score', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching companies:', error);
  }

  const allCompanies = (companies || []).map(c => ({
    ...c,
    signal_score: c.signal_score ?? 50, // Default to 50 for companies without score
    public_signals: {
      ...(typeof c.public_signals === 'object' && !Array.isArray(c.public_signals) ? c.public_signals : {}),
      has_security_page: c.has_security_page,
      has_trust_page: c.has_trust_page,
      mentions_soc2: c.mentions_soc2,
      mentions_compliance_tool: c.mentions_compliance_tool
    }
  }));


  // Calculate stats for Market Intelligence
  const totalCompanies = allCompanies.length;
  const avgScore = totalCompanies > 0
    ? Math.round(allCompanies.reduce((acc, c) => acc + c.signal_score, 0) / totalCompanies)
    : 0;
  const highTrustCount = allCompanies.filter(c => c.signal_score >= 70).length;
  const lastUpdated = allCompanies.length > 0
    ? allCompanies.reduce((latest, c) => {
      const current = new Date(c.updated_at).getTime();
      return current > latest ? current : latest;
    }, 0)
    : Date.now();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex-grow">
            <Breadcrumbs
              items={[
                { label: 'Directory', href: '/compliance/directory' },
              ]}
            />
            <div className="mt-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 uppercase tracking-widest mb-4">
                Market Intelligence
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                Compliance <span className="text-blue-600">Directory</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl font-medium leading-relaxed">
                The authoritative intelligence layer for enterprise trust. Monitor public security signals, SOC 2 disclosures, and transparency markers across the ecosystem.
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-64 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Live Analysis Active</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">
              RiscLens AI is currently scanning 2,400+ domains for security signals.
            </p>
          </div>
        </div>

        {/* Market Intelligence Ecosystem Visuals */}
        <MarketIntelligenceStats
          totalCompanies={totalCompanies}
          avgScore={avgScore}
          highTrustCount={highTrustCount}
          lastUpdated={new Date(lastUpdated).toISOString()}
        />

        {/* Interactive Intelligence Hub */}
        <DirectoryIntelligence companies={allCompanies} />

        {/* Educational & Additional Context Section */}
        <section className="mt-20 space-y-16">
          <RelatedProfiles mode="explore" limit={20} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Market Intelligence?</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                Traditional compliance is a black box. RiscLens provides "The Ground Truth" to help buyers and security teams verify transparency signals before they even start a questionnaire.
              </p>
              <div className="space-y-4">
                {[
                  "Verify SOC 2 claims via public disclosures",
                  "Identify active Trust Centers and Security Pages",
                  "Benchmark transparency scores against industry peers",
                  "Accelerate vendor onboarding with pre-vetted signals"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Want your profile updated?</h3>
              <p className="text-sm text-gray-500 mb-6">
                Our AI engine rescans profiles every 30 days. To request an immediate refresh or update your security signals, contact our intelligence team.
              </p>
              <Link
                href="/readiness-review"
                className="w-full py-4 bg-gray-900 text-white text-center rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Request Readiness Review
              </Link>
            </div>
          </div>

          <DirectoryUsageGuide />
        </section>
      </main>

      <Footer />
    </div>
  );
}
