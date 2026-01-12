import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { 
  Award,
  CheckCircle,
  ArrowRight,
  Globe,
  AlertTriangle,
  Search,
  FileCheck,
  Users,
  ChevronRight,
  MapPin,
  DollarSign,
  Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Choose an ISO 27001 Registrar | Certification Body Guide | RiscLens',
  description:
    'Learn how to select the right ISO 27001 certification body. Understand accreditation, pricing, and what to look for in a registrar.',
  alternates: {
    canonical: 'https://risclens.com/iso-27001/auditor-selection',
  },
};

const selectionCriteria = [
  {
    title: 'Accreditation',
    icon: Award,
    description: 'Ensure the registrar is accredited by a recognized national accreditation body (e.g., UKAS, ANAB, DAkkS).',
    details: [
      'UKAS (UK) - Most globally recognized',
      'ANAB (USA) - Common for US companies',
      'DAkkS (Germany) - Strong in EU',
      'JAS-ANZ (Australia/NZ) - APAC focus',
    ],
    importance: 'Critical',
  },
  {
    title: 'Industry Experience',
    icon: Users,
    description: 'Choose a registrar with auditors who understand your industry and technology stack.',
    details: [
      'Ask for auditor CVs and certifications',
      'Request references from similar companies',
      'Verify experience with cloud/SaaS',
      'Check for sector-specific knowledge',
    ],
    importance: 'High',
  },
  {
    title: 'Geographic Coverage',
    icon: Globe,
    description: 'Consider where your operations are and whether the registrar can conduct audits efficiently.',
    details: [
      'Local auditors reduce travel costs',
      'Multi-site capabilities if needed',
      'Remote audit experience (post-COVID)',
      'Language capabilities for global teams',
    ],
    importance: 'Medium',
  },
  {
    title: 'Pricing & Transparency',
    icon: DollarSign,
    description: 'Get detailed quotes that break down all costs including surveillance audits.',
    details: [
      'Stage 1 + Stage 2 audit costs',
      'Annual surveillance audit fees',
      'Re-certification costs (Year 3)',
      'Travel and accommodation',
    ],
    importance: 'High',
  },
  {
    title: 'Scheduling & Availability',
    icon: Clock,
    description: 'Some registrars have long lead times. Book early to avoid delays.',
    details: [
      'Current wait times for audits',
      'Flexibility with scheduling changes',
      'Availability for expedited audits',
      'Alignment with your timeline',
    ],
    importance: 'Medium',
  },
  {
    title: 'Post-Certification Support',
    icon: FileCheck,
    description: 'Understand what happens after certification and how nonconformities are handled.',
    details: [
      'Minor vs. major nonconformity process',
      'Timeline for corrective actions',
      'Communication and reporting style',
      'Certificate maintenance requirements',
    ],
    importance: 'Medium',
  },
];

const topRegistrars = [
  { name: 'BSI Group', hq: 'UK', accreditation: 'UKAS', notes: 'Largest global registrar, premium pricing' },
  { name: 'Bureau Veritas', hq: 'France', accreditation: 'UKAS, ANAB', notes: 'Strong in Europe and Americas' },
  { name: 'SGS', hq: 'Switzerland', accreditation: 'Multiple', notes: 'Global reach, competitive pricing' },
  { name: 'TÜV Rheinland', hq: 'Germany', accreditation: 'DAkkS', notes: 'Strong technical expertise' },
  { name: 'Schellman', hq: 'USA', accreditation: 'ANAB', notes: 'Specialist in tech/SaaS, SOC 2 + ISO combo' },
  { name: 'A-LIGN', hq: 'USA', accreditation: 'ANAB', notes: 'Fast-growing, tech-focused' },
  { name: 'Coalfire', hq: 'USA', accreditation: 'ANAB', notes: 'Strong in cloud and cybersecurity' },
  { name: 'KPMG', hq: 'Global', accreditation: 'Various', notes: 'Big 4, enterprise focus' },
];

const redFlags = [
  'No accreditation or accreditation from unknown body',
  'Unwilling to provide auditor qualifications',
  'Guarantees certification before the audit',
  'Offers consulting and certification from same entity',
  'Significantly lower pricing than market rates',
  'No clear process for handling nonconformities',
];

export default function ISO27001AuditorSelectionPage() {
  const breadcrumbItems = [
    { label: 'Frameworks', href: '/compliance' },
    { label: 'ISO 27001', href: '/iso-27001' },
    { label: 'Auditor Selection', href: '/iso-27001/auditor-selection' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <GeneralPageSchema
        title="How to Choose an ISO 27001 Registrar"
        description="Learn how to select the right ISO 27001 certification body."
        url="https://risclens.com/iso-27001/auditor-selection"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'ISO 27001', item: 'https://risclens.com/iso-27001' },
          { name: 'Auditor Selection', item: 'https://risclens.com/iso-27001/auditor-selection' },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-blue-900 via-blue-900 to-blue-800 text-white py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <div className="mt-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                <Search className="w-4 h-4" />
                Selection Guide
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                How to Choose an<br />
                <span className="text-blue-300">ISO 27001 Registrar</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl">
                Selecting the right certification body (registrar) is crucial for a smooth ISO 27001 audit experience. 
                Learn what to look for and common pitfalls to avoid.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/auditor-directory"
                  className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  Browse Auditor Directory
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/auditor-match"
                  className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all"
                >
                  Get Matched
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Selection Criteria</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Evaluate potential registrars against these key criteria to make an informed decision.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {selectionCriteria.map((criteria) => {
                const Icon = criteria.icon;
                return (
                  <div key={criteria.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-slate-900">{criteria.title}</h3>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            criteria.importance === 'Critical' ? 'bg-red-100 text-red-700' :
                            criteria.importance === 'High' ? 'bg-amber-100 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {criteria.importance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{criteria.description}</p>
                    <ul className="space-y-2">
                      {criteria.details.map((detail, i) => (
                        <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Top ISO 27001 Registrars</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                These are some of the most recognized certification bodies for ISO 27001.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Registrar</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">HQ</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 hidden md:table-cell">Accreditation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 hidden lg:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {topRegistrars.map((registrar, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{registrar.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{registrar.hq}</td>
                      <td className="px-6 py-4 text-sm text-blue-600 font-medium hidden md:table-cell">{registrar.accreditation}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 hidden lg:table-cell">{registrar.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link 
                href="/auditor-directory"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
              >
                View Full Auditor Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Red Flags to Avoid</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Watch out for these warning signs when evaluating certification bodies.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600 shrink-0" />
                <h3 className="text-lg font-bold text-red-900">Warning Signs</h3>
              </div>
              <ul className="space-y-4">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-red-800">
                    <span className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-red-700">
                      {idx + 1}
                    </span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-900">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Find Your Registrar?</h2>
            <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
              Browse our directory of accredited ISO 27001 certification bodies or get matched based on your requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auditor-directory"
                className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Browse Directory
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/auditor-match"
                className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
              >
                Get Matched
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <AuthorBio authorId="kevin" />
          </div>
        </section>

        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Related Resources</h3>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
              <Link href="/iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Hub</Link>
              <Link href="/iso-27001/timeline" className="text-slate-600 hover:text-blue-600 font-medium">Certification Timeline</Link>
              <Link href="/iso-27001/controls" className="text-slate-600 hover:text-blue-600 font-medium">Annex A Controls</Link>
              <Link href="/soc-2/auditor-selection" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 Auditor Selection</Link>
              <Link href="/auditor-directory" className="text-slate-600 hover:text-blue-600 font-medium">Full Directory</Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
