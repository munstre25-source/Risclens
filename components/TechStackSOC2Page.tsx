import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutSection from '@/components/AboutSection';
import StickyCTA from '@/components/StickyCTA';
import { AuthorBio, VerifiedBy } from '@/components/AuthorBio';
import { GeneralPageSchema } from '@/components/GeneralPageSchema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { 
  Cloud, 
  Server, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  Layers, 
  Database, 
  Zap,
  FileCheck,
  BookOpen,
  Globe,
  Key,
  Lock,
  UserCheck,
  Github,
  Gitlab,
  Code
} from 'lucide-react';

interface TechControl {
  title: string;
  implementation: string;
}

interface TechStackSOC2PageProps {
  platformName: string;
  platformSlug: string;
  heroDescription: string;
  keyControls: TechControl[];
  bestPractices: string[];
}

const platformIcons: Record<string, typeof Cloud> = {
  aws: Cloud,
  azure: Server,
  gcp: Shield,
  kubernetes: Layers,
  supabase: Database,
  vercel: Zap,
  heroku: Server,
  digitalocean: Cloud,
  render: Layers,
  cloudflare: Shield,
  netlify: Globe,
  fly: Zap,
  okta: Key,
  auth0: Lock,
  clerk: UserCheck,
  github: Github,
  gitlab: Gitlab,
  terraform: Code,
};

const platformColors: Record<string, { bg: string; text: string; border: string }> = {
  aws: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  azure: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  gcp: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
  kubernetes: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  supabase: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  vercel: { bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300' },
  heroku: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  digitalocean: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  render: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
  cloudflare: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  netlify: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200' },
  fly: { bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-200' },
  okta: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  auth0: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  clerk: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
  github: { bg: 'bg-slate-100', text: 'text-slate-900', border: 'border-slate-300' },
  gitlab: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  terraform: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
};

export default function TechStackSOC2Page({
  platformName,
  platformSlug,
  heroDescription,
  keyControls,
  bestPractices,
}: TechStackSOC2PageProps) {
  const pageUrl = `https://risclens.com/soc-2/stack/${platformSlug}`;
  const pageTitle = `SOC 2 Compliance for ${platformName} | RiscLens Guide`;
  
  const Icon = platformIcons[platformSlug] || Cloud;
  const colors = platformColors[platformSlug] || platformColors.aws;

  const breadcrumbItems = [
    { label: 'SOC 2', href: '/soc-2' },
    { label: 'Tech-Stack Hub', href: '/soc-2/stack' },
    { label: platformName, href: `/soc-2/stack/${platformSlug}` },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <Breadcrumbs items={breadcrumbItems} />
      <GeneralPageSchema
        title={pageTitle}
        description={heroDescription}
        url={pageUrl}
        breadcrumbs={[
          { name: 'Home', item: 'https://risclens.com' },
          { name: 'SOC 2', item: 'https://risclens.com/soc-2' },
          { name: 'Tech-Stack Hub', item: 'https://risclens.com/soc-2/stack' },
          { name: platformName, item: pageUrl },
        ]}
      />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="lg:max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5" />
                  Stack-Specific Guide
                </div>
                <VerifiedBy authorId="kevin" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight">
                SOC 2 Compliance for <span className="text-brand-600">{platformName}</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {heroDescription}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/soc-2-readiness-index"
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all"
                >
                  Get {platformName} Audit Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  href="/soc-2/stack"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-3.5 rounded-xl border border-slate-200 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  All Stack Guides
                </Link>
              </div>
            </div>
            
            <div className={`w-28 h-28 ${colors.bg} border-2 ${colors.border} rounded-3xl flex items-center justify-center shadow-lg shrink-0`}>
              <Icon className={`w-14 h-14 ${colors.text}`} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-10">
            <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}>
              <Shield className={`w-5 h-5 ${colors.text}`} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Core {platformName} Controls</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {keyControls.map((control, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-6 hover:border-brand-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-brand-700 font-bold text-sm">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{control.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {control.implementation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-brand-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Auditor-Vetted Best Practices</h2>
              </div>
              <div className="space-y-4">
                {bestPractices.map((practice, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 leading-relaxed">{practice}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10 text-brand-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Infrastructure-as-Code is Key</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">
                The fastest way to achieve SOC 2 on {platformName} is to define your entire environment in code. This provides an immutable audit trail that auditors love.
              </p>
              <Link 
                href="/soc-2-readiness-checklist"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-all"
              >
                View IaC Checklist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Explore Other Stacks</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(platformIcons).map(([slug, IconComponent]) => {
              const stackColors = platformColors[slug];
              const isCurrentStack = slug === platformSlug;
              const stackNames: Record<string, string> = {
                aws: 'AWS',
                azure: 'Azure',
                gcp: 'GCP',
                kubernetes: 'K8s',
                supabase: 'Supabase',
                vercel: 'Vercel',
                heroku: 'Heroku',
                digitalocean: 'DigitalOcean',
                render: 'Render',
                cloudflare: 'Cloudflare',
                netlify: 'Netlify',
                fly: 'Fly.io',
                okta: 'Okta',
                auth0: 'Auth0',
                clerk: 'Clerk',
                github: 'GitHub',
                gitlab: 'GitLab',
                terraform: 'Terraform',
              };
              
              return (
                <Link
                  key={slug}
                  href={`/soc-2/stack/${slug}`}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    isCurrentStack 
                      ? `${stackColors.bg} ${stackColors.border} cursor-default` 
                      : 'bg-white border-slate-200 hover:border-brand-300 hover:shadow-md'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 ${stackColors.text}`} />
                  <span className={`text-xs font-semibold text-center ${isCurrentStack ? stackColors.text : 'text-slate-700'}`}>
                    {stackNames[slug]}
                  </span>
                </Link>
              );
            })}
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
      <StickyCTA 
        label={`Secure your ${platformName} Stack for SOC 2`} 
        targetHref="/soc-2-readiness-index" 
      />
    </main>
  );
}
