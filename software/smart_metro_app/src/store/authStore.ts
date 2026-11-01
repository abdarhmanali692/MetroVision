import { create } from 'zustand';
import { authService } from '../api/authService';
import { setUnauthorizedHandler } from '../api/client';
import { tokenStorage } from '../api/tokenStorage';
import type { AuthUser } from '../types/models';

type Status = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  status: Status;
  user: AuthUser | null;
  notice: string | null; // message shown on the login screen (e.g. session expired)
  bootstrap: () => Promise<void>;
  signIn: (token: string, user: AuthUser) => Promise<void>;
  signOut: () => Promise<void>;
  clearSession: (notice?: string) => Promise<void>;
  clearNotice: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  notice: null,

  // Called once on app start: restore the session from secure storage.
  bootstrap: async () => {
    const token = await tokenStorage.get();
    if (!token) return set({ status: 'unauthenticated' });
    const res = await authService.profile();
    if (res.ok && res.data.role === 'Passenger') {
      const { userId, fullName, email, role } = res.data;
      set({ status: 'authenticated', user: { userId, fullName, email, role } });
    } else {
      await tokenStorage.clear();
      set({ status: 'unauthenticated', user: null });
    }
  },

  signIn: async (token, user) => {
    await tokenStorage.set(token);
    set({ status: 'authenticated', user, notice: null });
  },

  signOut: async () => {
    await authService.logout(); // best effort; local logout happens regardless
    await tokenStorage.clear();
    set({ status: 'unauthenticated', user: null });
  },

  clearSession: async (notice) => {
    await tokenStorage.clear();
    set({ status: 'unauthenticated', user: null, notice: notice ?? null });
  },

  clearNotice: () => set({ notice: null }),
}));

// 401 on an authenticated request -> clear token -> auth stack.
setUnauthorizedHandler(() => {
  useAuthStore.getState().clearSession('انتهت الجلسة، سجل الدخول مرة أخرى');
});
