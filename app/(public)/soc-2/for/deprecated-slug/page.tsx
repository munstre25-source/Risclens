// This file is deprecated to resolve a Next.js build conflict.
// The conflicting dynamic parameter was 'slug', while other routes use 'role'.
// See app/(public)/soc-2/for/[role]/page.tsx instead.

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return null;
}
