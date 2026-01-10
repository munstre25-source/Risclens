import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { CopyButton } from '@/components/CopyButton';
import { salesGuides, salesGuideBySlug, Soc2GuidePage } from '@/lib/soc2Guides';
import { Check, AlertTriangle } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

function buildFaqs(topic: string) {
  return [
    {
      question: `How does ${topic} help accelerate sales?`,
      answer: `${topic} removes friction during security reviews by proactively addressing common enterprise concerns, allowing your sales team to focus on value rather than compliance overhead.`,
    },
    {
      question: `When should we start implementing ${topic}?`,
      answer: `Ideally, you should plan for this as soon as your SOC 2 audit concludes (or even during the audit) so you are ready to leverage the report immediately for upcoming deals.`,
    },
    {
      question: `What are the common pitfalls in ${topic}?`,
      answer: `The biggest pitfall is being reactive. Waiting for a customer to ask for a bridge letter or a trust center access often adds days or weeks to a deal cycle.`,
    },
    {
      question: `How do auditors view ${topic}?`,
      answer: `While auditors focus on the audit itself, they expect you to have processes for vendor management and incident response that tie back to how you maintain trust with customers.`,
    },
    {
      question: `Can we automate part of ${topic}?`,
      answer: `Yes, trust centers and security portals can automate NDA workflows and report distribution, significantly reducing manual work for your security and sales teams.`,
    },
    {
      question: `Is ${topic} required for SOC 2?`,
      answer: `Not all aspects of sales enablement are "required" for the audit itself, but they are essential for realizing the ROI of your SOC 2 investment.`,
    },
  ];
}

function getRelatedPages(slug: string): Soc2GuidePage[] {
  const filtered = salesGuides.filter((page) => page.slug !== slug);
  return filtered.slice(0, 4);
}

export async function generateStaticParams() {
  return salesGuides.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = salesGuideBySlug[params.slug];
  if (!page) return {};

  const url = `https://risclens.com${page.parent}/${page.slug}`;
  return {
    title: `${page.title} | SOC 2 Sales Guide | RiscLens`,
    description: page.summary,
    alternates: { canonical: `${page.parent}/${page.slug}` },
    openGraph: {
      title: `${page.title} | SOC 2 Sales Guide | RiscLens`,
      description: page.summary,
      url,
      type: 'article',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'RiscLens SOC 2' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.title} | SOC 2 Sales Guide | RiscLens`,
      description: page.summary,
      images: ['/og.png'],
    },
  };
}

export default function Soc2SalesDetailPage({ params }: PageProps) {
  const page = salesGuideBySlug[params.slug];
  if (!page) {
    notFound();
  }

  const faqs = buildFaqs(page.title);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const related = getRelatedPages(page.slug);

  return (
    <>
      <Script id={`faq-${page.slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen flex flex-col bg-slate-100">
        <Header />
        <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-3">Sales & Operations</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight">{page.title}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">{page.summary}</p>
            <div className="flex justify-center">
              <AssessmentCTA />
            </div>
          </div>
        </section>

        <section className="bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <h2 className="text-xl font-bold text-slate-900">Key Considerations</h2>
              <p>{page.summary}</p>
              <ul className="space-y-3">
                {page.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span className="text-brand-600 flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <h2 className="text-xl font-semibold text-slate-900">Action Plan for Founders</h2>
              <ol className="list-decimal list-inside text-sm text-slate-700 space-y-3">
                <li>Create a dedicated "Security & Trust" page on your website to host basic compliance info.</li>
                <li>Train your sales team on how to answer the top 5 security questions using your SOC 2 report.</li>
                <li>Set up a process for sharing your full report under NDA using a secure portal.</li>
                <li>Track when your report expires and set a reminder to request a bridge letter or start a new audit.</li>
              </ol>
            </div>

            {params.slug === 'security-questionnaires' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Top 5 Security FAQ for Sales Teams</h2>
                <div className="space-y-4">
                  {[
                    { q: "Where is our data stored?", a: "We use AWS (US-East-1) with full encryption at rest (AES-256) and in transit (TLS 1.2+). Our SOC 2 report covers these infrastructure controls." },
                    { q: "How do you handle backups?", a: "Daily automated backups with point-in-time recovery. We test restoration procedures quarterly as part of our SOC 2 compliance." },
                    { q: "Who has access to production data?", a: "Access is restricted to essential engineering personnel only, gated by MFA and SSO, and reviewed quarterly." },
                    { q: "What is your incident response time?", a: "We maintain a 24/7 on-call rotation with a documented IR plan. Critical incidents are acknowledged within 1 hour." },
                    { q: "Is our data encrypted?", a: "Yes, 100% of customer data is encrypted at rest and in transit. Keys are managed via AWS KMS with strict rotation policies." }
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-sm font-bold text-slate-900">Q: {item.q}</p>
                      <p className="text-sm text-slate-700 mt-1">A: {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {params.slug === 'multi-framework-mapping' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 overflow-hidden">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Framework Overlap Table</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-900">
                      <tr>
                        <th className="p-3 border-b">Control Category</th>
                        <th className="p-3 border-b text-center">SOC 2</th>
                        <th className="p-3 border-b text-center">ISO 27001</th>
                        <th className="p-3 border-b text-center">HIPAA</th>
                      </tr>
                    </thead>
                      <tbody className="text-slate-700">
                        <tr><td className="p-3 border-b">Access Control</td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td></tr>
                        <tr><td className="p-3 border-b">Encryption</td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td></tr>
                        <tr><td className="p-3 border-b">Risk Assessment</td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><AlertTriangle className="w-4 h-4 text-amber-600 mx-auto" /></td></tr>
                        <tr><td className="p-3 border-b">Incident Response</td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td></tr>
                        <tr><td className="p-3 border-b">Physical Security</td><td className="p-3 border-b text-center"><AlertTriangle className="w-4 h-4 text-amber-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td><td className="p-3 border-b text-center"><Check className="w-4 h-4 text-green-600 mx-auto" /></td></tr>
                      </tbody>

                  </table>
                </div>
                <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Indicates partial overlap or specific additional requirements.
                </p>
              </div>
            )}

            {params.slug === 'bridge-letters' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Bridge Letter Template</h2>
                <div className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-xs overflow-x-auto whitespace-pre">
{`To Whom It May Concern,

This letter confirms that [Company Name] has maintained 
the security controls described in our SOC 2 Type II report 
(dated [Report Date]) from [Period End] to [Current Date].

During this "gap period," there have been no material 
changes to our control environment. We remain committed 
to the Trust Services Criteria...

Signed,
[CTO/CISO Name]`}
                </div>
                <CopyButton text={`To Whom It May Concern,\n\nThis letter confirms that [Company Name] has maintained \nthe security controls described in our SOC 2 Type II report \n(dated [Report Date]) from [Period End] to [Current Date].\n\nDuring this "gap period," there have been no material \nchanges to our control environment. We remain committed \nto the Trust Services Criteria...\n\nSigned,\n[CTO/CISO Name]`} />
              </div>
            )}

            {params.slug === 'subservice-organizations' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Shared Responsibility Breakdown</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="font-bold text-blue-900 text-sm mb-2">AWS Responsible For:</p>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Data Center Security</li>
                        <li>• Hardware Maintenance</li>
                        <li>• Network Backbone</li>
                        <li>• Hypervisor Isolation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                      <p className="font-bold text-emerald-900 text-sm mb-2">You Responsible For:</p>
                      <ul className="text-xs text-emerald-800 space-y-1">
                        <li>• Guest OS Patching</li>
                        <li>• IAM / User Access</li>
                        <li>• App-level Encryption</li>
                        <li>• Database Backups</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {params.slug === 'qualified-opinions' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">The "Management Response" Framework</h2>
                <p className="text-sm text-slate-600 mb-4">If you have an exception, use this 3-part formula to neutralize it for buyers:</p>
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-brand-500 bg-slate-50">
                    <p className="text-sm font-bold">1. Acknowledge & Scope</p>
                    <p className="text-xs text-slate-600">"One employee (out of 50 sampled) did not have a background check on file..."</p>
                  </div>
                  <div className="p-3 border-l-4 border-brand-500 bg-slate-50">
                    <p className="text-sm font-bold">2. Immediate Remediation</p>
                    <p className="text-xs text-slate-600">"The check was initiated immediately upon discovery and came back clear on [Date]."</p>
                  </div>
                  <div className="p-3 border-l-4 border-brand-500 bg-slate-50">
                    <p className="text-sm font-bold">3. Systemic Fix</p>
                    <p className="text-xs text-slate-600">"We have since automated this check within our HRIS to prevent future omissions."</p>
                  </div>
                </div>
              </div>
            )}

            {params.slug === 'trust-centers' && (
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Trust Center Checklist</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Click-wrap NDA for reports",
                    "Real-time Subprocessor list",
                    "Vulnerability Disclosure Policy",
                    "System Status (Uptime) link",
                    "Compliance Badges (SOC2, etc)",
                    "Data Privacy Policy (GDPR/CCPA)",
                    "Downloadable Security FAQ",
                    "Security Team contact info"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-5">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <p className="font-bold text-slate-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-6 bg-white">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">Continue Reading</h3>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={page.parent} className="px-4 py-2 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200 hover:bg-slate-50 transition-colors">
                  Back to Sales Hub
                </Link>
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`${rel.parent}/${rel.slug}`}
                    className="px-4 py-2 rounded-full border border-slate-200 text-brand-700 hover:border-brand-200 hover:bg-slate-50 transition-colors"
                  >
                    {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
