import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MetroLine from '../../components/MetroLine';
import { useAuthStore } from '../../store/authStore';
import { brandGradient, colors, radius, spacing, typography } from '../../theme';

const shortcuts = [
  { icon: 'map-outline', label: 'تخطيط رحلة' },
  { icon: 'people-outline', label: 'حالة الزحام' },
  { icon: 'ticket-outline', label: 'شراء تذكرة' },
  { icon: 'help-buoy-outline', label: 'الدعم' },
] as const;

export default function HomeScreen() {
  const user = useAuthStore((s) => s.user);
  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.body}>
      <LinearGradient colors={[...brandGradient]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
        <Text style={styles.hello}>أهلاً، {user?.fullName}</Text>
        <Text style={styles.sub}>إلى أين تريد الذهاب اليوم؟</Text>
        <MetroLine />
      </LinearGradient>
      <View style={styles.grid}>
        {shortcuts.map((s) => (
          <View key={s.label} style={styles.card}>
            <Ionicons name={s.icon} size={28} color={colors.primary} />
            <Text style={styles.cardText}>{s.label}</Text>
            <Text style={styles.soon}>قريباً</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.lg, gap: spacing.lg },
  hero: { borderRadius: radius.xl, padding: spacing.xl, gap: spacing.lg },
  hello: { ...typography.heading, color: colors.white, textAlign: 'right' },
  sub: { ...typography.body, color: 'rgba(255,255,255,0.8)', textAlign: 'right' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: {
    width: '48%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg,
    alignItems: 'flex-start', gap: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  cardText: { ...typography.label, color: colors.text },
  soon: { ...typography.caption, color: colors.textMuted },
});
