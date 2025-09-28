import { useAuth } from "@/app/context/AuthContext";
import { useScan } from "@/app/context/ScanContext";
import * as FileSystem from "expo-file-system";
import { usePathname, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface UploadFileProps {
  namaFile?: string;
  icon?: "upload" | "download";
  uri?: string | null;
  onChange?: (uri: string) => void;
  variant?:
    | "scan-ktp"
    | "scan-diagnosis"
    | "scan-asuransi"
    | "scan-invoicers"
    | "scan-netral";
}

const AI_API_URL =
  process.env.AI_API_URL ||
  "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app";

export default function UploadFile({
  namaFile = "KTP terbarumu",
  icon = "upload",
  uri,
  onChange,
  variant = "scan-ktp",
}: UploadFileProps) {
  const { fetchWithAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const {
    imageUriKtp,
    imageUriAsuransi,
    imageUriInvoicers,
    imageUriDiagnosis,
    imageUriNetral,
  } = useScan();
  // const params = useLocalSearchParams<{ imageUriKtp?: string }>();
  const [image, setImage] = useState<string | null>(null);

  const dummyImage = "https://picsum.photos/600/400";

  const openSpotScan = () => {
    if (variant === "scan-ktp") {
      router.push({
        pathname: "/screen/spot-scan",
        params: { returnTo: pathname, variant },
      });
    } else if (variant === "scan-asuransi") {
      router.push({
        pathname: "/screen/spot-scan-asuransi",
        params: { returnTo: pathname, variant },
      });
    } else if (variant === "scan-invoicers") {
      router.push({
        pathname: "/screen/spot-scan-invoicers",
        params: { returnTo: pathname, variant },
      });
    } else if (variant === "scan-diagnosis") {
      router.push({
        pathname: "/screen/spot-scan-diagnosis",
        params: { returnTo: pathname, variant },
      });
    } else {
      router.push({
        pathname: "/screen/spot-scan-netral",
        params: { returnTo: pathname, variant },
      });
    }
  };

  useEffect(() => {
    if (uri) {
      setImage(uri);
    } else {
      if (variant === "scan-ktp") setImage(imageUriKtp);
      else if (variant === "scan-asuransi") setImage(imageUriAsuransi);
      else if (variant === "scan-invoicers") setImage(imageUriInvoicers);
      else if (variant === "scan-diagnosis") setImage(imageUriDiagnosis);
      else setImage(imageUriNetral);
    }
  }, [
    uri,
    imageUriKtp,
    imageUriAsuransi,
    imageUriInvoicers,
    imageUriDiagnosis,
  ]);

  // =====================
  // Dummy download handler
  // =====================
  // const handleDownload = async () => {
  //   try {
  //     // pakai endpoint dummy
  //     const url = `/ajubanding/file-dummy.pdf`;
  //     const response = await fetchWithAuth(url);

  //     if (!response.ok) {
  //       throw new Error(`Gagal download: ${response.status}`);
  //     }

  //     const blob = await response.blob();
  //     const fileReader = new FileReader();

  //     fileReader.onload = async () => {
  //       try {
  //         const base64Data = (fileReader.result as string).split(",")[1];
  //         const fileUri = FileSystem.documentDirectory + `file_dummy.pdf`;

  //         await FileSystem.writeAsStringAsync(fileUri, base64Data, {
  //           encoding: "base64",
  //         });

  //         if (await Sharing.isAvailableAsync()) {
  //           await Sharing.shareAsync(fileUri);
  //         } else {
  //           Alert.alert("Sukses", `File berhasil diunduh ke ${fileUri}`);
  //         }
  //       } catch (err) {
  //         console.error("❌ Error write file:", err);
  //         Alert.alert("Error", "Gagal menyimpan file");
  //       }
  //     };

  //     fileReader.readAsDataURL(blob);
  //   } catch (err: any) {
  //     console.error("❌ Download error:", err);
  //     Alert.alert("Error", "Gagal mengunduh file");
  //   }
  // };

  async function handleDownload(
    namaFile: string,
    filename: string,
    downloadUrl: string
  ) {
    try {
      console.log("📥 Download request:", { filename, downloadUrl });

      const response = await fetch(`${AI_API_URL}/download/${filename}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gagal download: ${response.status} - ${errText}`);
      }

      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          const base64Data = (reader.result as string).split(",")[1];
          const safeDir = FileSystem.Directory;
          const fileUri =
            safeDir + `${namaFile.replace(/\s+/g, "_") || "file"}.pdf`;

          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
          } else {
            Alert.alert("Download Berhasil", `File tersimpan di: ${fileUri}`);
          }
        } catch (err) {
          console.error("❌ Error write file:", err);
          Alert.alert("Error", "Gagal menyimpan file");
        }
      };

      reader.readAsDataURL(blob);
    } catch (err: any) {
      console.error("❌ Download error:", err);
      Alert.alert("Error", err.message || "Gagal mengunduh file");
    }
  }

  return (
    <View>
      <Text style={styles.label}>{namaFile}</Text>
      <TouchableOpacity
        style={styles.uploadBox}
        onPress={
          icon === "upload"
            ? openSpotScan
            : () => {
                // if (uri) {
                //   // `uri` di sini = download_url dari response sebelumnya
                //   handleDownload(namaFile, namaFile, uri);
                // } else {
                //   Alert.alert("Error", "Download URL tidak tersedia");
                // }
              }
        }
      >
        {image && icon === "upload" ? (
          <Image source={{ uri: image }} style={styles.uploadImage} />
        ) : (
          <View style={styles.emptyContent}>
            <Image
              source={
                icon === "upload"
                  ? require("../../../../assets/images/plus.png")
                  : require("../../../../assets/images/ic-download.png")
              }
            />
            {icon === "upload" ? (
              <Text style={styles.uploadText}>
                Scan/Upload {namaFile} {"\n"}Max file size : 10 MB
              </Text>
            ) : (
              <Text style={styles.uploadText}>Download {namaFile}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  emptyContent: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
});
