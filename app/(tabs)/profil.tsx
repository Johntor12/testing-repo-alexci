import { StyleSheet } from "react-native";
import DataPasien from "../screen/profile-pasien";
import ScreenContainer from "../src/components/ScreenContainer";

export default function ProfilScreen() {
  return (
    <ScreenContainer scrollable={true}>
      <DataPasien />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
});
