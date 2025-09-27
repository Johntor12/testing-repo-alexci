// src/components/ScreenContainer.tsx
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ScreenContainerProps = {
  children: ReactNode;
  hasBack?: boolean;
  variantColor?: "primary" | "secondary";
  scrollable?: boolean; // 👈 tambahan untuk memilih View/ScrollView
  customStyle?: StyleProp<ViewStyle>;
};

export default function ScreenContainer({
  children,
  hasBack = true,
  variantColor = "primary",
  scrollable = true, // default = View
  customStyle,
}: ScreenContainerProps) {
  const marginTop = hasBack ? -54 : -14;

  const ContainerComponent = scrollable ? KeyboardAwareScrollView : View;

  if (variantColor === "secondary") {
    return (
      <LinearGradient
        colors={["#5785FF", "#3737FA", "#5301DD"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.14, 0.54, 1]}
        style={[styles.gradientWrapper, { marginTop }]}
      >
        <ContainerComponent
          style={[
            styles.container,
            scrollable ? { flexGrow: 1 } : { flex: 1 },
            customStyle,
          ]}
          contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        >
          {children}
        </ContainerComponent>
      </LinearGradient>
    );
  }

  return (
    <ContainerComponent
      style={[
        styles.container,
        { marginTop, backgroundColor: "#fff" },
        scrollable ? { flexGrow: 1 } : { flex: 1 },
        customStyle,
      ]}
      contentContainerStyle={scrollable ? styles.scrollContent : undefined}
    >
      {children}
    </ContainerComponent>
  );
}

const styles = StyleSheet.create({
  gradientWrapper: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden", // biar radius kepotong rapi
    zIndex: 10,
  },
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
