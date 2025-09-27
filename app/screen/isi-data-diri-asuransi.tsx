import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, TextInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";
import Colors from "../src/constants/Colors";

interface DropDownItem {
  label: string;
  value: string;
}

function DropDownForm({
  dropDownHeader,
  dropDownArray,
}: {
  dropDownHeader: string;
  dropDownArray: DropDownItem[];
}) {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState<string | null>(null);
  const [serviceItems, setServiceItems] = useState(dropDownArray);

  return (
    <>
      <Text style={styles.label}>{dropDownHeader}</Text>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={serviceOpen}
        value={serviceValue}
        items={serviceItems}
        setOpen={setServiceOpen}
        setValue={setServiceValue}
        setItems={setServiceItems}
        placeholder="Select option"
        style={styles.dropdown}
      />
    </>
  );
}

const DataDiriAsuransiScreen = () => {
  const rekeningItems: DropDownItem[] = [
    { label: "BCA", value: "bca" },
    { label: "MANDIRI", value: "mandiri" },
    { label: "BNI", value: "bni" },
    { label: "BRI", value: "bri" },
    { label: "CIMB Niaga", value: "cimb_niaga" },
    { label: "Permata Bank", value: "permata_bank" },
    { label: "Bank Danamon", value: "bank_danamon" },
    { label: "BSI", value: "bsi" },
  ];

  const [ktpImage, setKtpImage] = useState<string | null>(null);
  const [asuransiImage, setAsuransiImage] = useState<string | null>(null);
  const [polisNumber, setPolisNumber] = useState("");
  const [rekeningNumber, setRekeningNumber] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [showFirstModal, setshowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const router = useRouter();

  // Fungsi pilih gambar
  const pickImage = async (setter: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  // 🔹 Submit klaim
  const handleSubmit = async () => {
    if (!ktpImage || !asuransiImage) {
      Alert.alert("Error", "Harap upload KTP dan Kartu Asuransi");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("policy_number", polisNumber);
      formData.append("rekening_type", "bca"); // sementara static, bisa ambil dari dropdown
      formData.append("rekening_number", rekeningNumber);
      formData.append("service_type", "rawat_inap"); // sementara static
      formData.append("phone_number", formattedValue);
      formData.append("complaint", keluhan);
      formData.append("other_service", "");

      formData.append("ktp_file", {
        uri: ktpImage,
        type: "insurance_card",
        name: "ktp.jpg",
      } as any);

      formData.append("insurance_card_file", {
        uri: asuransiImage,
        type: "insurance_card",
        name: "insurance.jpg",
      } as any);

      // 1️⃣ Kirim ke backend
      const res = await fetch(`${process.env.BACKEND_URL}/insuranceform`, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.json();
      console.log("InsuranceForm created:", data);

      // 2️⃣ Upload KTP ke AI
      let aiFormData = new FormData();
      aiFormData.append("file", {
        uri: ktpImage,
        type: "image/jpeg",
        name: "ktp.jpg",
      } as any);

      const aiRes = await fetch(`${process.env.AI_API_URL}/scan-ktp`, {
        method: "POST",
        body: aiFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const aiData = await aiRes.json();
      console.log("AI result:", aiData);

      setshowFirstModal(true);
    } catch (err) {
      console.error("Upload gagal:", err);
      Alert.alert("Error", "Upload gagal. Cek koneksi atau server backend.");
    }
  };

  return (
    <ScreenContainer customStyle={{ padding: 0 }}>
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>Data diri</Text>
          <Text style={styles.subHeaderText}> untuk Menerima </Text>
        </View>
        <Text style={styles.subHeaderText}>Transaksi</Text>
        <Text style={styles.subtitle}>
          Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
          ditanggung oleh asuransi.
        </Text>
        {/* Upload KTP */}
        <Text style={styles.label}>Scan/Upload Foto KTP</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage((uri) => setKtpImage(uri))}
        >
          {ktpImage ? (
            <Image source={{ uri: ktpImage }} style={styles.uploadImage} />
          ) : (
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <Image source={require("../../assets/images/plus.png")} />
              <Text style={styles.uploadText}>
                Scan/Upload Kartu KTP{"\n"}Max file size : 10 MB
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Upload Kartu Asuransi */}
        <Text style={styles.label}>Scan/Upload Kartu Asuransi</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage((uri) => setAsuransiImage(uri))}
        >
          {asuransiImage ? (
            <Image source={{ uri: asuransiImage }} style={styles.uploadImage} />
          ) : (
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 8 }}
            >
              <Image source={require("../../assets/images/plus.png")} />
              <Text style={styles.uploadText}>
                Scan/Upload Kartu KTP{"\n"}Max file size : 10 MB
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* Nomor Polis */}
        <Text>
          <TextInput
            placeholder="Nomor Polis"
            value={polisNumber}
            onChangeText={setPolisNumber}
            style={styles.input}
          />
        </Text>
        {/* No HP */}
        <Text>
          <PhoneInput
            ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="ID"
            layout="first"
            onChangeText={(text) => setPhoneNumber(text)}
            onChangeFormattedText={(text) => setFormattedValue(text)}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textInput}
          />
        </Text>
        {/* Input Keluhan */}
        <Text style={{ flex: 1, width: "100%" }}>
          <TextInput
            placeholder="Keluhan"
            multiline
            numberOfLines={4}
            value={keluhan}
            onChangeText={setKeluhan}
            style={[styles.input, { height: 120 }]}
          />
        </Text>
        {/* Nomor Rekening */}
        <Text style={{ flex: 1, width: "100%" }}>
          <TextInput
            placeholder="Nomor Rekening"
            value={rekeningNumber}
            onChangeText={setRekeningNumber}
            style={styles.input}
          />
        </Text>
        {/* Button Submit */}
        <Button
          mode="contained"
          style={styles.submitBtn}
          onPress={handleSubmit}
        >
          <Text>Lanjutkan Proses →</Text>
        </Button>
        {/* Modal */}
        <Modal
          visible={showFirstModal}
          onClose={() => setshowFirstModal(false)}
          title="Klaim sudah berhasil terkirim!"
          subtitle="Klaim anda diproses rata-rata dalam 3-5 hari kerja"
          falseText="Tidak"
          trueText="Lanjut"
          onFalse={() => setshowFirstModal(false)}
          onTrue={() => {
            setshowFirstModal(false);
            setShowSecondModal(true);
          }}
        />
        <Modal
          visible={showSecondModal}
          onClose={() => setShowSecondModal(false)}
          title="Mohon maaf, Klaim anda ditolak!"
          subtitle="Klik lanjut untuk mengajukan banding"
          falseText="Tidak"
          trueText="Lanjut"
          onFalse={() => setShowSecondModal(false)}
          onTrue={() => {
            router.push("/screen/chatbot-guideline");
            setShowSecondModal(false);
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default DataDiriAsuransiScreen;

const styles = StyleSheet.create({
  headerText: { fontSize: 20, fontWeight: "bold", color: "#000" },
  subHeaderText: { fontSize: 20, fontWeight: "400", color: "#000" },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  label: { fontSize: 14, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  uploadBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#aaa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    marginBottom: 15,
  },
  subtitle: { fontSize: 11, color: "#444", marginTop: 6, marginBottom: 12 },
  uploadImage: { width: "100%", height: "100%", resizeMode: "cover" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
  },
  phoneContainer: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  uploadText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
  textInput: {
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    backgroundColor: "#fff",
  },
  submitBtn: {
    backgroundColor: Colors.primaryBlue700,
    marginTop: 20,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    zIndex: 10,
  },
});
