'use client';

import { ReactNode } from 'react';

interface CalculatorCardProps {
  title: string;
  description: string;
  children: ReactNode;
  step: number;
  totalSteps: number;
}

export function CalculatorCard({ title, description, children, step, totalSteps }: CalculatorCardProps) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-2xl mx-auto">
      <div className="bg-brand-600 h-1.5 w-full">
        <div 
          className="bg-brand-400 h-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500 font-medium">
            {Math.round(progress)}% Complete
          </span>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-8">{description}</p>

        {children}
      </div>
    </div>
  );
}
