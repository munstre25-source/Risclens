import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  iso27001Hub, 
  annexAControls, 
  implementationPhases, 
  costBreakdown,
  iso27001Tools,
  iso27001Guides,
  iso27001Industries,
  iso27001Roles,
  iso27001FAQs,
  iso27001PseoData,
} from '@/src/content/iso27001Content';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Building2,
  Users,
  Lock,
  Target,
  Zap,
  Clock,
  Globe,
  Award,
  FileCheck,
  BarChart3,
  BookOpen,
  ChevronRight,
  MapPin,
} from 'lucide-react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: iso27001FAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'ISO 27001 Certification Hub | ISMS Implementation Guide | RiscLens',
  description:
    'Complete guide to ISO 27001:2022 certification. Understand the 93 Annex A controls, implementation roadmap, costs, and how to achieve ISMS certification.',
  openGraph: {
    title: 'ISO 27001 Certification Hub | RiscLens',
    description: 'Master ISO 27001 certification. Controls, costs, timeline, and implementation roadmap.',
    url: 'https://risclens.com/iso-27001',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens ISO 27001 Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ISO 27001 Certification Hub | RiscLens',
    description: 'Master ISO 27001 certification. Controls, costs, timeline, and implementation roadmap.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://risclens.com/iso-27001',
  },
};

const iconMap: Record<string, any> = {
  Building2,
  Users,
  Shield,
  Lock,
};

export default function ISO27001HubPage() {
  const breadcrumbItems = [
    { label: 'Frameworks', href: '/compliance' },
    { label: 'ISO 27001', href: '/iso-27001' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="iso27001-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />
      <GeneralPageSchema
        title="ISO 27001 Certification Hub"
        description="Complete guide to ISO 27001:2022 certification and ISMS implementation."
        url="https://risclens.com/iso-27001"
        faqs={iso27001FAQs}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Frameworks', item: 'https://risclens.com/compliance' },
          { name: 'ISO 27001', item: 'https://risclens.com/iso-27001' },
        ]}
      />

      <section className="bg-gradient-to-b from-blue-900 via-blue-900 to-blue-800 text-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mt-6">
            <div className="lg:max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                <Globe className="w-4 h-4" />
                Global Standard
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                {iso27001Hub.hero.headline}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                {iso27001Hub.hero.subhead}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/soc-2-readiness-calculator"
                  className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                >
                  Check ISMS Readiness
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/iso-27001-checklist"
                  className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  View Checklist
                </Link>
              </div>
              
              <p className="text-sm text-blue-300 mt-6">Last updated: {iso27001Hub.lastUpdated}. Aligned with ISO 27001:2022.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-white mb-2">93</div>
                <div className="text-blue-200 font-medium">Annex A Controls</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  Certifiable Standard
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  Global Recognition
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  3-Year Certification Cycle
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  Annex SL Structure
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-blue-50 border-b border-blue-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            <span className="font-medium text-blue-700">Jump to:</span>
            <a href="#tools" className="text-blue-800 hover:text-blue-900 font-medium">Tools</a>
            <a href="#controls" className="text-blue-800 hover:text-blue-900 font-medium">Annex A Controls</a>
            <a href="#implementation" className="text-blue-800 hover:text-blue-900 font-medium">Implementation</a>
            <a href="#costs" className="text-blue-800 hover:text-blue-900 font-medium">Costs</a>
            <a href="#industries" className="text-blue-800 hover:text-blue-900 font-medium">Industries</a>
            <a href="#faq" className="text-blue-800 hover:text-blue-900 font-medium">FAQs</a>
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">ISO 27001 Planning Tools</h2>
            <p className="text-slate-600">Interactive calculators to plan your ISMS certification journey.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {iso27001Tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block border border-blue-100 bg-white rounded-2xl p-6 shadow-sm hover:border-blue-300 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5" />
                    Interactive
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 mt-4">{tool.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{tool.summary}</p>
                <div className="flex items-center text-xs font-bold text-blue-700 uppercase tracking-widest group-hover:gap-2 transition-all">
                  {tool.cta}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="controls" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Annex A Control Themes</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              ISO 27001:2022 reorganized controls into 4 themes with 93 total controls. Click each theme to explore the specific controls.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {annexAControls.map((domain) => {
              const Icon = iconMap[domain.icon] || Shield;
              return (
                <Link 
                  key={domain.category} 
                  href={`/iso-27001/controls#${domain.category.toLowerCase()}`}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-600 uppercase">{domain.category}</span>
                      <h3 className="text-lg font-bold text-slate-900">{domain.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{domain.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                      <span className="text-xs font-bold text-blue-700">{domain.controlCount} Controls</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-500 mb-2">Key Controls:</p>
                    <ul className="space-y-1">
                      {domain.keyControls.slice(0, 3).map((control) => (
                        <li key={control} className="text-xs text-slate-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-blue-500" />
                          {control}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/iso-27001/controls"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
            >
              Explore All 93 Controls
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Core ISO 27001 Guides</h2>
            <p className="text-slate-600">Deep dives into ISMS implementation, controls, and certification.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {iso27001Guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block border border-slate-200 bg-white rounded-2xl p-6 hover:border-blue-200 transition-all"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700">{guide.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{guide.summary}</p>
                <span className="text-xs font-semibold text-blue-700 flex items-center">
                  Read Guide
                  <ChevronRight className="w-3 h-3 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="implementation" className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Implementation Roadmap</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              A typical ISO 27001 implementation takes 6-12 months depending on organizational complexity and existing security maturity.
            </p>
          </div>
          
          <div className="space-y-6">
            {implementationPhases.map((phase) => (
              <div key={phase.phase} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-xl font-black text-white">{phase.phase}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                    <span className="text-sm text-blue-400">{phase.duration}</span>
                  </div>
                </div>
                <ul className="grid md:grid-cols-2 gap-2">
                  {phase.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/iso-27001/timeline"
              className="inline-flex items-center gap-2 bg-blue-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-400 transition-all"
            >
              Build Your Timeline
              <Clock className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="costs" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">ISO 27001 Cost Estimates</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Budget ranges for small to mid-sized organizations achieving ISO 27001 certification.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Cost Item</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700">Range</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {costBreakdown.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.item}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{item.range}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 hidden md:table-cell">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-blue-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">Total First Year</td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-700" colSpan={2}>$53,000 - $165,000</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link 
              href="/soc-2-cost-calculator"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold"
            >
              Get Personalized Cost Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section id="industries" className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Industry-Specific Playbooks</h2>
            <p className="text-slate-600">Tailored ISO 27001 guidance for your specific business model.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {iso27001Industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/iso-27001/for/cto/${industry.slug}`}
                className={`block border border-slate-200 rounded-2xl p-6 transition-all hover:border-blue-200 hover:shadow-sm ${industry.bg}`}
              >
                <h3 className="text-base font-bold text-slate-900 mb-2">{industry.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{industry.summary}</p>
                <span className="text-xs font-medium text-blue-700 underline underline-offset-4">View Roadmap</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Role-Based Strategies</h2>
            <p className="text-slate-600">Get guidance tailored to your specific role and responsibilities.</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {iso27001Roles.map((role) => (
              <Link
                key={role.slug}
                href={`/iso-27001/for/${role.slug}/saas`}
                className="group block border border-slate-200 bg-white rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700">{role.name}</h3>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-slate-600">{role.focus}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
            <h3 className="text-xl font-bold mb-4 relative z-10">Explore the Full pSEO Matrix</h3>
            <p className="text-slate-400 mb-8 relative z-10">Browse all role × industry × framework combinations.</p>
            <Link 
              href="/compliance"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              Matrix Explorer
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Find ISO 27001 Registrars</h2>
              <p className="text-slate-600 leading-relaxed">
                Certification must be performed by an accredited registrar (certification body). Pricing and lead times vary by location and scope.
              </p>
              <Link 
                href="/auditor-directory"
                className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline"
              >
                View Auditor Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'New York', slug: 'new-york' },
                { name: 'San Francisco', slug: 'san-francisco' },
                { name: 'Austin', slug: 'austin' },
                { name: 'Seattle', slug: 'seattle' },
                { name: 'Boston', slug: 'boston' },
                { name: 'Chicago', slug: 'chicago' },
                { name: 'Los Angeles', slug: 'los-angeles' },
                { name: 'Denver', slug: 'denver' },
                { name: 'London', slug: 'london' },
              ].map((city) => (
                <Link
                  key={city.slug}
                  href={`/auditor-directory/${city.slug}`}
                  className="bg-white border border-slate-200 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 text-center hover:border-blue-300 hover:text-blue-600 shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">ISO 27001 FAQs</h2>
          </div>
          
          <div className="space-y-8">
            {iso27001FAQs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200 pb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Start Your ISO 27001 Journey</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Get a free readiness assessment and understand what it takes to achieve ISO 27001 certification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/soc-2-readiness-calculator"
              className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              Check ISMS Readiness
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/readiness-review"
              className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Book Expert Review
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
            <Link href="/soc-2" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 Hub</Link>
            <Link href="/soc-2-vs-iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 vs ISO 27001</Link>
            <Link href="/ai-compliance/iso-42001" className="text-slate-600 hover:text-blue-600 font-medium">ISO 42001 (AI)</Link>
            <Link href="/pci-dss" className="text-slate-600 hover:text-blue-600 font-medium">PCI-DSS</Link>
            <Link href="/compliance/directory" className="text-slate-600 hover:text-blue-600 font-medium">Compliance Directory</Link>
            <Link href="/vendor-risk-assessment" className="text-slate-600 hover:text-blue-600 font-medium">Vendor Risk Hub</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
