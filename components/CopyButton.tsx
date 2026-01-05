'use client';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy Template' }: CopyButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert('Template copied to clipboard!');
  };

  return (
    <button 
      onClick={handleCopy}
      className="mt-4 text-brand-700 text-sm font-semibold hover:underline"
    >
      {label}
    </button>
  );
}
