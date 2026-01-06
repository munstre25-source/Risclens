import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'SOC 2 & Cybersecurity Glossary | Compliance Terms Explained',
  description: 'A comprehensive glossary of SOC 2, ISO 27001, and cybersecurity compliance terms for startups and security leaders.',
};

const glossaryTerms = [
  {
    term: 'AICPA',
    definition: 'The American Institute of Certified Public Accountants, the organization that developed and maintains the SOC 2 framework.',
  },
  {
    term: 'Bridge Letter',
    definition: 'A document issued by a service organization that covers the gap between the end of the SOC 2 report period and the current date.',
  },
  {
    term: 'Common Criteria',
    definition: 'The set of control requirements in SOC 2 that apply to all five Trust Service Criteria, covering security, availability, and more.',
  },
  {
    term: 'Gap Analysis',
    definition: 'An assessment performed to identify the differences between a company\'s current security controls and the requirements of a compliance framework.',
  },
  {
    term: 'ISO 27001',
    definition: 'An international standard for information security management systems (ISMS), often compared to SOC 2.',
  },
  {
    term: 'Least Privilege',
    definition: 'The security principle that users should only have the minimum level of access necessary to perform their job functions.',
  },
  {
    term: 'Penetration Test',
    definition: 'A simulated cyberattack against your computer system to check for exploitable vulnerabilities, often required for SOC 2 Type II.',
  },
  {
    term: 'SOC 2 Type I',
    definition: 'A report on the description of a service organization\'s system and the suitability of the design of its controls as of a specific date.',
  },
  {
    term: 'SOC 2 Type II',
    definition: 'A report that covers the design and operating effectiveness of controls over a period of time, usually 6 to 12 months.',
  },
  {
    term: 'Trust Service Criteria (TSC)',
    definition: 'The five categories of controls used in SOC 2: Security, Availability, Processing Integrity, Confidentiality, and Privacy.',
  },
];

export default function GlossaryPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-grow">
        {/* Hero */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">
              Compliance Glossary
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-center leading-relaxed">
              Demystifying the technical jargon of SOC 2, ISO 27001, and information security compliance.
            </p>
          </div>
        </section>

          {/* Content */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="mb-8 flex justify-end">
                <VerifiedBy authorId="sarah" />
              </div>

              <div className="grid gap-8">
                {glossaryTerms.map((item, index) => (
                  <div key={index} className="border-b border-slate-100 pb-8 last:border-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.term}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
              
              <AuthorBio authorId="sarah" />

                <div className="mt-16 grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-brand-50 rounded-2xl border border-brand-100 text-center flex flex-col">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Assess Your Readiness
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto flex-1">
                      Our free assessment tool uses these terms in action to give you a deterministic readiness score.
                    </p>
                    <Link 
                      href="/soc-2-readiness-calculator"
                      className="inline-block bg-brand-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200"
                    >
                      Start Free Assessment
                    </Link>
                  </div>

                  <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 text-center flex flex-col">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Request Auditor Quotes
                    </h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto flex-1">
                      Ready to hire? Generate a standardized RFP and get competitive quotes from vetted auditors.
                    </p>
                    <Link 
                      href="/auditor-match"
                      className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                    >
                      Generate RFP Now →
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
