import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const SplashScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        router.replace("/(tabs)"); // ⬅️ langsung ke tab layout (Home ada di sini)
      } else {
        router.replace("/(auth)/login"); // ⬅️ ke login
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>BISAcare</Text>
      <Text style={styles.subtitle}>
        Bantuan Instan Satu klik untuk Asuransimu
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008CBA",
  },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 14, color: "#fff", marginTop: 8 },
});

export default SplashScreen;
