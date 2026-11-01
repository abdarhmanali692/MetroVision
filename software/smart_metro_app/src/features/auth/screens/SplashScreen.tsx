import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import MetroLine from '../../../components/MetroLine';
import { brandGradient, colors, spacing, typography } from '../../../theme';

export default function SplashScreen() {
  return (
    <LinearGradient colors={[...brandGradient]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.root}>
      <Text style={styles.brand}>المترو الذكي</Text>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: spacing.xxl }}>
        <MetroLine />
      </View>
      <ActivityIndicator color={colors.white} style={{ marginTop: spacing.xl }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xxl },
  brand: { ...typography.title, fontSize: 34, color: colors.white },
});
