import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useScan } from "../context/ScanContext";

export default function InvoicersForm() {
  const { resultInvoicers } = useScan();
  console.log("resultInvoicers = ", resultInvoicers);
  const data =
    resultInvoicers && typeof resultInvoicers === "object"
      ? resultInvoicers
      : {};

  const router = useRouter();
  // let cleaned = data.trim();

  // // Tambahkan kurung kurawal jika hilang
  // if (resultInvoicers) {
  //   if (!cleaned.startsWith("{")) {
  //     cleaned = "{" + cleaned;
  //   }
  //   if (!cleaned.endsWith("}")) {
  //     cleaned = cleaned + "}";
  //   }
  // }

  // // Hapus koma di akhir string sebelum kutip
  // cleaned = cleaned.replace(/,(\s*")/g, "$1");

  // // Parse aman
  // let parsed: any;
  // try {
  //   parsed = JSON.parse(cleaned);
  //   console.log("Parsed JSON:", parsed);
  // } catch (err) {
  //   console.error("JSON parse error:", err, cleaned);
  // }
  // console.log("resultInvoicers = ", cleaned);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hasil Scan Invoicers</Text>

      {Object.entries(data)
        .filter(([key]) => key !== "raw")
        .map(([key, value]) => (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{String(value)}</Text>
          </View>
        ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/screen/upload-diagnosis-dokter");
        }}
      >
        <Text style={styles.buttonText}>Lanjutkan Proses</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontWeight: "600",
    color: "#333",
  },
  value: {
    color: "#555",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
