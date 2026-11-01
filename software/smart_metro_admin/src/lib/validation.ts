const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
export const normalizeDigits = (s: string) =>
  s.replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)));

export const normalizePhone = (s: string) => normalizeDigits(s).replace(/[\s-]/g, '');

export const validateRequired = (v: string, message: string) => (v.trim() ? null : message);

export const validateFullName = (v: string) =>
  v.trim().length >= 3 ? null : 'الاسم يجب أن يكون 3 أحرف على الأقل';

export const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? null : 'البريد الإلكتروني غير صحيح';

export const validatePhone = (v: string) =>
  /^\+?\d{10,}$/.test(normalizePhone(v)) ? null : 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل';

export const validatePassword = (v: string) =>
  v.length >= 8 && /[A-Za-z\u0600-\u06FF]/.test(v) && /\d/.test(v)
    ? null
    : 'كلمة السر: 8 أحرف على الأقل وحرف ورقم';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });
