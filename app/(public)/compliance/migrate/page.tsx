import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { VerifiedBy } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { FAQSection } from '@/components/FAQSection';
import { getAllMigrations, getFrameworkDisplayName, getDifficultyColor, getDifficultyLabel } from '@/lib/migrations';
import { generateHubFAQs } from '@/lib/seo-enhancements';
import { 
  ArrowRight, 
  ArrowRightLeft, 
  ChevronRight,
  Clock,
  TrendingUp,
  Layers,
  Shield,
  Globe,
  Building2,
  CreditCard,
  Heart,
  Lock,
  Car
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compliance Migration Hub | Framework-to-Framework Guides | RiscLens',
  description: 'Expand your compliance portfolio efficiently. Expert guides for migrating between SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS, NIST CSF, and more. See control overlap percentages and migration roadmaps.',
  alternates: {
    canonical: 'https://risclens.com/compliance/migrate',
  },
  openGraph: {
    title: 'Compliance Migration Hub | RiscLens',
    description: 'Expert framework migration guides with control overlap analysis. SOC 2 to ISO 27001, HIPAA, GDPR, and more.',
    url: 'https://risclens.com/compliance/migrate',
  },
};

const FRAMEWORK_ICONS: Record<string, React.ReactNode> = {
  'soc-2': <Shield className="w-5 h-5" />,
  'soc-3': <Shield className="w-5 h-5" />,
  'iso-27001': <Globe className="w-5 h-5" />,
  'iso-42001': <Globe className="w-5 h-5" />,
  'hipaa': <Heart className="w-5 h-5" />,
  'gdpr': <Lock className="w-5 h-5" />,
  'pci-dss': <CreditCard className="w-5 h-5" />,
  'nist-csf': <Building2 className="w-5 h-5" />,
  'tisax': <Car className="w-5 h-5" />,
};

export default async function MigrationHubPage() {
  const allMigrations = await getAllMigrations();
  
  const migrationsBySource = allMigrations.reduce((acc, migration) => {
    const source = migration.from_framework_slug;
    if (!acc[source]) acc[source] = [];
    acc[source].push(migration);
    return acc;
  }, {} as Record<string, typeof allMigrations>);

  const popularMigrations = allMigrations
    .filter(m => ['soc2-to-iso27001', 'soc2-to-hipaa', 'soc2-to-gdpr', 'iso27001-to-soc2', 'soc2-to-pci-dss', 'soc2-to-nist-csf'].includes(m.slug))
    .sort((a, b) => b.overlap_percentage - a.overlap_percentage);

  const pageUrl = 'https://risclens.com/compliance/migrate';

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <GeneralPageSchema
        title="Compliance Migration Hub"
        description="Expert guides for migrating between compliance frameworks. Leverage control overlap to achieve dual certification efficiently."
        url={pageUrl}
        faqs={generateHubFAQs('Compliance Migration Hub', 'compliance framework migration')}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'Compliance', item: 'https://risclens.com/compliance' },
          { name: 'Migration Hub', item: pageUrl },
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
            <span className="text-slate-900 font-medium">Migration Hub</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 lg:py-20 text-center">
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-sm font-bold mb-4">
              <Layers className="w-4 h-4" />
              {allMigrations.length} Migration Paths Available
            </div>
            <VerifiedBy authorId="kevin" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Compliance Migration Hub
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
            Already compliant with one framework? Leverage your existing controls to achieve 
            additional certifications <span className="font-bold text-brand-600">40-90% faster</span>. 
            Our migration guides show you exactly what's reusable and what gaps to fill.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-slate-900">{allMigrations.length}</div>
              <div className="text-xs sm:text-sm text-slate-600">Migration Paths</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-brand-600">60-90%</div>
              <div className="text-xs sm:text-sm text-slate-600">Avg. Control Overlap</div>
            </div>
            <div className="bg-slate-100 rounded-xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-green-600">40-70%</div>
              <div className="text-xs sm:text-sm text-slate-600">Cost Savings</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/soc-2-cost-calculator"
              className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl shadow-sm hover:bg-slate-800 transition-all"
            >
              Get Multi-Framework Quote
            </Link>
            <Link 
              href="/auditor-match"
              className="bg-white border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-all"
            >
              Find an Auditor
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Migrations */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-brand-600" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Most Popular Migration Paths</h2>
          </div>
          <p className="text-slate-600 mb-8">High-value framework expansions with significant control overlap</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularMigrations.map((migration) => (
              <Link 
                key={migration.slug}
                href={`/compliance/migrate/${migration.slug}`}
                className="bg-white border border-slate-200 rounded-lg p-6 hover:border-brand-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                    {FRAMEWORK_ICONS[migration.from_framework_slug] || <Shield className="w-5 h-5" />}
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-brand-600 transition-colors" />
                  <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-brand-600">
                    {FRAMEWORK_ICONS[migration.to_framework_slug] || <Shield className="w-5 h-5" />}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {getFrameworkDisplayName(migration.from_framework_slug)} to {getFrameworkDisplayName(migration.to_framework_slug)}
                </h3>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                  {migration.hero_description.slice(0, 120)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-100 text-brand-700 px-2 py-1 rounded text-sm font-bold">
                      {migration.overlap_percentage}% overlap
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {migration.time_to_compliance_weeks}w
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded border ${getDifficultyColor(migration.difficulty_level)}`}>
                    {getDifficultyLabel(migration.difficulty_level)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Migrations by Source */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">All Migration Paths by Source Framework</h2>
          <p className="text-slate-600 mb-10">Select your current framework to see available expansion options</p>
          
          <div className="space-y-12">
            {Object.entries(migrationsBySource)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([source, migrations]) => (
              <div key={source}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                    {FRAMEWORK_ICONS[source] || <Shield className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      From {getFrameworkDisplayName(source)}
                    </h3>
                    <p className="text-sm text-slate-500">{migrations.length} expansion paths available</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {migrations
                    .sort((a, b) => b.overlap_percentage - a.overlap_percentage)
                    .map((migration) => (
                    <Link 
                      key={migration.slug}
                      href={`/compliance/migrate/${migration.slug}`}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-brand-300 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-brand-600">
                          {getFrameworkDisplayName(migration.to_framework_slug)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="font-bold text-slate-900">{migration.overlap_percentage}%</span>
                        <span className="text-slate-500">{migration.time_to_compliance_weeks} weeks</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Matrix */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Control Overlap Matrix</h2>
          <p className="text-slate-600 mb-8">Quick reference for framework compatibility</p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-3 text-left text-sm font-bold text-slate-700 border-b border-slate-200">From \ To</th>
                  {['soc-2', 'iso-27001', 'hipaa', 'gdpr', 'pci-dss', 'nist-csf'].map(fw => (
                    <th key={fw} className="p-3 text-center text-sm font-bold text-slate-700 border-b border-slate-200">
                      {getFrameworkDisplayName(fw)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['soc-2', 'iso-27001', 'hipaa', 'gdpr', 'pci-dss', 'nist-csf'].map(fromFw => (
                  <tr key={fromFw} className="border-b border-slate-100 last:border-0">
                    <td className="p-3 font-bold text-slate-900 bg-slate-50">{getFrameworkDisplayName(fromFw)}</td>
                    {['soc-2', 'iso-27001', 'hipaa', 'gdpr', 'pci-dss', 'nist-csf'].map(toFw => {
                      if (fromFw === toFw) {
                        return <td key={toFw} className="p-3 text-center bg-slate-100 text-slate-400">—</td>;
                      }
                      const migration = allMigrations.find(
                        m => m.from_framework_slug === fromFw && m.to_framework_slug === toFw
                      );
                      return (
                        <td key={toFw} className="p-3 text-center">
                          {migration ? (
                            <Link 
                              href={`/compliance/migrate/${migration.slug}`}
                              className={`inline-block px-2 py-1 rounded text-sm font-bold hover:opacity-80 transition-opacity ${
                                migration.overlap_percentage >= 75 ? 'bg-green-100 text-green-700' :
                                migration.overlap_percentage >= 60 ? 'bg-amber-100 text-amber-700' :
                                'bg-red-100 text-red-700'
                              }`}
                            >
                              {migration.overlap_percentage}%
                            </Link>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-100 rounded"></span>
              75%+ High Overlap
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 bg-amber-100 rounded"></span>
              60-74% Moderate
            </span>
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-100 rounded"></span>
              &lt;60% Lower Overlap
            </span>
          </div>
        </div>
      </section>

      {/* Why Multi-Framework */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Why Pursue Multiple Frameworks?</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <Globe className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Market Expansion</h3>
              <p className="text-slate-400">
                SOC 2 dominates US markets; ISO 27001 opens EMEA and APAC. HIPAA unlocks healthcare. 
                Each framework expands your addressable market.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <Building2 className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Enterprise Sales</h3>
              <p className="text-slate-400">
                Large enterprises often require multiple certifications. Having SOC 2 + ISO 27001 
                eliminates procurement friction and accelerates deal cycles.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <TrendingUp className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Cost Efficiency</h3>
              <p className="text-slate-400">
                With 60-90% control overlap, adding a second framework costs 40-70% less than 
                starting from scratch. Audit evidence is often reusable.
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <Shield className="w-8 h-8 text-brand-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Risk Reduction</h3>
              <p className="text-slate-400">
                Multiple frameworks create defense in depth. If one audit finds gaps, others 
                provide continuity. Customers see commitment to comprehensive security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Explore More Compliance Resources</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Framework Guides</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2" className="text-slate-600 hover:text-brand-600">SOC 2 Complete Guide</Link></li>
                <li><Link href="/iso-27001" className="text-slate-600 hover:text-brand-600">ISO 27001 Guide</Link></li>
                <li><Link href="/pci-dss" className="text-slate-600 hover:text-brand-600">PCI DSS Guide</Link></li>
                <li><Link href="/compliance/hipaa" className="text-slate-600 hover:text-brand-600">HIPAA Overview</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Comparisons</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2-vs-iso-27001" className="text-slate-600 hover:text-brand-600">SOC 2 vs ISO 27001</Link></li>
                <li><Link href="/compliance/compare" className="text-slate-600 hover:text-brand-600">Framework Comparison Hub</Link></li>
                <li><Link href="/compare/market-intelligence" className="text-slate-600 hover:text-brand-600">Tool Comparisons</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Cost & Planning</h3>
              <ul className="space-y-2">
                <li><Link href="/soc-2-cost-calculator" className="text-slate-600 hover:text-brand-600">SOC 2 Cost Calculator</Link></li>
                <li><Link href="/soc-2-cost" className="text-slate-600 hover:text-brand-600">SOC 2 Cost Breakdown</Link></li>
                <li><Link href="/soc-2-timeline" className="text-slate-600 hover:text-brand-600">Timeline Estimator</Link></li>
                <li><Link href="/compliance-roi-calculator" className="text-slate-600 hover:text-brand-600">ROI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Get Expert Help</h3>
              <ul className="space-y-2">
                <li><Link href="/auditor-match" className="text-slate-600 hover:text-brand-600">Find an Auditor</Link></li>
                <li><Link href="/auditor-directory" className="text-slate-600 hover:text-brand-600">Auditor Directory</Link></li>
                <li><Link href="/soc-2-readiness" className="text-slate-600 hover:text-brand-600">Readiness Assessment</Link></li>
                <li><Link href="/evidence-gap-analyzer" className="text-slate-600 hover:text-brand-600">Gap Analyzer</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Expand Your Compliance Portfolio?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Get a personalized quote for multi-framework compliance. Our experts will map your 
            existing controls and identify the fastest path to your next certification.
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
              className="inline-flex items-center justify-center gap-2 bg-brand-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-800 transition-all"
            >
              Get Multi-Framework Quote
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        title="Compliance Migration FAQs"
        faqs={generateHubFAQs('Compliance Migration Hub', 'compliance framework migration')}
      />
      <AboutSection />
      <Footer />
      
      <StickyCTA 
        label="Get Multi-Framework Quote" 
        targetHref="/soc-2-cost-calculator" 
      />
    </main>
  );
}
