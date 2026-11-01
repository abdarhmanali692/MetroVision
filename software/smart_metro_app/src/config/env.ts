// Single source for environment config. Nothing is hardcoded elsewhere.
export const API_BASE_URL: string = process.env.EXPO_PUBLIC_API_BASE_URL ?? '';
export const USE_MOCK: boolean = (process.env.EXPO_PUBLIC_USE_MOCK ?? 'true') === 'true';
