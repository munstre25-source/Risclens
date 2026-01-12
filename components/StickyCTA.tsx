'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

interface StickyCTAProps {
  label?: string;
  description?: string;
  subDescription?: string;
  href?: string;
  targetHref?: string; // backward compatibility for older prop name
  showAfterScroll?: number;
}

export function StickyCTA({ 
  label = 'Calculate Your SOC 2 Cost', 
  description = 'Get your personalized SOC 2 cost estimate',
  subDescription = 'Free • No sales calls • Instant results',
  href = '/soc-2-readiness-calculator',
  targetHref,
  showAfterScroll = 400
}: StickyCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const destination = targetHref || href;

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerBuffer = 300;
      
      if (scrollY > showAfterScroll && scrollY < documentHeight - windowHeight - footerBuffer) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, isDismissed]);

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-brand-700 to-brand-800 border-t border-brand-600 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="text-white font-semibold text-sm">{description}</p>
                <p className="text-brand-200 text-xs">{subDescription}</p>
              </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href={destination}
                onClick={() => trackEvent('sticky_cta_click', { cta_label: label, destination })}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold text-sm px-6 py-3 rounded-lg shadow-lg hover:bg-brand-50 transition-all"
              >
                {label}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <button
                onClick={() => setIsDismissed(true)}
                className="text-white/70 hover:text-white p-2 transition-colors"
                aria-label="Dismiss"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StickyCTA;
