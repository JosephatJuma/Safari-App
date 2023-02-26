import { StyleSheet, Text, View, FlatList } from "react-native";
import Home from "./app/screens/Home";
import Explore from "./app/screens/Explore";
import Reviews from "./app/screens/Reviews";
import Bookings from "./app/screens/Bookings";
import Account from "./app/screens/Account";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

export default function App() {
  const HomeScreen = ({ navigation }) => {
    return (
      <Home
        toExplore={() => navigation.navigate("Explore")}
        toAccount={() => navigation.push("Account")}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
      />
    );
  };
  const ExploreScreen = ({ navigation }) => {
    return <Explore back={() => navigation.goBack()} />;
  };
  const ReviewsScreen = ({ navigation }) => {
    return <Reviews back={() => navigation.goBack()} />;
  };
  const BookingScreen = ({ navigation }) => {
    return (
      <Bookings
        back={() => navigation.goBack()}
        toExplore={() => navigation.navigate("Explore")}
        toHome={() => navigation.push("Home")}
        toAccount={() => navigation.push("Account")}
        toReviews={() => navigation.push("Reviews")}
      />
    );
  };
  const AccountScreen = ({ navigation }) => {
    return (
      <Account
        back={() => navigation.goBack()}
        toExplore={() => navigation.navigate("Explore")}
        toHome={() => navigation.push("Home")}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
      />
    );
  };
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        animationEnabled={true}
        screenOptions={{
          cardStyle: { backgroundColor: "#FFFFFF" },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          //cardStyleInterpolator:CardStyleInterpolators.forRevealFromBottomAndroid,
          //cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          // cardStyleInterpolator:CardStyleInterpolators.forFadeFromBottomAndroid,
          //cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          //cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Reviews" component={ReviewsScreen} />
        <Stack.Screen name="Bookings" component={BookingScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
