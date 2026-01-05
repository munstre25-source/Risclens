// Lightweight analytics helper that safely no-ops when no client tracker is configured.
// If PostHog is injected globally (window.posthog), events will be forwarded there.

type AnalyticsPayload = Record<string, unknown>;

function getGlobalTracker() {
  if (typeof window === 'undefined') return null;
  const anyWindow = window as typeof window & {
    posthog?: { capture: (event: string, properties?: AnalyticsPayload) => void };
  };
  return anyWindow.posthog ?? null;
}

export function trackEvent(eventName: string, properties: AnalyticsPayload = {}) {
  if (typeof window === 'undefined') return;

  try {
    const tracker = getGlobalTracker();
    const payload = {
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...properties,
    };

    if (tracker?.capture) {
      tracker.capture(eventName, payload);
    } else if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', eventName, payload);
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[analytics] failed to track event', eventName, err);
    }
  }
}

export function scoreBand(score?: number) {
  if (typeof score !== 'number') return 'unknown';
  if (score >= 70) return 'strong';
  if (score >= 40) return 'mid';
  return 'low';
}

export function companySizeBand(size?: number | string) {
  if (size === undefined || size === null) return 'unknown';
  const num = typeof size === 'string' ? parseInt(size, 10) : size;
  if (!Number.isFinite(num)) return 'unknown';
  if (num <= 10) return '1-10';
  if (num <= 50) return '11-50';
  if (num <= 200) return '51-200';
  return '200-plus';
}
