import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

export interface Message {
  id: string;
  text: string;
  image?: string;
  sender: "assistant" | "user";
}

interface ChatAreaProps {
  url?: "bisabot" | "ai-insurance-guide" | "ai-claim-denial";
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ChatArea({
  url = "bisabot",
  messages,
  setMessages,
}: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [imagePick, setImagepick] = useState<string | null>(null);

  const AI_API_URL =
    process.env.AI_API_URL ||
    "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app";

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input || "",
      image: imagePick || undefined,
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setImagepick(null);

    const bodyParams = {
      question: "hai bot",
    };

    try {
      let res;
      if (imagePick) {
        // Jika ada gambar → pakai FormData
        const formData = new FormData();
        formData.append("question", input);
        formData.append("file", {
          uri: imagePick,
          name: "upload.jpg",
          type: "image/jpeg",
        } as any);

        res = await fetch(`${AI_API_URL}/${url}`, {
          method: "POST",
          body: JSON.stringify({ question: input }),
        });
      } else {
        // Hanya text → kirim JSON
        res = await fetch(`${AI_API_URL}/${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        });
      }

      if (!res.ok) throw new Error("Gagal kirim pesan");

      const data: { answer: string } = await res.json();
      console.log("Jawbaan bot = ", data);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: data.answer || "Bot tidak merespons.",
          sender: "assistant",
        },
      ]);
    } catch (err) {
      console.error("❌ Error kirim pesan:", err);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImagepick(result.assets[0].uri);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.messageImage} />
        ) : null}
        {item.text ? (
          <Text style={isUser ? styles.userText : styles.botText}>
            {item.text}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 180}
      style={styles.container}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        keyboardShouldPersistTaps="handled"
      />

      {imagePick && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imagePick }} style={styles.previewImage} />
          <TouchableOpacity onPress={() => setImagepick(null)}>
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
          <MaterialCommunityIcons
            name="view-grid-outline"
            size={22}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    borderRadius: 12,
    zIndex: 10,
  },
  chatContainer: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
  },
  userBubble: {
    backgroundColor: "#2e86de",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  botBubble: {
    backgroundColor: Colors.secondary50,
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  userText: {
    color: "#fff",
  },
  botText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#e1e1e1",
    padding: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
  },
  iconButton: {
    padding: 6,
  },
  messageImage: {
    width: 150,
    height: 100,
    borderRadius: 12,
    marginBottom: 6,
  },
  previewContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
});
