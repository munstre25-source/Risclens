import React from 'react';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import { SignalScore } from './SignalScore';

interface RelatedProfilesProps {
  currentCompanySlug?: string;
  currentSignals?: any;
  limit?: number;
  mode?: 'related' | 'explore';
}

export async function RelatedProfiles({ 
  currentCompanySlug, 
  currentSignals, 
  limit = 8,
  mode = 'related'
}: RelatedProfilesProps) {
  const supabase = getSupabaseAdmin();
  
  let profiles: any[] = [];
  
    if (mode === 'related' && currentCompanySlug) {
      // Logic for related profiles
      const { data: allCompanies } = await supabase
        .from('company_signals')
        .select('name, slug, signal_score, domain, public_signals')
        .eq('indexable', true)
        .neq('slug', currentCompanySlug)
        .order('signal_score', { ascending: false })
        .limit(50);

    if (allCompanies && allCompanies.length > 0) {
      const scored = allCompanies.map((c) => {
        let overlap = 0;
        const ps = c.public_signals || {};
        if (currentSignals?.has_security_page && ps.has_security_page) overlap++;
        if (currentSignals?.has_trust_page && ps.has_trust_page) overlap++;
        if (currentSignals?.mentions_soc2 && ps.mentions_soc2) overlap++;
        if (currentSignals?.mentions_compliance_tool && ps.mentions_compliance_tool) overlap++;
        if (currentSignals?.has_responsible_disclosure && ps.has_responsible_disclosure) overlap++;
        
        // Similar signal_score (±5) preference
        const scoreDiff = Math.abs((c.signal_score || 0) - (currentSignals?.signal_score || 0));
        const scoreBonus = scoreDiff <= 5 ? 2 : 0;
        
        return { ...c, overlap: overlap + scoreBonus };
      });

      scored.sort((a, b) => {
        if (b.overlap !== a.overlap) return b.overlap - a.overlap;
        return b.signal_score - a.signal_score;
      });

      profiles = scored.slice(0, limit);
    }
    } else {
      // Logic for explore profiles (high-signal companies)
      const { data: highSignalCompanies } = await supabase
        .from('company_signals')
        .select('name, slug, signal_score, domain, public_signals')
        .eq('indexable', true)
        .order('signal_score', { ascending: false })
        .limit(limit || 20);
        
      profiles = highSignalCompanies || [];
    }

  if (profiles.length === 0) return null;

  if (mode === 'explore') {
    return (
      <section aria-labelledby="explore-profiles" className="mt-16 pt-12 border-t border-gray-200">
        <h2 id="explore-profiles" className="text-2xl font-bold text-gray-900 mb-8">
          Explore SOC 2 & Security Profiles by Company
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profiles.map((profile) => (
              <Link
                key={profile.slug}
                href={`/compliance/directory/${profile.slug}`}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                {profile.name} SOC 2 & security profile
              </Link>
            ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="related-profiles" className="mt-16 pt-12 border-t border-gray-200">
      <h2 id="related-profiles" className="text-2xl font-bold text-gray-900 mb-4">
        Related SOC 2 & Security Profiles
      </h2>
      <p className="text-gray-600 mb-8">
        Compare public SOC 2 signals, trust centers, and security disclosures
        across similar companies.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {profiles.map((profile) => (
            <li key={profile.slug}>
              <Link
                href={`/compliance/directory/${profile.slug}`}
                className="flex flex-col p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow h-full group"
              >
                <div className="flex justify-between items-start gap-3 mb-2">
                    <div className="min-w-0 flex-grow">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {profile.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{profile.domain}</p>
                    </div>
                  <div className="flex-shrink-0">
                    <SignalScore score={profile.signal_score} size="sm" minimal={true} />
                  </div>
                </div>

              
              <div className="flex flex-wrap gap-1 my-3">
                {profile.public_signals?.has_security_page && (
                  <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">Security Page</span>
                )}
                {profile.public_signals?.has_trust_page && (
                  <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-medium rounded">Trust Center</span>
                )}
                {profile.public_signals?.mentions_soc2 && (
                  <span className="px-1.5 py-0.5 bg-green-50 text-green-600 text-[10px] font-medium rounded">SOC 2 Mention</span>
                )}
              </div>

                <div className="mt-auto pt-2 flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider group-hover:text-blue-700">
                  View SOC 2 & security profile →
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex justify-center">
          <Link 
            href="/compliance/directory"
            className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors flex items-center gap-2"
          >
            Explore all 250+ security signal profiles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    );
}

