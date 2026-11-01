const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tajawal', '"IBM Plex Sans Arabic"', 'Cairo', 'Tahoma', 'sans-serif'],
        display: ['"IBM Plex Sans Arabic"', 'Tajawal', 'Cairo', 'Tahoma', 'sans-serif'],
      },
      colors: {
        border: c('border'),
        input: c('input'),
        ring: c('primary'),
        background: c('background'),
        foreground: c('foreground'),
        elevated: c('elevated'),
        navy: c('navy'),
        warning: c('warning'),
        info: c('info'),
        line1: c('line1'),
        line2: c('line2'),
        line3: c('line3'),
        lrt: c('lrt'),
        primary: { DEFAULT: c('primary'), foreground: c('on-primary') },
        secondary: { DEFAULT: c('secondary'), foreground: c('secondary-foreground') },
        accent: { DEFAULT: c('accent'), foreground: '#ffffff' },
        destructive: { DEFAULT: c('danger'), foreground: '#ffffff' },
        success: { DEFAULT: c('success'), foreground: '#ffffff' },
        muted: { DEFAULT: c('muted'), foreground: c('muted-foreground') },
        card: { DEFAULT: c('card'), foreground: c('foreground') },
      },
      // Brief §4: cards 16, buttons/inputs 12, modals 20
      borderRadius: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.25rem' },
    },
  },
  plugins: [],
};
