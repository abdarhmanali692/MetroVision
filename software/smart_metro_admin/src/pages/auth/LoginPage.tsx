import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { authService } from '@/api/authService';
import AppButton from '@/components/AppButton';
import AppErrorView from '@/components/AppErrorView';
import AppInput from '@/components/AppInput';
import AppLoading from '@/components/AppLoading';
import AuthShell from '@/components/AuthShell';
import { homeFor, isSupportedRole } from '@/lib/roles';
import { validateEmail, validateRequired } from '@/lib/validation';
import { UNSUPPORTED_ROLE_MESSAGE, useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { status, user, notice, signIn, clearNotice } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (status === 'loading') return <AppLoading fullScreen />;
  if (status === 'authenticated') return <Navigate to={homeFor(user?.role)} replace />;

  const errors = {
    email: validateEmail(email),
    password: validateRequired(password, 'كلمة السر مطلوبة'),
  };
  const show = (k: 'email' | 'password') => (touched[k] ? errors[k] : null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError(null);
    clearNotice();
    if (errors.email || errors.password) return;

    setLoading(true);
    const res = await authService.login({ email: email.trim(), password });
    setLoading(false);

    if (!res.ok) return setServerError(res.message);
    if (!isSupportedRole(res.data.user.role)) return setServerError(UNSUPPORTED_ROLE_MESSAGE);
    await signIn(res.data.token, res.data.user);
    navigate(homeFor(res.data.user.role), { replace: true });
  };

  const banner = serverError ?? notice;

  return (
    <AuthShell>
      <form onSubmit={onSubmit} noValidate className="w-full max-w-sm space-y-5">
        <div>
          <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
          <p className="mt-1 text-muted-foreground">أدخل بياناتك للمتابعة</p>
        </div>
        {banner && <AppErrorView inline message={banner} />}
        <AppInput
          label="البريد الإلكتروني" type="email" ltr autoComplete="username"
          value={email} onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={show('email')}
        />
        <AppInput
          label="كلمة السر" type="password" ltr autoComplete="current-password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))} error={show('password')}
        />
        <AppButton type="submit" variant="cta" className="w-full" loading={loading}>
          دخول
        </AppButton>
        <p className="text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{' '}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            إنشاء حساب
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
