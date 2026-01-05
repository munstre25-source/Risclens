import { trackEvent } from '@/lib/analytics';

/**
 * Enterprise-grade tracking wrapper.
 * Safely forwards events to our analytics utility.
 */
export function track(event: string, props?: Record<string, any>) {
  if (typeof window === "undefined") return;
  
  // We use the existing lib/analytics.ts which already handles 
  // window.posthog or console.debug in development.
  trackEvent(event, props);

  // Optional: specifically call window.gtag if present
  const anyWindow = window as any;
  if (typeof anyWindow.gtag === 'function') {
    anyWindow.gtag('event', event, props);
  }
}
