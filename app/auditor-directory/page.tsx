import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, MapPin, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';
import { getPSEOLocations } from '@/lib/pseo';

export const metadata: Metadata = {
  title: 'Verified Auditor Directory | SOC 2 & ISO 42001 Partners',
  description: 'Find vetted CPA firms and security auditors specializing in SOC 2, ISO 27001, and ISO 42001 (AI Management) for startups.',
};

const auditors = [
  {
    name: 'Guardian Assurance',
    specialty: 'ISO 42001 & AI Governance',
    location: 'Global / Remote',
    description: 'Leading auditor for AI Management Systems (AIMS). Specializes in helping AI startups achieve ISO 42001 and SOC 2 simultaneously.',
    website: 'https://www.guardianassurance.com',
    isNew: true
  },
  {
    name: 'Prescient Security',
    specialty: 'Startups & High-Growth SaaS',
    location: 'Global / Remote',
    description: 'Specializes in tech-forward audits with a focus on automation-friendly evidence collection for SOC 2 and ISO 27001.',
    website: 'https://www.prescientsecurity.com',
  },
  {
    name: 'Johanson Group',
    specialty: 'SaaS & Fintech',
    location: 'USA / Remote',
    description: 'A boutique CPA firm known for personalized service and deep expertise in compliance automation platforms.',
    website: 'https://johansongroup.net',
  },
  {
    name: 'Sensiba LLP',
    specialty: 'Enterprise & Mid-Market',
    location: 'USA',
    description: 'Provides comprehensive SOC 2, SOC 3, and ISO 27001 services for established organizations.',
    website: 'https://sensiba.com',
  },
  {
    name: 'Coalfire',
    specialty: 'Cloud Security & Enterprise',
    location: 'Global',
    description: 'One of the largest providers of cybersecurity advisory and assessment services.',
    website: 'https://www.coalfire.com',
  },
  {
    name: 'BARR Advisory',
    specialty: 'Mid-Market & Cloud-Native',
    location: 'USA / Remote',
    description: 'Offers a collaborative approach to SOC 2, ISO, and HITRUST compliance.',
    website: 'https://www.barradvisory.com',
  },
];

export default async function AuditorDirectoryPage() {
  const locations = await getPSEOLocations();
  // Sort locations alphabetically
  const sortedLocations = [...locations].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="flex-grow">
          {/* Hero */}
          <section className="py-20 bg-white border-b border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-6 mx-auto">
                Vetted Partner Network
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Verified Auditor Directory
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
                Find and connect with vetted auditors who specialize in B2B SaaS, AI, and Fintech. RiscLens partners with firms that understand early-stage constraints.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-slate-100 pt-10">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-600">6+</p>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Vetted Partners</p>
                </div>
              <div className="text-center">
                    <p className="text-3xl font-bold text-brand-600">{locations.length}+</p>
                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Tech Hubs</p>
                  </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-600">500+</p>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Audits Benchmarked</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-600">98%</p>
                  <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Startup Approval</p>
                </div>
              </div>
            </div>
          </section>
  
          {/* City Silos Section */}
          <section className="py-12 bg-slate-100 border-y border-slate-200">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8 text-center">Browse by Tech Hub</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sortedLocations.map((location) => (
                  <Link 
                    key={location.id}
                    href={`/auditor-directory/${location.slug}`}
                    className="bg-white border border-slate-200 p-4 rounded-xl text-center hover:border-brand-300 hover:text-brand-600 transition-all font-bold text-slate-700 shadow-sm"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
          </div>
        </section>
  
          {/* Directory List */}
          <section className="py-20">

          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6">
              {auditors.map((auditor, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-slate-900">{auditor.name}</h2>
                        {auditor.isNew && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                            <Sparkles className="w-3 h-3" />
                            AI Specialized
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                          <ShieldCheck className="w-3 h-3" />
                          Vetted Partner
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Search className="w-4 h-4" />
                          {auditor.specialty}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {auditor.location}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed max-w-3xl">
                        {auditor.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-2">
                      <a 
                        href={auditor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors group"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      </a>
                      <Link 
                        href="/readiness-review"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                      >
                        Request Intro
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-10 bg-slate-900 rounded-3xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Are you a Compliance Auditor?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join our network of vetted partners to receive high-intent, readiness-scored leads from early-stage companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="mailto:partners@risclens.com"
                  className="bg-white text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-slate-100 transition-colors"
                >
                  Apply for Partnership
                </Link>
                <Link 
                  href="/methodology"
                  className="bg-transparent border border-slate-700 text-slate-300 px-8 py-3 rounded-lg font-bold hover:text-white hover:bg-slate-800 transition-colors"
                >
                  Lead Methodology
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
