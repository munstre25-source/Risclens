'use client';

import { useRef, useState } from 'react';

interface InfoAccordionProps {
  triggerLabel: string;
  body: string;
  clarifier: string;
}

export default function InfoAccordion({ triggerLabel, body, clarifier }: InfoAccordionProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mx-auto max-w-3xl text-center mb-6">
      <button
        type="button"
        className="text-sm font-semibold text-brand-700 hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {triggerLabel}
      </button>
      <div
        className={`transition-[max-height] duration-200 ease-out ${open ? 'max-h-[9999px]' : 'max-h-0 overflow-hidden'}`}
        aria-hidden={!open}
      >
        <div ref={contentRef} className="mt-3 text-left space-y-2 text-slate-600 text-sm pb-4 leading-relaxed">
          <p>{body}</p>
          <p>{clarifier}</p>
        </div>
      </div>
    </div>
  );
}
