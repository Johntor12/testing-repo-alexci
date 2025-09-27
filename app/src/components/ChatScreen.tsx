import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Jika tidak pakai expo, ganti dengan: import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");

// Define message type
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Selamat Siang Deira! Apa keluhanmu?",
      isBot: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      text: "Haloo BISAbot! keluhanku ABCD",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto scroll to bottom when new message
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  // Simulate API call (ganti dengan real API nanti)
  const sendMessage = async (): Promise<void> => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Terima kasih atas keluhan Anda. Saya akan membantu mencarikan solusi terbaik untuk masalah ini.",
        isBot: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isBot ? styles.userMessage : styles.botMessage,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isBot ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.isBot ? styles.userText : styles.botText,
          ]}
        >
          {message.text}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6B73FF" barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={["#6B73FF", "#9c27b0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>💬</Text>
            </View>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>BISAbot</Text>
            <Text style={styles.headerSubtitle}>You can ask me anything!</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}

        {/* Loading indicator */}
        {isLoading && (
          <View style={[styles.messageContainer, styles.botMessage]}>
            <View style={[styles.messageBubble, styles.botBubble]}>
              <Text style={styles.loadingText}>BISAbot sedang mengetik...</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#999"
            multiline
            maxLength={500}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, { opacity: inputText.trim() ? 1 : 0.5 }]}
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom icons (grid and send) */}
        <View style={styles.bottomIcons}>
          <TouchableOpacity style={styles.gridIcon}>
            <Text style={styles.iconText}>⊞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendIconBottom}>
            <Text style={styles.iconText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // Header Styles
  header: {
    paddingTop: StatusBar.currentHeight || 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    marginRight: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },

  // Messages Styles
  messagesContainer: {
    flex: 1,
    backgroundColor: "#e8f4f8",
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: width * 0.8,
  },
  botMessage: {
    alignSelf: "flex-start",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  botBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 6,
  },
  userBubble: {
    backgroundColor: "#4A90E2",
    borderBottomRightRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  botText: {
    color: "#333",
  },
  userText: {
    color: "white",
  },
  loadingText: {
    color: "#666",
    fontStyle: "italic",
  },

  // Input Styles
  inputContainer: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
  },
  sendIcon: {
    fontSize: 20,
    color: "#4A90E2",
  },
  bottomIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  gridIcon: {
    padding: 8,
  },
  sendIconBottom: {
    padding: 8,
  },
  iconText: {
    fontSize: 18,
    color: "#666",
  },
});

export default ChatScreen;
