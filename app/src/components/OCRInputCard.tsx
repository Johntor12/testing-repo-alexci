import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OCRInputCardProps {
  onScanPress: () => void;
  onManualInputPress: () => void;
  title: string;
}

const OCRInputCard = ({
  onScanPress,
  onManualInputPress,
  title,
}: OCRInputCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        Choose how youd like to provide this information:
      </Text>

      <TouchableOpacity style={styles.option} onPress={onScanPress}>
        <Text style={styles.optionText}>📷 Scan Document</Text>
        <Text style={styles.optionSubtext}>
          Take a photo to extract information automatically
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={onManualInputPress}>
        <Text style={styles.optionText}>✏️ Enter Manually</Text>
        <Text style={styles.optionSubtext}>Type the information yourself</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  option: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionSubtext: {
    fontSize: 12,
    color: "#666",
  },
});

export default OCRInputCard;
