import { StyleSheet, Text, View } from "react-native";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  required: boolean;
}

interface ChecklistRendererProps {
  items: ChecklistItem[];
  title?: string;
}

const ChecklistRenderer = ({ items, title }: ChecklistRendererProps) => {
  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <Text style={styles.progress}>
        Progress: {completedCount}/{totalCount} items completed
      </Text>

      {items.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.checkbox}>{item.completed ? "✅" : "⬜"}</Text>
          <Text
            style={[
              styles.itemText,
              item.completed && styles.completedText,
              item.required && styles.requiredText,
            ]}
          >
            {item.text}
            {item.required && <Text style={styles.requiredIndicator}> *</Text>}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  progress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    fontSize: 16,
    marginRight: 12,
  },
  itemText: {
    fontSize: 14,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  requiredText: {
    fontWeight: "600",
  },
  requiredIndicator: {
    color: "red",
  },
});

export default ChecklistRenderer;
