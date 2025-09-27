import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EligibilityResultBoxProps {
  isEligible: boolean;
  reason?: string;
  recommendedAction?: string;
}

const EligibilityResultBox = ({
  isEligible,
  reason,
  recommendedAction,
}: EligibilityResultBoxProps) => {
  return (
    <View
      style={[
        styles.container,
        isEligible ? styles.eligible : styles.ineligible,
      ]}
    >
      <Text style={styles.title}>
        {isEligible ? "✅ Eligible for Benefits" : "❌ Not Eligible"}
      </Text>

      {reason && <Text style={styles.reason}>{reason}</Text>}

      {recommendedAction && (
        <View style={styles.actionContainer}>
          <Text style={styles.actionLabel}>Recommended Action:</Text>
          <Text style={styles.action}>{recommendedAction}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  eligible: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
  ineligible: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  reason: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  actionContainer: {
    marginTop: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  action: {
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default EligibilityResultBox;
