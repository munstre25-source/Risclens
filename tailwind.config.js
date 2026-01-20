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
        // Brand colors - Deep Indigo (distinctive, premium feel)
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // Slate - Enterprise-grade neutral for backgrounds, borders, metadata
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          150: '#e9eef4', // Custom mid-tone for subtle backgrounds
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#162032', // Custom dark for footer
          900: '#0f172a',
          950: '#0a0f1a', // Extra dark for deep footer
        },
        // Trust/security accent (emerald - professional, trust-building)
        trust: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        // Accent color - Warm Amber (CTAs that pop, urgency)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        // Coral accent for special highlights
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
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
