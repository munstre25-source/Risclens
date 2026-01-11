import React from 'react';
import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            About RiscLens
          </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our mission is to provide transparency and clarity to early-stage technology companies navigating the complexities of SOC 2 (System and Organization Controls 2) compliance.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
          {/* Who we serve */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Who we serve</h3>
            <p className="text-slate-600 leading-relaxed">
              Built specifically for early-stage and growing technology companies—SaaS, fintech, and healthcare tech—preparing for their first SOC 2 audit or responding to enterprise customer requirements.
            </p>
          </div>

          {/* What we provide */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M12 11a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">What we provide</h3>
            <p className="text-slate-600 leading-relaxed">
              Clarity before commitment. We help teams understand realistic cost ranges, timeline expectations, and common gaps before they engage auditors or expensive compliance vendors.
            </p>
          </div>

          {/* Our Boundaries */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Our Boundaries</h3>
            <p className="text-slate-600 leading-relaxed">
              We do not provide legal advice, audit services, or certifications. Our assessments support internal planning—they are not a substitute for professional compliance guidance.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/about" 
            className="inline-flex items-center text-brand-600 font-semibold hover:text-brand-700 transition-colors group"
          >
            Learn more about our methodology
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 block">Technical Definition</span>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              <strong>SOC 2 (System and Organization Controls 2)</strong> is a voluntary compliance standard for service organizations, developed by the AICPA, which specifies how organizations should manage customer data based on the Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
