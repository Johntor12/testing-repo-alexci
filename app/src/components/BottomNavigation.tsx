import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import AppHeader from "./AppHeader";

export default function BottomNavigation() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.wrapper}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black", // icon nonaktif jadi hitam
          tabBarStyle: {
            backgroundColor: "#fafafa",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            borderTopWidth: 0,
            shadowColor: "black",
            shadowRadius: 6,
            elevation: 6,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            header: (props) => <AppHeader {...props} />,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="informasi"
          options={{
            title: "Informasi",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={
                  focused
                    ? "information-circle-sharp"
                    : "information-circle-outline"
                }
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profil"
          options={{
            title: "Profil",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person-sharp" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fafafa", // ⬅️ latar belakang solid
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden", // ⬅️ potong radius biar ga ada transparan
  },
});
