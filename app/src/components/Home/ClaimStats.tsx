// src/components/ClaimDetail/ClaimStats.tsx
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function ClaimStats({
  items,
}: {
  items: { title: string; percent: number }[];
}) {
  return (
    <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
      {items.map((it) => (
        <View key={it.title} style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{it.title}</Text>
            <View style={styles.detailPill}>
              <Text style={styles.detailText}>Detail</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.percent}>{it.percent}%</Text>
            <View style={styles.ringRow}>
              <View style={styles.ringBg} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const SIZE = 64;
const THICK = 8;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontWeight: "700",
    color: Colors.text,
    maxWidth: "70%",
    marginRight: 4,
  },
  detailPill: {
    backgroundColor: Colors.primaryBlue700,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  detailText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  ringRow: {
    marginTop: 12,
    width: SIZE,
    height: SIZE,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
  ringBg: {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: THICK,
    borderRightColor: "#EDEBFF",
    borderColor: "#B8A4FF",
    transform: [{ rotateZ: "-180deg" }],
  },
  percent: { fontSize: 20, fontWeight: "800", color: "#0D1835" },
});
