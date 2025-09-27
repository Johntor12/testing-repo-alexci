import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useScan } from "../context/ScanContext";
import VoiceOverButton from "../src/components/Buttons/VoiceOverButton";
import UploadFile from "../src/components/Home/UploadFile";
import ScreenContainer from "../src/components/ScreenContainer";

const UploadDiagnosisDokter = () => {
  const router = useRouter();
  const { imageUriDiagnosis } = useScan();

  return (
    <ScreenContainer scrollable={true}>
      <Text style={styles.title}>Berikan/Upload hasil Diagnosis Dokter</Text>
      <Text style={styles.subTitle}>
        Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
        ditanggung oleh asuransi.
      </Text>
      <UploadFile
        variant={"scan-diagnosis"}
        uri={imageUriDiagnosis}
        icon={"upload"}
        namaFile="Hasil diagnosis Dokter"
      ></UploadFile>

      <Text style={styles.title}>Tuliskan Diagnosis Dokter</Text>

      <VoiceOverButton />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screen/chatbot")}
      >
        <Text style={styles.buttonText}>Cek Tanggapan</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 6 },
  subTitle: { fontSize: 12 },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 40,
    alignItems: "center",
    marginBottom: 20,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 100,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0D3B66",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UploadDiagnosisDokter;
