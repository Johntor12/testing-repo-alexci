import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../src/constants/Colors";

const DataPasien = () => {
  return (
    <View style={{ flexDirection: "column", zIndex: 10, padding: 4 }}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <Text style={styles.headerTitleDataPasien}>Data Pasien </Text>
          <Text style={styles.headerTitleYangTerdaftar}>
            yang Terdaftar dari
          </Text>
        </View>
        <Text style={styles.headerTitleYangTerdaftar}>Rumah Sakit</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={require("../../assets/images/Poto_Orang_Profile.png")}
            style={styles.imageProfile}
          />
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 14,
              gap: 8,
              borderBottomColor: "#E3E8EF",
              borderBottomWidth: 1,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#4B5565", fontSize: 14 }}>
                Nama Pasien
              </Text>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 12 }}
              >
                Muhammad Ahsan Dzaki Wiryawan
              </Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={{ color: "#4B5565", fontSize: 14 }}>Kategori</Text>
              <Text
                style={{ color: "black", fontWeight: "bold", fontSize: 12 }}
              >
                Aktif Asuransi
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 12,
            flex: 1,
            backgroundColor: Colors.primary200,
            borderRadius: 12,
            aspectRatio: 302 / 38,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            Sesi akan dimulai pada 10:16:00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DataPasien;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  headerTitleDataPasien: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitleYangTerdaftar: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  imageProfile: {
    width: 85,
    aspectRatio: 85 / 103,
  },
});
