import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import SplashScreen from '../features/auth/screens/SplashScreen';
import { useAuthStore } from '../store/authStore';
import { colors } from '../theme';
import MainTabs from './MainTabs';
import type { AuthStackParamList } from './types';

const navTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary },
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

export default function RootNavigator() {
  const status = useAuthStore((s) => s.status);

  // Auth guard: no valid token -> auth stack; authenticated -> main tabs.
  if (status === 'loading') return <SplashScreen />;
  return (
    <NavigationContainer theme={navTheme}>
      {status === 'authenticated' ? <MainTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
