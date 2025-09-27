import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface DenialReason {
  category: string;
  explanation: string;
  whatItMeans: string;
  nextSteps: string[];
}

interface DenialExplainerProps {
  denialCode: string;
  denialReason: DenialReason;
}

const DenialExplainer = ({
  denialCode,
  denialReason,
}: DenialExplainerProps) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Understanding Your Denial</Text>
        <Text style={styles.code}>Code: {denialCode}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Happened</Text>
        <Text style={styles.text}>{denialReason.explanation}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What This Means</Text>
        <Text style={styles.text}>{denialReason.whatItMeans}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Next Steps</Text>
        {denialReason.nextSteps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  code: {
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    color: "#007AFF",
  },
  stepText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});

export default DenialExplainer;
