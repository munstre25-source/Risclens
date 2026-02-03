import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { 
  getMigrationBySlug, 
  getMigrationSlugs, 
  getRelatedMigrations,
  getFrameworkDisplayName,
  getDifficultyColor,
  getDifficultyLabel,
  getSeverityColor,
  FrameworkMigration 
} from '@/lib/migrations';
import { FAQSection } from '@/components/FAQSection';
import { generateMigrationFAQs, generateEnhancedFAQSchema } from '@/lib/seo-enhancements';
import { 
  ArrowRightLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  BookOpen,
  Users,
  Building2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getMigrationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const migration = await getMigrationBySlug(slug);
  
  if (!migration) {
    return { title: 'Migration Guide Not Found | RiscLens' };
  }

  const fromName = getFrameworkDisplayName(migration.from_framework_slug);
  const toName = getFrameworkDisplayName(migration.to_framework_slug);
  
  return {
    title: migration.seo_title || `${fromName} to ${toName} Migration Guide | ${migration.overlap_percentage}% Control Overlap | RiscLens`,
    description: migration.seo_description || migration.hero_description,
    alternates: {
      canonical: `https://risclens.com/compliance/migrate/${slug}`,
    },
    openGraph: {
      title: `${fromName} to ${toName} Migration Guide`,
      description: migration.hero_description,
      url: `https://risclens.com/compliance/migrate/${slug}`,
      type: 'article',
    },
  };
}

export default async function MigrationPage({ params }: PageProps) {
  const { slug } = await params;
  const migration = await getMigrationBySlug(slug);

  if (!migration) {
    notFound();
  }

  const fromName = getFrameworkDisplayName(migration.from_framework_slug);
  const toName = getFrameworkDisplayName(migration.to_framework_slug);
  const relatedMigrations = await getRelatedMigrations(slug, migration.from_framework_slug, migration.to_framework_slug);

  const pageUrl = `https://risclens.com/compliance/migrate/${slug}`;
  const pageTitle = `${fromName} to ${toName} Migration Guide`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://risclens.com' },
      { '@type': 'ListItem', position: 2, name: 'Compliance', item: 'https://risclens.com/compliance' },
      { '@type': 'ListItem', position: 3, name: 'Migration Hub', item: 'https://risclens.com/compliance/migrate' },
      { '@type': 'ListItem', position: 4, name: `${fromName} to ${toName}`, item: pageUrl },
    ],
  };

  const migrationFaqs = migration.faq && migration.faq.length > 0 ? migration.faq : generateMigrationFAQs(fromName, toName);
  const faqSchema = generateEnhancedFAQSchema(migrationFaqs);

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <GeneralPageSchema
        title={pageTitle}
        description={migration.hero_description}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Compliance', item: 'https://risclens.com/compliance' },
          { name: 'Migration Hub', item: 'https://risclens.com/compliance/migrate' },
          { name: `${fromName} to ${toName}`, item: pageUrl },
        ]}
      />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-brand-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/compliance" className="hover:text-brand-600">Compliance</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/compliance/migrate" className="hover:text-brand-600">Migrate</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium">{fromName} to {toName}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold mb-4">
              <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getDifficultyColor(migration.difficulty_level)}`}>
                {getDifficultyLabel(migration.difficulty_level)}
              </span>
              Framework Migration Guide
            </div>
            <VerifiedBy authorId="kevin" />
          </div>
          
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8">
            <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <span className="text-lg sm:text-2xl font-black text-slate-900">{fromName}</span>
            </div>
            <ArrowRightLeft className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600 animate-pulse" />
            <div className="bg-brand-50 border-2 border-brand-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <span className="text-lg sm:text-2xl font-black text-brand-700">{toName}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight text-center">
            Migrating from {fromName} to {toName}
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 text-center">
            {migration.hero_description}
          </p>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            <div className="bg-slate-900 rounded-xl p-4 text-center text-white">
              <div className="text-3xl sm:text-4xl font-black">{migration.overlap_percentage}%</div>
              <div className="text-xs sm:text-sm opacity-80 font-medium">Control Overlap</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-4 text-center text-white">
              <div className="text-3xl sm:text-4xl font-black">{migration.time_to_compliance_weeks}</div>
              <div className="text-xs sm:text-sm opacity-80 font-medium">Weeks to Compliance</div>
            </div>
            {migration.cost_savings_percentage && (
              <div className="bg-green-600 rounded-xl p-4 text-center text-white">
                <div className="text-3xl sm:text-4xl font-black">{migration.cost_savings_percentage}%</div>
                <div className="text-xs sm:text-sm opacity-80 font-medium">Cost Savings</div>
              </div>
            )}
            <div className="bg-slate-600 rounded-xl p-4 text-center text-white">
              <div className="text-3xl sm:text-4xl font-black">{migration.migration_steps?.length || 0}</div>
              <div className="text-xs sm:text-sm opacity-80 font-medium">Migration Steps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* Key Gaps */}
              {migration.key_gaps && migration.key_gaps.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    Critical Compliance Gaps
                  </h2>
                  <div className="space-y-4">
                    {migration.key_gaps.map((gap, idx) => (
                      <div 
                        key={idx} 
                        className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-l-4 ${getSeverityColor(gap.severity)}`}
                      >
                        <h3 className="font-bold text-slate-900 mb-2">{gap.area}</h3>
                        <p className="text-slate-600 text-sm">{gap.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Migration Steps */}
              {migration.migration_steps && migration.migration_steps.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-brand-600" />
                    Step-by-Step Migration Roadmap
                  </h2>
                  <p className="text-slate-400 mb-10">
                    Follow these {migration.migration_steps.length} steps to achieve {toName} compliance. 
                    Estimated timeline: {migration.time_to_compliance_weeks} weeks.
                  </p>
                  
                  <div className="space-y-4">
                    {migration.migration_steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-sm group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          {idx + 1}
                        </div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex-grow shadow-sm group-hover:border-brand-200 transition-colors">
                          <p className="text-slate-700 font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Unique Requirements */}
              {migration.unique_requirements && migration.unique_requirements.length > 0 && (
                <div className="bg-slate-900 rounded-xl p-8 text-white">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-brand-400" />
                    Unique {toName} Requirements
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {migration.unique_requirements.map((req, idx) => (
                      <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Use Cases */}
              {migration.use_cases && migration.use_cases.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Strategic Use Cases</h2>
                  <div className="flex flex-wrap gap-3">
                    {migration.use_cases.map((useCase, idx) => (
                      <span 
                        key={idx} 
                        className="bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources */}
              {migration.sources && migration.sources.length > 0 && (
                <div className="pt-8 border-t border-slate-200">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Verification Sources</h2>
                  <div className="flex flex-wrap gap-4">
                    {migration.sources.map((source, idx) => (
                      <a 
                        key={idx}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-brand-600"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {source.name}
                        <span className="text-xs bg-slate-200 px-2 py-0.5 rounded">{source.type}</span>
                      </a>
                    ))}
                  </div>
                  {migration.last_verified && (
                    <p className="mt-4 text-xs text-slate-500">
                      Last verified: {new Date(migration.last_verified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-8">
              {/* Related Migrations */}
              {relatedMigrations.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-8">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ArrowRightLeft className="w-5 h-5 text-brand-600" />
                    Related Migrations
                  </h3>
                  <div className="space-y-3">
                    {relatedMigrations.map((rel) => (
                      <Link 
                        key={rel.slug}
                        href={`/compliance/migrate/${rel.slug}`}
                        className="block p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
                      >
                        <div className="text-sm font-bold text-slate-900">
                          {getFrameworkDisplayName(rel.from_framework_slug)} to {getFrameworkDisplayName(rel.to_framework_slug)}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {rel.overlap_percentage}% overlap
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quick Contact */}
              <div className="bg-brand-50 border border-brand-100 rounded-xl p-6">
                <h3 className="font-bold text-brand-900 mb-2">Need migration help?</h3>
                <p className="text-sm text-brand-700 mb-4">
                  Talk to our compliance experts to map your controls efficiently.
                </p>
                <Link 
                  href="/auditor-match"
                  className="block w-full text-center bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-all text-sm"
                >
                  Consult an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Continue Your Compliance Journey</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Framework Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2" className="text-slate-600 hover:text-brand-600">SOC 2 Complete Guide</Link></li>
                <li><Link href="/iso-27001" className="text-slate-600 hover:text-brand-600">ISO 27001 Guide</Link></li>
                <li><Link href="/compliance/hipaa" className="text-slate-600 hover:text-brand-600">HIPAA Overview</Link></li>
                <li><Link href="/compliance/gdpr" className="text-slate-600 hover:text-brand-600">GDPR Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Cost & Planning</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2-cost-calculator" className="text-slate-600 hover:text-brand-600">SOC 2 Cost Calculator</Link></li>
                <li><Link href="/soc-2-cost" className="text-slate-600 hover:text-brand-600">SOC 2 Cost Breakdown</Link></li>
                <li><Link href="/soc-2-timeline" className="text-slate-600 hover:text-brand-600">SOC 2 Timeline</Link></li>
                <li><Link href="/compliance-roi-calculator" className="text-slate-600 hover:text-brand-600">ROI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Comparisons</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2-vs-iso-27001" className="text-slate-600 hover:text-brand-600">SOC 2 vs ISO 27001</Link></li>
                <li><Link href="/compare/market-intelligence" className="text-slate-600 hover:text-brand-600">Tool Comparisons</Link></li>
                <li><Link href="/compare/vanta-alternatives" className="text-slate-600 hover:text-brand-600">Vanta Alternatives</Link></li>
                <li><Link href="/compare/drata-alternatives" className="text-slate-600 hover:text-brand-600">Drata Alternatives</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Get Help</h3>
              <ul className="space-y-2">
                <li><Link href="/auditor-match" className="text-slate-600 hover:text-brand-600">Find an Auditor</Link></li>
                <li><Link href="/auditor-directory" className="text-slate-600 hover:text-brand-600">Auditor Directory</Link></li>
                <li><Link href="/soc-2-readiness" className="text-slate-600 hover:text-brand-600">Readiness Assessment</Link></li>
                <li><Link href="/evidence-gap-analyzer" className="text-slate-600 hover:text-brand-600">Evidence Gap Analyzer</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Expand Your Compliance?</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            Our experts can help you map your existing {fromName} controls to {toName} requirements 
            and accelerate your migration timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auditor-match"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
            >
              Speak to an Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/soc-2-cost-calculator"
              className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-700 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FAQSection title={`${fromName} to ${toName} Migration FAQs`} faqs={migrationFaqs} />
        </div>
      </section>
      <AboutSection />
      <Footer />
      
      <StickyCTA 
        label={`Expand to ${toName}`} 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
