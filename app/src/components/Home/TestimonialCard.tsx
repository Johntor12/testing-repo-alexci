import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Testimonial = {
  id?: number;
  image?: ImageSourcePropType;
  quote?: string;
  author?: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: require("../../../../assets/images/woman.png"),
    quote:
      '"Berkat bantuan asuransi, ibu saya berhasil sembuh dari stroke karena layanan operasi yang optimal."',
    author: "Hanifah",
  },
];

function CardItem({
  image = require("../../../../assets/images/woman.png"),
  quote,
  author,
}: Testimonial) {
  return (
    <View style={styles.cardContainer}>
      <Image source={image} style={styles.image} />
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.author}>- {author}</Text>
        </View>
      </View>
    </View>
  );
}

export default function TestimonialCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kisah Nyata. Perlindungan Nyata.</Text>
      <Text style={styles.subtitle}>
        Di saat sulit, perlindungan bukan cuma janji. Ini buktinya.
      </Text>
      {testimonials.map((item) => (
        <CardItem
          key={item.id}
          id={item.id}
          image={item.image}
          quote={item.quote}
          author={item.author}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
  },
  cardContainer: { flexDirection: "row", gap: 0, marginBottom: 32 },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    maxWidth: 152,
    alignItems: "center", // ⬅️ ini bikin isi card center vertikal
    justifyContent: "center",
  },
  image: {
    width: 110,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  textContainer: {
    flex: 1,
    maxWidth: "60%",
    alignItems: "center",
    justifyContent: "center", // ⬅️ teks biar rata tengah vertikal
  },
  quote: {
    width: 100,
    fontSize: 12,
    fontStyle: "italic",
    marginBottom: 8,
    textAlign: "center",
    flexWrap: "wrap",
    color: "#000",
  },
  author: {
    fontSize: 13,
    color: "#555",
    fontStyle: "italic",
    textAlign: "right",
  },
});
