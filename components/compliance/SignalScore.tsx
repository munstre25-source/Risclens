import React from 'react';

interface SignalScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  minimal?: boolean;
}

export function SignalScore({ score, size = 'md', minimal = false }: SignalScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 border-green-200 bg-green-50';
    if (s >= 50) return 'text-yellow-600 border-yellow-200 bg-yellow-50';
    return 'text-gray-600 border-gray-200 bg-gray-50';
  };

  const sizeClasses = {
    sm: 'text-xl w-12 h-12',
    md: 'text-3xl w-24 h-24',
    lg: 'text-5xl w-32 h-32',
  };

  if (minimal) {
    return (
      <div 
        className={`flex items-center justify-center rounded-full border-4 font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}
        title={`Public Security Signals Score: ${score}`}
      >
        {score}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center rounded-full border-4 font-bold ${getScoreColor(score)} ${sizeClasses[size]}`}>
        {score}
      </div>
        <span className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
          Public Security Signals Score
        </span>
      <p className="mt-4 text-xs text-gray-400 text-center max-w-xs italic">
        ⚠️ This score reflects publicly visible security disclosures only. 
        It does not confirm audit status or security posture.
      </p>
    </div>
  );
}
