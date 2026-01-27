'use client';

import { useState, useEffect, useCallback } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "RiscLens gave us clarity on exactly what SOC 2 would cost before we talked to a single vendor. Saved us weeks of back-and-forth.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Series A SaaS",
  },
  {
    id: '2',
    quote: "The readiness assessment identified 3 major gaps we didn't know we had. Our auditor confirmed every single one.",
    author: "Marcus Thompson",
    role: "VP Engineering",
    company: "HealthTech Startup",
  },
  {
    id: '3',
    quote: "We went from 'do we even need SOC 2?' to 'here's our 90-day roadmap' in under 10 minutes.",
    author: "Priya Patel",
    role: "Head of Security",
    company: "Fintech Platform",
  },
  {
    id: '4',
    quote: "The cost calculator was within 8% of our final quote. No other tool came close to that accuracy.",
    author: "James Wilson",
    role: "CEO",
    company: "Data Analytics Startup",
  },
  {
    id: '5',
    quote: "Finally, a compliance tool that speaks engineering. No fluff, just actionable intelligence.",
    author: "Elena Rodriguez",
    role: "Security Lead",
    company: "DevOps Platform",
  },
];

interface TestimonialCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function TestimonialCarousel({
  autoPlay = true,
  autoPlayInterval = 6000,
  className = '',
  variant = 'default',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  if (variant === 'compact') {
    return (
      <div className={`${className}`}>
        <p className="text-sm text-slate-600 italic">"{currentTestimonial.quote}"</p>
        <p className="text-xs text-slate-500 mt-2">
          — {currentTestimonial.author}, {currentTestimonial.role}
        </p>
      </div>
    );
  }

  // Default and featured variants - clean, professional design
  return (
    <div className={`${className}`}>
      <div className="border-l-2 border-slate-200 pl-6 py-2">
        <blockquote className="text-lg text-slate-700 leading-relaxed mb-4">
          "{currentTestimonial.quote}"
        </blockquote>
        
        <div className="text-sm">
          <span className="font-medium text-slate-900">{currentTestimonial.author}</span>
          <span className="text-slate-500"> · {currentTestimonial.role}, {currentTestimonial.company}</span>
        </div>
      </div>
      
      {/* Simple dot navigation */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex 
                ? 'bg-slate-900' 
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialCarousel;
