import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

const SelamatMenjalaniPemeriksaan = () => {

    const router = useRouter();

  return (
        <LinearGradient
        colors={[
            "#053596", // 0%
            "#0A2A68", // 18%
            "#0B2965", // 29%
            "#121926", // 64%
            "#121926", // 71%
            "#121926", // 83%
            "#0040C1", // 93%
            "#121926", // 97%
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
        >
        <Pressable style={styles.center} onPress={() => {
          router.push("/screen/upload-diagnosis-dokter")
        }}>
            <Image
            source={require("../../assets/images/doctors_in_white_coast.png")}
            style={{ width: 250, height: 300 }}
            resizeMode="contain"
            />
            <Text style={styles.text}>Selamat Menjalani Pemeriksaan</Text>
            <Text style={{ color: "white", marginTop: 8 }}>
            Pastikan kamu siap untuk melakukan pemeriksaan
            </Text>
        </Pressable>
        </LinearGradient>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
  },
});

export default SelamatMenjalaniPemeriksaan;
