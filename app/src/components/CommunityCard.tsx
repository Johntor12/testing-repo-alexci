import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import LihatSelengkapnyaButton from "./LihatSelengkapnyaButton"; // harus di-convert juga ke RN

const CommunityServices = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Layanan Komunitas!</Text>

      {/* Horizontal Scroll for cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {[1, 2, 3].map((index) => (
          <View key={index} style={styles.cardWrapper}>
            <Image
              source={require("../../../assets/images/allianz.jpg")} // convert /Asset/allianz.jpg ke assets folder
              style={styles.cardImage}
            />
            <View style={styles.cardOverlay}>
              <Text style={styles.cardText}>Allianz Indonesia</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <LihatSelengkapnyaButton
          variant="secondary"
          onPress={() => {
            router.push("/screen/pilih-komunitas-kesehatan");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  cardWrapper: {
    marginRight: 16,
    position: "relative",
  },
  cardImage: {
    width: 139,
    height: 163,
    borderRadius: 15,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    backgroundColor: "rgba(236,240,255,0.87)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommunityServices;
