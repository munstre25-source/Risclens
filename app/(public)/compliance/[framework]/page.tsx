import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AssessmentCTA from '@/components/AssessmentCTA';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getPSEOFrameworks, getPSEOIndustries } from '@/lib/pseo';

interface PageProps {
  params: {
    framework: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const frameworks = await getPSEOFrameworks();
  const framework = frameworks.find(f => f.slug === params.framework);
  if (!framework) return {};

  return {
    title: `${framework.name} Compliance Hub | RiscLens`,
    description: `Complete guides and resources for ${framework.name} compliance across various industries.`,
    alternates: { canonical: `https://risclens.com/compliance/${params.framework}` },
  };
}

export default async function FrameworkHubPage({ params }: PageProps) {
  const frameworks = await getPSEOFrameworks();
  const framework = frameworks.find(f => f.slug === params.framework);
  const industries = await getPSEOIndustries();

  if (!framework) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold">Framework not found</h1>
        <Link href="/compliance" className="text-brand-600 underline mt-4">Back to Compliance</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' }, 
              { label: 'Compliance', href: '/compliance' }, 
              { label: framework.name }
            ]} 
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {framework.name} Compliance Guides
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mb-10 leading-relaxed">
            Select your industry to get a tailored {framework.name} readiness plan, auditor fee benchmarks, and security control mapping.
          </p>
          <AssessmentCTA />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Industries</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link 
                key={industry.id}
                href={`/compliance/${framework.slug}/${framework.slug}-compliance-for-${industry.slug}`}
                className="group p-8 rounded-lg bg-white border border-slate-200 hover:border-brand-200 hover:shadow-sm transition-all"
              >
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-600 mb-3">
                  {framework.name} for {industry.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {industry.description || `Specialized ${framework.name} guide for the ${industry.name} sector.`}
                </p>
                <div className="text-brand-700 font-semibold text-sm flex items-center gap-2">
                  View Guide <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
