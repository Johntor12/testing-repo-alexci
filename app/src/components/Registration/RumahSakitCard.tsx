import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  count?: "pertama" | "kedua";
  variant?: "RS" | "asuransi";
  hours: string;
  phone: string;
  image: any;
};

const RumahSakitCard = ({
  name,
  count = "pertama",
  variant = "RS",
  hours,
  phone,
  image,
}: Props) => {
  const router = useRouter();

  return (
    <View style={styles.cardContainer}>
      {/* Image RS */}
      <Image source={image} style={styles.image} />

      {/* Description */}
      <View style={styles.containerDesc}>
        <View style={styles.textContainer}>
          <Text style={styles.rsName}>{name}</Text>
        </View>

        <View style={styles.textHoursContainer}>
          <Image
            source={require("../../../../assets/images/image_montir.png")}
            style={styles.imageMontir}
          />
          <Text style={styles.textHours}>Hours:</Text>
          <Text>{hours}</Text>
        </View>

        <View style={styles.textHoursContainer}>
          <Image
            source={require("../../../../assets/images/image_montir.png")}
            style={styles.imageMontir}
          />
          <Text style={styles.textHours}>Phone:</Text>
          <Text>{phone}</Text>
        </View>

        <View
          style={{ width: "100%", justifyContent: "flex-end", marginTop: 8 }}
        >
          <Pressable
            style={styles.pilihRSButton}
            onPress={() => {
              {
                variant === "RS"
                  ? count === "pertama"
                    ? router.push("/screen/claim-form")
                    : router.push("/screen/claim-form-kedua")
                  : router.push("/screen/isi-data-diri-asuransi");
              }
            }}
          >
            <Text style={styles.textPilihRS}>
              Pilih {variant === "RS" && ``} →
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RumahSakitCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    width: "100%",
    aspectRatio: 360 / 180,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#F9F6FF",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: 112,
    aspectRatio: 112 / 155,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  imageMontir: {
    width: 17,
    aspectRatio: 17 / 18,
  },
  containerDesc: {
    flexDirection: "column",
    padding: 8,
    flex: 1,
  },
  textContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#31B5FF",
    marginTop: 4,
    marginBottom: 6,
  },
  rsName: {
    fontSize: 18,
    fontWeight: "600",
  },
  textHoursContainer: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 6,
    alignItems: "center",
  },
  textHours: {
    fontWeight: "bold",
    marginLeft: 2,
  },
  pilihRSButton: {
    width: 106,
    aspectRatio: 106 / 36,
    backgroundColor: "#005D85",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: "auto",
  },
  textPilihRS: {
    color: "white",
    fontWeight: "600",
  },
});
