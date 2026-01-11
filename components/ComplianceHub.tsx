import Link from 'next/link';
import { 
  Users, 
  MapPin, 
  DollarSign, 
  CheckSquare, 
  ArrowRightLeft, 
  Database, 
  Layers, 
  Scale,
  ChevronRight
} from 'lucide-react';
import { getSupabaseAdmin } from '@/lib/supabase';

async function getRoles() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'role')
    .order('slug');
  
  return data || [];
}

async function getPricing() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'pricing')
    .order('slug');
  
  return data || [];
}

async function getAlternatives() {
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from('pseo_pages')
    .select('slug, content_json')
    .eq('category', 'alternatives')
    .order('slug');
  
  return data || [];
}

export default async function ComplianceHub() {
  const dbRoles = await getRoles();
  const dbPricing = await getPricing();
  const dbAlternatives = await getAlternatives();
  
      const roleLinks = dbRoles
        .filter(role => role.content_json?.roleName || role.content_json?.title)
        .map(role => {
          const name = role.content_json.roleName || role.content_json.title;
          return {
            name: name.endsWith('s') ? name : `${name}s`,
            href: `/soc-2/for/${role.slug}`
          };
        })
        .slice(0, 4);

      const pricingLinks = dbPricing
        .filter(p => p.content_json?.toolName || p.content_json?.vendor || p.content_json?.title)
        .map(p => {
          const toolName = p.content_json.toolName || p.content_json.vendor;
          const name = p.content_json.title || `${toolName} Pricing`;
          return {
            name: name,
            href: `/pricing/${p.slug}`
          };
        })
        .slice(0, 4);

      const alternativeLinks = dbAlternatives
        .filter(alt => alt.content_json?.toolName || alt.content_json?.vendor || alt.content_json?.title)
        .map(alt => {
          const toolName = alt.content_json.toolName || alt.content_json.vendor;
          const name = alt.content_json.title || `${toolName} Alternatives`;
          return {
            name: name,
            href: `/compare/${alt.slug}`
          };
        })
        .slice(0, 4);

  const sections = [
    {
      title: 'SOC 2 for Roles',
      icon: <Users className="w-6 h-6 text-brand-600" />,
      links: roleLinks.length > 0 ? roleLinks : [
        { name: 'CTOs', href: '/soc-2/for/cto' },
        { name: 'CISOs', href: '/soc-2/for/ciso' },
        { name: 'Founders', href: '/soc-2/for/founders' },
        { name: 'DevOps', href: '/soc-2/for/devops' },
      ]
    },
    {
      title: 'Auditors by City',
      icon: <MapPin className="w-6 h-6 text-brand-600" />,
      links: [
        { name: 'New York City', href: '/auditor-directory/new-york' },
        { name: 'San Francisco', href: '/auditor-directory/san-francisco' },
        { name: 'Austin', href: '/auditor-directory/austin' },
        { name: 'Chicago', href: '/auditor-directory/chicago' },
      ]
    },
      {
        title: 'Tool Pricing 2026',
        icon: <DollarSign className="w-6 h-6 text-brand-600" />,
        links: pricingLinks.length > 0 ? pricingLinks : [
          { name: 'Vanta Pricing', href: '/pricing/vanta' },
          { name: 'Drata Pricing', href: '/pricing/drata' },
          { name: 'Secureframe Pricing', href: '/pricing/secureframe' },
          { name: 'Sprinto Pricing', href: '/pricing/sprinto' },
        ]
      },

    {
      title: 'Industry Checklists',
      icon: <CheckSquare className="w-6 h-6 text-brand-600" />,
      links: [
        { name: 'Fintech', href: '/soc-2-readiness-checklist/fintech' },
        { name: 'Healthcare', href: '/soc-2-readiness-checklist/healthcare' },
        { name: 'SaaS', href: '/soc-2-readiness-checklist/saas' },
        { name: 'AI/ML', href: '/soc-2-readiness-checklist/ai-ml' },
      ]
    },
    {
      title: 'Framework Migrations',
      icon: <ArrowRightLeft className="w-6 h-6 text-brand-600" />,
      links: [
        { name: 'SOC 2 to ISO 27001', href: '/compliance/migrate/soc2-to-iso27001' },
        { name: 'SOC 2 to HIPAA', href: '/compliance/migrate/soc2-to-hipaa' },
        { name: 'SOC 2 to GDPR', href: '/compliance/migrate/soc2-to-gdpr' },
      ]
    },
      {
        title: 'Evidence Vault',
        icon: <Database className="w-6 h-6 text-brand-600" />,
        links: [
          { name: 'Access Control', href: '/soc-2-evidence/access-control' },
          { name: 'Change Management', href: '/soc-2-evidence/change-management' },
          { name: 'Incident Response', href: '/soc-2-evidence/incident-response' },
          { name: 'Logging & Monitoring', href: '/soc-2-evidence/logging-monitoring' },
        ]
      },
    {
      title: 'Tech Stack Guides',
      icon: <Layers className="w-6 h-6 text-brand-600" />,
      links: [
        { name: 'AWS', href: '/soc-2/stack/aws' },
        { name: 'GCP', href: '/soc-2/stack/gcp' },
        { name: 'Azure', href: '/soc-2/stack/azure' },
        { name: 'Kubernetes', href: '/soc-2/stack/kubernetes' },
      ]
    },
    {
      title: 'Tool Alternatives',
      icon: <Scale className="w-6 h-6 text-brand-600" />,
      links: alternativeLinks.length > 0 ? alternativeLinks : [
        { name: 'Vanta Alternatives', href: '/compare/vanta-alternatives' },
        { name: 'Drata Alternatives', href: '/compare/drata-alternatives' },
        { name: 'Secureframe Alternatives', href: '/compare/secureframe-alternatives' },
        { name: 'Sprinto Alternatives', href: '/compare/sprinto-alternatives' },
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
              The RiscLens <span className="text-brand-600">Compliance Hub</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
              Explore our comprehensive library of role-specific guides, local auditor directories, and tool intelligence to accelerate your compliance journey.
            </p>
            <Link 
              href="/compliance"
              className="inline-flex items-center gap-2 text-brand-600 font-black hover:gap-3 transition-all group"
            >
              Open Master Intelligence Hub
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-50 rounded-lg">
                  {section.icon}
                </div>
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">
                  {section.title}
                </h3>
              </div>
                <ul className="space-y-2 pr-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className="text-slate-600 hover:text-brand-600 transition-colors text-sm font-medium flex items-center group"
                    >
                      <span className="w-1 h-1 bg-slate-300 rounded-full mr-2 group-hover:bg-brand-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 sm:p-12 bg-slate-50 border border-slate-200 rounded-3xl text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Can't find what you're looking for?</h3>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto text-lg">
            Our search engine indexes over 10,000 pages of compliance data, auditor reports, and security whitepapers.
          </p>
          <Link 
            href="/search"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-brand-700 transition-all shadow-lg"
          >
            Search the Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
