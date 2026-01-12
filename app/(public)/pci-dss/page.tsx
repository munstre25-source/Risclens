import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  pciDssHub, 
  pciDssTools, 
  pciDssRequirements, 
  pciDssFAQs, 
  pciDssIndustries 
} from '@/src/content/pciDssContent';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Zap, 
  Globe, 
  ChevronRight, 
  MapPin,
  CreditCard,
  Search,
  Server,
  FileText
} from 'lucide-react';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pciDssFAQs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'PCI DSS 4.0 Compliance Hub | Readiness & QSA Prep | RiscLens',
  description:
    'Complete guide to PCI DSS 4.0 compliance. Understand the 12 requirements, SAQ types, ASV scanning, and how to prepare for your QSA assessment.',
  openGraph: {
    title: 'PCI DSS 4.0 Compliance Hub | RiscLens',
    description: 'Master PCI DSS certification. Requirements, costs, and implementation roadmap.',
    url: 'https://risclens.com/pci-dss',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens PCI DSS Hub' }],
  },
  alternates: {
    canonical: 'https://risclens.com/pci-dss',
  },
};

export default function PCIDSSHubPage() {
  const breadcrumbItems = [
    { label: 'Frameworks', href: '/compliance' },
    { label: 'PCI DSS', href: '/pci-dss' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Script id="pci-dss-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-blue-900 text-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mt-6">
            <div className="lg:max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-bold uppercase tracking-wider mb-6">
                <Globe className="w-4 h-4" />
                Global Payment Standard
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
                {pciDssHub.hero.headline}
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                {pciDssHub.hero.subhead}
              </p>
              
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/pci-dss-readiness-calculator"
                    className="bg-white text-blue-900 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2"
                  >
                    Check PCI Readiness
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/auditor-match"
                    className="bg-white/10 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    Find a QSA
                  </Link>
                </div>
              
              <p className="text-sm text-blue-300 mt-6">Last updated: {pciDssHub.lastUpdated}. Fully updated for PCI DSS v4.0.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shrink-0">
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-white mb-2">12</div>
                <div className="text-blue-200 font-medium">Core Requirements</div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-blue-100">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  SAQ & ROC Paths
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Search className="w-4 h-4 text-blue-400" />
                  Quarterly ASV Scans
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <Server className="w-4 h-4 text-blue-400" />
                  CDE Segmentation
                </div>
                <div className="flex items-center gap-2 text-blue-100">
                  <FileText className="w-4 h-4 text-blue-400" />
                  V4.0 Transition
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-blue-50 border-b border-blue-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
            <span className="font-medium text-blue-700">Jump to:</span>
            <a href="#tools" className="text-blue-800 hover:text-blue-900 font-medium">Tools</a>
            <a href="#requirements" className="text-blue-800 hover:text-blue-900 font-medium">12 Requirements</a>
            <a href="#industries" className="text-blue-800 hover:text-blue-900 font-medium">Industries</a>
            <a href="#faq" className="text-blue-800 hover:text-blue-900 font-medium">FAQs</a>
          </div>
        </div>
      </section>

      <section id="tools" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">PCI DSS Planning Tools</h2>
            <p className="text-slate-600">Interactive calculators to plan your PCI DSS 4.0 compliance journey.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pciDssTools.map((tool) => (
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

      <section id="requirements" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">The 12 Requirements</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              PCI DSS consists of 12 core requirements designed to protect cardholder data (CHD) and the systems that process it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pciDssRequirements.map((req) => (
              <div 
                key={req.number} 
                className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                    {req.number}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{req.title}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{req.description}</p>
              </div>
            ))}
          </div>

            <div className="mt-12 text-center">
              <Link 
                href="/pci-dss-readiness-calculator"
                className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                Start Full Gap Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
        </div>
      </section>

      <section id="industries" className="bg-white py-20 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Industry-Specific Roadmap</h2>
            <p className="text-slate-600">Tailored PCI DSS guidance for your specific business model and transaction volume.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pciDssIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/pci-dss/for/cto/${industry.slug}`}
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

      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Find a Qualified Security Assessor (QSA)</h2>
              <p className="text-slate-600 leading-relaxed">
                PCI DSS assessments must be performed by certified QSAs for Level 1 compliance. Find vetted firms in major tech hubs.
              </p>
              <Link 
                href="/auditor-directory"
                className="inline-flex items-center gap-2 text-blue-700 font-bold hover:underline"
              >
                View QSA Directory
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
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">PCI DSS 4.0 FAQs</h2>
          </div>
          
          <div className="space-y-8">
            {pciDssFAQs.map((faq, idx) => (
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
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Master PCI DSS 4.0 Compliance</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Get your readiness score and identify exact technical gaps before your next QSA assessment.
          </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pci-dss-readiness-calculator"
                className="w-full sm:w-auto bg-white text-blue-900 font-bold px-10 py-5 rounded-xl hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                Start Gap Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            <Link
              href="/auditor-match"
              className="w-full sm:w-auto bg-blue-800 text-white border border-blue-700 font-bold px-10 py-5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Match with QSA
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">Related Resources</h3>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <Link href="/soc-2" className="text-slate-600 hover:text-blue-600 font-medium">SOC 2 Hub</Link>
            <Link href="/iso-27001" className="text-slate-600 hover:text-blue-600 font-medium">ISO 27001 Hub</Link>
            <Link href="/compliance/directory" className="text-slate-600 hover:text-blue-600 font-medium">Compliance Directory</Link>
            <Link href="/vendor-risk-assessment" className="text-slate-600 hover:text-blue-600 font-medium">Vendor Risk Hub</Link>
            <Link href="/penetration-testing" className="text-slate-600 hover:text-blue-600 font-medium">Pentest Hub</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
