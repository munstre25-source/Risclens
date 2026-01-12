import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import ExpertReview from '@/components/ExpertReview';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { ContextualLinks } from '@/components/compliance/ContextualLinks';
import { EditorialPolicyBadge } from '@/components/compliance/AuthorByline';
import Link from 'next/link';
import { ShieldCheck, Zap, DollarSign, BarChart3, Clock, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';

interface MatrixPageProps {
  framework: { name: string; slug: string };
  role?: { name: string; slug: string };
  industry?: { name: string; slug: string };
  decision?: { name: string; slug: string };
  content: {
    heroTitle?: string;
    heroDescription: string;
    keyPriorities: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
    metaTitle?: string;
    metaDescription?: string;
  };
}

export default function MatrixPage({
  framework,
  role,
  industry,
  decision,
  content,
}: MatrixPageProps) {
  const lastUpdated = "January 11, 2026";
  
  // Construct canonical URL and Title based on active dimensions
  const dimensions = [framework.slug];
  if (decision) dimensions.push(decision.slug);
  if (role) dimensions.push(`for/${role.slug}`);
  if (industry) dimensions.push(industry.slug);
  
  const pageUrl = `https://risclens.com/${dimensions.join('/')}`;
  
  let pageTitle = content.heroTitle;
  if (!pageTitle) {
    if (role && industry) {
      pageTitle = `${framework.name} Compliance for ${industry.name} ${role.name}s`;
    } else if (decision && industry) {
      pageTitle = `${framework.name} ${decision.name} for ${industry.name} Startups`;
    } else {
      pageTitle = `${framework.name} Guide`;
    }
  }

      const breadcrumbs: BreadcrumbItem[] = [
        { label: 'Home', href: '/' },
        { label: 'Compliance', href: '/compliance' },
        { label: framework.name, href: `/compliance/${framework.slug}` },
      ];
  
    if (decision) breadcrumbs.push({ label: decision.name, href: `/compliance/${framework.slug}/${decision.slug}` });
    if (role) breadcrumbs.push({ label: `For ${role.name}s` }); // Label only as there is no role-only page
      if (industry) breadcrumbs.push({ label: industry.name, href: `/${framework.slug}/${role ? `for/${role.slug}` : decision?.slug}/${industry.slug}` });


  return (
    <main className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      <GeneralPageSchema
        title={pageTitle}
        description={content.heroDescription}
        url={pageUrl}
        faqs={content.faqs}
        breadcrumbs={breadcrumbs.map((b, i) => ({ 
          name: b.label, 
          item: b.href ? `https://risclens.com${b.href}` : pageUrl 
        }))}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 lg:py-16 text-center">
          <div className="flex flex-col items-center mb-6">
            <Breadcrumb items={breadcrumbs} />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-semibold mb-4 uppercase tracking-wider mt-4">
              {decision ? 'Decision Support' : 'Role-Specific Strategy'}
            </div>
            <VerifiedBy authorId="raphael" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            {pageTitle}
          </h1>
          
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-8 leading-relaxed">
            {content.heroDescription}
          </p>
          
          <div className="flex flex-col items-center gap-4 mb-8">
            <Link
              href="/soc-2-cost-calculator"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Get Your {framework.name} Cost Quote
              <Zap className="w-5 h-5" />
            </Link>
            <p className="text-sm text-slate-500">
              Tailored for {industry?.name || 'your industry'} and {role?.name || 'your role'}.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ExpertReview authorId="raphael" date={lastUpdated} />
          
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 mt-8">
            Strategic Priorities for {industry?.name} {role?.name || 'Leaders'}
          </h2>
          
          <div className="grid gap-6 mb-16">
            {content.keyPriorities.map((priority, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-brand-200 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{priority.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{priority.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AuthorBio authorId="raphael" />
          <EditorialPolicyBadge variant="footer" />
          
          {/* Internal Linking Matrix - Lateral Moves */}
          <div className="mt-20 border-t border-slate-100 pt-16">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl font-bold text-slate-900">Contextual Compliance Matrix</h2>
            </div>

            <div className="space-y-12">
              {/* Vertical Move: Same context, different standard */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Compare Standards</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'ISO 27001', slug: 'iso-27001' },
                    { name: 'HIPAA', slug: 'hipaa' }
                  ].filter(f => f.slug !== framework.slug).map((f) => (
                    <Link
                      key={f.slug}
                      href={`/${f.slug}/${role ? `for/${role.slug}` : decision?.slug}${industry ? `/${industry.slug}` : ''}`}
                      className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-500 hover:shadow-md transition-all group"
                    >
                      <div className="text-[10px] font-bold text-brand-600 mb-1 uppercase tracking-tight">Switch Framework</div>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        {f.name} Strategy {role ? `for ${role.name}s` : ''}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Horizontal Move: Same standard, different role */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Cross-Functional Perspectives</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'CTO', slug: 'cto' },
                    { name: 'Founder', slug: 'founders' },
                    { name: 'DevOps', slug: 'devops' }
                  ].filter(r => r.slug !== role?.slug).map((r) => (
                    <Link
                      key={r.slug}
                      href={`/${framework.slug}/for/${r.slug}${industry ? `/${industry.slug}` : ''}`}
                      className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-500 hover:shadow-md transition-all group"
                    >
                      <div className="text-[10px] font-bold text-brand-600 mb-1 uppercase tracking-tight">Switch Role</div>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        {framework.name} for {r.name}s
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Deep Dive: Same standard, different decision */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Specific Decision Guides</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Cost', slug: 'cost' },
                    { name: 'Timeline', slug: 'timeline' },
                    { name: 'Auditor Selection', slug: 'auditor-selection' }
                  ].filter(d => d.slug !== decision?.slug).map((d) => (
                    <Link
                      key={d.slug}
                      href={`/${framework.slug}/${d.slug}${industry ? `/${industry.slug}` : ''}`}
                      className="p-5 bg-white border border-slate-200 rounded-xl hover:border-brand-500 hover:shadow-md transition-all group"
                    >
                      <div className="text-[10px] font-bold text-brand-600 mb-1 uppercase tracking-tight">Switch Topic</div>
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        {framework.name} {d.name} breakdown
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />
              <h3 className="text-xl font-bold mb-4 relative z-10">Need a Master Intelligence View?</h3>
              <p className="text-slate-400 mb-8 relative z-10">Access the full matrix of companies, vendors, and standards in our Hub.</p>
              <Link 
                href="/compliance"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-3 rounded-lg transition-all"
              >
                Back to Frameworks Hub
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {content.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex gap-3">
                  <span className="text-brand-600">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-7 border-l-2 border-slate-100 ml-3">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />
      <StickyCTA 
        label={`Get ${framework.name} Support`} 
        targetHref="/soc-2-readiness-checklist" 
      />
    </main>
  );
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
