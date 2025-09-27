// src/components/ClaimDetail/SymptomsList.tsx
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function SymptomsList({ items }: { items: string[] }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      {items.map((it, idx) => (
        <View
          key={idx}
          style={[styles.row, idx !== items.length - 1 && styles.rowDivider]}
        >
          <Image
            source={require("../../../../assets/images/ic-koper.png")}
            style={{ width: 16, height: 16, marginRight: 10 }}
          />
          <View>
            <Text style={styles.title}>{it}</Text>
            <Text style={styles.caption}>Heart rate detected at 42 bpm</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", padding: 12 },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  title: { fontWeight: "700", color: Colors.textDark, marginBottom: 2 },
  caption: { color: Colors.muted, fontSize: 12 },
});
