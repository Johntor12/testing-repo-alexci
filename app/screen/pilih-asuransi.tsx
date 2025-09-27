import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useScan } from "../context/ScanContext";
import RumahSakitCard from "../src/components/Registration/RumahSakitCard";
import ScreenContainer from "../src/components/ScreenContainer";

const DATA_RS = [
  {
    id: "1",
    name: "RS. Hermina",
    hours: "Open 24 Hours",
    phone: "(0274) 2800808",
    image: require("../../assets/images/rumah_sakit_image.png"),
  },
  {
    id: "2",
    name: "RS. Hermina",
    hours: "Open 24 Hours",
    phone: "(0274) 2800808",
    image: require("../../assets/images/rumah_sakit_image.png"),
  },
  {
    id: "3",
    name: "RS. Hermina",
    hours: "Open 24 Hours",
    phone: "(0274) 2800808",
    image: require("../../assets/images/rumah_sakit_image.png"),
  },
  {
    id: "4",
    name: "RS. Hermanto",
    hours: "Open 24 Hours",
    phone: "(0274) 2800808",
    image: require("../../assets/images/rumah_sakit_image.png"),
  },
  {
    id: "5",
    name: "RS. Herman H. N.",
    hours: "Open 24 Hours",
    phone: "(0274) 2800808",
    image: require("../../assets/images/rumah_sakit_image.png"),
  },
];

//   // Simulasi delay API
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve([
//         {
//           id: "1",
//           name: "RS. Harapan Sehat",
//           hours: "Open 24 Hours",
//           phone: "(021) 123456",
//           image: require("../../assets/images/rumah_sakit_image.png"),
//         },
//         {
//           id: "2",
//           name: "RS. Kasih Ibu",
//           hours: "Open 24 Hours",
//           phone: "(021) 654321",
//           image: require("../../assets/images/rumah_sakit_image.png"),
//         },
//         {
//           id: "3",
//           name: "RS. Bhakti Mulia",
//           hours: "Open 24 Hours",
//           phone: "(021) 778899",
//           image: require("../../assets/images/rumah_sakit_image.png"),
//         },
//       ]);
//     }, 1000); // 1 detik delay
//   });
// };

export default function Pilihasuransi() {
  const [asuransi, setAsuransi] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.AI_API_URL ||
    "https://fastapi-ai-service-1081333106174.asia-southeast2.run.app/";

  const { resultKtp } = useScan();
  console.log(resultKtp);

  useEffect(() => {
    const bodyParams = {
      query: "asuransi jiwa",
      top_n: 5,
    };

    const fetchasuransi = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/rekomendasi-asuransi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyParams),
        });

        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Hasil dari API:", data);

        // pastikan data berupa array rumah sakit
        if (Array.isArray(data.results)) {
          setAsuransi(data.results);
        } else {
          setAsuransi([]);
        }
      } catch (error) {
        console.error("Gagal fetch rumah sakit:", error);
        setAsuransi([]);
      } finally {
        setLoading(false);
      }
    };

    fetchasuransi();
  }, []);

  // Filter pencarian
  const filteredData = asuransi.filter((item) =>
    (item.nama_rumah_sakit || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenContainer scrollable={false}>
      {/* Header */}
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.headerText}>Pilih Rumah Sakit</Text>
        <Text style={styles.subHeaderText}> yang </Text>
      </View>
      <Text style={styles.subHeaderText}>Menerima Asuransi</Text>
      <Text style={styles.descText}>
        Ketik atau ucapkan keluhanmu, dan kami bantu cek apakah kondisimu bisa
        ditanggung oleh asuransi.
      </Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Cari Rumah Sakit..."
        value={search}
        onChangeText={setSearch}
      />

      {/* List Rumah Sakit */}
      {!loading ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 12 }}>
              <RumahSakitCard
                variant={"asuransi"}
                name={item.nama_rumah_sakit}
                hours={"24 jam"}
                phone={item.telp}
                image={require("../../assets/images/rumah_sakit_image.png")}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    marginTop: -54,
    zIndex: 10,
    borderTopLeftRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: "#F4F8FB",
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
  searchInput: {
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
