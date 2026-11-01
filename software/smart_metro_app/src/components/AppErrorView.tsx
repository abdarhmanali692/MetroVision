import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppButton from './AppButton';
import { colors, spacing, typography } from '../theme';

interface Props {
  message: string; // server message, shown as-is
  onRetry?: () => void;
}

export default function AppErrorView({ message, onRetry }: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="alert-circle-outline" size={48} color={colors.error} />
      <Text style={styles.text}>{message}</Text>
      {onRetry && <AppButton title="إعادة المحاولة" variant="outline" onPress={onRetry} style={{ alignSelf: 'stretch' }} />}
    </View>
  );
}

/** Inline banner for form-level errors (server message after submit). */
export function AppErrorBanner({ message }: { message: string }) {
  return (
    <View style={styles.banner} accessibilityRole="alert">
      <Ionicons name="alert-circle" size={20} color={colors.error} />
      <Text style={styles.bannerText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.lg },
  text: { ...typography.body, color: colors.text, textAlign: 'center' },
  banner: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.errorSoft,
    padding: spacing.md, borderRadius: 12, marginBottom: spacing.lg,
  },
  bannerText: { ...typography.label, color: colors.error, flex: 1, textAlign: 'right' },
});
