import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { RelatedGuidesRow } from '@/components/RelatedGuidesRow';
import { StickyCTA } from '@/components/StickyCTA';

const teamSizeData = [
  {
    size: '1-25 employees',
    label: 'Early-Stage Startup',
    auditorFee: '$12,000 – $25,000',
    tooling: '$8,000 – $18,000',
    internal: '$10,000 – $25,000',
    total: '$30,000 – $68,000',
    timeline: '8-14 weeks',
    notes: 'Lean scope, often Type I first. Founder or single engineer handles prep.',
    color: 'emerald',
  },
  {
    size: '26-50 employees',
    label: 'Growth Stage',
    auditorFee: '$18,000 – $35,000',
    tooling: '$12,000 – $28,000',
    internal: '$15,000 – $35,000',
    total: '$45,000 – $98,000',
    timeline: '10-16 weeks',
    notes: 'More systems in scope, starting to need dedicated owner.',
    color: 'blue',
  },
  {
    size: '51-100 employees',
    label: 'Scaling',
    auditorFee: '$25,000 – $45,000',
    tooling: '$18,000 – $36,000',
    internal: '$20,000 – $50,000',
    total: '$63,000 – $131,000',
    timeline: '12-20 weeks',
    notes: 'Multiple teams involved, formal ownership structure needed.',
    color: 'violet',
  },
  {
    size: '101-250 employees',
    label: 'Mid-Market',
    auditorFee: '$35,000 – $60,000',
    tooling: '$24,000 – $48,000',
    internal: '$30,000 – $70,000',
    total: '$89,000 – $178,000',
    timeline: '14-24 weeks',
    notes: 'Complex environments, multiple products, dedicated compliance team.',
    color: 'amber',
  },
  {
    size: '250+ employees',
    label: 'Enterprise',
    auditorFee: '$50,000 – $100,000+',
    tooling: '$36,000 – $72,000+',
    internal: '$50,000 – $120,000+',
    total: '$136,000 – $292,000+',
    timeline: '16-30 weeks',
    notes: 'Multi-product, global operations, often multi-framework.',
    color: 'rose',
  },
];

const faqs = [
  {
    question: 'Why does SOC 2 cost more for larger companies?',
    answer: 'More employees means more systems, access controls, data flows, and evidence to collect. Auditors spend more time validating controls across a larger environment.',
  },
  {
    question: 'Can a 10-person startup afford SOC 2?',
    answer: 'Yes. Many startups complete SOC 2 Type I for $30-50K total. The key is narrow scope—focus on the core product and essential systems only.',
  },
  {
    question: 'How does headcount affect auditor fees specifically?',
    answer: 'Auditors price based on scope complexity, not headcount directly. But larger teams typically have more systems, vendors, and data flows that expand audit scope.',
  },
  {
    question: 'Should we hire a compliance person before SOC 2?',
    answer: 'Under 50 employees: usually not required. 50-100: consider a part-time owner. 100+: dedicated compliance lead significantly reduces cost and risk.',
  },
  {
    question: 'Does team growth during the audit increase cost?',
    answer: 'Minor growth is normal. Rapid scaling (2x+ headcount) during observation can expand scope and require re-scoping conversations with auditors.',
  },
  {
    question: 'How do remote/distributed teams affect SOC 2 cost?',
    answer: 'Remote teams add complexity around endpoint management, access controls, and physical security. Budget extra for MDM/EDR tooling and policy documentation.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export const metadata: Metadata = {
  title: 'SOC 2 Cost by Team Size (2026): 10, 50, 100, 250+ Employees | RiscLens',
  description: 'See how SOC 2 costs scale with company size. Budget guidance for startups (10-25), growth stage (50), scaling (100), and enterprise (250+) teams.',
  alternates: {
    canonical: '/soc-2-cost/by-team-size',
  },
  openGraph: {
    type: 'article',
    url: 'https://risclens.com/soc-2-cost/by-team-size',
    title: 'SOC 2 Cost by Team Size (2026): 10, 50, 100, 250+ Employees | RiscLens',
    description: 'See how SOC 2 costs scale with company size. Budget guidance from early-stage startups to enterprise.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens - SOC 2 Cost by Team Size' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC 2 Cost by Team Size (2026) | RiscLens',
    description: 'How SOC 2 costs scale: from 10-person startups to 250+ employee enterprises.',
    images: ['/og.png'],
  },
};

const colorClasses: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-800', badge: 'bg-violet-100 text-violet-700' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', badge: 'bg-rose-100 text-rose-700' },
};

export default function CostByTeamSizePage() {
  return (
    <>
      <Script
        id="team-size-faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'SOC 2 Cost', href: '/soc-2-cost' }, { label: 'By Team Size' }]} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 lg:py-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">SOC 2 Cost Guide</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
              SOC 2 Cost by Team Size
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              How much does SOC 2 cost for a 10-person startup vs. a 250-person company? See realistic budgets for every growth stage.
            </p>
            <Link
              href="/soc-2-readiness-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your Custom Estimate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-sm text-slate-500">Free • Tailored to your headcount • Instant results</p>
          </div>
        </section>

        <section className="py-14 bg-white border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="space-y-6">
              {teamSizeData.map((tier) => {
                const colors = colorClasses[tier.color];
                return (
                  <div key={tier.size} className={`${colors.bg} ${colors.border} border rounded-xl p-6 space-y-4`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${colors.badge} mb-2`}>
                          {tier.label}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900">{tier.size}</h2>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Total First-Year Cost</p>
                        <p className={`text-3xl font-extrabold ${colors.text}`}>{tier.total}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Auditor Fee</p>
                        <p className="font-bold text-slate-900">{tier.auditorFee}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Tooling</p>
                        <p className="font-bold text-slate-900">{tier.tooling}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Internal Effort</p>
                        <p className="font-bold text-slate-900">{tier.internal}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">Timeline</p>
                        <p className="font-bold text-slate-900">{tier.timeline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700">{tier.notes}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Key Insight: Cost Doesn&apos;t Scale Linearly</h3>
              <p className="text-slate-700 leading-relaxed">
                A 250-person company doesn&apos;t pay 10x more than a 25-person startup. Costs roughly <strong>double every 3-4x headcount increase</strong>. The biggest driver isn&apos;t headcount—it&apos;s <em>scope complexity</em>: more products, more systems, more data types.
              </p>
              <div className="grid md:grid-cols-3 gap-4 pt-2">
                <div className="text-center p-4 bg-white rounded-lg border border-brand-100">
                  <p className="text-3xl font-bold text-brand-700">2-3x</p>
                  <p className="text-sm text-slate-600">Cost increase from 25 to 100 employees</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-brand-100">
                  <p className="text-3xl font-bold text-brand-700">50-60%</p>
                  <p className="text-sm text-slate-600">Internal effort as % of total cost</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-brand-100">
                  <p className="text-3xl font-bold text-brand-700">100+</p>
                  <p className="text-sm text-slate-600">Employees where dedicated owner pays off</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">What Changes as You Grow</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-slate-900">Under 50 Employees</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Founder or engineer can own compliance</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Narrow scope keeps costs manageable</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Type I often sufficient for first audit</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>Knowledge concentration risk if owner leaves</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-slate-900">50-100 Employees</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>Multiple teams need coordination</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>More vendors and systems in scope</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Part-time compliance owner recommended</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Investment in automation starts paying off</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-slate-900">100-250 Employees</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-red-600">✗</span>
                      <span>Part-time ownership no longer viable</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Dedicated compliance lead essential</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Multiple frameworks often required</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>Cross-team coordination becomes critical</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                  <h3 className="font-bold text-slate-900">250+ Employees</h3>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>GRC team (2-5 people) common</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Multi-framework efficiency gains</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>Global operations add complexity</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-amber-600">!</span>
                      <span>Enterprise auditors may charge premium</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">SOC 2 Cost by Team Size FAQs</h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="space-y-1">
                    <p className="font-semibold text-slate-900">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Get Your Team&apos;s Specific SOC 2 Budget</h3>
              <p className="text-slate-600 max-w-xl mx-auto">
                These ranges are starting points. Your actual cost depends on industry, scope, and timeline. Get a personalized estimate.
              </p>
              <Link
                href="/soc-2-readiness-calculator"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Calculate My SOC 2 Cost →
              </Link>
            </div>

            <RelatedGuidesRow
              links={[
                { href: '/soc-2-cost', label: 'SOC 2 Cost Overview' },
                { href: '/soc-2-cost/first-year-vs-renewal', label: 'First Year vs Renewal' },
                { href: '/soc-2-cost/type-1-vs-type-2-cost', label: 'Type I vs Type II Cost' },
                { href: '/soc-2-cost/startups', label: 'SOC 2 for Startups' },
                { href: '/soc-2-cost/enterprise', label: 'SOC 2 for Enterprise' },
              ]}
            />
          </div>
        </section>

        <StickyCTA />
      </main>
      <Footer />
    </>
  );
}
