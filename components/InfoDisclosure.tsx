'use client';

import { useRef, useState } from 'react';

interface InfoDisclosureProps {
  title: string;
  body?: string;
  bullets?: string[];
  collapsible?: boolean;
  triggerLabel?: string;
  defaultOpen?: boolean;
  showTitle?: boolean;
}

export default function InfoDisclosure({
  title,
  body,
  bullets,
  collapsible = false,
  triggerLabel,
  defaultOpen = false,
  showTitle = true,
}: InfoDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  if (collapsible && !triggerLabel) {
    throw new Error('triggerLabel is required when collapsible is true');
  }

  const content = (
    <div className="text-left space-y-2 text-slate-600 text-sm leading-relaxed">
      {showTitle && <p className="font-semibold text-slate-800">{title}</p>}
      {body && <p>{body}</p>}
      {bullets && bullets.length > 0 && (
        <ul className="list-disc list-inside space-y-1">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!collapsible) {
    return <div className="mx-auto max-w-3xl mb-4">{content}</div>;
  }

  return (
    <div className="mx-auto max-w-3xl text-center mb-4">
      <button
        type="button"
        className="text-sm font-semibold text-brand-700 hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {triggerLabel}
      </button>
      <div
        className={`transition-all duration-200 ease-out ${open ? 'max-h-none' : 'max-h-0 overflow-hidden'}`}
        aria-hidden={!open}
      >
        <div ref={contentRef} className="mt-3 pb-4">
          {content}
        </div>
      </div>
    </div>
  );
}
