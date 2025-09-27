import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import VoiceOverButton from "../Buttons/VoiceOverButton";

interface VoiceOverSectionProps {
  onCekTanggapan?: (text: string) => void;
}

export default function VoiceOverSection({
  onCekTanggapan,
}: VoiceOverSectionProps) {
  const [hasilAI, setHasilAI] = useState<string>("");
  const [adaRecording, setAdaRecording] = useState(false);

  return (
    <>
      <VoiceOverButton onResult={(text) => setHasilAI(text)} />
      {/* Cek Tanggapan */}
      <Pressable
        style={styles.cekTanggapanButton}
        onPress={() => onCekTanggapan?.(hasilAI)}
      >
        <Text style={styles.cekTanggapanButtonText}>Cek Tanggapan</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  cekTanggapanButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlue700,
    width: 177,
    aspectRatio: 177 / 36,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  cekTanggapanButtonText: {
    color: "white",
  },
});
