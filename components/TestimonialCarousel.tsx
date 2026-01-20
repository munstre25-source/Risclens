'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  companyType?: string;
  rating?: number;
  avatarInitials?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "RiscLens gave us clarity on exactly what SOC 2 would cost before we talked to a single vendor. Saved us weeks of back-and-forth.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Series A SaaS",
    companyType: "B2B SaaS",
    rating: 5,
    avatarInitials: "SC",
  },
  {
    id: '2',
    quote: "The readiness assessment identified 3 major gaps we didn't know we had. Our auditor confirmed every single one.",
    author: "Marcus Thompson",
    role: "VP Engineering",
    company: "HealthTech Startup",
    companyType: "Healthcare",
    rating: 5,
    avatarInitials: "MT",
  },
  {
    id: '3',
    quote: "We went from 'do we even need SOC 2?' to 'here's our 90-day roadmap' in under 10 minutes. Game changer for our enterprise sales cycle.",
    author: "Priya Patel",
    role: "Head of Security",
    company: "Fintech Platform",
    companyType: "Fintech",
    rating: 5,
    avatarInitials: "PP",
  },
  {
    id: '4',
    quote: "The cost calculator was within 8% of our final quote. No other tool came close to that accuracy.",
    author: "James Wilson",
    role: "CEO",
    company: "Data Analytics Startup",
    companyType: "SaaS",
    rating: 5,
    avatarInitials: "JW",
  },
  {
    id: '5',
    quote: "Finally, a compliance tool that speaks engineering. No fluff, just actionable intelligence.",
    author: "Elena Rodriguez",
    role: "Security Lead",
    company: "DevOps Platform",
    companyType: "Infrastructure",
    rating: 5,
    avatarInitials: "ER",
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
  autoPlayInterval = 5000,
  className = '',
  variant = 'default',
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext]);

  const currentTestimonial = TESTIMONIALS[currentIndex];

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-semibold text-sm">
            {currentTestimonial.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-700 line-clamp-2">"{currentTestimonial.quote}"</p>
            <p className="text-xs text-slate-500 mt-1">
              {currentTestimonial.author}, {currentTestimonial.role}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={`relative ${className}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-mesh-dark opacity-50" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            {/* Quote icon */}
            <Quote className="w-12 h-12 text-brand-400/30 mb-6" />
            
            {/* Quote text */}
            <blockquote className={`text-xl md:text-2xl text-white font-medium leading-relaxed mb-8 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              "{currentTestimonial.quote}"
            </blockquote>
            
            {/* Author info */}
            <div className={`flex items-center gap-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {currentTestimonial.avatarInitials}
              </div>
              <div>
                <div className="font-semibold text-white">{currentTestimonial.author}</div>
                <div className="text-slate-400 text-sm">{currentTestimonial.role} at {currentTestimonial.company}</div>
                {currentTestimonial.rating && (
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < currentTestimonial.rating! ? 'text-accent-400' : 'text-slate-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-brand-400 w-6' 
                        : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={goToPrev}
                  className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-600 hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg p-8 md:p-10">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100/50 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          {/* Quote icon */}
          <Quote className="w-10 h-10 text-brand-200 mb-4" />
          
          {/* Quote text */}
          <blockquote className={`text-lg md:text-xl text-slate-800 font-medium leading-relaxed mb-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            "{currentTestimonial.quote}"
          </blockquote>
          
          {/* Author info */}
          <div className={`flex items-center gap-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-md">
              {currentTestimonial.avatarInitials}
            </div>
            <div>
              <div className="font-semibold text-slate-900">{currentTestimonial.author}</div>
              <div className="text-slate-500 text-sm">{currentTestimonial.role}</div>
              <div className="text-brand-600 text-xs font-medium">{currentTestimonial.companyType}</div>
            </div>
          </div>
          
          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-brand-600 w-6' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCarousel;
