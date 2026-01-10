import Script from 'next/script';
import { Author, authors } from '@/lib/authors';

interface AuthorBioProps {
  authorId: keyof typeof authors;
}

export function AuthorBio({ authorId }: AuthorBioProps) {
  const author = authors[authorId];

  if (!author) return null;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.role,
    "description": author.bio,
    "sameAs": [author.linkedIn, author.reddit].filter(Boolean),
    "knowsAbout": author.credentials
  };

  return (
    <>
      <Script
        id={`author-schema-${authorId}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 my-12 flex flex-col sm:flex-row gap-6 items-start">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex-shrink-0 flex items-center justify-center text-slate-500 font-bold text-lg border-2 border-white shadow-sm">
          {author.avatar}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-bold text-slate-900">{author.name}</h4>
            <div className="flex gap-1">
              {author.credentials.map((cert) => (
                <span key={cert} className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-brand-600 font-medium mb-3">{author.role}</p>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {author.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            {author.linkedIn && (
              <a 
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-brand-600 flex items-center gap-1 font-medium transition-colors"
              >
                Connect on LinkedIn →
              </a>
            )}
            {author.reddit && (
              <a 
                href={author.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-brand-600 flex items-center gap-1 font-medium transition-colors"
              >
                Chat on Reddit →
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function VerifiedBy({ authorId }: AuthorBioProps) {
  const author = authors[authorId];
  if (!author) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
      <span className="flex items-center justify-center w-5 h-5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold">✓</span>
      Expert verified by {author.name}, {author.credentials[0]}
    </div>
  );
}
