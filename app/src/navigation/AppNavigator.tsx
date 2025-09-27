import LoginScreen from "@/app/(auth)/login";
import RegisterScreen from "@/app/(auth)/register";
import SplashScreen from "@/app/(auth)/splash";
import { useAuth } from "@/app/context/AuthContext";
import HomeScreen from "@/app/screen/home-screen"; // pastikan path benar
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../components/AppHeader";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: (props) => <AppHeader {...props} /> }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
