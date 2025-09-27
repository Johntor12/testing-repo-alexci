// src/components/ClaimDetail/ClaimProgressCard.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import Colors from "../../constants/Colors";

type ClaimProgressCardProps = {
  progress?: number; // 0–100
  size?: number; // diameter lingkaran
  strokeWidth?: number; // tebal ring
  title?: string;
  ctaText?: string;
  onPress?: () => void;
  showIcon?: boolean;
};

const { width, height } = Dimensions.get("window");

const cardWidth = (width * 362) / 412;
const cardHeight = (height * 209) / 1074;

export default function ClaimProgressCard({
  progress = 50,
  size = 110,
  strokeWidth = 13,
  title = "Progress Klaim\nAsuransi Kesehatan",
  ctaText = "LANJUT KLAIM",
  onPress,
  showIcon = true,
}: ClaimProgressCardProps) {
  const router = useRouter();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.8;
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = circumference - (arcLength * clampedProgress) / 100;

  const progressLength = (arcLength * clampedProgress) / 100;
  // const dashArray = [progressLength, circumference];

  const angle = 144 + (288 * clampedProgress) / 100; // mulai dari -144° → 288° sweep
  const rad = (angle * Math.PI) / 180;
  const markerX = size / 2 + radius * Math.cos(rad);
  const markerY = size / 2 + radius * Math.sin(rad);

  return (
    <View style={styles.card}>
      <Image
        source={require("../../../../assets/images/patternHeader.png")}
        style={styles.headerPatternRight}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Pressable
          onPress={onPress ?? (() => router.push("/screen/input-keluhan"))}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.8 }]}
        >
          <Text style={styles.ctaText}>{ctaText}</Text>
          <Text style={styles.ctaArrow}>↗</Text>
        </Pressable>
      </View>

      {/* Progress Ring */}
      <View
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Svg width={size} height={size} style={{ marginRight: 8 }}>
          {/* Background */}
          <Circle
            stroke={Colors.primaryLight}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={7}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={(circumference - arcLength) / 2}
            strokeLinecap="round"
            rotation="145"
            originX={size / 2}
            originY={size / 2}
          />
          {/* Progress */}
          <Circle
            stroke={Colors.tertiary100} // warna progress
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="145"
            originX={size / 2}
            originY={size / 2}
          />

          {/* Marker (dot di ujung progress) */}
          <Circle
            cx={markerX}
            cy={markerY}
            r={strokeWidth}
            fill={Colors.tertiary100 ?? "#8B5CF6"}
          />
          <Circle cx={markerX} cy={markerY} r={strokeWidth / 2} fill="#fff" />
        </Svg>

        {/* Icon + Text di tengah */}
        {showIcon && (
          <Ionicons
            name="person-circle"
            size={32}
            color={"#fff"}
            style={{ position: "absolute", top: size * 0.17, marginRight: 8 }}
          />
        )}
        <Text style={styles.percent}>{clampedProgress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    overflow: "hidden",
    backgroundColor: Colors.primary500,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerPatternRight: {
    position: "absolute",
    right: -32,
    width: width * 0.5,
    zIndex: 0,
  },
  title: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginBottom: 10,
  },
  cta: {
    alignSelf: "flex-start",
    backgroundColor: Colors.primaryBlue700,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
  ctaText: { color: "#fff", fontWeight: "700", letterSpacing: 0.3 },
  ctaArrow: { color: "#fff", fontSize: 16, marginTop: -2 },
  percent: {
    position: "absolute",
    marginTop: 30,
    color: "#000",
    fontWeight: "800",
    fontSize: 28,
    textAlign: "center",
  },
});
