import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AppealOption {
  id: string;
  title: string;
  description: string;
  timeLimit: string;
  difficulty: "easy" | "medium" | "hard";
}

interface AppealOptionsProps {
  options: AppealOption[];
  onSelectOption: (optionId: string) => void;
}

const AppealOptions = ({ options, onSelectOption }: AppealOptionsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "#28a745";
      case "medium":
        return "#ffc107";
      case "hard":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "Easy";
      case "medium":
        return "Moderate";
      case "hard":
        return "Complex";
      default:
        return "Unknown";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Appeal Options</Text>
      <Text style={styles.subtitle}>
        Choose the best option for your situation:
      </Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={styles.optionCard}
          onPress={() => onSelectOption(option.id)}
        >
          <View style={styles.optionHeader}>
            <Text style={styles.optionTitle}>{option.title}</Text>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(option.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>
                {getDifficultyText(option.difficulty)}
              </Text>
            </View>
          </View>

          <Text style={styles.optionDescription}>{option.description}</Text>

          <Text style={styles.timeLimit}>
            ⏰ Time limit: {option.timeLimit}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  timeLimit: {
    fontSize: 12,
    color: "#dc3545",
    fontWeight: "600",
  },
});

export default AppealOptions;
