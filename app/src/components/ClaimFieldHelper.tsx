import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ClaimFieldHelperProps {
  fieldName: string;
  helpText: string;
  examples?: string[];
  onShowHelp: () => void;
}

const ClaimFieldHelper = ({
  fieldName,
  helpText,
  examples = [],
  onShowHelp,
}: ClaimFieldHelperProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButton} onPress={onShowHelp}>
        <Text style={styles.helpButtonText}>❓ Help with {fieldName}</Text>
      </TouchableOpacity>

      <View style={styles.helpContent}>
        <Text style={styles.helpText}>{helpText}</Text>

        {examples.length > 0 && (
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Examples:</Text>
            {examples.map((example, index) => (
              <Text key={index} style={styles.example}>
                • {example}
              </Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 8,
  },
  helpButton: {
    alignSelf: "flex-start",
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 6,
    marginBottom: 8,
  },
  helpButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  helpContent: {
    marginTop: 8,
  },
  helpText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  examplesContainer: {
    marginTop: 8,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  example: {
    fontSize: 12,
    color: "#666",
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default ClaimFieldHelper;
