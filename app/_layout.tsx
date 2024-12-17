import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
      <Stack screenOptions={{headerShown: true}}>
        <Stack.Screen name="(screens)/index" options={{headerShown: false, headerTitle:'home'}} />
        <Stack.Screen name='(screens)/UserDetails' options={{headerTitle: 'User Details'}}/>
      </Stack>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
