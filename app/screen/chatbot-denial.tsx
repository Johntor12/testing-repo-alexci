import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import ChatArea, { Message } from "../src/components/ChatArea";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";

const API_URL =
  process.env.AI_API_URL ||
  "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app";

interface ChatbotScreenProps {
  variant?: "primary" | "secondary" | "terniary";
}

export default function ChatbotClaimDenial({
  variant = "terniary",
}: ChatbotScreenProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now().toString(),
      text: `Selamat Siang ${user}. Ini adalah AI Insurance Guide. SIlahkan bertanya terkait pembuatan asuransi.`,
      sender: "assistant",
    },
  ]);

  // ambil history saat pertama kali buka

  return (
    <ScreenContainer
      scrollable={false}
      variantColor="secondary"
      customStyle={{ padding: 0 }}
    >
      <LinearGradient
        colors={["#9bb6ffff", "#3737FA", "#5301DD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.14, 0.54, 1]}
        style={[
          styles.gradientWrapper,
          { height: 2100 },
          variant === "primary" && { padding: 16 },
        ]}
      >
        {variant === "secondary" && (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>
              Conversational AI Claim Helper
            </Text>
            <Text style={styles.headerSubtitle}>
              Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu
              bisa ditanggung oleh asuransi.
            </Text>
          </View>
        )}
        {variant === "terniary" && (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>AI Claim Denial Rewriter</Text>
            <Text style={styles.headerSubtitle}>
              Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu
              bisa ditanggung oleh asuransi.
            </Text>
          </View>
        )}

        <View style={{ height: 450 }}>
          <ChatArea
            url={"ai-insurance-guide"}
            messages={messages}
            setMessages={setMessages}
          />
        </View>

        {variant === "secondary" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Lanjutkan Proses →</Text>
          </TouchableOpacity>
        )}
        {variant === "terniary" && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 12,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.buttonText}>Kirim Ulang</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/screen/panduan-aju-banding")}
            >
              <Text style={styles.buttonText}>Ajukan Banding</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>

      {showModal && (
        <Modal
          visible={showModal}
          title="Ingin Request Tambahan?"
          onClose={() => setShowModal(false)}
          onTrue={() => router.push("/screen/claim-form")}
          falseText="Tidak"
          trueText="Tambah"
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
  },
  headerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    width: 154,
    aspectRatio: 154 / 60,
    marginTop: 32,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  clearButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#ff4444",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
