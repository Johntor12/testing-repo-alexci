// src/components/Home/CommunityCarousel.tsx
import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";

const imgs = [
  require("../../../../assets/images/community-1.png"),
  require("../../../../assets/images/community-1.png"),
  require("../../../../assets/images/community-1.png"),
];

export default function CommunityCarousel() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 12 }}
    >
      {imgs.map((src, idx) => (
        <View key={idx} style={styles.card}>
          <Image source={src} style={styles.img} resizeMode="cover" />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 110,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.softGray,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  img: { width: "100%", height: "100%" },
});
