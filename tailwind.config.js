/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pdf/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
        colors: {
          brand: {
            50: '#f0f4ff',
            100: '#e0e9ff',
            200: '#c7d4fe',
            300: '#a3b8fc',
            400: '#7b93f8',
            500: '#5a72f2',
            600: '#4158e5',
            700: '#3345d1',
            800: '#2c3aab',
            900: '#1e3a8a',
            950: '#172554',
          },
          slate: {
            50: '#f8fafc',
            100: '#f1f5f9',
            150: '#e9eef4',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            850: '#162032',
            900: '#0f172a',
            950: '#0a0f1a',
          },
          trust: {
            50: '#ecfdf5',
            100: '#d1fae5',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
          },
        },
      fontFamily: {
        // Headline font - Outfit (modern geometric)
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        // Body font - Source Sans 3 (highly readable)
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
        // Mono for code snippets
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
