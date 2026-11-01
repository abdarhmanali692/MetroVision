import { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { IBMPlexSansArabic_600SemiBold, IBMPlexSansArabic_700Bold } from '@expo-google-fonts/ibm-plex-sans-arabic';
import { Tajawal_400Regular, Tajawal_500Medium, Tajawal_700Bold } from '@expo-google-fonts/tajawal';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import { ensureRTL } from './src/utils/rtl';

// Arabic-only app: force RTL as early as possible.
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  const [fontsLoaded] = useFonts({
    IBMPlexSansArabic_600SemiBold, IBMPlexSansArabic_700Bold, Tajawal_400Regular, Tajawal_500Medium, Tajawal_700Bold,
  });

  useEffect(() => {
    ensureRTL(); // reloads once if the layout direction has not flipped yet
    bootstrap();
  }, [bootstrap]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
