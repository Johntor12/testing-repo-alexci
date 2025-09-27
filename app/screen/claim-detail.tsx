// app/claim-detail.tsx
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ClaimProgressCard from "../src/components/Home/ClaimProgressCard";
import ClaimStats from "../src/components/Home/ClaimStats";
import ClaimTracker from "../src/components/Home/ClaimTracker";
// import CommunityCarousel from "../src/components/Home/CommunityCarousel";
import CommunityServices from "../src/components/CommunityCard";
import FloatingChat from "../src/components/Home/FloatingChat";
import SlipCard from "../src/components/Home/SlipCard";
import SymptomsList from "../src/components/Home/SymptompsList";
import SymptomsTabs from "../src/components/Home/SymptomsTabs";
import TestimonialCard from "../src/components/Home/TestimonialCard";
import ScreenContainer from "../src/components/ScreenContainer";
import Colors from "../src/constants/Colors";

export default async function ClaimDetailScreen() {
  const tabs = ["Diajukan", "Diproses", "Ditanggung", "Ditolak"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  // Dummy fetching simulasi backend
  useEffect(() => {
    const fetchData = async () => {
      // nanti bisa diganti dengan fetch(`api/symptoms?status=${activeTab}`)
      await new Promise((res) => setTimeout(res, 300)); // delay dummy
      switch (activeTab) {
        case "Diajukan":
          setSymptoms([
            "Heart Failure Indication",
            "Heart Failure Indication",
            "Heart Failure Indication",
            "Heart Failure Indication",
            "Heart Failure Indication",
          ]);
          break;
        case "Diproses":
          setSymptoms(["Sesak Napas", "Detak jantung tidak teratur"]);
          break;
        case "Ditanggung":
          setSymptoms(["Flu Ringan", "Pusing Kepala"]);
          break;
        case "Ditolak":
          setSymptoms(["Gejala tidak terdaftar"]);
          break;
        default:
          setSymptoms([]);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <ScreenContainer>
      {/* Hero */}
      {/* <Text style={styles.sub}>
          Stay updated with the progress of claim.{"\n"}Reach out to us for any
          help!
        </Text> */}

      {/* Progress Klaim */}
      <View style={{ marginBottom: 40 }}>
        <ClaimProgressCard progress={60} />
      </View>

      {/* Claim Tracker */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Claim Tracker</Text>
        <ClaimTracker
          steps={[
            { label: "Dikirim", status: "done" },
            { label: "Review", status: "done" },
            { label: "Diterima", status: "active" },
            { label: "Ditolak", status: "pending" },
          ]}
        />
      </View>

      {/* Slip digital & Aju banding */}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
        <SlipCard title="Slip Digital" />
        <SlipCard title="Aju Banding" />
      </View>

      {/* Stats */}
      <ClaimStats
        items={[
          { title: "Ditanggung", percent: 80 },
          { title: "Tanggung\nSendiri", percent: 80 },
        ]}
      />

      {/* Keluhan/Gejala */}
      <View style={{ marginTop: 16 }}>
        <Text style={styles.sectionBig}>Keluhan atau Gejala Terakhir</Text>
        <SymptomsTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <SymptomsList items={symptoms} />
      </View>

      {/* Layanan Komunitas */}
      {/* <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionBig}>Layanan Komunitas!</Text>
          <CommunityCarousel />
        </View> */}
      <CommunityServices />

      {/* CTA Lihat Selengkapnya */}
      {/* <View style={{ alignItems: "center", marginTop: 16 }}>
          <View style={styles.ctaOutline}>
            <Text style={styles.ctaText}>Lihat Selengkapnya</Text>
            <Text style={styles.ctaArrow}>↗</Text>
          </View>
        </View> */}

      {/* Testimoni */}
      <View style={{ flexDirection: "column" }}>
        <View style={{ marginTop: 24 }}>
          <TestimonialCard />
        </View>

        {/* Floating Chat */}
        <FloatingChat />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: Colors.primary500,
    zIndex: 10,
  },
  sub: {
    color: "#EAF7FF",
    lineHeight: 18,
  },
  sectionCard: {
    marginTop: -12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#003A53",
  },
  sectionTitle: { fontWeight: "700", color: Colors.text, marginBottom: 12 },
  sectionBig: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textDark,
    marginBottom: 10,
  },
  ctaOutline: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary500,
    backgroundColor: "#fff",
    gap: 8,
  },
  ctaText: { color: Colors.primary500, fontWeight: "700" },
  ctaArrow: { color: Colors.primary500, fontSize: 16, marginTop: -2 },
});
