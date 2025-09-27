import { Image, StyleSheet, Text, View } from "react-native";

export default function ProgressCard() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/images/doctors.png")}
        style={styles.image}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Belum Ada Update Progress</Text>
        <Text style={styles.subtitle}>
          Ayo tunggu tawaran datang, sembari mengerjakan hal lainnya!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 150,
    aspectRatio: 179 / 268,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },
});
