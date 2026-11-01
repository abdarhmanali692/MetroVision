// Design tokens from the Figma brief — DARK palette (the app default, brief §7).
// A Light palette is a follow-up: it needs styles to read colors from a theme hook.
export const colors = {
  primary: '#3E8FD9', // blue (line 2)
  primaryDark: '#0A1B33',
  primarySoft: '#1E3249', // elevated surface
  navy: '#0A1B33',
  accent: '#E63946', // red (line 1) — CTA only
  success: '#3BA55D', // green (line 3)
  successSoft: 'rgba(59,165,93,0.16)',
  warning: '#F5A623',
  error: '#EF5350',
  errorSoft: 'rgba(239,83,80,0.16)',
  info: '#29B6F6',
  background: '#0D1B2A',
  surface: '#16283D',
  elevated: '#1E3249',
  text: '#EAF2FA',
  textMuted: '#8FA3B8',
  border: '#2A4159',
  white: '#FFFFFF',
  line1: '#E63946',
  line2: '#3E8FD9',
  line3: '#3BA55D',
  lrt: '#FFB703',
};

// Brand gradient: navy -> blue -> green (brief §2)
export const brandGradient = ['#0B2447', '#1B5FA8', '#2E7D32'] as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
// Brief §4: cards 16, buttons/inputs 12, modals 20
export const radius = { sm: 8, md: 12, lg: 16, xl: 20 };

// Brief §3: IBM Plex Sans Arabic for headings/numbers, Tajawal for body.
// (Weights come from the font family names — don't also set fontWeight.)
export const fonts = {
  display: 'IBMPlexSansArabic_700Bold',
  semibold: 'IBMPlexSansArabic_600SemiBold',
  body: 'Tajawal_400Regular',
  medium: 'Tajawal_500Medium',
  bold: 'Tajawal_700Bold',
};

export const typography = {
  title: { fontFamily: fonts.display, fontSize: 28 },
  heading: { fontFamily: fonts.display, fontSize: 22 },
  button: { fontFamily: fonts.semibold, fontSize: 16 },
  body: { fontFamily: fonts.body, fontSize: 16 },
  label: { fontFamily: fonts.medium, fontSize: 14 },
  link: { fontFamily: fonts.bold, fontSize: 16 },
  caption: { fontFamily: fonts.body, fontSize: 13 },
};

// Text should start from the right in Arabic RTL.
export const textStart = { textAlign: 'right' as const, writingDirection: 'rtl' as const };
