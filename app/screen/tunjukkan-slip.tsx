// HospitalRegisterScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useScan } from "../context/ScanContext";
import UploadFile from "../src/components/Home/UploadFile";
import ScreenContainer from "../src/components/ScreenContainer";

export default function HospitalRegisterScreen() {
  const router = useRouter();

  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [invoiceImage, setInvoiceImage] = useState<string | null>(null);
  const { imageUriInvoicers } = useScan();

  const pickImage = async (type: "slip" | "invoice") => {
    // Minta izin akses galeri
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Izin akses galeri diperlukan!");
      return;
    }

    // Buka galeri
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // ← pakai string literal, bukan MediaTypeOptions
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (type === "slip") {
        setSlipImage(uri);
      } else {
        setInvoiceImage(uri);
      }
    }
  };

  return (
    <ScreenContainer>
      {/* Body */}
      <View style={styles.title}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleBold}>Lihat dan Tunjukan Slip </Text>
          <Text style={styles.titleNormal}>untuk</Text>
        </View>
        <Text style={styles.titleNormal}>Mendaftarkan Dirimu!</Text>
      </View>
      <Text style={styles.subtitle}>
        Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
        ditanggung oleh asuransi.
      </Text>

      {/* Download Slip */}
      {/* Upload Slip */}
      <UploadFile
        namaFile="Slip Pendaftaran"
        icon="download"
        onChange={(uri) => setSlipImage(uri)}
      />

      {/* Upload Invoice */}
      <Text style={styles.sectionTitle}>
        Sudah mendapat Dokumen/
        <Text style={{ fontStyle: "italic" }}>Invoice</Text> RS?
      </Text>
      <Text style={styles.desc}>Upload dokumen untuk disimpan</Text>

      <UploadFile
        variant={"scan-invoicers"}
        uri={imageUriInvoicers}
        namaFile="Invoice RS"
        icon={"upload"}
        onChange={(uri) => setInvoiceImage(uri)}
      />

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/screen/coverage");
        }}
      >
        <Text style={styles.buttonText}>Lanjutkan Proses</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#00668C",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  backBtn: {
    marginRight: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: "#111",
    marginBottom: 6,
  },
  titleBold: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  titleNormal: {
    fontSize: 18,
    fontWeight: "500",
    color: "#111",
    marginTop: 2,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    marginTop: 20,
    marginBottom: 4,
  },

  card: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#aaa",
    borderRadius: 8,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cardText: {
    fontSize: 13,
    textAlign: "center",
    color: "#555",
    marginTop: 6,
  },

  button: {
    flexDirection: "row",
    backgroundColor: "#00668C",
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 48,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 6,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#999",
    borderRadius: 10,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    textAlign: "center",
    color: "#777",
    fontSize: 13,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
