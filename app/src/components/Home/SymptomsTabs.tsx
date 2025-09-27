// src/components/ClaimDetail/SymptomsTabs.tsx
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";

type Props = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function SymptomsTabs({ tabs, activeTab, onTabChange }: Props) {
  return (
    <View style={styles.row}>
      {tabs.map((t) => {
        const isActive = t === activeTab;
        return (
          <TouchableOpacity
            key={t}
            style={[styles.pill, isActive && styles.pillActive]}
            onPress={() => onTabChange(t)}
          >
            <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
              {t}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    padding: 2,
    marginBottom: 10,
    backgroundColor: "#D4DFFF",
    borderRadius: 12,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  pillActive: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 999,
  },
  pillText: { color: Colors.muted, fontWeight: "700", fontSize: 12 },
  pillTextActive: { color: Colors.secondary900 },
});
