import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Script from 'next/script';
import AssessmentCTA from '@/components/AssessmentCTA';
import { FAQSection } from '@/components/FAQSection';
import { generateGuideFAQs, generateEnhancedFAQSchema } from '@/lib/seo-enhancements';

interface FAQ {
  question: string;
  answer: string;
}

interface TableRow {
  aspect: string;
  frameworkA: string;
  frameworkB: string;
}

interface FrameworkComparisonViewProps {
  title: string;
  description: string;
  frameworkA: { name: string; slug: string };
  frameworkB: { name: string; slug: string };
  tableRows: TableRow[];
  decisions: string[];
  faqs: FAQ[];
  lastUpdated: string;
}

export default function FrameworkComparisonView({
  title,
  description,
  frameworkA,
  frameworkB,
  tableRows = [],
  decisions = [],
  faqs = [],
  lastUpdated,
}: FrameworkComparisonViewProps) {
  const effectiveFaqs = faqs?.length ? faqs : generateGuideFAQs(`${frameworkA.name} vs ${frameworkB.name}`, 'compliance');
  const faqSchema = generateEnhancedFAQSchema(effectiveFaqs);
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Script id="framework-comparison-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {frameworkA.name} vs {frameworkB.name} Comparison
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">{title}</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
          <div className="flex justify-center pt-4">
            <AssessmentCTA />
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Comparison Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Key Differences at a Glance</h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-sm">
              <table className="w-full text-sm text-left text-slate-800">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-bold text-slate-900">Aspect</th>
                    <th className="px-6 py-4 font-bold text-slate-900">{frameworkA.name}</th>
                    <th className="px-6 py-4 font-bold text-slate-900">{frameworkB.name}</th>
                  </tr>
                </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tableRows && tableRows.length > 0 ? (
                      tableRows.map((row) => (
                        <tr key={row.aspect} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-semibold text-slate-900 bg-slate-50/50">{row.aspect}</td>
                          <td className="px-6 py-4 text-slate-700 leading-relaxed">{row.frameworkA}</td>
                          <td className="px-6 py-4 text-slate-700 leading-relaxed">{row.frameworkB}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-slate-500 italic">
                          Detailed comparison points are currently being updated.
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
            </div>
          </div>

            {/* Decision Guide */}
            <div className="bg-slate-900 rounded-lg p-8 sm:p-12 text-white relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold">Which one should you choose?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-brand-400 font-bold uppercase tracking-wider text-sm">Strategic Guidance</h3>
                    <ul className="space-y-4">
                      {decisions.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="text-slate-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                    <h3 className="text-white font-bold">Speed to Compliance</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The fastest way to compliance is often through automated evidence collection. 
                      Depending on your tech stack, one framework may be significantly easier to automate than the other.
                    </p>
                    <Link 
                      href="/soc-2-readiness-index" 
                      className="inline-flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors"
                    >
                      Check your readiness index →
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl" />
            </div>


            <FAQSection 
              faqs={effectiveFaqs}
            />

            {/* Related Resources */}
          <div className="border-t border-slate-200 pt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900">Explore Compliance Hubs</h3>
                <p className="text-sm text-slate-500">Deep dives into individual frameworks</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/compliance/${frameworkA.slug}`} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700 transition-all">
                  {frameworkA.name} Hub
                </Link>
                <Link href={`/compliance/${frameworkB.slug}`} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:border-brand-200 hover:text-brand-700 transition-all">
                  {frameworkB.name} Hub
                </Link>
                <Link href="/pricing" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-sm">
                  View All Pricing
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-8">
            <p>Last verified: {lastUpdated}</p>
            <p>© {new Date().getFullYear()} RiscLens Intelligence Hub</p>
          </div>
        </div>
      </section>
    </main>
  );
}
