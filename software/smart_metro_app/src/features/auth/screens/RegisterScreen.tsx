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
import {
  normalizePhone, validateEmail, validateFullName, validatePassword, validatePhone,
} from '../../../utils/validation';

type Field = 'fullName' | 'email' | 'phone' | 'password';

export default function RegisterScreen({ navigation }: NativeStackScreenProps<AuthStackParamList, 'Register'>) {
  const signIn = useAuthStore((s) => s.signIn);
  const [values, setValues] = useState<Record<Field, string>>({ fullName: '', email: '', phone: '', password: '' });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ fullName: false, email: false, phone: false, password: false });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const errors: Record<Field, string | null> = {
    fullName: validateFullName(values.fullName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validatePassword(values.password),
  };
  const set = (k: Field) => (v: string) => setValues((s) => ({ ...s, [k]: v }));
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));
  const show = (k: Field) => (touched[k] ? errors[k] : null);

  const submit = async () => {
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
    if (!login.ok) {
      navigation.navigate('Login');
      return;
    }
    if (login.data.user.role !== 'Passenger') return setServerError('هذا التطبيق للركاب فقط');
    await signIn(login.data.token, login.data.user);
  };

  return (
    <AuthLayout title="إنشاء حساب" subtitle="سجل بياناتك لتبدأ رحلتك">
      {!!serverError && <AppErrorBanner message={serverError} />}
      <AppInput label="الاسم الكامل" value={values.fullName} onChangeText={set('fullName')} onBlur={blur('fullName')} error={show('fullName')} />
      <AppInput
        label="البريد الإلكتروني" value={values.email} onChangeText={set('email')} onBlur={blur('email')} error={show('email')}
        ltr keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
      />
      <AppInput
        label="رقم الهاتف" value={values.phone} onChangeText={set('phone')} onBlur={blur('phone')} error={show('phone')}
        ltr keyboardType="phone-pad"
      />
      <AppInput
        label="كلمة السر" value={values.password} onChangeText={set('password')} onBlur={blur('password')} error={show('password')}
        ltr secure autoCapitalize="none"
      />
      <AppButton title="إنشاء الحساب" variant="cta" onPress={submit} loading={loading} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>لديك حساب بالفعل؟</Text>
        <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
          <Text style={styles.link}>تسجيل الدخول</Text>
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
