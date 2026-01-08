import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';

export const metadata: Metadata = {
  title: 'SOC 2 Readiness Infrastructure & Audit Tools | RiscLens',
  description:
    'RiscLens provides deterministic SOC 2 readiness infrastructure, audit delay calculators, and security signal tools for early-stage companies.',
  openGraph: {
    title: 'SOC 2 Readiness Infrastructure & Audit Tools | RiscLens',
    description:
      'Deterministic SOC 2 readiness infrastructure, audit delay calculators, and security signal tools for early-stage companies.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Readiness Infrastructure & Audit Tools | RiscLens',
    description:
      'Deterministic SOC 2 readiness infrastructure, audit delay calculators, and security signal tools for early-stage companies.',
    images: ['/og.png'],
  },
  alternates: {
    canonical: 'https://risclens.com',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the cost of SOC 2 audit delays?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SOC 2 audit delays can cost companies significant revenue by stalling enterprise deals that require trust validation. The cost is often measured in delayed contract signatures and deferred revenue."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a SOC 2 audit take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A SOC 2 audit timeline varies but typically takes 3-6 months. Delays in readiness or evidence collection can extend this period, impacting sales cycles."
        }
      }
    ]
};

export default function HomePage() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      
      <main className="min-h-screen flex flex-col bg-slate-50">
        <Header />

        {/* Flagship Hero Section */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-slate-900 leading-tight">
                SOC 2 audit delays quietly stall revenue.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                See how audit delays may be slowing enterprise deals — in under 60 seconds.
              </p>
              
                <div className="pt-8 flex flex-col items-center gap-6">
                    <Link
                      href="/soc-2-audit-delay-cost"
                      className="btn-primary text-lg px-10 py-4 shadow-sm hover:shadow-md transition-all"
                    >
                      Calculate Audit Delay Cost
                    </Link>

                  <Link
                    href="#readiness"
                    className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    Explore SOC 2 readiness tools →
                  </Link>
                </div>

              <div className="pt-12 border-t border-slate-100 mt-12">
                <p className="text-slate-500 font-medium italic">
                  “SOC 2 audit delays quietly stall revenue — see what it may be costing you.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supporting Content Section */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="space-y-12">
              <div className="text-center">
                <p className="text-lg text-slate-700 font-medium">
                  Built for founders navigating SOC 2 timelines, audits, and enterprise deal pressure.
                </p>
              </div>

              <div className="grid gap-8">
                <ul className="space-y-4">
                  {[
                    "Estimate revenue delayed by SOC 2 audit timelines",
                    "Understand how delays impact enterprise deals",
                    "Get clarity on when speed matters most"
                  ].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-slate-700">
                      <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-slate-100 text-center">
                <p className="text-slate-600">
                  Best for early-to-growth teams selling to enterprise customers that require SOC 2.
                </p>
              </div>
            </div>
          </div>
        </section>

          {/* Secondary Platform Positioning */}
          <section id="readiness" className="bg-slate-50 py-20 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">
                  Not urgent? Start with readiness.
                </h2>
              </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      title: "Compliance Directory",
                      description: "Explore security signals, trust centers, and compliance markers for 100+ top companies.",
                      link: "/compliance/directory",
                      badge: "New"
                    },
                    {
                      title: "Why SOC 2 audits get delayed",
                      description: "Understand the common pitfalls that stall compliance and how they impact your revenue.",
                      link: "/soc-2-audit-delay-cost"
                    },
                    {
                      title: "SOC 2 Readiness Index",
                      description: "Benchmark your current security posture against auditor expectations.",
                      link: "/soc-2-readiness-index"
                    },
                    {
                      title: "SOC 2 Cost Calculator",
                      description: "Estimate total audit costs including tools, auditors, and internal effort.",
                      link: "/soc-2-cost-calculator"
                    }
                  ].map((card) => (

                  <Link 
                    key={card.title}
                    href={card.link}
                    className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all relative"
                  >
                    {card.badge && (
                      <span className="absolute top-4 right-4 px-2 py-1 text-[10px] font-bold text-white bg-brand-500 rounded uppercase tracking-wider">
                        {card.badge}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {card.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Industry Hubs Section */}
          <section className="bg-white py-20 border-t border-slate-200">
            <div className="max-w-5xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">
                  Compliance by Industry
                </h2>
                <p className="text-slate-600 mt-2">
                  Tailored readiness guides and cost benchmarks for your specific vertical.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'SaaS', href: '/soc-2/industries/saas', icon: '☁️' },
                  { label: 'Fintech', href: '/soc-2-cost/fintech', icon: '💰' },
                  { label: 'Healthcare', href: '/soc-2-cost/healthcare', icon: '🏥' },
                  { label: 'Startups', href: '/soc-2-cost/startups', icon: '🚀' },
                ].map((industry) => (
                  <Link
                    key={industry.label}
                    href={industry.href}
                    className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-white hover:shadow-sm transition-all text-center"
                  >
                    <span className="text-3xl mb-3">{industry.icon}</span>
                    <span className="font-bold text-slate-900">{industry.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-10 text-center">
                <Link href="/soc-2/industries" className="text-brand-600 font-semibold hover:text-brand-700 transition-colors">
                  View all industry benchmarks →
                </Link>
              </div>
            </div>
          </section>

          <AboutSection />
        
        <Footer />
      </main>
    </>
  );
}