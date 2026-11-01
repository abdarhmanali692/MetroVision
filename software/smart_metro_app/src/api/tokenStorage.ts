import * as SecureStore from 'expo-secure-store';

const KEY = 'smart_metro_token';
let cached: string | null | undefined;

export const tokenStorage = {
  async get() {
    if (cached === undefined) cached = await SecureStore.getItemAsync(KEY);
    return cached;
  },
  async set(token: string) {
    cached = token;
    await SecureStore.setItemAsync(KEY, token);
  },
  async clear() {
    cached = null;
    await SecureStore.deleteItemAsync(KEY);
  },
};
