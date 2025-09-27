// src/components/ClaimDetail/ClaimTracker.tsx
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

type Step = { label: string; status: "done" | "active" | "pending" };
export default function ClaimTracker({ steps }: { steps: Step[] }) {
  return (
    <View style={styles.row}>
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        return (
          <View key={s.label} style={{ flex: 1, alignItems: "center" }}>
            <View
              style={[
                styles.dot,
                s.status === "done" && styles.dotDone,
                s.status === "active" && styles.dotActive,
              ]}
            >
              <Feather
                name="check"
                size={18}
                color={s.status !== "done" ? "#FFF" : "#0A3977"}
              />
            </View>
            {!isLast && (
              <View
                style={[
                  styles.line,
                  s.status !== "pending" && {
                    backgroundColor: Colors.primary500,
                  },
                ]}
              />
            )}
            <Text style={styles.label}>{s.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dot: {
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    shadowRadius: 4,
    shadowColor: "#000",
    elevation: 4,
    zIndex: 10,
  },
  dotDone: {
    backgroundColor: "#FFF",
  },
  dotActive: {
    backgroundColor: Colors.primary500,
    borderColor: Colors.primary500,
  },
  line: {
    height: 2,
    backgroundColor: Colors.border,
    position: "absolute",
    top: 14,
    left: "66%",
    right: "-50%",

    zIndex: 0,
  },
  label: { marginTop: 8, fontSize: 12, color: Colors.text },
});
