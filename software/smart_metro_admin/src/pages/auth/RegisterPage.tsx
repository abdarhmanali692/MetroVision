import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { authService } from '@/api/authService';
import AppButton from '@/components/AppButton';
import AppErrorView from '@/components/AppErrorView';
import AppInput from '@/components/AppInput';
import AppLoading from '@/components/AppLoading';
import AuthShell from '@/components/AuthShell';
import { homeFor } from '@/lib/roles';
import { normalizePhone, validateEmail, validateFullName, validatePassword, validatePhone } from '@/lib/validation';
import { useAuthStore } from '@/store/authStore';

type Field = 'fullName' | 'email' | 'phone' | 'password';
const empty = { fullName: '', email: '', phone: '', password: '' };

export default function RegisterPage() {
  const navigate = useNavigate();
  const { status, user, signIn } = useAuthStore();
  const [values, setValues] = useState<Record<Field, string>>(empty);
  const [touched, setTouched] = useState<Record<Field, boolean>>({ fullName: false, email: false, phone: false, password: false });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (status === 'loading') return <AppLoading fullScreen />;
  if (status === 'authenticated') return <Navigate to={homeFor(user?.role)} replace />;

  const errors: Record<Field, string | null> = {
    fullName: validateFullName(values.fullName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validatePassword(values.password),
  };
  const bind = (k: Field) => ({
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    error: touched[k] ? errors[k] : null,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, password: true });
    setServerError(null);
    if (Object.values(errors).some(Boolean)) return;

    setLoading(true);
    const email = values.email.trim();
    const reg = await authService.register({
      fullName: values.fullName.trim(), email, password: values.password, phone: normalizePhone(values.phone),
    });
    if (!reg.ok) {
      setLoading(false);
      return setServerError(reg.message);
    }
    // The register endpoint returns no token, so sign in right away with the same credentials.
    const login = await authService.login({ email, password: values.password });
    setLoading(false);
    if (!login.ok) return navigate('/login', { replace: true });
    await signIn(login.data.token, login.data.user);
    navigate(homeFor(login.data.user.role), { replace: true });
  };

  return (
    <AuthShell>
      <form onSubmit={onSubmit} noValidate className="w-full max-w-sm space-y-5">
        <div>
          <h1 className="text-2xl font-bold">إنشاء حساب</h1>
          <p className="mt-1 text-muted-foreground">سجل بياناتك لتبدأ رحلتك</p>
        </div>
        {serverError && <AppErrorView inline message={serverError} />}
        <AppInput label="الاسم الكامل" autoComplete="name" {...bind('fullName')} />
        <AppInput label="البريد الإلكتروني" type="email" ltr autoComplete="email" {...bind('email')} />
        <AppInput label="رقم الهاتف" type="tel" ltr autoComplete="tel" {...bind('phone')} />
        <AppInput label="كلمة السر" type="password" ltr autoComplete="new-password" {...bind('password')} />
        <AppButton type="submit" variant="cta" className="w-full" loading={loading}>
          إنشاء الحساب
        </AppButton>
        <p className="text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
