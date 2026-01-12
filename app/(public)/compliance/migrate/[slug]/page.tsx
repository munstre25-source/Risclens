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

  const faqSchema = migration.faq && migration.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: migration.faq.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
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
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
              <span className="text-lg sm:text-2xl font-black text-slate-900">{fromName}</span>
            </div>
            <ArrowRightLeft className="w-6 h-6 sm:w-8 sm:h-8 text-brand-600 animate-pulse" />
            <div className="bg-brand-50 border-2 border-brand-200 rounded-2xl p-4 sm:p-6 shadow-md">
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
            <div className="bg-brand-600 rounded-xl p-4 text-center text-white">
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
              <div className="text-3xl sm:text-4xl font-black">{migration.migration_steps.length}</div>
              <div className="text-xs sm:text-sm opacity-80 font-medium">Migration Steps</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soc-2-cost-calculator"
              className="bg-brand-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-700 transition-all text-center"
            >
              Get Multi-Framework Quote
            </Link>
            <Link 
              href="/auditor-match"
              className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all text-center"
            >
              Find an Auditor
            </Link>
          </div>
        </div>
      </section>

      {/* Gap Analysis Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Gap Analysis: What {toName} Requires</h2>
          </div>
          <p className="text-slate-600 mb-8">
            These are the key areas where {fromName} compliance doesn't fully satisfy {toName} requirements. 
            Priority is indicated by severity level.
          </p>
          
          <div className="space-y-4">
            {migration.key_gaps.map((gap, idx) => (
              <div 
                key={idx} 
                className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm border-l-4 ${getSeverityColor(gap.severity)}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{gap.area}</h3>
                    <p className="text-slate-600">{gap.description}</p>
                  </div>
                  <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-bold uppercase ${
                    gap.severity === 'high' ? 'bg-red-100 text-red-700' :
                    gap.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                    gap.severity === 'low' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {gap.severity === 'none' ? 'No Gap' : `${gap.severity} priority`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Controls Section */}
      {migration.shared_controls && migration.shared_controls.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Reusable Controls ({migration.overlap_percentage}% Overlap)</h2>
            </div>
            <p className="text-slate-600 mb-8">
              These controls from your {fromName} program directly satisfy {toName} requirements. 
              You can reuse existing evidence and documentation.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {migration.shared_controls.map((control, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                  <span className="text-sm font-medium text-green-800">{control}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Migration Roadmap Section */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-brand-400" />
            <h2 className="text-2xl sm:text-3xl font-bold">Your {toName} Migration Roadmap</h2>
          </div>
          <p className="text-slate-400 mb-10">
            Follow these {migration.migration_steps.length} steps to achieve {toName} compliance. 
            Estimated timeline: {migration.time_to_compliance_weeks} weeks.
          </p>
          
          <div className="space-y-4">
            {migration.migration_steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-brand-500 flex items-center justify-center font-bold text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div className="flex-1 pt-2">
                  <p className="text-slate-300 group-hover:text-white transition-colors">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Requirements Section */}
      {migration.unique_requirements && migration.unique_requirements.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-brand-600" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{toName}-Specific Requirements</h2>
            </div>
            <p className="text-slate-600 mb-8">
              These requirements are unique to {toName} and don't exist in {fromName}. 
              You'll need to implement these from scratch.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {migration.unique_requirements.map((req, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-3 h-3 text-brand-600" />
                  </div>
                  <span className="text-slate-700">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {migration.use_cases && migration.use_cases.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-slate-700" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">When to Migrate: Common Use Cases</h2>
            </div>
            <p className="text-slate-600 mb-8">
              Companies typically pursue {toName} after {fromName} for these business reasons:
            </p>
            
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
        </section>
      )}

      {/* FAQ Section */}
      {migration.faq && migration.faq.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-slate-700" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4 mt-8">
              {migration.faq.map((faq, idx) => (
                <details key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden group">
                  <summary className="p-6 cursor-pointer font-bold text-slate-900 hover:bg-slate-50 transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Migrations */}
      {relatedMigrations.length > 0 && (
        <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Related Migration Paths</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedMigrations.map((related) => (
                <Link 
                  key={related.slug}
                  href={`/compliance/migrate/${related.slug}`}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-slate-900">{getFrameworkDisplayName(related.from_framework_slug)}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-brand-600">{getFrameworkDisplayName(related.to_framework_slug)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="font-bold text-brand-600">{related.overlap_percentage}% overlap</span>
                    <span>{related.time_to_compliance_weeks} weeks</span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/compliance/migrate"
                className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700"
              >
                View All Migration Paths
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Sources Section */}
      {migration.sources && migration.sources.length > 0 && (
        <section className="py-12 bg-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">Sources & References</h3>
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
        </section>
      )}

      {/* Internal Links Section */}
      <section className="py-16 lg:py-20">
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
      <section className="py-16 lg:py-20 bg-brand-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Expand Your Compliance?</h2>
          <p className="text-brand-100 mb-8 max-w-2xl mx-auto">
            Our experts can help you map your existing {fromName} controls to {toName} requirements 
            and accelerate your migration timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auditor-match"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-600 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all"
            >
              Speak to an Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/soc-2-cost-calculator"
              className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-800 transition-all"
            >
              Get a Quote
            </Link>
          </div>
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
