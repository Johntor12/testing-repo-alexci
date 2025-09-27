import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useScan } from "../context/ScanContext";
import ScreenContainer from "../src/components/ScreenContainer";
import Colors from "../src/constants/Colors";

const API_AI_URL =
  process.env.AI_API_URL ||
  "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app";

export default function CoverageScreen() {
  const router = useRouter();

  const { resultAsuransi, resultDiagnosis, resultInvoicers } = useScan();

  const [tableData, setTableData] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchCoverage = async () => {
      try {
        const response = await fetch(`${API_AI_URL}/ai-coverage-display`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            diagnosis: resultDiagnosis || {},
            asuransi: resultAsuransi || {},
            invoice: resultInvoicers || {},
            extra: {},
          }),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Buat table data dengan default value jika field null/undefined
        const defaultVal = "Tidak tersedia";
        const tableFormatted = [
          { label: "Nama", value: data.nama || defaultVal },
          { label: "No. Polis", value: data.no_polis || defaultVal },
          { label: "Alamat", value: data.alamat || defaultVal },
          { label: "No. Telepon", value: data.no_telepon || defaultVal },
          {
            label: "Tanggal Pengajuan",
            value: data.tanggal_pengajuan || defaultVal,
          },
          { label: "Nomor Klaim", value: data.nomor_klaim || defaultVal },
          { label: "Perihal Klaim", value: data.perihal_klaim || defaultVal },
          {
            label: "Alasan Penolakan",
            value: data.alasan_penolakan || defaultVal,
          },
          { label: "Alasan Banding", value: data.alasan_banding || defaultVal },
          {
            label: "Nama Perusahaan Asuransi",
            value: data.nama_perusahaan_asuransi || defaultVal,
          },
        ];

        setTableData(tableFormatted);
      } catch (err) {
        console.error("Gagal fetch coverage:", err);
        // fallback table data
        setTableData([{ label: "Error", value: "Tidak dapat mengambil data" }]);
      }
    };

    fetchCoverage();
  }, [resultDiagnosis, resultAsuransi, resultInvoicers]);

  return (
    <ScreenContainer variantColor="secondary">
      {/* Subtitle */}
      <Text style={styles.subtitle}>
        <Text style={{ fontWeight: "700", fontStyle: "italic" }}>
          Coverage Display Interface{" "}
        </Text>
        (Apa saja yang menjadi tanggungan)
      </Text>
      <Text style={styles.desc}>
        Kami bantu cek apakah kondisimu bisa ditanggung oleh asuransi.
      </Text>

      {/* Table */}
      <View style={styles.table}>
        {tableData.map((item, index) => (
          <View
            key={index}
            style={[
              styles.row,
              index === 0 && styles.firstRow, // background berbeda untuk row pertama
            ]}
          >
            <View style={[styles.cell, styles.leftCell]}>
              <Text style={styles.cellTextLabel}>{item.label}</Text>
            </View>
            {/* garis vertikal */}
            <View style={styles.divider} />
            <View style={[styles.cell, styles.rightCell]}>
              <Text style={styles.cellTextValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/screen/selamat-menjalani-pemeriksaan");
        }}
      >
        <Text style={styles.buttonText}>Lanjutkan Proses →</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: -72,
    zIndex: 10,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 5,
  },
  desc: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 15,
  },
  table: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  firstRow: {
    backgroundColor: Colors.primary200,
  },

  row: {
    flexDirection: "row",
  },
  leftCell: {
    alignItems: "center",
  },
  rightCell: {
    alignItems: "center",
  },
  cell: {
    flex: 1,
    padding: 10,
  },
  cellTextLabel: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  cellTextValue: {
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  divider: {
    width: 1,
    backgroundColor: "#000",
  },
  button: {
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
