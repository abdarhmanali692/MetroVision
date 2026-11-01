import axios from 'axios';
import { API_BASE_URL, USE_MOCK } from '../config/env';
import { mockAdapter } from './mock';
import { tokenStorage } from './tokenStorage';

let unauthorizedHandler: (() => void) | null = null;
/** The auth store registers a callback here; called on 401 of an authenticated request. */
export const setUnauthorizedHandler = (fn: () => void) => {
  unauthorizedHandler = fn;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  ...(USE_MOCK ? { adapter: mockAdapter } : {}),
});

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Only treat 401 as "session expired" when we actually sent a token
    // (a 401 from /login just means wrong credentials).
    const sentToken = !!error.config?.headers?.get?.('Authorization');
    if (error.response?.status === 401 && sentToken) unauthorizedHandler?.();
    return Promise.reject(error);
  },
);
