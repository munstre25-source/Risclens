import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { AuthorBio } from '@/components/AuthorBio';
import { 
  Cloud, 
  Server, 
  Shield, 
  Layers, 
  Database, 
  Zap,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Target,
  Sparkles,
  Globe,
  Key,
  Lock,
  UserCheck,
  Github,
  Gitlab,
  Code
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tech-Stack Compliance Hub | SOC 2 Guides by Infrastructure | RiscLens',
  description: 'Deep-dive SOC 2 implementation guides for AWS, Azure, GCP, Kubernetes, Supabase, and Vercel. Map your infrastructure to trust service criteria with auditor-vetted controls.',
  alternates: {
    canonical: 'https://risclens.com/soc-2/stack',
  },
  openGraph: {
    title: 'Tech-Stack Compliance Hub | SOC 2 by Infrastructure',
    description: 'Auditor-vetted SOC 2 implementation guides for modern cloud stacks.',
    url: 'https://risclens.com/soc-2/stack',
    type: 'website',
  },
};

const stacks = [
  {
    name: 'AWS',
    slug: 'aws',
    tagline: 'The Enterprise Standard',
    description: 'IAM policies, CloudTrail logging, KMS encryption, and VPC security. Automate 80%+ of evidence collection with native AWS services.',
    icon: Cloud,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    controls: ['IAM & MFA', 'CloudTrail', 'KMS', 'VPC/WAF'],
  },
  {
    name: 'Microsoft Azure',
    slug: 'azure',
    tagline: 'Enterprise Identity & Compliance',
    description: 'Entra ID, Conditional Access, Azure Sentinel SIEM, and Key Vault. Leverage Microsoft Defender for real-time security posture scoring.',
    icon: Server,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-sky-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    controls: ['Entra ID', 'Sentinel', 'Key Vault', 'NSGs'],
  },
  {
    name: 'Google Cloud',
    slug: 'gcp',
    tagline: 'Secure by Design',
    description: 'Cloud Identity, Audit Logs, Cloud KMS, and VPC Service Controls. Use Security Command Center for continuous posture management.',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-gradient-to-br from-red-50 to-rose-50',
    borderColor: 'border-red-200',
    hoverBorder: 'hover:border-red-400',
    controls: ['Cloud IAM', 'Audit Logs', 'KMS', 'VPC Controls'],
  },
  {
    name: 'Kubernetes',
    slug: 'kubernetes',
    tagline: 'Container Orchestration',
    description: 'RBAC, Network Policies, Pod Security Standards, and Secrets management. Implement runtime security with Falco and image scanning.',
    icon: Layers,
    color: 'text-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-violet-50',
    borderColor: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
    controls: ['RBAC', 'Network Policies', 'Pod Security', 'Secrets'],
  },
  {
    name: 'Supabase',
    slug: 'supabase',
    tagline: 'Modern Backend-as-a-Service',
    description: 'Row Level Security, Auth configuration, Storage policies, and PITR backups. Essential for startups building on the open-source Firebase alternative.',
    icon: Database,
    color: 'text-emerald-600',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    borderColor: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
    controls: ['RLS Policies', 'Auth & MFA', 'Storage', 'Backups'],
  },
  {
    name: 'Vercel',
    slug: 'vercel',
    tagline: 'Edge-First Deployments',
    description: 'Deployment permissions, environment variable security, Edge Middleware, and audit logging. Perfect for Next.js and serverless architectures.',
    icon: Zap,
    color: 'text-slate-900',
    bgColor: 'bg-gradient-to-br from-slate-50 to-zinc-100',
    borderColor: 'border-slate-300',
    hoverBorder: 'hover:border-slate-500',
    controls: ['RBAC', 'Env Secrets', 'Middleware', 'Audit Logs'],
  },
  {
    name: 'Heroku',
    slug: 'heroku',
    tagline: 'Developer-First PaaS',
    description: 'Heroku Teams, Private Spaces, Logplex, and Config Vars. Simplify SOC 2 by abstracting infrastructure management while maintaining control.',
    icon: Server,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-50',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    controls: ['Heroku Teams', 'Private Spaces', 'Logplex', 'Config Vars'],
  },
  {
    name: 'DigitalOcean',
    slug: 'digitalocean',
    tagline: 'Simple Cloud for Startups',
    description: 'VPC networking, Cloud Firewalls, Managed Databases, and Activity Logs. Secure your Droplets and data with ease.',
    icon: Cloud,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    controls: ['VPC Isolation', 'Cloud Firewalls', 'Team MFA', 'Activity Logs'],
  },
  {
    name: 'Render',
    slug: 'render',
    tagline: 'Modern Cloud Hosting',
    description: 'Private Services, Environment Groups, Log Streams, and RBAC. Zero-downtime deployments with built-in compliance guardrails.',
    icon: Layers,
    color: 'text-indigo-600',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    hoverBorder: 'hover:border-indigo-400',
    controls: ['Private Networking', 'Env Groups', 'RBAC', 'Log Streams'],
  },
  {
    name: 'Cloudflare',
    slug: 'cloudflare',
    tagline: 'Edge Security & Performance',
    description: 'Zero Trust Access, WAF, Logpush, and Page Shield. Secure your network perimeter and protect against edge-based threats.',
    icon: Shield,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    controls: ['Zero Trust', 'WAF', 'Audit Logs', 'Logpush'],
  },
  {
    name: 'Netlify',
    slug: 'netlify',
    tagline: 'Frontend Workflow Platform',
    description: 'Enterprise Audit Logs, SSO/MFA, Scoped Env Vars, and Edge Functions. Modern security for Jamstack and decoupled architectures.',
    icon: Globe,
    color: 'text-teal-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50',
    borderColor: 'border-teal-200',
    hoverBorder: 'hover:border-teal-400',
    controls: ['Audit Logs', 'SSO & MFA', 'Env Scopes', 'SSL'],
  },
  {
    name: 'Fly.io',
    slug: 'fly',
    tagline: 'App-on-the-Edge',
    description: 'Private 6PN Networking, WireGuard Peering, Log Shipping, and Secrets. Run globally distributed apps with secure local networking.',
    icon: Zap,
    color: 'text-violet-600',
    bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    hoverBorder: 'hover:border-violet-400',
    controls: ['6PN Networking', 'WireGuard', 'Log Shipping', 'Secrets'],
  },
  {
    name: 'Okta',
    slug: 'okta',
    tagline: 'Enterprise Identity',
    description: 'Adaptive MFA, Lifecycle Management, System Log, and Access Reviews. The gold standard for identity-driven security and compliance.',
    icon: Key,
    color: 'text-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
    controls: ['Adaptive MFA', 'Lifecycle Mgmt', 'Audit Logs', 'RBAC'],
  },
  {
    name: 'Auth0',
    slug: 'auth0',
    tagline: 'Customer Identity Platform',
    description: 'Universal Login, Brute Force Protection, Log Streaming, and Actions. Secure customer authentication with auditor-vetted standards.',
    icon: Lock,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    controls: ['Universal Login', 'MFA', 'Log Streaming', 'Bot Detection'],
  },
  {
    name: 'Clerk',
    slug: 'clerk',
    tagline: 'Modern Auth for Next.js',
    description: 'Organization Security, Session Management, Audit Logs, and Webhooks. Fast-track your SOC 2 with managed identity and user management.',
    icon: UserCheck,
    color: 'text-slate-600',
    bgColor: 'bg-gradient-to-br from-slate-50 to-zinc-50',
    borderColor: 'border-slate-200',
    hoverBorder: 'hover:border-slate-400',
    controls: ['MFA', 'Session Mgmt', 'Organizations', 'Audit Logs'],
  },
  {
    name: 'GitHub',
    slug: 'github',
    tagline: 'The World\'s Dev Platform',
    description: 'Branch Protection, OIDC for Actions, Audit Logs, and Secret Scanning. Secure your source code and CI/CD pipelines at scale.',
    icon: Github,
    color: 'text-slate-900',
    bgColor: 'bg-gradient-to-br from-slate-50 to-zinc-100',
    borderColor: 'border-slate-300',
    hoverBorder: 'hover:border-slate-500',
    controls: ['Branch Protection', 'MFA', 'Audit Logs', 'Secret Scanning'],
  },
  {
    name: 'GitLab',
    slug: 'gitlab',
    tagline: 'The DevSecOps Platform',
    description: 'Protected Branches, Runner Security, Vulnerability Scanning, and Audit Events. All-in-one platform for secure development and compliance.',
    icon: Gitlab,
    color: 'text-orange-600',
    bgColor: 'bg-gradient-to-br from-orange-50 to-red-50',
    borderColor: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
    controls: ['Protected Branches', 'SAML SSO', 'Vulnerability Scans', 'Audit'],
  },
  {
    name: 'Terraform',
    slug: 'terraform',
    tagline: 'Infrastructure-as-Code',
    description: 'Remote State Security, Sentinel/OPA Policies, Versioning, and Audit Logs. Turn your infrastructure into a verifiable audit trail.',
    icon: Code,
    color: 'text-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
    controls: ['State Security', 'Policy-as-Code', 'Audit Logs', 'Versioning'],
  },
];

const benefits = [
  {
    icon: Target,
    title: 'Platform-Specific Controls',
    description: 'No more generic advice. Get exact IAM policies for AWS, specific RLS rules for Supabase, and precise Network Policies for Kubernetes.',
  },
  {
    icon: FileCheck,
    title: 'Auditor-Ready Evidence',
    description: 'Each guide shows you how to use native platform tools (CloudTrail, Azure Monitor, etc.) to automate evidence collection.',
  },
  {
    icon: Sparkles,
    title: 'Infrastructure-as-Code',
    description: 'Define your security controls in Terraform, Bicep, or CloudFormation. Auditors love version-controlled configuration.',
  },
];

export default function TechStackHubPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Breadcrumbs />
      <GeneralPageSchema
        title="Tech-Stack Compliance Hub | SOC 2 by Infrastructure"
        description="Deep-dive SOC 2 implementation guides for AWS, Azure, GCP, Kubernetes, Supabase, and Vercel."
        url="https://risclens.com/soc-2/stack"
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'SOC 2', item: 'https://risclens.com/soc-2' },
          { name: 'Tech-Stack Compliance', item: 'https://risclens.com/soc-2/stack' },
        ]}
      />
      
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Layers className="w-3.5 h-3.5" />
              Stack-Specific Compliance
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Tech-Stack <span className="text-brand-600">Compliance Hub</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              SOC 2 isn't just about policies—it's about <strong>how you build</strong>. Our deep-dive implementation guides map your specific infrastructure to SOC 2 trust service criteria.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/soc-2-readiness-index"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="/evidence-gap-analyzer"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold px-6 py-3.5 rounded-xl border border-slate-200 transition-all"
              >
                Evidence Gap Analyzer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Stack
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select your primary cloud provider or development platform to see the exact controls and configurations you need for SOC 2.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stacks.map((stack) => (
              <Link 
                key={stack.slug} 
                href={`/soc-2/stack/${stack.slug}`}
                className={`group bg-white border-2 ${stack.borderColor} ${stack.hoverBorder} rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${stack.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stack.icon className={`w-7 h-7 ${stack.color}`} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded">
                    Guide
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">
                  {stack.name}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                  {stack.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
                  {stack.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {stack.controls.map((control) => (
                    <span 
                      key={control} 
                      className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded"
                    >
                      {control}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-brand-600 font-bold text-sm mt-auto pt-4 border-t border-slate-100">
                  View Implementation Guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Stack-Specific Guides?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Generic compliance checklists don't cut it. Modern infrastructure demands modern guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8">Multi-Cloud? We've Got You.</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Most modern companies use multiple cloud providers and platforms. Our guides are designed to work together—combine AWS with Vercel, GCP with Supabase, or any other combination.
              </p>
              <div className="space-y-4">
                {[
                  'Cross-platform control mapping',
                  'Unified evidence collection strategy',
                  'Shared responsibility model clarity',
                  'Auditor-ready documentation templates',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">Not Sure Where to Start?</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Our Evidence Gap Analyzer scans your current setup and identifies exactly which controls are missing—regardless of which platforms you use.
              </p>
              <Link 
                href="/evidence-gap-analyzer"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold px-8 py-4 rounded-xl transition-all w-full justify-center"
              >
                Launch Gap Analyzer
                <Sparkles className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
      </section>

      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'SOC 2 Cost Calculator', href: '/soc-2-cost-calculator', description: 'Get an instant estimate based on your stack and team size.' },
              { title: 'SOC 2 Readiness Checklist', href: '/soc-2-readiness-checklist', description: 'A comprehensive checklist covering all trust service criteria.' },
              { title: 'Evidence Vault', href: '/soc-2-evidence/vault', description: 'Templates and examples for every type of SOC 2 evidence.' },
            ].map((resource) => (
              <Link 
                key={resource.href}
                href={resource.href}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-brand-300 hover:shadow-lg transition-all group"
              >
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{resource.title}</h3>
                <p className="text-sm text-slate-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AuthorBio authorId="kevin" />
        </div>
      </section>

      <AboutSection />
      <Footer />
    </main>
  );
}
