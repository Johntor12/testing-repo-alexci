import { View } from "react-native";
import SpotScan from "../src/components/Camera/SpotScan";
import Colors from "../src/constants/Colors";

export default function SpotScanScreen() {
  const handleScan = (uri: string) => {
    console.log("Scanning...", uri);
    // Implement scanning logic here
  };

  const handleUpload = (uri: string) => {
    console.log("Uploading...", uri);
    // Implement upload logic here
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <SpotScan onScan={handleScan} onUpload={handleUpload} />
    </View>
  );
}
