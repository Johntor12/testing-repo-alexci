import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = ({ navigation }: any) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    // Log input data
    console.log("Register input:", { email, password, name, phone });
    const success = await register(email, password, name, phone);
    // Log hasil register
    console.log("Register result:", success);
    if (success) {
      router.push("/(auth)/login");
    } else {
      Alert.alert("Registrasi Gagal", "Isi semua data dengan benar!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>

      <View style={styles.formContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text>Name</Text>
          <Text style={{ color: "red" }}> *</Text>
        </View>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Masukkan Nama Anda"
        />

        <View style={{ flexDirection: "row" }}>
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

        <View style={{ flexDirection: "row" }}>
          <Text>No. Telepon</Text>
          <Text style={{ color: "red" }}></Text>
        </View>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Masukkan Nomor Telepon Anda"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>DAFTAR</Text>
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

        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "center" }}
          onPress={() => router.push("/(auth)/login")}
        >
          <Text style={styles.link}>Sudah Punya Akun? </Text>
          <Text style={[styles.link, { textDecorationLine: "underline" }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F7FF",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
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

export default RegisterScreen;
