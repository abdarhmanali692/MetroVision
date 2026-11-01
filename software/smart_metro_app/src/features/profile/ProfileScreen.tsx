import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { authService } from '../../api/authService';
import AppButton from '../../components/AppButton';
import AppEmptyView from '../../components/AppEmptyView';
import AppErrorView from '../../components/AppErrorView';
import AppLoading from '../../components/AppLoading';
import { useAuthStore } from '../../store/authStore';
import { colors, radius, spacing, typography } from '../../theme';
import type { UserProfile } from '../../types/models';
import { formatDate } from '../../utils/validation';

export default function ProfileScreen() {
  const signOut = useAuthStore((s) => s.signOut);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await authService.profile();
    if (res.ok) setProfile(res.data);
    else setError(res.message);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const logout = async () => {
    setLoggingOut(true);
    await signOut();
  };

  if (loading) return <AppLoading />;
  if (error) return <AppErrorView message={error} onRetry={load} />;
  if (!profile) return <AppEmptyView icon="person-outline" title="لا توجد بيانات للحساب" />;

  const rows = [
    ['الاسم', profile.fullName],
    ['البريد الإلكتروني', profile.email],
    ['رقم الهاتف', profile.phone],
    ['تاريخ التسجيل', formatDate(profile.createdAt)],
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.body}>
      <View style={styles.card}>
        {rows.map(([label, value], i) => (
          <View key={label} style={[styles.row, i > 0 && styles.divider]}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
      <AppButton title="تسجيل الخروج" variant="danger" loading={loggingOut} onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.xl },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  row: { padding: spacing.lg, gap: spacing.xs },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  label: { ...typography.caption, color: colors.textMuted, textAlign: 'right' },
  value: { ...typography.body, color: colors.text, textAlign: 'right' },
});
