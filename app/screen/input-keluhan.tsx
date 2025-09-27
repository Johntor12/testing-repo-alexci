import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useKeluhan } from "../context/KeluhanContext";
import CustomButton from "../src/components/Buttons/CustomButton";
import KemungkinanClaim from "../src/components/Home/KemungkinanClaim";
import VoiceOverSection from "../src/components/Home/VoiceOverSection";
import Colors from "../src/constants/Colors";

interface ClaimData {
  percentage: number;
  dapatDiklaim: boolean;
  kemungkinanDiagnosis: string;
  polisMenanggung: { label: string; status: "green" | "yellow" | "red" }[];
}

const dummyData: ClaimData = {
  percentage: 80,
  dapatDiklaim: true,
  kemungkinanDiagnosis: "Infeksi saluran pernapasan atas / Faringitis",
  polisMenanggung: [
    { label: "Konsultasi Dokter Umum", status: "green" },
    { label: "Obat demam & batuk", status: "green" },
    { label: "Tes Lab Dasar", status: "yellow" },
    { label: "Rawat Inap", status: "red" },
  ],
};

export default function InputKeluhanScreen() {
  const [showClaim, setShowClaim] = useState(false);
  const [loading, setLoading] = useState(false);

  const [claimData, setClaimData] = useState<ClaimData | null>(null);

  const { keluhan } = useKeluhan();

  const router = useRouter();

  const handleClaim = () => {
    router.push("/screen/claim-form");
  };

  const handleNotClaim = () => {
    console.log("Tidak Klaim");
  };

  const handleCekTanggapan = async () => {
    setLoading(true);
    setShowClaim(true);

    // try {
    //   const res = await fetch(`${process.env.AI_API_URL}/cek-tanggapan`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ text_keluhan: keluhan }),
    //   });

    //   if (!res.ok) throw new Error("Failed to fetch");
    //   const json = await res.json();

    // setClaimData({
    //   percentage: json.percentage ?? dummyData.percentage,
    //   dapatDiklaim: json.dapatDiklaim ?? dummyData.dapatDiklaim,
    //   kemungkinanDiagnosis: json.kemungkinanDiagnosis ?? dummyData.kemungkinanDiagnosis,
    //   polisMenanggung: json.polisMenanggung ?? dummyData.polisMenanggung,
    // });
    // } catch (err) {
    //   console.log("Error fetching claim:", err);
    // } finally {
    //   setLoading(false);
    // }

    const API_AI_URL =
      process.env.AI_API_URL ||
      "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app/";

    try {
      const res = await fetch(`${API_AI_URL}/cek-tanggapan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_keluhan: keluhan }),
      });

      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();

      setClaimData({
        percentage: json.persentase_kondisi_dapat_diklaim ?? 0,
        dapatDiklaim: (json.persentase_kondisi_dapat_diklaim ?? 0) > 50,
        kemungkinanDiagnosis: json.kemungkinan_diagnosis?.join(", ") ?? "-",
        polisMenanggung: (json.dokumen_pendukung_klaim ?? []).map(
          (d: string) => ({
            label: d,
            status: "green" as const,
          })
        ),
      });
    } catch (err) {
      console.log("Error fetching claim:", err);
    } finally {
      setLoading(false);
    }
    // setTimeout(() => {
    //   setClaimData(dummyData);
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingBottom: showClaim ? 120 : 40,
        }}
      >
        <Text style={styles.headerText}>Apa yang Kamu Rasakan Sekarang?</Text>
        <Text style={styles.subHeaderText}>
          Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
          ditanggung oleh asuransi.
        </Text>

        <VoiceOverSection onCekTanggapan={handleCekTanggapan} />

        {claimData && (
          <>
            <KemungkinanClaim data={claimData} />
            <View style={styles.buttonContainer}>
              <CustomButton
                label="Tidak Klaim"
                onPress={handleNotClaim}
                variant="secondary"
                customWidth={129}
                customStyle={{ marginRight: 8 }}
              />
              <CustomButton
                label="Klaim Sekarang"
                onPress={handleClaim}
                customWidth={180.5}
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Overlay loading */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.primaryBlue700} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: -54,
    marginBottom: 40,
    gap: 12,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: 14,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#ECF1FF",
    position: "absolute",
    bottom: 12,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    zIndex: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    zIndex: 20,
  },
});
