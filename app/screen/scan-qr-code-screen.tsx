// HospitalRegisterScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UploadFile from "../src/components/Home/UploadFile";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";

export default function HospitalRegisterScreen() {
  const router = useRouter();

  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [invoiceImage, setInvoiceImage] = useState<string | null>(null);
  const [showModalLoket, setShowModalLoket] = useState(false);

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
          <Text style={styles.titleBold}>Scan QR Code</Text>
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
      {/* <Text style={styles.desc}>Download Slip</Text> */}

      <UploadFile icon={"download"} namaFile="QR RS" />

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowModalLoket(true);
        }}
      >
        <Text style={styles.buttonText}>Lanjutkan Proses</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
      <Modal
        onClose={() => {
          setShowModalLoket(false);
        }}
        title="Silakan ke Loket A"
        onFalse={() => {
          setShowModalLoket(false);
        }}
        onTrue={() => {
          router.push("/screen/tunjukkan-slip");
        }}
        visible={showModalLoket}
      />
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
