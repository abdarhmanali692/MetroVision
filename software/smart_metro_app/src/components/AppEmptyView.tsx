import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../theme';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export default function AppEmptyView({ icon = 'time-outline', title, description }: Props) {
  return (
    <View style={styles.wrap}>
      <Ionicons name={icon} size={52} color={colors.primary} />
      <Text style={styles.title}>{title}</Text>
      {!!description && <Text style={styles.desc}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: spacing.sm },
  title: { ...typography.heading, color: colors.text, textAlign: 'center' },
  desc: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
