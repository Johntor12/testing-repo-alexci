import { useAuth } from "@/app/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

const { width } = Dimensions.get("window");

type Props = (NativeStackHeaderProps | BottomTabHeaderProps) & {
  show?: boolean;
};

// type guard: cek apakah props punya "back"
function isStackHeaderProps(
  props: NativeStackHeaderProps | BottomTabHeaderProps
): props is NativeStackHeaderProps {
  return (props as NativeStackHeaderProps).back !== undefined;
}

export default function AppHeader(props: Props) {
  const { navigation, show = true } = props;
  const { user } = useAuth();
  if (!show) return null;

  const hasBack = isStackHeaderProps(props) && props.back;

  return (
    <View style={styles.header}>
      {hasBack ? (
        <>
          <View style={styles.withBackContainer}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialIcons name="arrow-back-ios-new" size={12} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.greeting}>
              Hi, {user?.name ?? "Deira Aisya"}
            </Text>
          </View>
          <Image
            source={require("../../../assets/images/patternHeader.png")}
            style={styles.headerImageWithBack}
            resizeMode="contain"
          />
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.greeting}>
              Hi, {user?.name ?? "Deira Aisya"}
            </Text>
            <Text style={styles.subtitle}>
              Stay updated with the progress of claim.
            </Text>
            <Text style={styles.subtitle}>Reach out to us for any help.</Text>
          </View>

          <Image
            source={require("../../../assets/images/imageHeader.png")}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Image
            source={require("../../../assets/images/patternHeader.png")}
            style={styles.headerPattern}
            resizeMode="contain"
          />
        </>
      )}
    </View>
  );
}

const HEADER_HEIGHT = 160;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0391CE",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    minHeight: 200, // konsisten tinggi
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  withBackContainer: {
    flexDirection: "column",
    alignItems: "flex-start", // jarak antar back button dan greeting
  },
  textContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    zIndex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    width: width * 0.678,
    fontSize: 11,
    color: "#E0F4FF",
    textAlign: "left",
    zIndex: 1,
  },
  backButton: {
    backgroundColor: Colors.primaryBlue700,
    width: 40,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  headerImage: {
    position: "absolute",
    right: -54,
    top: 8,
    width: width * 0.8,
    height: 260,
    zIndex: -1,
  },
  headerImageWithBack: {
    position: "absolute",
    right: -30,
    width: width * 0.4,
    aspectRatio: 150 / 180,
    zIndex: -1,
  },
  headerPattern: {
    position: "absolute",
    left: -92,
    bottom: -68,
    width: width * 0.8,
    height: 140,
    zIndex: -1,
  },
});

export const HEADER_HEIGHT_VALUE = HEADER_HEIGHT;
