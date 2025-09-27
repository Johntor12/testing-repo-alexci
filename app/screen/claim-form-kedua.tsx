// ClaimFormScreen.tsx
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, TextInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import { useScan } from "../context/ScanContext";
import UploadFile from "../src/components/Home/UploadFile";
import Modal from "../src/components/Modal";
import ScreenContainer from "../src/components/ScreenContainer";
import Colors from "../src/constants/Colors";

interface DropDownItem {
  label: string;
  value: string;
}
interface DropDownFormProps {
  dropDownHeader?: string;
  dropDownArray?: DropDownItem[];
}

const serviceItems: DropDownItem[] = [
  { label: "Rawat jalan", value: "rawat_jalan" },
  { label: "Rawat inap", value: "rawat_inap" },
  { label: "IGD", value: "igd" },
  { label: "Lainnya", value: "lainnya" },
];

function DropDownForm({
  dropDownHeader = "Pilih Layanan",
  dropDownArray = serviceItems,
}: DropDownFormProps) {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceValue, setServiceValue] = useState<string | null>(null);
  // const [rekeningItems, setRekeningItems] = useState([
  //   {label: "", value: ""}
  // ])
  const [serviceItems, setServiceItems] = useState([
    { label: "Rawat jalan", value: "rawat_jalan" },
    { label: "Rawat inap", value: "rawat_inap" },
    { label: "IGD", value: "igd" },
    { label: "Lainnya", value: "lainnya" },
  ]);
  return (
    <>
      <Text style={styles.label}>{dropDownHeader}</Text>
      <DropDownPicker
        listMode="SCROLLVIEW"
        open={serviceOpen}
        value={serviceValue}
        items={dropDownArray}
        setOpen={setServiceOpen}
        setValue={setServiceValue}
        setItems={setServiceItems}
        placeholder="Select service"
        style={styles.dropdown}
      />
    </>
  );
}

const ClaimFormScreen = () => {
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
  const phoneInput = useRef<PhoneInput>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const { imageUriKtp, imageUriAsuransi } = useScan();

  // Fungsi pilih gambar
  const pickImage = async (setter: (uri: string) => void) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images", // ← pakai string literal, bukan MediaTypeOptions
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  return (
    <ScreenContainer customStyle={{ padding: 0 }}>
      {/* Card */}
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.headerText}>Mari Isi Data</Text>
          <Text style={styles.subHeaderText}> dulu untuk </Text>
        </View>
        <Text style={styles.subHeaderText}>Menerima Asuransi</Text>
        <Text style={styles.subtitle}>
          Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
          ditanggung oleh asuransi.
        </Text>
        {/* Upload KTP */}
        <Text style={styles.label}>Scan/Upload Foto KTP</Text>
        <UploadFile variant={"scan-ktp"} namaFile="KTP" uri={imageUriKtp} />
        {/* Upload Kartu Asuransi */}
        <Text style={styles.label}>Scan/Upload Kartu Asuransi</Text>
        <UploadFile
          variant={"scan-asuransi"}
          namaFile="Kartu Asuransi"
          uri={imageUriAsuransi}
        />
        {/* Nomor Polis */}
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontWeight: "600" }}>Input nomor Polis</Text>
          <View style={styles.inputWrapper}>
            <Image
              source={require("../../assets/images/payment_method_icon.png")}
              style={styles.inputIcon}
            />
            <TextInput
              mode="flat"
              right={<TextInput.Icon icon="help-circle" />}
              placeholder="Polis number"
              style={styles.inputFlex}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
          </View>
        </View>
        <Text style={styles.hint}>This is a hint text to help user.</Text>
        {/* Panduan */}
        <Text style={{ fontWeight: "medium", fontSize: 10 }}>
          Jika belum mendaftar atau membuat kartu asuransi atau polis, klik
          tombol di bawah untuk melihat panduan pembuatan kartu asuransi
        </Text>

        <Button
          mode="contained-tonal"
          onPress={() => {
            router.push("/screen/chatbot-guideline");
          }}
          contentStyle={{
            flexDirection: "row-reverse",
            backgroundColor: Colors.primaryBlue700,
          }}
          style={{ marginVertical: 10 }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            Panduan Pembuatan Kartu Asuransi →
          </Text>
        </Button>
        {/* Dropdown Layanan */}
        <DropDownForm />

        <DropDownForm
          dropDownHeader="Jenis Rekening"
          dropDownArray={rekeningItems}
        />

        <Text style={styles.hint}>This is a hint text to help user.</Text>
        {/* Nomor HP */}
        <Text style={styles.label}>Nomor HP Aktif</Text>
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="ID" // Default Indonesia (+62)
          layout="first" // Dropdown dulu lalu input
          onChangeText={(text) => setPhoneNumber(text)}
          onChangeFormattedText={(text) => setFormattedValue(text)}
          withDarkTheme={false}
          withShadow
          autoFocus
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.textInput}
        />

        <Text style={styles.hint}>This is a hint text to help user.</Text>
        {/* Input Keluhan */}
        <Text style={styles.label}>Input Keluhan</Text>
        <Text>
          <TextInput
            placeholder="Input keluhan kesehatanmu..."
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 120 }]}
          />
        </Text>
        <Text style={styles.hint}>Max 500 words</Text>
        {/* Button */}
        <Button
          mode="contained"
          style={styles.submitBtn}
          onPress={() => {
            setShowModal(true);
          }}
        >
          <Text>Lanjutkan Proses →</Text>
        </Button>
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onFalse={() => setShowModal(false)}
          onTrue={() => {
            router.push("/screen/daftar-sistem-rumah-sakit");
          }}
        />
      </View>
    </ScreenContainer>
  );
};

export default ClaimFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f8fb",
  },
  header: {
    backgroundColor: "#0a74b9",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#000",
  },
  descText: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 11,
    color: "#444",
    marginTop: 6,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  uploadBox: {
    borderWidth: 1,
    width: "100%",
    aspectRatio: 362 / 213,
    borderStyle: "dashed",
    borderColor: "#aaa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
  uploadImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    aspectRatio: 362 / 213,
  },
  input: {
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputWithIcon: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  inputIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    marginLeft: 8,
  },
  inputFlex: {
    flex: 1,
    backgroundColor: "transparent", // biar warnanya nyatu
  },
  phoneContainer: {
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textInput: {
    borderLeftWidth: 1,
    borderLeftColor: "#ccc",
    backgroundColor: "#fff",
  },
  hint: {
    fontSize: 12,
    color: "#777",
    marginBottom: 12,
  },
  dropdown: {
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  submitBtn: {
    backgroundColor: Colors.primaryBlue700,
    marginTop: 20,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
