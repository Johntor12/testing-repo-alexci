import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Colors from "../src/constants/Colors";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Login Gagal", "Email / password salah!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Text style={styles.subtitle}>Masukkan Email dan Password Anda</Text>

      <View style={styles.formContainer}>
        <View style={{ flexDirection: "row", gap: 0 }}>
          <Text>Email</Text>
          <Text style={{ color: "red" }}> *</Text>
        </View>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Masukkan Email Anda"
        />

        <View style={{ flexDirection: "row" }}>
          <Text>Password</Text>
          <Text style={{ color: "red" }}> *</Text>
        </View>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Masukkan Password Anda"
        />

        <View style={styles.lupaPasswordContainer}>
          <Pressable onPress={() => {}}>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "Inters",
                color: "#5F8797",
                fontSize: 14,
              }}
            >
              Lupa Password ?
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>MASUK</Text>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            position: "relative",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 8,
            gap: 8,
          }}
        >
          <View
            style={{
              position: "relative",
              backgroundColor: "black",
              width: "42%",
              height: 1,
            }}
          ></View>
          <Text
            style={{
              color: "#5F8797",
            }}
          >
            OR
          </Text>
          <View
            style={{ backgroundColor: "black", width: "42%", height: 1 }}
          ></View>
        </View>

        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}
        >
          <View
            style={{
              width: 32,
              aspectRatio: 1,
              backgroundColor: "#E3E8EF",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              padding: 4,
            }}
          ></View>
          <View
            style={{
              width: 32,
              aspectRatio: 1,
              backgroundColor: "#E3E8EF",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              padding: 4,
            }}
          ></View>
          <View
            style={{
              width: 32,
              aspectRatio: 1,
              backgroundColor: "#E3E8EF",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              padding: 4,
            }}
          ></View>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={styles.link}>Belum Punya Akun? </Text>
            <Text style={[styles.link, { textDecorationLine: "underline" }]}>
              Daftar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
    padding: 20,
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    backgroundColor: "#fff",
    fontFamily: "Inter",
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderRadius: 16,
  },
  lupaPasswordContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#008CBA",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: { color: "#008CBA", marginTop: 15, textAlign: "center" },
});

export default LoginScreen;
