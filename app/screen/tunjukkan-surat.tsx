// HospitalRegisterScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useScan } from "../context/ScanContext";
import UploadFile from "../src/components/Home/UploadFile";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";

const AI_API_URL =
  process.env.AI_API_URL ||
  "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app/";

export default function TunjukkanSuratAjuBandingScreen() {
  const router = useRouter();

  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [invoiceImage, setInvoiceImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const [downloadFile, setDownloadFile] = useState<{
    filename: string;
    download_url: string;
  } | null>(null);

  const handleClickBuatAjuBanding = async () => {
    try {
      // Dummy body sesuai format backend
      const body = {
        nama: "arkananta",
        no_polis: "123456",
        alamat: "Jl. Dummy No. 1",
        no_telepon: "08123456789",
        tanggal_pengajuan: "2025-09-27",
        nomor_klaim: "KLM123",
        perihal_klaim: "Rawat inap",
        alasan_penolakan: "Dokumen tidak lengkap",
        alasan_banding: "Semua dokumen sudah lengkap",
        nama_perusahaan_asuransi: "PT Asuransi Sehat Sentosa",
      };

      const res = await fetch(`${AI_API_URL}/surat-aju-banding`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Gagal membuat surat");
      }

      // ✅ simpan hasil agar UploadFile bisa render versi download
      setDownloadFile({
        filename: data.filename,
        download_url: data.download_url,
      });
    } catch (err: any) {
      console.error("❌ Gagal buat surat:", err);
      Alert.alert("Error", err.message || "Gagal membuat surat");
    }
  };

  return (
    <ScreenContainer>
      {/* Body */}
      <View style={styles.title}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.titleBold}>Lihat dan Tunjukan Surat </Text>
          <Text style={styles.titleNormal}>untuk</Text>
        </View>
        <Text style={styles.titleNormal}>Aju Banding!</Text>
      </View>
      <Text style={styles.subtitle}>
        Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
        ditanggung oleh asuransi.
      </Text>

      {/* Upload Invoice */}
      <Text style={[styles.sectionTitle, { fontSize: 18 }]}>
        Upload Surat Aju Banding
      </Text>
      <Text style={styles.desc}>Upload dokumen untuk disimpan</Text>

      <UploadFile
        variant={"scan-netral"}
        uri={imageUriInvoicers}
        namaFile="Aju Banding"
        icon={"upload"}
        onChange={(uri) => setInvoiceImage(uri)}
      />

      <Text style={[styles.sectionTitle, { fontSize: 18 }]}>
        Minta AI untuk membuatkan surat
      </Text>
      <TouchableOpacity
        style={[styles.button, { width: 268, aspectRatio: 268 / 50 }]}
        onPress={() => {
          handleClickBuatAjuBanding();
        }}
      >
        <Text style={styles.buttonText}>Buatkan Surat Aju Banding</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>

      {downloadFile && (
        <UploadFile
          variant="scan-netral"
          namaFile={downloadFile.filename}
          icon="download"
          uri={downloadFile.download_url} // kasih URL agar bisa dipakai handleDownload
        />
      )}

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setShowModal(true);
        }}
      >
        <Text style={styles.buttonText}>Lanjutkan Proses</Text>
        <Ionicons name="arrow-forward" size={18} color="#fff" />
      </TouchableOpacity>
      {showModal && (
        <Modal
          visible={showModal}
          title="Ingin Request Tambahan?"
          onClose={() => setShowModal(false)}
          onTrue={() => router.push("/(tabs)")}
          falseText="Tidak"
          trueText="Tambah"
        />
      )}
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
    fontWeight: "700",
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
