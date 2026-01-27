'use client';

/**
 * LiveActivityFeed - Disabled
 * 
 * This component previously showed simulated "fake" activity notifications.
 * Following professional standards (Vanta/Drata approach), we've removed
 * simulated social proof patterns. The component now renders nothing.
 * 
 * If real analytics data becomes available in the future, this can be
 * updated to show actual verified activity.
 */

interface LiveActivityFeedProps {
  className?: string;
  showToast?: boolean;
  variant?: 'inline' | 'toast' | 'sidebar';
  maxItems?: number;
}

export function LiveActivityFeed({
  className = '',
  showToast = true,
  variant = 'toast',
  maxItems = 1,
}: LiveActivityFeedProps) {
  // Component disabled - no simulated activity
  return null;
}

export default LiveActivityFeed;
