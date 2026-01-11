import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SignalScore } from '@/components/compliance/SignalScore';

const hasSupabaseAdmin = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

export const metadata: Metadata = {
  title: 'Company Security Comparison | RiscLens',
  description: 'Compare security signals and compliance transparency between technology vendors.',
};

export default async function ComparePage({ searchParams }: { searchParams: { slugs?: string } }) {
  const slugs = searchParams.slugs?.split(',').filter(Boolean) || [];
  if (!hasSupabaseAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 max-w-3xl text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Comparison unavailable</h1>
          <p className="text-gray-600">Supabase credentials are missing; set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable peer comparisons.</p>
          <Link href="/compliance/directory" className="btn-primary inline-flex justify-center">
            Back to Directory
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const supabase = getSupabaseAdmin();

  const { data: companies, error } = await supabase
    .from('company_signals')
    .select('*')
    .in('slug', slugs);

  if (error) {
    console.error('Error fetching companies for comparison:', error);
  }

  const comparisonData = companies || [];

  const comparisonMetrics = [
    { label: 'Security Page', key: 'has_security_page' },
    { label: 'Trust Center', key: 'has_trust_page' },
    { label: 'SOC 2 Mention', key: 'mentions_soc2' },
    { label: 'SOC 2 Status', key: 'soc2_status' },
    { label: 'Compliance Tool', key: 'mentions_compliance_tool' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumb
          items={[
            { label: 'Directory', href: '/compliance/directory' },
            { label: 'Compare', href: '/compliance/compare' },
          ]}
        />

        <div className="mt-8 mb-12">
          <h1 className="text-3xl font-black text-gray-900 mb-4">Peer Comparison</h1>
          <p className="text-gray-600 font-medium">
            Side-by-side analysis of security signals and transparency markers.
          </p>
        </div>

        {comparisonData.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center">
            <h3 className="text-xl font-bold mb-4">No companies selected for comparison</h3>
            <p className="text-gray-500 mb-8">Go back to the directory to select companies you want to compare.</p>
            <Link href="/compliance/directory" className="btn-primary">
              Back to Directory
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto pb-8">
            <div className="inline-block min-w-full align-middle">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-6 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Signal</th>
                      {comparisonData.map(c => (
                        <th key={c.slug} className="px-6 py-6 text-center min-w-[200px]">
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-lg font-black text-gray-900">{c.name}</span>
                            <span className="text-xs text-gray-500 font-mono">{c.domain}</span>
                            <div className="mt-2">
                              <SignalScore score={c.signal_score} size="sm" minimal={true} />
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {comparisonMetrics.map((metric) => (
                      <tr key={metric.key} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-6 text-sm font-bold text-gray-700">{metric.label}</td>
                        {comparisonData.map(c => {
                          const val = c.public_signals?.[metric.key];
                          return (
                            <td key={c.slug} className="px-6 py-6 text-center">
                              {typeof val === 'boolean' ? (
                                <div className="flex justify-center">
                                  {val ? (
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                  ) : (
                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-sm font-bold text-gray-900">{val || '—'}</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    
                    <tr>
                      <td className="px-6 py-6 text-sm font-bold text-gray-700">Last Verified</td>
                      {comparisonData.map(c => (
                        <td key={c.slug} className="px-6 py-6 text-center text-xs text-gray-500 font-medium">
                          {c.updated_at ? new Date(c.updated_at).toLocaleDateString() : 'N/A'}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-8"></td>
                      {comparisonData.map(c => (
                        <td key={c.slug} className="px-6 py-8 text-center">
                          <Link 
                            href={`/compliance/directory/${c.slug}`}
                            className="text-sm font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                          >
                            Full Profile →
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <section className="mt-20">
          <div className="bg-blue-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl font-black mb-4">Accelerate Your Vendor Due Diligence</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 font-medium">
              RiscLens Peer Comparison helps you benchmark transparency signals instantly, saving hours of manual security review.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/readiness-review" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                Book Security Intelligence Review
              </Link>
              <Link href="/compliance/directory" className="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors border border-blue-500">
                Back to Directory
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
