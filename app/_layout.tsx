import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import "react-native-reanimated"

import { useColorScheme } from "@/hooks/useColorScheme"
import { SafeAreaView } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import store from "@/redux/store"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()


  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(screens)/index" />
          <Stack.Screen
            name="(screens)/UserDetails"
            options={{ headerTitle: "User Details" }}
            getId={() => String(Date.now())}
          />
        </Stack>
      </Provider>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
