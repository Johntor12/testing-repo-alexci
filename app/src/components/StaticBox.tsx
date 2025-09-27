import { StyleSheet, Text, View } from "react-native";

interface StaticBoxProps {
  title?: string;
  duration?: string;
  content?: string;
}

export default function StaticBox({
  title = "Produk dan Layanan",
  duration = "10 Menit",
  content = "BISAcare menyediakan fitur Appeal & Resolution untuk membantu pasien melakukan aju banding klaim yang ditolak oleh asuransi. Fitur ini memanfaatkan AI Rejection Rewriter yang mengubah bahasa teknis menjadi penjelasan sederhana, serta Appeal Wizard yang memandu pasien menyiapkan dokumen banding dengan format resmi. Dengan ini, pasien tidak lagi kebingungan menghadapi alasan penolakan, dan proses banding bisa dilakukan cepat, transparan, serta dapat dilacak statusnya.",
}: StaticBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textTitleContainer}>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>{title}</Text>
        <Text>{duration}</Text>
      </View>
      <Text style={styles.textContent}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#3737FA",
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
  },
  textTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContent: {
    marginTop: 8,
    fontSize: 11,
  },
});
