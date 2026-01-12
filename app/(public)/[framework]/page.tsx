import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthorBio } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { getSupabaseAdmin } from '@/lib/supabase';
import { 
  Bot, 
  Shield, 
  Target, 
  ArrowRight, 
  ChevronRight,
  Brain,
  CheckCircle,
  FileText,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';

interface Props {
  params: Promise<{ framework: string }>;
}

async function getFrameworkData(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data: framework } = await supabase
    .from('pseo_frameworks')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!framework) return null;

  const [industries, decisionTypes, roleGuides, comparisons] = await Promise.all([
    supabase.from('pseo_industries').select('*').limit(8),
    supabase.from('pseo_decision_types').select('*').limit(4),
    supabase.from('pseo_pages')
      .select('*')
      .eq('framework_id', framework.id)
      .not('slug', 'is', null)
      .limit(4),
    supabase.from('pseo_pages')
      .select('*')
      .eq('category', 'framework_comparison')
      .or(`slug.ilike.%${slug}%,slug.ilike.%iso-42001%,slug.ilike.%eu-ai-act%,slug.ilike.%nist-ai-rmf%`)
      .limit(4)
  ]);

  return {
    framework,
    industries: industries.data || [],
    decisionTypes: decisionTypes.data || [],
    roleGuides: roleGuides.data || [],
    comparisons: comparisons.data || []
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { framework: slug } = await params;
  const data = await getFrameworkData(slug);

  if (!data) return { title: 'Not Found' };

  return {
    title: `${data.framework.name} Hub | Programmatic Compliance & Risk Frameworks | RiscLens`,
    description: `The definitive hub for ${data.framework.name}. Explore compliance guides across every industry.`,
    alternates: {
      canonical: `https://risclens.com/${slug}`,
    },
  };
}

export default async function FrameworkHubPage({ params }: Props) {
  const { framework: slug } = await params;
  const data = await getFrameworkData(slug);

    if (!data) notFound();
  
    const { framework, industries, decisionTypes, roleGuides, comparisons } = data;
  
    const icons: Record<string, any> = {
    'compliance': Shield,
    'readiness': Activity,
    'checklist': FileText,
    'risk-assessment': Target,
    'roi-calculator': BarChart3,
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <GeneralPageSchema
        title={`${framework.name} Hub`}
        description={`Navigate the complex landscape of ${framework.name} with our programmatic compliance guides.`}
        url={`https://risclens.com/${framework.slug}`}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: `${framework.name} Hub`, item: `https://risclens.com/${framework.slug}` },
        ]}
      />
      
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">{framework.name} Hub</h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
              The intelligence layer for {framework.name}. Programmatic guides across every industry.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ai-governance-readiness-index" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all">
                <BarChart3 className="w-5 h-5" />
                Get Readiness Score
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Explore by Industry</h2>
                <div className="space-y-2">
                  {industries.map((industry) => (
                    <Link 
                      key={industry.slug} 
                      href={`/${framework.slug}/checklist/${industry.slug}`}
                      className="block p-3 rounded-lg border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all text-slate-700 hover:text-brand-700 font-medium"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-8">High-Intent {framework.name} Guides</h2>
                
                <div className="grid gap-8">
                  <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div className="px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border bg-brand-50 text-brand-700 border-brand-200">
                        {framework.name}
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {decisionTypes.map((decision) => {
                        const Icon = icons[decision.slug] || FileText;
                        return (
                          <Link 
                            key={decision.slug}
                            href={`/${framework.slug}/${decision.slug}/healthcare`}
                            className="group p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Icon className="w-5 h-5 text-slate-400 group-hover:text-brand-500" />
                              <h3 className="font-bold text-slate-900">{framework.name} {decision.name}</h3>
                            </div>
                            <p className="text-xs text-slate-500 mb-2 leading-tight italic">Programmatic compliance benchmarks and risk mitigation.</p>
                            <span className="text-brand-600 text-[10px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all">
                              Explore 50+ Industries →
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {roleGuides.length > 0 && (
                  <div className="mt-16">
                    <h2 className="text-3xl font-bold mb-8">Strategic Guides</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {roleGuides.map((page) => (
                        <Link 
                          key={page.id}
                          href={`/${framework.slug}/${page.slug}`}
                          className="group flex items-center gap-4 p-6 rounded-2xl border border-slate-100 hover:border-brand-500 hover:bg-brand-50 transition-all shadow-sm"
                        >
                          <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-white flex items-center justify-center transition-all">
                            <Brain className="w-6 h-6 text-slate-400 group-hover:text-brand-500" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 group-hover:text-brand-700">{page.title}</h3>
                            <p className="text-xs text-slate-500">Industry-specific governance roadmap.</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 ml-auto transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {comparisons.length > 0 && (
                    <div className="mt-12 pt-12 border-t border-slate-100">
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5 text-brand-500" />
                        Framework Comparisons
                      </h2>
                      <div className="grid gap-4">
                        {comparisons.map((comp) => (
                          <Link 
                            key={comp.slug}
                            href={`/compliance/compare/${comp.slug}`}
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-brand-300 hover:bg-slate-50 transition-all group"
                          >
                            <span className="font-bold text-slate-700 group-hover:text-brand-700">{comp.title}</span>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </section>

        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why {framework.name} Matters</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Enterprise buyers now require documented compliance before signing contracts.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Clear Enterprise Procurement', description: `Pass security assessments with standardized documentation and ${framework.name} certification.`, icon: CheckCircle },
                { title: 'Mitigate Risk', description: 'Systematically identify and reduce security vulnerabilities in your systems.', icon: Shield },
                { title: 'Regulatory Readiness', description: `Be ready for enforcement with risk classifications and governance workflows.`, icon: Zap },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                  <item.icon className="w-10 h-10 text-brand-500 mb-6" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
