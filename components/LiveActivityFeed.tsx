'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  action: string;
  location: string;
  timeAgo: string;
}

// Simulated recent activity - in production, this would come from real data
const ACTIVITY_TEMPLATES = [
  { action: 'completed a SOC 2 readiness assessment', locations: ['San Francisco', 'New York', 'Austin', 'Boston', 'Seattle', 'Denver', 'Chicago', 'LA'] },
  { action: 'calculated their compliance ROI', locations: ['London', 'Toronto', 'Sydney', 'Berlin', 'Singapore', 'Dublin'] },
  { action: 'downloaded their audit roadmap', locations: ['San Francisco', 'New York', 'Chicago', 'Miami', 'Atlanta'] },
  { action: 'estimated SOC 2 costs', locations: ['Austin', 'Seattle', 'Portland', 'Phoenix', 'Dallas'] },
  { action: 'started ISO 27001 assessment', locations: ['London', 'Amsterdam', 'Paris', 'Munich', 'Stockholm'] },
];

const TIME_PHRASES = [
  'just now',
  '1 min ago',
  '2 mins ago',
  '3 mins ago',
  '5 mins ago',
  '8 mins ago',
  '12 mins ago',
];

function generateActivity(): ActivityItem {
  const template = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
  const location = template.locations[Math.floor(Math.random() * template.locations.length)];
  const timeAgo = TIME_PHRASES[Math.floor(Math.random() * TIME_PHRASES.length)];
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    action: template.action,
    location,
    timeAgo,
  };
}

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
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing first activity
    const initialDelay = setTimeout(() => {
      setActivities([generateActivity()]);
      setIsVisible(true);
    }, 5000);

    // Generate new activity every 15-30 seconds
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities((prev) => [newActivity, ...prev].slice(0, maxItems));
      setIsVisible(true);
      
      // Auto-hide toast after 5 seconds
      if (variant === 'toast') {
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [maxItems, variant]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (variant === 'toast' && showToast) {
    return (
      <div
        className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        } ${className}`}
      >
        {activities.slice(0, 1).map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-xl border border-slate-200 max-w-sm animate-fade-in"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-trust-100 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-trust-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700">
                Someone from <span className="font-semibold text-slate-900">{activity.location}</span>
              </p>
              <p className="text-sm text-slate-600">{activity.action}</p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400">{activity.timeAgo}</span>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`space-y-2 ${className}`}>
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-trust-500 animate-pulse" />
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span className="font-medium text-slate-700">{activity.location}</span>
              <span>—</span>
              <span>{activity.action}</span>
            </div>
            <span className="ml-auto text-xs text-slate-400">{activity.timeAgo}</span>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`p-4 rounded-xl bg-slate-50 border border-slate-100 ${className}`}>
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {activities.length === 0 ? (
            <p className="text-sm text-slate-400">Loading recent activity...</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-2 text-sm">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-trust-500 mt-2" />
                <div>
                  <p className="text-slate-600">
                    <span className="font-medium text-slate-700">{activity.location}</span>
                    {' '}— {activity.action}
                  </p>
                  <p className="text-xs text-slate-400">{activity.timeAgo}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default LiveActivityFeed;
