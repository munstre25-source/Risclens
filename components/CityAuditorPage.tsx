import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

const AuditorMatchForm = dynamic(() => import('@/components/AuditorMatchForm'), { ssr: false });
const StickyCTA = dynamic(() => import('@/components/StickyCTA'), { ssr: false });

interface CityAuditorPageProps {
  cityName: string;
  citySlug: string;
  heroDescription: string;
  localInsights: string[];
  pricingNotes?: string[];
  industries?: string[];
  onsitePolicy?: string;
  remoteVsOnsiteText?: string;
  firmReputationText?: string;
  automationText?: string;
  faqs?: { question: string; answer: string }[];
  nearbyCities?: { name: string; href: string }[];
}

export default function CityAuditorPage({
  cityName,
  citySlug,
  heroDescription,
  localInsights,
  pricingNotes,
  industries,
  onsitePolicy,
  remoteVsOnsiteText,
  firmReputationText,
  automationText,
  faqs,
  nearbyCities,
}: CityAuditorPageProps) {
  const pageUrl = `https://risclens.com/auditor-directory/${citySlug}`;
  const pageTitle = `SOC 2 Auditors in ${cityName} | RiscLens Directory`;
  const lastUpdated = "January 10, 2026";

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        faqs={faqs}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Auditor Directory', item: 'https://risclens.com/auditor-directory' },
          { name: cityName, item: pageUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Auditor Directory', href: '/auditor-directory' }, { label: cityName }]} />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-col items-start mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold uppercase tracking-wider mb-4">
                  Local Auditor Directory
                </div>
                <VerifiedBy authorId="raphael" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                SOC 2 Auditors in <span className="text-brand-600">{cityName}</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {heroDescription}
              </p>
              
              <div className="space-y-4 mb-8">
                {localInsights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-slate-700">
                    <svg className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <Link href="/auditor-directory" className="px-4 py-2 rounded-full border border-slate-200 bg-white text-brand-700 hover:border-brand-200 font-bold shadow-sm transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Auditor Directory
                </Link>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-brand-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Find a {cityName} Auditor</h3>
              <p className="text-slate-600 text-sm mb-6">Enter your details to get matched with vetted SOC 2 firms serving the {cityName} area.</p>
              <AuditorMatchForm source={`city_page_${citySlug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            How to Choose a SOC 2 Auditor in {cityName}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-6">
              Finding a SOC 2 auditor in {cityName} requires balancing firm expertise, industry experience, and cost. While many audits can be performed remotely, local firms often understand the specific challenges faced by {cityName}-based startups and enterprises.
            </p>
            
            {pricingNotes && pricingNotes.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Local pricing snapshot</h3>
                <ul className="space-y-3 text-slate-700">
                  {pricingNotes.map((note) => (
                    <li key={note} className="flex gap-3 items-start">
                      <span className="text-brand-600 font-semibold">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {onsitePolicy && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">On-site vs. remote in {cityName}</h3>
                <p className="mb-6">{onsitePolicy}</p>
              </>
            )}

            {industries && industries.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">Industries most auditors serve here</h3>
                <div className="flex flex-wrap gap-3 mb-6">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="px-3 py-1 rounded-full border border-slate-200 bg-white text-sm text-slate-700"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </>
            )}

            <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">1. Remote vs. On-site</h3>
            <p className="mb-6">
              {remoteVsOnsiteText || `Modern SOC 2 audits are 95% remote. However, some ${cityName} firms still offer on-site walk-throughs which can be helpful for the "physical security" component of the audit if you maintain a physical office.`}
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">2. Firm Reputation</h3>
            <p className="mb-6">
              {firmReputationText || `Your SOC 2 report is a sales tool. In ${cityName}, where competition is high, having a report from a recognized CPA firm can significantly reduce friction with enterprise procurement teams.`}
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">3. Automation Compatibility</h3>
            <p className="mb-6">
              {automationText || `Ensure your ${cityName} auditor is comfortable working with modern compliance automation platforms. A "tech-forward" auditor can shave weeks off the audit timeline by accepting automated evidence exports.`}
            </p>
          </div>

          <div className="mt-16 bg-brand-600 rounded-2xl p-8 text-white text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Not sure who to pick?</h3>
            <p className="text-brand-100 mb-8 max-w-xl mx-auto">
              Our auditor matching tool uses data from over 500+ successful audits to match you with the firm best suited for your stack and budget.
            </p>
            <Link 
              href="/auditor-match"
              className="inline-flex items-center justify-center bg-white text-brand-600 font-bold px-8 py-4 rounded-lg hover:bg-brand-50 transition-all"
            >
              Get Matched Today
            </Link>
          </div>
        </div>
      </section>

      {nearbyCities && nearbyCities.length > 0 && (
        <section className="py-12 bg-slate-100 border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Nearby Audit Hubs</h4>
            <div className="flex flex-wrap gap-4">
              {nearbyCities.map((city, idx) => (
                <Link 
                  key={idx} 
                  href={city.href}
                  className="bg-white border border-slate-200 px-4 py-2 rounded-full text-slate-700 hover:border-brand-300 hover:text-brand-600 transition-all text-sm font-medium"
                >
                  Auditors in {city.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">FAQs about SOC 2 auditors in {cityName}</h3>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 space-y-2">
                  <p className="font-semibold text-slate-900">{faq.question}</p>
                  <p className="text-slate-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <StickyCTA 
        label={`Get Matched with ${cityName} Auditors`} 
        targetHref="/auditor-match" 
      />
    </main>
  );
}
