import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WorkBagIcon = () => (
  <Image
    source={require("../../../assets/images/work-bag.svg")} // convert SVG to PNG and place in assets
    style={{ width: 13, height: 12, resizeMode: "contain" }}
  />
);

export default function MedicalClaimsTracker() {
  const [activeTab, setActiveTab] = useState("Diajukan");

  const tabs = ["Diajukan", "Diproses", "Ditanggung", "Ditolak"];

  const claimsData = Array(5).fill({
    title: "Heart Failure Indication",
    description: "Heart rate detected at 42 Bpm",
  });

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Keluhan atau Gejala Terakhir</Text>

      {/* Tab Navigation */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabBackground} />
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab
                    ? styles.activeTabText
                    : styles.inactiveTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Claims List */}
      <FlatList
        data={claimsData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.claimItem}>
            <View style={styles.iconContainer}>
              <WorkBagIcon />
            </View>
            <View style={styles.claimContent}>
              <Text style={styles.claimTitle}>{item.title}</Text>
              <Text style={styles.claimDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  tabWrapper: {
    position: "relative",
    marginBottom: 12,
    height: 34,
  },
  tabBackground: {
    position: "absolute",
    width: "100%",
    height: 34,
    backgroundColor: "#D4DFFF",
    borderRadius: 15,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: "#00164F",
  },
  inactiveTabText: {
    color: "#36343B",
  },
  claimItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(116,119,117,0.5)",
  },
  iconContainer: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "rgba(197,220,250,0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  claimContent: {
    flex: 1,
  },
  claimTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  claimDescription: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#444",
  },
});
