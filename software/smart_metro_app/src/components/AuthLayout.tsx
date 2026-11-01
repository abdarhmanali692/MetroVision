import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MetroLine from './MetroLine';
import { brandGradient, colors, radius, spacing, typography } from '../theme';

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: Props) {
  return (
    <View style={styles.root}>
      <LinearGradient colors={[...brandGradient]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
        <SafeAreaView edges={['top']} style={{ gap: spacing.xl }}>
          <Text style={styles.brand}>المترو الذكي</Text>
          <MetroLine />
        </SafeAreaView>
      </LinearGradient>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.xl, paddingBottom: spacing.xl,
    borderBottomStartRadius: radius.xl, borderBottomEndRadius: radius.xl,
  },
  brand: { ...typography.heading, color: colors.white, textAlign: 'right', marginTop: spacing.lg },
  body: { padding: spacing.xl, paddingBottom: spacing.xxl * 2 },
  title: { ...typography.title, color: colors.text, textAlign: 'right' },
  subtitle: { ...typography.body, color: colors.textMuted, textAlign: 'right', marginTop: spacing.xs, marginBottom: spacing.xl },
});
