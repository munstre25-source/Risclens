import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, Server, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security & Trust Center | RiscLens',
  description: 'Learn how RiscLens protects your data and maintains a rigorous security posture.',
};

const securityFeatures = [
  {
    title: 'Data Privacy by Design',
    description: 'We do not require account creation or logins to use our assessment tools. Your compliance data is processed to generate your report and is never sold to third parties.',
    icon: Eye,
  },
  {
    title: 'Encryption in Transit & at Rest',
    description: 'All data is encrypted using industry-standard TLS 1.3 in transit and AES-256 at rest.',
    icon: Lock,
  },
  {
    title: 'Secure Infrastructure',
    description: 'Our application is hosted on secure, SOC 2 Type II compliant cloud infrastructure with multi-region redundancy.',
    icon: Server,
  },
  {
    title: 'Deterministic Logic',
    description: 'Our tools use transparent, rules-based logic rather than black-box AI, ensuring your data is handled predictably and securely.',
    icon: Shield,
  },
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex-grow">
        {/* Hero */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trust Center
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Commitment to Security
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              As a security company, we hold ourselves to the highest standards. Here is how we protect your information and maintain your trust.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="p-8 rounded-2xl border border-slate-200 bg-white hover:border-brand-200 transition-colors shadow-sm">
                  <div className="w-12 h-12 bg-brand-50 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-processors / Compliance */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Security Fundamentals</h2>
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Least Privilege Access</h4>
                  <p className="text-slate-600 text-sm">Internal access to our production environment is restricted to the minimum necessary personnel and requires multi-factor authentication.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Continuous Monitoring</h4>
                  <p className="text-slate-600 text-sm">We employ automated security scanning and monitoring to detect and respond to potential threats in real-time.</p>
                </div>
              </div>
              <div className="flex gap-4 p-6 bg-white rounded-xl border border-slate-200">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Secure Development Lifecycle</h4>
                  <p className="text-slate-600 text-sm">Our code is peer-reviewed and automatically scanned for vulnerabilities before being deployed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Have questions about our security?</h2>
            <p className="text-slate-600 mb-8">
              We are happy to provide more details about our security posture. Reach out to our team at security@risclens.com.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
