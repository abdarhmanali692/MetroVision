import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authService } from '../../../api/authService';
import AppButton from '../../../components/AppButton';
import { AppErrorBanner } from '../../../components/AppErrorView';
import AppInput from '../../../components/AppInput';
import AuthLayout from '../../../components/AuthLayout';
import type { AuthStackParamList } from '../../../navigation/types';
import { useAuthStore } from '../../../store/authStore';
import { colors, spacing, typography } from '../../../theme';
import { validateEmail, validateRequired } from '../../../utils/validation';

export default function LoginScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Login'>) {
  const signIn = useAuthStore((s) => s.signIn);
  const notice = useAuthStore((s) => s.notice);
  const clearNotice = useAuthStore((s) => s.clearNotice);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = {
    email: validateEmail(email),
    password: validateRequired(password, 'كلمة السر مطلوبة'),
  };
  const show = (k: 'email' | 'password') => (touched[k] ? errors[k] : null);

  const submit = async () => {
    setTouched({ email: true, password: true });
    setServerError(null);
    clearNotice();
    if (errors.email || errors.password) return;

    setLoading(true);
    const res = await authService.login({ email: email.trim(), password });
    setLoading(false);

    if (!res.ok) return setServerError(res.message);
    if (res.data.user.role !== 'Passenger') return setServerError('هذا التطبيق للركاب فقط');
    await signIn(res.data.token, res.data.user);
  };

  const banner = serverError ?? notice;

  return (
    <AuthLayout title="تسجيل الدخول" subtitle="أدخل بياناتك للمتابعة">
      {!!banner && <AppErrorBanner message={banner} />}
      <AppInput
        label="البريد الإلكتروني" value={email} onChangeText={setEmail} ltr
        keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))} error={show('email')}
      />
      <AppInput
        label="كلمة السر" value={password} onChangeText={setPassword} ltr secure
        autoCapitalize="none" onBlur={() => setTouched((t) => ({ ...t, password: true }))}
        error={show('password')} onSubmitEditing={submit}
      />
      <AppButton title="دخول" variant="cta" onPress={submit} loading={loading} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>ليس لديك حساب؟</Text>
        <Pressable onPress={() => navigation.navigate('Register')} hitSlop={8}>
          <Text style={styles.link}>إنشاء حساب</Text>
        </Pressable>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  footer: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginTop: spacing.xl },
  footerText: { ...typography.body, color: colors.textMuted },
  link: { ...typography.link, color: colors.primary },
});
