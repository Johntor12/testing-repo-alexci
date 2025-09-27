// src/components/KemungkinanClaim.tsx
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

interface PolisItem {
  label: string;
  status: "green" | "yellow" | "red";
}

interface ClaimData {
  percentage: number;
  dapatDiklaim: boolean;
  kemungkinanDiagnosis: string;
  polisMenanggung: PolisItem[];
}

export default function KemungkinanClaim({ data }: { data: ClaimData }) {
  const getStatusIcon = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green":
        return { icon: "🟢", color: "green" };
      case "yellow":
        return { icon: "🟡", color: "orange" };
      case "red":
        return { icon: "🔴", color: "red" };
      default:
        return { icon: "⚪", color: "black" };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.headerText}>
          {data.percentage}% Kemungkinan Kondisimu
        </Text>
        <Text style={styles.headerClaimable}>
          {data.dapatDiklaim ? "Dapat Diklaim" : "Tidak Dapat Diklaim"}
        </Text>
      </View>

      <View style={styles.diagnosisCard}>
        <Text style={styles.diagnosisTitle}>Kemungkinan Diagnosis:</Text>
        <Text style={styles.diagnosisText}>{data.kemungkinanDiagnosis}</Text>

        <Text>📄 Polis Kamu Menanggung:</Text>
        {data.polisMenanggung.map((item, index) => {
          const { icon, color } = getStatusIcon(item.status);
          return (
            <Text key={index} style={[styles.polisItem, { color }]}>
              {icon} {item.label}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "column", gap: 12 },
  headerCard: {
    width: "100%",
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primaryBlue700,
    marginTop: 12,
  },
  headerText: { fontWeight: "bold", fontSize: 20 },
  headerClaimable: {
    fontWeight: "bold",
    fontSize: 22,
    color: Colors.primaryBlue700,
  },
  diagnosisCard: {
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: Colors.primaryBlue700,
    borderWidth: 2,
  },
  diagnosisTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  diagnosisText: { fontSize: 16, marginBottom: 12 },
  polisItem: { fontSize: 14, marginVertical: 2 },
});
