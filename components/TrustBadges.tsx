'use client';

import { Shield, Users, Award, CheckCircle, TrendingUp, Clock } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
  showLogos?: boolean;
}

const TRUST_STATS = [
  {
    icon: Users,
    value: '500+',
    label: 'Teams Assessed',
    description: 'B2B companies have used our tools',
  },
  {
    icon: TrendingUp,
    value: '92%',
    label: 'Accuracy Rate',
    description: 'Cost estimates within 15% of final',
  },
  {
    icon: Clock,
    value: '< 2 min',
    label: 'Time to Results',
    description: 'Get your readiness score instantly',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'User Rating',
    description: 'Based on user feedback',
  },
];

const TRUST_LOGOS = [
  { name: 'SOC 2', abbrev: 'SOC2' },
  { name: 'ISO 27001', abbrev: 'ISO' },
  { name: 'HIPAA', abbrev: 'HIPAA' },
  { name: 'GDPR', abbrev: 'GDPR' },
  { name: 'PCI DSS', abbrev: 'PCI' },
];

export function TrustBadges({ variant = 'horizontal', className = '', showLogos = true }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
        {TRUST_STATS.slice(0, 3).map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 text-sm">
            <stat.icon className="w-4 h-4 text-trust-500" />
            <span className="font-bold text-slate-900">{stat.value}</span>
            <span className="text-slate-500">{stat.label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-trust-100 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-trust-600" />
            </div>
            <div>
              <div className="font-bold text-2xl text-slate-900">{stat.value}</div>
              <div className="text-sm font-medium text-slate-700">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default horizontal variant
  return (
    <div className={className}>
      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className="text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-100 hover-lift">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-trust-500 to-trust-600 mb-3">
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="font-bold text-2xl text-slate-900 font-display">{stat.value}</div>
            <div className="text-sm font-medium text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Frameworks supported */}
      {showLogos && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mr-2">
            Frameworks Supported:
          </span>
          {TRUST_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {logo.abbrev}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Security and compliance badges bar
export function SecurityBadgeBar({ className = '' }: { className?: string }) {
  return (
    <div className={`py-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-medium">256-bit SSL Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs font-medium">No Data Storage</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-medium">GDPR Compliant</span>
        </div>
      </div>
    </div>
  );
}

// Social proof counter for specific actions
interface ProofCounterProps {
  count: number;
  action: string;
  period?: string;
  className?: string;
}

export function ProofCounter({ count, action, period = 'this week', className = '' }: ProofCounterProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-trust-50 border border-trust-200 ${className}`}>
      <div className="flex -space-x-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white"
          />
        ))}
      </div>
      <span className="text-sm text-trust-700">
        <span className="font-bold">{count.toLocaleString()}</span> {action} {period}
      </span>
    </div>
  );
}

export default TrustBadges;
