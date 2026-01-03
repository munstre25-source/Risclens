import Link from 'next/link';

export const metadata = {
  title: 'What SOC 2 Readiness Means | RiscLens',
  description:
    'Canonical definition of SOC 2 readiness, who it is for, what it is not, and how to interpret a readiness score.',
};

const definition =
  'SOC 2 readiness is a pre-audit assessment used to estimate how prepared a company is for a SOC 2 audit, including likely gaps, cost ranges, and preparation timelines. It is not a certification, an audit opinion, or compliance software.';

const whoFor = [
  'SaaS, fintech, and data-driven startups',
  'Teams selling to enterprise customers or under investor diligence',
  'Founders who need a SOC 2 reality check before engaging auditors',
];

const notList = [
  'Not a SOC 2 certification or badge',
  'Not a CPA audit or attestation',
  'Not a replacement for an auditor',
  'Not compliance automation software',
];

const bands = [
  '0–39: Early-stage — significant gaps; focus on fundamentals and evidence',
  '40–69: Near-ready — gaps remain; prioritize high-impact controls and consistency',
  '70–100: Strong — closer to audit-ready; validate scope and evidence quality',
];

export default function LearnSoc2ReadinessPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 mb-4">What SOC 2 Readiness Means</h1>
          <p className="text-slate-700 leading-relaxed">{definition}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Who this is for</h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2 leading-relaxed">
            {whoFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">What this is not</h2>
          <ul className="list-disc list-inside text-slate-700 space-y-2 leading-relaxed">
            {notList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">How to interpret a readiness score</h2>
          <p className="text-slate-700 leading-relaxed">
            There is no official “pass/fail” score for SOC 2. This score reflects typical audit readiness patterns based on your answers.
          </p>
          <ul className="list-disc list-inside text-slate-700 space-y-2 leading-relaxed mt-2">
            {bands.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-700 leading-relaxed mt-2">
            In practice, auditors care most about whether controls exist, are documented, and can be evidenced consistently.
          </p>
        </div>

        <div className="text-slate-700">
          <Link href="/soc-2-readiness-index" className="text-brand-700 underline underline-offset-2 hover:text-brand-800">
            Return to the SOC 2 Readiness Index
          </Link>
        </div>
      </section>
    </main>
  );
}
