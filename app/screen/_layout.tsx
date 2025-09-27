import { Stack } from "expo-router";
import { View } from "react-native";
import AppHeader from "../src/components/AppHeader";

export default function ScreenLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          header: (props) => <AppHeader {...props} />,
          contentStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="home-screen" options={{ title: "Beranda" }} />
        <Stack.Screen name="claim-detail" options={{ title: "Detail Klaim" }} />
        <Stack.Screen name="input-keluhan" />
        <Stack.Screen
          name="upload-diagnosis-dokter"
          options={{ title: "Upload Diagnosis Dokter" }}
        />
        <Stack.Screen name="profile-pasien" />
        <Stack.Screen name="spot-scan" options={{ headerShown: false }} />
        <Stack.Screen
          name="spot-scan-asuransi"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="spot-scan-invoicers"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="spot-scan-diagnosis"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="selamat-menjalani-pemeriksaan"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="pilih-rumah-sakit-kedua"
          options={{ title: "Rumah Sakit Kedua" }}
        />
      </Stack>
    </View>
  );
}
