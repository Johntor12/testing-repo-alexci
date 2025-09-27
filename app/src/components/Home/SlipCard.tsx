// src/components/ClaimDetail/SlipCard.tsx
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function SlipCard({ title }: { title: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dropzone}>
        <Image
          source={require("../../../../assets/images/ic-download.png")}
          style={{ width: 32, height: 32 }}
        />
      </View>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]}
      >
        <Text style={styles.btnText}>Details</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: { fontWeight: "700", color: Colors.text, marginBottom: 8 },
  dropzone: {
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: Colors.primaryBlue700,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "700" },
});
