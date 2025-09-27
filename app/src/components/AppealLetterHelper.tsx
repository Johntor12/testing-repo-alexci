import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface AppealLetterSection {
  id: string;
  title: string;
  placeholder: string;
  required: boolean;
  value: string;
}

interface AppealLetterHelperProps {
  sections: AppealLetterSection[];
  onSectionChange: (sectionId: string, value: string) => void;
  onGenerateLetter: () => void;
  onPreviewLetter: () => void;
}

const AppealLetterHelper = ({
  sections,
  onSectionChange,
  onGenerateLetter,
  onPreviewLetter,
}: AppealLetterHelperProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appeal Letter Assistant</Text>
      <Text style={styles.subtitle}>
        Fill out the sections below to create your appeal letter:
      </Text>

      {sections.map((section) => (
        <View key={section.id} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {section.title}
            {section.required && <Text style={styles.required}> *</Text>}
          </Text>
          <TextInput
            style={styles.textInput}
            value={section.value}
            onChangeText={(value: string) => onSectionChange(section.id, value)}
            placeholder={section.placeholder}
            multiline
            textAlignVertical="top"
          />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.previewButton}
          onPress={onPreviewLetter}
        >
          <Text style={styles.previewButtonText}>👁️ Preview Letter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.generateButton}
          onPress={onGenerateLetter}
        >
          <Text style={styles.generateButtonText}>
            📄 Generate Final Letter
          </Text>
        </TouchableOpacity>
      </View>
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
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "white",
    height: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  previewButton: {
    flex: 0.48,
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  previewButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  generateButton: {
    flex: 0.48,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  generateButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default AppealLetterHelper;
