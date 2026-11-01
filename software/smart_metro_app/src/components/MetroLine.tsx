import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

/** Decorative metro-line motif: a track with station stops (one highlighted). */
export default function MetroLine({ stops = 5, active = 2 }: { stops?: number; active?: number }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.track} />
      <View style={styles.stops}>
        {Array.from({ length: stops }).map((_, i) => (
          <View key={i} style={[styles.stop, i === active && styles.active]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { height: 28, justifyContent: 'center', alignSelf: 'stretch' },
  track: { position: 'absolute', start: 0, end: 0, height: 6, backgroundColor: colors.success, borderRadius: 3 },
  stops: { flexDirection: 'row', justifyContent: 'space-between' },
  stop: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, borderWidth: 4, borderColor: colors.white },
  active: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.success, borderWidth: 5 },
});
