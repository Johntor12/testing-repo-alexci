// src/components/ClaimDetail/FloatingChat.tsx
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

export default function FloatingChat() {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <Pressable
        style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}
        onPress={() => {
          router.push("/screen/chatbot");
        }}
      >
        <Text style={styles.icon}>💬</Text>
        <Text style={styles.label}>BISAbot</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { bottom: 32, alignItems: "flex-end" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  icon: { fontSize: 16 },
  label: { color: Colors.primary500, fontWeight: "800" },
});
