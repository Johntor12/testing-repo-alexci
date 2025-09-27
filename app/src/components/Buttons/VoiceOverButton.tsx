import { useKeluhan } from "@/app/context/KeluhanContext";
import { Audio } from "expo-av";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Colors from "../../constants/Colors";
// import { FFmpegKit } from "ffmpeg"

interface VoiceOverButtonProps {
  onResult?: (text: string) => void;
}

export default function VoiceOverButton({ onResult }: VoiceOverButtonProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveform, setWaveform] = useState<number[]>([]);

  const { keluhan, setKeluhan } = useKeluhan();

  const API_AI_URL =
    process.env.AI_API_URL ||
    "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app/";

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri || null);

    if (uri) {
      try {
        const text = await uploadToAI(uri);
        setKeluhan(text); // hasil transkrip isi ke input keluhan
        onResult?.(text);
      } catch (e) {
        console.log("Error Gagal mengirim Audio ke AI", e);
      }
    }

    // Dummy waveform generator (simulasi)
    const dummyData = Array.from(
      { length: 80 },
      (_, i) => Math.sin(i / 5) * 40 + 50 + Math.random() * 10
    );
    setWaveform(dummyData);

    setRecording(null);
  };

  const uploadToAI = async (uri: string) => {
    try {
      const apiUrl = `${API_AI_URL}/transcribe`;

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/mp3",
        name: "recording.mp3",
      } as any);

      console.log("Uploading file:", uri);

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text;
        throw new Error(`Gagal upload: ${response.status} -${text}`);
      }

      const data = await response.json();
      console.log("Hasil AI:", data);

      // return text transkrip dari AI
      return data.text;
    } catch (err) {
      console.error("Upload gagal:", err);
      throw err;
    }
  };

  const playPauseAudio = async () => {
    if (!audioUri) return;

    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else if (sound && !isPlaying) {
      const status = await sound.getStatusAsync();
      if (
        status.isLoaded &&
        status.positionMillis >= (status.durationMillis || 0)
      ) {
        await sound.replayAsync(); // mulai dari awal lagi
      } else {
        await sound.playAsync();
      }
      setIsPlaying(true);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    }
  };

  // ---- Convert waveform data -> Smooth Path ----
  const getSmoothPath = (data: number[], width = 320, height = 100) => {
    if (data.length === 0) return "";
    const step = width / (data.length - 1);
    let d = `M 0 ${height - data[0]}`;
    for (let i = 1; i < data.length; i++) {
      const x = i * step;
      const y = height - data[i];
      const prevX = (i - 1) * step;
      const prevY = height - data[i - 1];
      const cpx = (prevX + x) / 2; // control point (Bezier)
      d += ` Q ${cpx} ${prevY}, ${x} ${y}`;
    }
    return d;
  };

  return (
    <View>
      {/* Button Record */}
      <Pressable
        style={styles.VoiceOverButton}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.voiceoverText}>
          {recording ? "Stop Recording" : "Gunakan VoiceOver"}
        </Text>
      </Pressable>

      {/* Media Player & Waveform */}
      {audioUri && (
        <View style={{ marginVertical: 16, alignItems: "center" }}>
          {/* Waveform Visualizer (dummy sine wave) */}
          <Svg height="100" width="320">
            <Path
              d={getSmoothPath(waveform, 320, 100)}
              fill="#a0f0f0"
              stroke={Colors.primaryBlue700}
              strokeWidth={2}
            />
          </Svg>

          <Pressable
            onPress={playPauseAudio}
            style={[styles.playButton, { marginTop: 12 }]}
          >
            <Text style={styles.voiceoverText}>{isPlaying ? "⏸" : " ▶"}</Text>
          </Pressable>
        </View>
      )}

      {/* Input */}
      <TextInput
        style={styles.textInput}
        placeholder="Input..."
        value={keluhan}
        onChangeText={setKeluhan}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  VoiceOverButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlue700,
    width: 177,
    aspectRatio: 177 / 36,
    borderRadius: 12,
    marginBottom: 12,
  },
  voiceoverText: {
    color: "white",
  },
  playButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryBlue700,
    width: 75,
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: "white",
    padding: 16,
    width: "100%",
    aspectRatio: 366 / 237,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EBE0FF",
    marginVertical: 12,
  },
});
