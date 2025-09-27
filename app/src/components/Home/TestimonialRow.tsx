// src/components/ClaimDetail/TestimonialRow.tsx
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function TestimonialRow() {
  return (
    <View style={styles.row}>
      <Image
        source={require("../../../../assets/images/woman.png")}
        style={styles.pic}
      />
      <View style={styles.quoteBox}>
        <Text style={styles.quote}>
          “Berkat bantuan asuransi, ibu saya berhasil sembuh dari stroke karena
          layanan operasi yang optimal.”
        </Text>
        <Text style={styles.signature}>-Hanifah</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, alignItems: "center" },
  pic: { width: 110, height: 110, borderRadius: 12, resizeMode: "cover" },
  quoteBox: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 12,
  },
  quote: { color: Colors.text, lineHeight: 18 },
  signature: { color: "#6B7280", textAlign: "right", marginTop: 8 },
});
