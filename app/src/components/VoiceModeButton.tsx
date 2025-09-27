import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const VoiceModeButton = ({ label, icon, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
        <View style={styles.iconContainer}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  button: {
    width: 179,
    backgroundColor: "#005D85",
    borderRadius: 8,
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)", // Shadow effect may need adjustment for React Native
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    gap: 8,
    // outline: "1px solid #005D85",
    outlineOffset: -1,
  },
  buttonLabel: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
    lineHeight: 20,
    // wordWrap: "break-word",
  },
  iconContainer: {
    width: 20,
    height: 20,
    position: "relative",
    overflow: "hidden",
  },
});

export default VoiceModeButton;
