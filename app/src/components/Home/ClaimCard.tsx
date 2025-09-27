import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Roboto_700Bold } from "@expo-google-fonts/roboto";
import { useFonts } from "@expo-google-fonts/roboto/useFonts";
import { useState } from "react";
import Colors from "../../constants/Colors";
import Modal from "../Modal";

const { width, height } = Dimensions.get("window");

const cardWidth = (width * 362) / 412;
const cardHeight = (height * 209) / 1074;

interface ClaimCardProps {
  title?: string;
  buttonText?: string;
  onClick?: () => void;
  modalActivation?: "on" | "off";
  onFalseAction?: () => void;
  onTrueAction?: () => void;
}

export default function ClaimCard({
  title = "Klaim Asuransi Kesehatan Terakhir",
  buttonText = "KLAIM SEKARANG →",
  onClick,
  modalActivation = "on",
  onFalseAction = () => {},
  onTrueAction = () => {},
}: ClaimCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    Roboto_700Bold,
  });
  if (!fontsLoaded) {
    return null; // Or a loading indicator
  } else {
    return (
      <View style={styles.card}>
        <Image
          source={require("../../../../assets/images/patternHeader.png")}
          style={styles.headerPatternLeft}
          resizeMode="contain"
        />
        <Image
          source={require("../../../../assets/images/patternHeader.png")}
          style={styles.headerPatternRight}
          resizeMode="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setIsVisible(true);
            }}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>

          {modalActivation ? (
            <Modal
              visible={isVisible}
              title="Sudah mendapat diagnosis?"
              subtitle="Cerita Gejalamu, Kami bantu Cek Klaimnya"
              onClose={() => setIsVisible(false)}
              onFalse={onFalseAction}
              onTrue={onTrueAction}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary500,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "column",
    width: cardWidth,
    aspectRatio: 362 / 209,
  },
  title: {
    width: 200,
    color: "#fff",
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "Roboto_700Bold",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: Colors.primaryBlue700,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  headerPatternRight: {
    position: "absolute",
    top: -12,
    right: -48,
    width: width * 0.5,
    height: 110,
  },
  headerPatternLeft: {
    position: "absolute",
    bottom: -12,
    left: -48,
    width: width * 0.5,
    height: 115,
  },
});
