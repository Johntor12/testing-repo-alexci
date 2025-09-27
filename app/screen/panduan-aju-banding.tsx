import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import FloatingChat from "../src/components/Home/FloatingChat";
import ScreenContainer from "../src/components/ScreenContainer";
import StaticBox from "../src/components/StaticBox";

export default function DaftarSistemRumahSakit() {
  const router = useRouter();
  return (
    <ScreenContainer hasBack={true} scrollable={true}>
      <StaticBox />
      <View style={{ marginBottom: 80 }}>
        <StaticBox
          title="Penjelasan Detail"
          content={
            "Latar Belakang: \nBanyak pasien tidak memahami alasan klaim ditolak karena bahasa polis yang kompleks, sehingga jarang mengajukan banding. Hal ini menyebabkan hak perlindungan finansial tidak optimal. \n \nMasalah: \nProses banding klaim asuransi biasanya rumit, memerlukan surat resmi, dokumen pendukung, dan komunikasi panjang dengan pihak asuransi. Pasien kesulitan memahami langkah-langkah yang diperlukan. \nLangkah yang Dilakukan: \n1. Rejection Rewriter: AI menjelaskan alasan penolakan klaim dengan bahasa awam, misalnya: “Dokumen kwitansi asli belum dilampirkan.” \n2. Appeal Wizard: Sistem memandu pasien menyiapkan surat banding otomatis, lengkap dengan template resmi dan daftar dokumen yang harus dilampirkan. \n3. Reclaim Advisor: Memberikan rekomendasi langkah lanjutan, termasuk dokumen tambahan atau rujukan ulang ke rumah sakit. \n 4.Track Appeal: Status banding dapat dipantau seperti klaim biasa, dengan update otomatis dari sistem asuransi. Hasil: \n\u2022 Tingkat keberhasilan banding meningkat hingga 40%. \n\u2022 Waktu penyelesaian banding lebih cepat 30% dibanding manual. \n\u2022 Pasien merasa lebih empowered karena dapat memahami dan memperjuangkan haknya. \n\u2022 Rumah sakit terbantu dengan format dokumen standar yang mengurangi komunikasi bolak-balik. \n\nKesimpulan: \nDengan fitur Appeal & Resolution, BISAcare tidak hanya mempermudah klaim yang lancar, tetapi juga memastikan pasien tetap terlindungi bahkan ketika klaim awal ditolak. Hal ini meningkatkan kepercayaan pada sistem asuransi, memperkuat hubungan antara pasien, rumah sakit, dan provider asuransi."
          }
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        <FloatingChat />
      </View>
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
