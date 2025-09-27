import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";

export default function CekTanggapanButton() {
  return (
    <Pressable style={styles.cekTanggapanButton}>
      <Text style={styles.cekTanggapanText}>Cek Tanggapan →</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cekTanggapanButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary500,
    width: 177,
    aspectRatio: 177 / 36,
    borderRadius: 12,
  },
  cekTanggapanText: {
    color: "white",
  },
});
