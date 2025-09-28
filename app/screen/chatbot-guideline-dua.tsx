import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import ChatArea, { Message } from "../src/components/ChatArea";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";

const API_URL =
  process.env.AI_API_URL ||
  "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app";

interface ChatbotScreenProps {
  variant?: "primary" | "secondary";
}

export default function ChatbotScreenGuideline({
  variant = "secondary",
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
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/ai-insurance-guide/history`);
        if (!res.ok) throw new Error("Gagal ambil history");
        const data = await res.json();
        console.log("Fetched chat = ", data);

        if (Array.isArray(data.history)) {
          const formattedMessages: Message[] = data.history.map(
            (item: { role: string; content: string }, index: number) => ({
              id: index.toString(),
              text: item.content,
              sender: item.role === "user" ? "user" : "assistant",
            })
          );
          setMessages(formattedMessages);
        } else {
          console.warn("History tidak berbentuk array:", data);
        }
      } catch (err) {
        console.error("Error fetch history:", err);
      }
    };
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    try {
      await fetch(`${API_URL}/ai-insurance-guide/history`, {
        method: "DELETE",
      });
      setMessages([
        {
          id: Date.now().toString(),
          text: `Selamat Siang ${user}. Ini adalah AI Insurance Guide. SIlahkan bertanya terkait pembuatan asuransi.`,
          sender: "assistant",
        },
      ]); // kosongkan di UI
    } catch (err) {
      console.error("Gagal clear history:", err);
    }
  };

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

        {/* Chat Area */}

        <ChatArea
          url={"ai-insurance-guide"}
          messages={messages}
          setMessages={setMessages}
        />

        {variant === "secondary" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.buttonText}>Lanjutkan Proses →</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      {showModal && (
        <Modal
          visible={showModal}
          title="Ingin Request Tambahan?"
          onClose={() => setShowModal(false)}
          onTrue={() => router.push("/screen/claim-final")}
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
    marginTop: 32,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
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
