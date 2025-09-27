import { StyleSheet, Text, View } from "react-native";

export default function InformasiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Informasi</Text>
      <Text>Konten informasi / FAQ ditaruh di sini.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
});
