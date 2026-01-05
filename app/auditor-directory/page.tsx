import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SOC 2 Auditor Directory | Find the Right CPA Firm',
  description: 'A curated directory of reputable CPA firms specializing in SOC 2 audits for startups and SaaS companies.',
};

const auditors = [
  {
    name: 'Prescient Security',
    specialty: 'Startups & High-Growth SaaS',
    location: 'Global / Remote',
    description: 'Specializes in tech-forward audits with a focus on automation-friendly evidence collection.',
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

export default function AuditorDirectoryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              SOC 2 Auditor Directory
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Finding the right auditor is critical to a successful SOC 2 report. We&apos;ve curated a list of firms experienced in working with modern tech teams.
            </p>
          </div>
        </section>

        {/* Directory List */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid gap-6">
              {auditors.map((auditor, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-slate-900">{auditor.name}</h2>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100">
                          <ShieldCheck className="w-3 h-3" />
                          CPA Licensed
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
                    <div className="flex-shrink-0">
                      <a 
                        href={auditor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors group"
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-10 bg-slate-900 rounded-3xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Are you an auditor?</h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                If your firm specializes in SOC 2 for startups and would like to be included in our directory, please reach out.
              </p>
              <Link 
                href="/about"
                className="bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
