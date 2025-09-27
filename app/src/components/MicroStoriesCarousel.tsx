import { ScrollView, StyleSheet, Text, View } from "react-native";

interface MicroStory {
  id: string;
  title: string;
  content: string;
}

interface MicroStoriesCarouselProps {
  stories: MicroStory[];
}

const MicroStoriesCarousel = ({ stories = [] }: MicroStoriesCarouselProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.carousel}
    >
      {stories.map((story) => (
        <View key={story.id} style={styles.storyCard}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyContent}>{story.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    paddingVertical: 16,
  },
  storyCard: {
    width: 280,
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  storyContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default MicroStoriesCarousel;
