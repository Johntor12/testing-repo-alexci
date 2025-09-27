// src/components/Home/UploadCard.tsx
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

export default function UploadCard({
  title,
  buttonLabel,
  icon,
}: {
  title: string;
  buttonLabel: string;
  icon: any;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.dropzone}>
        <Image source={icon} style={{ width: 28, height: 28, opacity: 0.8 }} />
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>{buttonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 10,
  },
  title: { fontWeight: "800", color: Colors.text },
  dropzone: {
    height: 110,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.softGray,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: Colors.accentSoft,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnText: { color: Colors.mutedBlue, fontWeight: "800" },
});
