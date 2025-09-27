import {
  Image,
  Pressable,
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ModalProps {
  visible?: boolean;
  title?: string;
  subtitle?: string;
  titleCommand?: string;
  subtitleCommand?: string;
  falseText?: string;
  trueText?: string;
  onClose: () => void;
  onFalse?: () => void;
  onTrue?: () => void;
}

export default function Modal({
  visible = false,
  title = "Sudah mendapat Diagnosis?",
  subtitle = "Cerita Gejalamu, Kami bantu Cek Klaimnya",
  titleCommand = "Selamat Datang di BISAcare",
  subtitleCommand = "Kami Bantu Cek Klaim di asuransimu",
  falseText = "Belum Dapat",
  trueText = "Sudah Dapat",
  onClose,
  onFalse,
  onTrue,
}: ModalProps) {
  const handleFalse = () => {
    onClose();
    onFalse?.();
  };

  const handleTrue = () => {
    onClose();
    onTrue?.();
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../../../assets/images/logo.png")} // ganti sesuai assetmu
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Title & subtitle */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                columnGap: 4,
              }}
            >
              <Text style={styles.title}>{titleCommand}</Text>
              <Text style={styles.subtitle}>{subtitleCommand}</Text>
            </View>
          </View>

          <View style={styles.separator} />

          <Text style={styles.status}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCancel} onPress={handleFalse}>
              <Text style={styles.cancelText}>{falseText}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonTrue} onPress={handleTrue}>
              <Text style={styles.proceedText}>{trueText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)", // ⬅️ background gelap 10%
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 310,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "stretch",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
    width: "100%",
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTrue: {
    flex: 1,
    padding: 12,
    backgroundColor: "#005d7a",
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#333",
    fontWeight: "600",
  },
  proceedText: {
    color: "#fff",
    fontWeight: "600",
  },
});
