import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg"; // expo install react-native-svg

type ClaimStepStatus = "completed" | "active" | "inactive";

interface ClaimStep {
  id: string;
  label: string;
  status: ClaimStepStatus;
}

const ClaimTracker = () => {
  const steps: ClaimStep[] = [
    { id: "1", label: "Dikirim", status: "completed" },
    { id: "2", label: "Review", status: "completed" },
    { id: "3", label: "Diterima", status: "active" },
    { id: "4", label: "Ditolak", status: "inactive" },
  ];

  const getCircleColor = (status: ClaimStepStatus) => {
    switch (status) {
      case "completed":
        return "#ECF1FF";
      case "active":
        return "#0391CE";
      case "inactive":
        return "#605D64";
    }
  };

  const getCheckColor = (status: ClaimStepStatus) => {
    switch (status) {
      case "completed":
        return "#0A3977";
      case "active":
        return "#E4F0FF";
      case "inactive":
        return "#938F96";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Claim Tracker</Text>

      {/* Steps Row */}
      <View style={styles.stepsRow}>
        {steps.map((step, index) => (
          <View key={step.id}>
            {/* Circle with checkmark */}
            <View
              style={[
                styles.circle,
                { backgroundColor: getCircleColor(step.status) },
              ]}
            >
              <Svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <Path
                  d="M1 5.5L5 9.5L14 1"
                  stroke={getCheckColor(step.status)}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </View>

            {/* Connector line (skip after last step) */}
            {index < steps.length - 1 && <View style={styles.connector} />}
          </View>
        ))}
      </View>

      {/* Labels */}
      <View style={styles.labelsRow}>
        {steps.map((step) => (
          <View key={step.id} style={styles.labelWrapper}>
            <Text style={styles.label}>{step.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF7FF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#003A53",
    padding: 16,
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  connector: {
    flex: 1,
    height: 1,
    backgroundColor: "#999",
    opacity: 0.2,
    marginHorizontal: 8,
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelWrapper: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
});

export default ClaimTracker;
