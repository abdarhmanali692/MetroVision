const KEY = 'smart_metro_admin_token';

export const tokenStorage = {
  async get() {
    return localStorage.getItem(KEY);
  },
  async set(token: string) {
    localStorage.setItem(KEY, token);
  },
  async clear() {
    localStorage.removeItem(KEY);
  },
};
