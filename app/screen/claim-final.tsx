import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ClaimCard from "../src/components/Home/ClaimCard";
import ScreenContainer from "../src/components/ScreenContainer";

export default function ClaimFinal() {
  const router = useRouter();
  return (
    <ScreenContainer hasBack={false} scrollable={true}>
      <ClaimCard
        onFalseAction={() => {
          router.push("/screen/pilih-rumah-sakit");
        }}
        onTrueAction={() => {
          router.push("/screen/claim-detail");
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
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
  button: {
    width: 154,
    aspectRatio: 154 / 60,
    marginTop: 32,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
