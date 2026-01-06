import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SignalScore } from '@/components/compliance/SignalScore';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Public Security Signals Directory | RiscLens',
  description: 'A directory of public security disclosures and signals for technology companies.',
};

export default async function DirectoryPage() {
  const supabase = getSupabaseAdmin();
  
  const { data: companies, error } = await supabase
    .from('company_signals')
    .select('company_name, slug, signal_score, domain, public_signals')
    .eq('indexable', true)
    .order('signal_score', { ascending: false });

  if (error) {
    console.error('Error fetching companies:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs 
          items={[
            { label: 'Compliance', href: '/compliance' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies?.map((company) => (
            <Link 
              key={company.slug} 
              href={`/compliance/directory/${company.slug}`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 truncate pr-2">
                    {company.company_name}
                  </h2>
                  <p className="text-sm text-gray-500">{company.domain}</p>
                </div>
                <div className="scale-75 origin-top-right -mt-4">
                  <SignalScore score={company.signal_score} size="sm" />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex flex-wrap gap-2">
                  {company.public_signals.has_security_page && (
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Security Page</span>
                  )}
                  {company.public_signals.has_trust_page && (
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded">Trust Center</span>
                  )}
                  {company.public_signals.mentions_soc2 && (
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded">SOC 2 Mention</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center text-blue-600 text-sm font-medium">
                View Full Profile
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {(!companies || companies.length === 0) && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No indexable companies found in the directory yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
