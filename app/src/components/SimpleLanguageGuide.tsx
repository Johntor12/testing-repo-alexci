import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SimpleLanguageGuideProps {
  term: string;
  explanation: string;
}

const SimpleLanguageGuide = ({
  term,
  explanation,
}: SimpleLanguageGuideProps) => { 
  return (
    <View style={styles.container}>
      <Text style={styles.term}>{term}</Text>
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    marginVertical: 4,
  },
  term: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default SimpleLanguageGuide;
