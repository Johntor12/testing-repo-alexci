import { View } from "react-native";
import SpotScan from "../src/components/Camera/SpotScan";
import Colors from "../src/constants/Colors";

export default function SpotScanScreen() {
  const handleScan = () => {
    console.log("Scanning...");
    // Implement scanning logic here
  };

  const handleUpload = () => {
    console.log("Uploading...");
    // Implement upload logic here
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <SpotScan
        variant="scan-invoicers"
        nextRoute="/screen/diagnosis-form"
        onScan={handleScan}
        onUpload={handleUpload}
      />
    </View>
  );
}
