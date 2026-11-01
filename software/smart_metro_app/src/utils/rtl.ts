import { DevSettings, I18nManager } from 'react-native';
import * as Updates from 'expo-updates';

/** Forces RTL. The first launch after enabling needs one reload for the layout to flip. */
export async function ensureRTL() {
  if (I18nManager.isRTL) return;
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  try {
    if (__DEV__) DevSettings.reload();
    else await Updates.reloadAsync();
  } catch {
    // ignore: the user can reopen the app manually
  }
}
