'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Calculator, FileText, Shield, CheckCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

/**
 * High-Converting Lead Capture CTA Components
 * 
 * Includes:
 * - Exit-intent modal
 * - Inline CTA with email capture
 * - Contextual CTA based on page type
 */

// CTA Content type
type CTAVariant = 'calculator' | 'assessment' | 'comparison' | 'guide' | 'auditor';

interface ExitIntentModalProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: CTAVariant;
}

interface InlineCTAProps {
  variant?: CTAVariant;
  context?: string; // e.g., tool name for contextual messaging
  className?: string;
}

// CTA Content configurations
const CTA_CONTENT: Record<CTAVariant, {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: typeof Calculator;
  benefits: string[];
  color: string;
}> = {
  calculator: {
    title: 'Get Your Free SOC 2 Cost Estimate',
    description: 'Find out exactly what SOC 2 compliance will cost your organization in 2026.',
    ctaLabel: 'Calculate My Costs',
    href: '/soc-2-cost-calculator',
    icon: Calculator,
    benefits: ['Free', 'Takes 2 min', 'Instant results'],
    color: 'brand',
  },
  assessment: {
    title: 'How Ready Are You for SOC 2?',
    description: 'Take our 2-minute readiness assessment and get a personalized action plan.',
    ctaLabel: 'Start Free Assessment',
    href: '/soc-2-readiness-index',
    icon: Shield,
    benefits: ['No signup required', 'Personalized plan', 'Export to PDF'],
    color: 'emerald',
  },
  comparison: {
    title: 'Not Sure Which Platform to Choose?',
    description: 'Our readiness index analyzes your stack and recommends the fastest path.',
    ctaLabel: 'Get Personalized Recommendation',
    href: '/soc-2-readiness-index',
    icon: FileText,
    benefits: ['Unbiased analysis', 'Stack-specific', 'Cost comparison'],
    color: 'blue',
  },
  guide: {
    title: 'Get Your Complete Compliance Guide',
    description: 'Download our comprehensive guide with step-by-step instructions, checklists, and expert tips.',
    ctaLabel: 'Download Free Guide',
    href: '/soc-2-readiness-index',
    icon: FileText,
    benefits: ['Complete guide', 'Step-by-step', 'Expert tips'],
    color: 'brand',
  },
  auditor: {
    title: 'Find the Right SOC 2 Auditor',
    description: 'Match with pre-vetted auditors based on your industry, timeline, and budget.',
    ctaLabel: 'Find My Auditor',
    href: '/auditor-match',
    icon: Shield,
    benefits: ['Verified auditors', 'Direct pricing', 'Industry expertise'],
    color: 'purple',
  },
};

/**
 * Exit Intent Modal - Shows when user is about to leave
 */
export function ExitIntentModal({
  title,
  description,
  ctaLabel,
  ctaHref,
  variant = 'calculator',
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const content = CTA_CONTENT[variant];
  const Icon = content.icon;

  const handleExitIntent = useCallback((e: MouseEvent) => {
    // Only trigger if mouse leaves through the top
    if (e.clientY <= 0 && !hasShown) {
      // Check if user has dismissed this before (stored in localStorage)
      const dismissed = localStorage.getItem('exitModalDismissed');
      if (dismissed) {
        const dismissedDate = new Date(dismissed);
        const now = new Date();
        // Don't show again for 7 days after dismissal
        if (now.getTime() - dismissedDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
          return;
        }
      }
      
      setIsOpen(true);
      setHasShown(true);
      trackEvent('exit_intent_shown', { variant });
    }
  }, [hasShown, variant]);

  useEffect(() => {
    document.addEventListener('mouseout', handleExitIntent);
    return () => document.removeEventListener('mouseout', handleExitIntent);
  }, [handleExitIntent]);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('exitModalDismissed', new Date().toISOString());
    trackEvent('exit_intent_dismissed', { variant });
  };

  const handleCTAClick = () => {
    trackEvent('exit_intent_cta_clicked', { variant, destination: ctaHref || content.href });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-10">
          <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-${content.color}-100 text-${content.color}-600 mb-6`}>
            <Icon className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            {title || content.title}
          </h2>
          
          <p className="text-slate-600 mb-6">
            {description || content.description}
          </p>

          {/* Benefits */}
          <ul className="flex flex-wrap gap-3 mb-8">
            {content.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-1.5 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {benefit}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={ctaHref || content.href}
            onClick={handleCTAClick}
            className={`flex items-center justify-center gap-2 w-full bg-${content.color}-600 hover:bg-${content.color}-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all`}
          >
            {ctaLabel || content.ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-center text-xs text-slate-400 mt-4">
            No credit card required • Free forever
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Inline CTA - Embedded within page content
 */
export function InlineCTA({
  variant = 'calculator',
  context,
  className = '',
}: InlineCTAProps) {
  const content = CTA_CONTENT[variant];
  const Icon = content.icon;

  // Customize title based on context
  const title = context 
    ? content.title.replace('SOC 2', `${context} SOC 2`)
    : content.title;

  const handleClick = () => {
    trackEvent('inline_cta_clicked', { variant, context });
  };

  return (
    <div className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-10 relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 text-white flex-shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-300">
              {content.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href={content.href}
            onClick={handleClick}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold py-4 px-8 rounded-xl hover:bg-slate-100 transition-all shadow-lg"
          >
            {content.ctaLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>

          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
            {content.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal CTA Banner - Less intrusive inline option
 */
export function CTABanner({
  variant = 'calculator',
  className = '',
}: {
  variant?: CTAVariant;
  className?: string;
}) {
  const content = CTA_CONTENT[variant];
  const Icon = content.icon;

  return (
    <div className={`bg-brand-50 border border-brand-100 rounded-xl p-4 sm:p-5 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{content.title}</h4>
            <p className="text-slate-500 text-xs">{content.benefits.join(' • ')}</p>
          </div>
        </div>
        <Link
          href={content.href}
          className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm py-2.5 px-5 rounded-lg transition-colors whitespace-nowrap"
        >
          {content.ctaLabel.replace('Get ', '').replace('Start ', '')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/**
 * Page-specific CTA component that chooses appropriate CTA based on page type
 */
export function ContextualCTA({
  pageType,
  toolName,
  className = '',
}: {
  pageType: 'pricing' | 'comparison' | 'directory' | 'guide';
  toolName?: string;
  className?: string;
}) {
  const variantMap: Record<'pricing' | 'comparison' | 'directory' | 'guide', CTAVariant> = {
    pricing: 'calculator',
    comparison: 'comparison',
    directory: 'assessment',
    guide: 'assessment',
  };

  const variant: CTAVariant = variantMap[pageType] || 'calculator';

  return <InlineCTA variant={variant} context={toolName} className={className} />;
}

export default ExitIntentModal;
