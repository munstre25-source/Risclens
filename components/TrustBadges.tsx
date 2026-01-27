'use client';

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact';
  className?: string;
  showLogos?: boolean;
}

const FRAMEWORKS = ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR', 'PCI DSS'];

export function TrustBadges({ variant = 'horizontal', className = '', showLogos = true }: TrustBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`text-sm text-slate-500 ${className}`}>
        Coverage: {FRAMEWORKS.join(' · ')}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-3 ${className}`}>
        <p className="text-sm text-slate-600">Frameworks covered</p>
        <div className="flex flex-wrap gap-2">
          {FRAMEWORKS.map((framework) => (
            <span 
              key={framework} 
              className="text-sm text-slate-700 px-3 py-1 bg-slate-50 border border-slate-200 rounded"
            >
              {framework}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {showLogos && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
          <span>Frameworks:</span>
          {FRAMEWORKS.map((framework, i) => (
            <span key={framework}>
              {framework}{i < FRAMEWORKS.length - 1 && <span className="ml-4">·</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function SecurityBadgeBar({ className = '' }: { className?: string }) {
  return (
    <div className={`py-3 text-xs text-slate-400 ${className}`}>
      <span>SSL encrypted</span>
      <span className="mx-3">·</span>
      <span>No data stored</span>
      <span className="mx-3">·</span>
      <span>GDPR compliant</span>
    </div>
  );
}

interface ProofCounterProps {
  count: number;
  action: string;
  period?: string;
  className?: string;
}

export function ProofCounter({ count, action, period = 'this month', className = '' }: ProofCounterProps) {
  return (
    <p className={`text-sm text-slate-500 ${className}`}>
      {count.toLocaleString()} teams {action} {period}
    </p>
  );
}

export default TrustBadges;
