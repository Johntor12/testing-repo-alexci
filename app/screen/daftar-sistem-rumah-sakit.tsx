import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import ClaimCard from "../src/components/Home/ClaimCard";
import FloatingChat from "../src/components/Home/FloatingChat";
import ScreenContainer from "../src/components/ScreenContainer";

export default function DaftarSistemRumahSakit() {
  const router = useRouter();
  return (
    <ScreenContainer hasBack={false} scrollable={true}>
      <ClaimCard
        title="Daftar ke Sistem Rumah Sakit"
        onFalseAction={() => {}}
        onTrueAction={() => {
          router.push("/screen/scan-qr-code-screen");
        }}
      />
      <ClaimCard
        onFalseAction={() => {
          router.push("/screen/pilih-rumah-sakit");
        }}
        onTrueAction={() => {
          router.push("/screen/claim-detail");
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <FloatingChat />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -14,
    backgroundColor: "#F5F7FB",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
});
