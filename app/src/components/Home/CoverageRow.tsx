// src/components/Home/CoverageRow.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function CoverageRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.circle}>
        <Text style={styles.value}>{value}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 8,
  },
  label: { color: Colors.textSubtle, fontWeight: "800" },
  circle: {
    height: 90,
    borderRadius: 12,
    backgroundColor: Colors.softGray,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  value: { fontSize: 22, fontWeight: "900", color: Colors.text },
});
