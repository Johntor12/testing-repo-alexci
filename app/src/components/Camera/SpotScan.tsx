import { useScan } from "@/app/context/ScanContext";
import { Feather } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "../Modal";

interface SpotScanProps {
  variant?:
    | "scan-ktp"
    | "scan-asuransi"
    | "scan-invoicers"
    | "scan-diagnosis"
    | "scan-netral";
  endpoint?: string;
  nextRoute?: string;
  onScan: (uri: string) => void;
  onUpload: (uri: string) => void;
}

const SpotScanFrame = () => {
  return (
    <View style={styles.frameContainer}>
      <View style={[styles.frame, styles.topFrame]} />
      <View style={[styles.frame, styles.leftFrame]} />
      <View style={[styles.frame, styles.bottomFrame]} />
      <View style={[styles.frame, styles.rightFrame]} />
    </View>
  );
};

const SpotScan = ({
  variant = "scan-ktp",
  endpoint = "/scan-ktp",
  nextRoute = "/screen/ktp-form",
  onScan,
  onUpload,
}: SpotScanProps) => {
  const [isCameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const {
    setResultKtp,
    setImageUriKtp,
    setResultAsuransi,
    setImageUriAsuransi,
    setResultInvoicers,
    setImageUriInvoicers,
    setResultDiagnosis,
    setImageUriDiagnosis,
    imageUriNetral,
    setImageUriNetral,
  } = useScan();

  // const { setResult } = useScan();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const API_URL =
    process.env.AI_API_URL ||
    "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app/";

  const handleScan = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setCapturedImage(photo.uri);

    if (variant === "scan-ktp") {
      setImageUriKtp(photo.uri);
    } else if (variant === "scan-asuransi") {
      setImageUriAsuransi(photo.uri);
    } else if (variant === "scan-invoicers") {
      setImageUriInvoicers(photo.uri);
    } else if (variant === "scan-diagnosis") {
      setImageUriDiagnosis(photo.uri);
    }

    onScan(photo.uri);
  };

  const handleUpload = async () => {
    let resultKtp = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resultKtp.canceled) {
      const uri = resultKtp.assets[0].uri;
      setCapturedImage(uri); // Set the uploaded image URI
      onUpload(uri); // Pass the selected image URI to the parent component
      if (variant === "scan-ktp") {
        setImageUriKtp(uri);
      } else if (variant === "scan-asuransi") {
        setImageUriAsuransi(uri);
      } else if (variant === "scan-invoicers") {
        setImageUriInvoicers(uri);
      } else if (variant === "scan-diagnosis") {
        setImageUriDiagnosis(uri);
      } else {
        setImageUriNetral(uri);
      }
    }
  };

  const handleLanjut = async () => {
    if (!capturedImage) return;

    try {
      // const fileInfo = FileSystem.getInfoAsync(capturedImage);
      const formData = new FormData();

      formData.append("file", {
        uri: capturedImage,
        name: "ktp.jpg",
        type: "image/jpeg",
      } as any);

      if (variant !== "scan-netral") {
        const response = fetch(`${API_URL}/${variant}`, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        if (!(await response).ok) {
          throw new Error(`Upload gagal, status ${(await response).status}`);
        }

        const data = await (await response).json();
        console.log("Hasil scan KTP:", data);
        if (variant === "scan-ktp") setResultKtp(data);
        else if (variant === "scan-asuransi") setResultAsuransi(data);
        else if (variant === "scan-invoicers") setResultInvoicers(data);
        else if (variant === "scan-diagnosis") setResultDiagnosis(data);
      }

      if (variant !== "scan-netral") router.push(nextRoute as never);
      else router.back();
    } catch (error) {
      console.error("Gagal upload Data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.spotScanContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 45,
              aspectRatio: 1,
              backgroundColor: "#E3E8EF",
              borderRadius: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 8,
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </View>
          <Text
            style={{
              color: "#000",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            SpotScan
          </Text>
          <View
            style={{
              width: 45,
              aspectRatio: 1,
              backgroundColor: "#E3E8EF",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "100%",
              padding: 8,
            }}
          >
            <Feather name="alert-circle" size={24} color="black" />
          </View>
        </View>
      </View>
      {/* Kamera */}
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        style={styles.camera}
        onCameraReady={handleCameraReady}
        ref={cameraRef}
      >
        {isCameraReady && <SpotScanFrame />}
      </CameraView>

      {/* Tombol Scan dan Upload */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleScan}>
          <Text style={styles.buttonText}>SCAN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonText}>UPLOAD</Text>
        </TouchableOpacity>
      </View>
      {capturedImage && (
        <View style={styles.imageContainer}>
          <Text style={styles.imageText}>Captured Image:</Text>
          <Image source={{ uri: capturedImage }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={handleLanjut}>
            <Text style={styles.buttonText}>Lanjut</Text>
          </TouchableOpacity>
        </View>
      )}
      {showModal && (
        <Modal
          title="Status Anda Pengguna Aktif"
          visible={showModal}
          falseText="Kembali"
          trueText="Lanjut Proses"
          onClose={() => {
            setShowModal(false);
          }}
          onTrue={() => {}}
        ></Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  spotScanContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
    flexDirection: "row",
    backgroundColor: "#FFF",
    aspectRatio: 414 / 132,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  frameContainer: {
    position: "absolute",
    top: "20%",
    left: "10%",
    right: "10%",
    bottom: "10%",
    borderWidth: 3,
    borderColor: "#FF5733", // Warna orange seperti yang ada di desain
    borderRadius: 8,
  },
  frame: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  topFrame: {
    top: 0,
    left: 0,
    right: 0,
    height: "10%",
  },
  leftFrame: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "10%",
  },
  bottomFrame: {
    bottom: 0,
    left: 0,
    right: 0,
    height: "10%",
  },
  rightFrame: {
    top: 0,
    right: 0,
    bottom: 0,
    width: "10%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFBFF",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 20,
  },
  button: {
    width: 140,
    aspectRatio: 154 / 60,
    backgroundColor: "#005D85",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },

  imageContainer: {
    padding: 10,
    alignItems: "center",
    marginTop: 20,
  },
  imageText: {
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

export default SpotScan;
