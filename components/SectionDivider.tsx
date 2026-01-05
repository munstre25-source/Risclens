interface SectionDividerProps {
  label?: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="flex items-center gap-3 my-4" aria-hidden="true">
      <span className="h-px flex-1 bg-slate-200" />
      {label ? <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span> : null}
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
