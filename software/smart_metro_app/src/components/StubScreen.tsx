import { View } from 'react-native';
import AppEmptyView from './AppEmptyView';
import { colors } from '../theme';
import type { Ionicons } from '@expo/vector-icons';

export default function StubScreen({ icon, title }: { icon: keyof typeof Ionicons.glyphMap; title: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <AppEmptyView icon={icon} title={title} description="هذه الميزة قادمة في مرحلة لاحقة" />
    </View>
  );
}
