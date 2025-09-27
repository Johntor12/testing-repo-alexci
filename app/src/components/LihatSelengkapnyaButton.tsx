import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

interface LihatSelengkapnyaButtonProps {
  variant?: "primary" | "secondary";
  onPress?: () => void;
}

const LihatSelengkapnyaButton = ({
  variant = "primary",
  onPress = () => {},
}: LihatSelengkapnyaButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {variant === "primary" ? (
        <>
          <Text style={styles.text}>Lihat Selengkapnya</Text>
          <View style={styles.iconContainer}>
            <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
              <Path
                d="M2 5.5h7m0 0L6.5 3m2.5 2.5L6.5 8"
                stroke="#EFF9FF"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </>
      ) : (
        <Text style={styles.text}>Lihat Selengkapnya ↗</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#005D85",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#005D85",
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  iconContainer: {
    marginLeft: 8,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LihatSelengkapnyaButton;
