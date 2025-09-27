import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import "react-native-reanimated";
import { AuthProvider } from "./context/AuthContext";

import { useColorScheme } from "@/hooks/useColorScheme";
import { KeluhanProvider } from "./context/KeluhanContext";
import ScanProvider from "./context/ScanContext";

// interface AppHeaderProps {
//   show?: boolean;   // default true
//   username?: string;
// }

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  // const { user, loading } = useAuth();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <KeluhanProvider>
          <ScanProvider>
            <Stack screenOptions={{ headerShown: false }}>
              {/* Auth stack */}
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="screen" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ScanProvider>
        </KeluhanProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#0391CE",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  left: { width: 32, alignItems: "flex-start" },
  right: { width: 32, alignItems: "flex-end" },
  center: { flex: 1 },
  title: { fontSize: 18, fontWeight: "600", color: "#0391CE" },
  subtitle: {
    fontSize: 14,
    color: "#E0F4FF",
  },
});
