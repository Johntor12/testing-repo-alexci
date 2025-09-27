import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ClaimCard from "../src/components/Home/ClaimCard";
import ComplaintCard from "../src/components/Home/ComplaintCard";
import ProgressCard from "../src/components/Home/ProgressCard";
import TestimonialCard from "../src/components/Home/TestimonialCard";
import ScreenContainer from "../src/components/ScreenContainer";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ScreenContainer hasBack={false} scrollable={true}>
      <ClaimCard
        onFalseAction={() => {
          router.push("/screen/pilih-rumah-sakit");
        }}
        onTrueAction={() => {
          router.push("/screen/claim-detail");
        }}
      />
      <ComplaintCard />
      <ProgressCard />
      <TestimonialCard />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -14,
    backgroundColor: "#F5F7FB",
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    zIndex: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
});
