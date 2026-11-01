import { AxiosError, type AxiosAdapter, type AxiosResponse } from 'axios';
import type { ApiResponse, UserProfile } from '../types/models';

/**
 * Mock backend (USE_MOCK=true). Returns the exact shapes of the agreed API contract.
 * Test accounts:
 *   passenger@metro.eg / Metro1234  (Passenger)
 *   admin@metro.eg     / Admin1234  (Admin)
 *   disabled@metro.eg  / Metro1234  (inactive -> 403)
 */
type MockUser = UserProfile & { password: string };

const users: MockUser[] = [
  { userId: 12, fullName: 'أحمد محمود', email: 'passenger@metro.eg', phone: '01012345678', role: 'Passenger', isActive: true, createdAt: '2025-01-15T09:30:00Z', password: 'Metro1234' },
  { userId: 1, fullName: 'مدير النظام', email: 'admin@metro.eg', phone: '01099999999', role: 'Admin', isActive: true, createdAt: '2024-12-01T08:00:00Z', password: 'Admin1234' },
  { userId: 13, fullName: 'حساب معطل', email: 'disabled@metro.eg', phone: '01055555555', role: 'Passenger', isActive: false, createdAt: '2025-02-01T10:00:00Z', password: 'Metro1234' },
];
let nextId = 100;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[A-Za-z\u0600-\u06FF])(?=.*\d).{8,}$/;

type Result = { status: number; body: ApiResponse<unknown> };
const ok = (status: number, message: string, data?: unknown): Result => ({ status, body: { success: true, message, data } });
const fail = (status: number, message: string): Result => ({ status, body: { success: false, message } });

const toProfile = ({ password: _p, ...profile }: MockUser): UserProfile => profile;
// The token carries the profile so a mock session survives app reloads.
const encodeToken = (p: UserProfile) => 'mock-jwt.' + encodeURIComponent(JSON.stringify(p));
const decodeToken = (t: string): UserProfile | null => {
  if (!t.startsWith('mock-jwt.')) return null;
  try { return JSON.parse(decodeURIComponent(t.slice(9))); } catch { return null; }
};

function handle(method: string, url: string, body: any, authHeader: string): Result {
  const key = `${method} ${url}`;

  if (key === 'POST /api/auth/register') {
    const { fullName, email, password, phone } = body ?? {};
    if (!fullName || !email || !password || !phone) return fail(400, 'البيانات غير مكتملة');
    if (!EMAIL_RE.test(email)) return fail(400, 'البريد الإلكتروني غير صحيح');
    if (!PASSWORD_RE.test(password)) return fail(422, 'كلمة السر: 8 أحرف على الأقل وحرف ورقم');
    if (users.some((u) => u.email.toLowerCase() === String(email).toLowerCase())) return fail(409, 'الإيميل مستخدم بالفعل');
    if (users.some((u) => u.phone === phone)) return fail(409, 'رقم الهاتف مستخدم بالفعل');
    const user: MockUser = { userId: nextId++, fullName, email, phone, role: 'Passenger', isActive: true, createdAt: new Date().toISOString(), password };
    users.push(user);
    return ok(201, 'تم إنشاء الحساب بنجاح', toProfile(user));
  }

  if (key === 'POST /api/auth/login') {
    const { email, password } = body ?? {};
    const user = users.find((u) => u.email.toLowerCase() === String(email ?? '').toLowerCase());
    if (!user || user.password !== password) return fail(401, 'بيانات الدخول غير صحيحة');
    if (!user.isActive) return fail(403, 'الحساب معطل، تواصل مع الدعم');
    return ok(200, 'تم تسجيل الدخول', {
      token: encodeToken(toProfile(user)),
      user: { userId: user.userId, fullName: user.fullName, email: user.email, role: user.role },
    });
  }

  if (key === 'GET /api/auth/profile') {
    const profile = decodeToken(authHeader.replace(/^Bearer\s+/i, ''));
    return profile ? ok(200, 'تم جلب الملف الشخصي', profile) : fail(401, 'انتهت الجلسة، سجل الدخول مرة أخرى');
  }

  if (key === 'POST /api/auth/logout') return ok(200, 'تم تسجيل الخروج');

  return fail(404, 'المسار غير موجود');
}

export const mockAdapter: AxiosAdapter = async (config) => {
  await delay(500);
  const url = (config.url ?? '').replace(config.baseURL ?? '', '');
  const body = typeof config.data === 'string' && config.data ? JSON.parse(config.data) : config.data;
  const authHeader = String(config.headers?.get?.('Authorization') ?? '');
  const { status, body: data } = handle((config.method ?? 'get').toUpperCase(), url, body, authHeader);

  const response: AxiosResponse = { data, status, statusText: String(status), headers: {}, config, request: {} };
  if (status >= 200 && status < 300) return response;
  throw new AxiosError(data.message, 'ERR_BAD_REQUEST', config, undefined, response);
};
