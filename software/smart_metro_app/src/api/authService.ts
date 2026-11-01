import { api } from './client';
import { safeRequest } from './request';
import type { LoginData, LoginPayload, RegisterPayload, UserProfile } from '../types/models';

export const authService = {
  register: (payload: RegisterPayload) =>
    safeRequest<UserProfile>(() => api.post('/api/auth/register', payload)),
  login: (payload: LoginPayload) =>
    safeRequest<LoginData>(() => api.post('/api/auth/login', payload)),
  profile: () => safeRequest<UserProfile>(() => api.get('/api/auth/profile')),
  logout: () => safeRequest<null>(() => api.post('/api/auth/logout')),
};
