import { ReactNode, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Colors from "../../constants/Colors";

interface CustomButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
  customWidth?: number;
  customHeight?: number;
  customStyle?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: ReactNode; // bisa kasih icon atau element di samping label
}

const CustomButton = ({
  label,
  onPress,
  variant = "primary",
  customWidth,
  customHeight,
  customStyle,
  labelStyle,
  icon,
}: CustomButtonProps) => {
  const buttonStyle = useMemo(
    () => [
      styles.buttonContainer,
      {
        width: customWidth || 179,
        height: customHeight || undefined,
        backgroundColor:
          variant === "primary" ? Colors.primaryBlue700 : "white",
      },
      customStyle,
    ],
    [customWidth, customHeight, customStyle]
  );

  const labelColor =
    variant === "primary" ? Colors.white : Colors.primaryBlue700;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.button}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.buttonLabel, { color: labelColor }, labelStyle]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
  },
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    gap: 8,
    overflow: "hidden",
  },
  buttonLabel: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomButton;
