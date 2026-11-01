import { create } from 'zustand';

const KEY = 'metro_theme';
type Theme = 'dark' | 'light';

const read = (): Theme => {
  try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
};

/** Dark is the default (brief §7); the <html> class is also set early by a script in index.html. */
export const useThemeStore = create<{ theme: Theme; toggle: () => void }>((set, get) => ({
  theme: read(),
  toggle: () => {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch { /* ignore */ }
    document.documentElement.classList.toggle('dark', next === 'dark');
    set({ theme: next });
  },
}));
