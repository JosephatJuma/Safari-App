import { StyleSheet, Text, View, FlatList } from "react-native";
import Home from "./app/screens/Home";
import Explore from "./app/screens/Explore";
import Reviews from "./app/screens/Reviews";
import Bookings from "./app/screens/Bookings";
import Account from "./app/screens/Account";
import Search from "./app/screens/Search";
import Login from "./app/auth/Login";
import Signup from "./app/auth/Signup";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useState } from "react";

export default function App() {
  const HomeScreen = ({ navigation }) => {
    return (
      <Home
        toExplore={() => navigation.navigate("Explore")}
        toAccount={() => navigation.push("Account")}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
        toSearch={() => navigation.push("Search")}
      />
    );
  };
  const ExploreScreen = ({ navigation }) => {
    return (
      <Explore
        back={() => navigation.goBack()}
        toAccount={() => navigation.navigate("Account")}
        toHome={() => navigation.push("Home")}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
        toSearch={() => navigation.navigate("Search")}
      />
    );
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
        logout={() => navigation.navigate("Login")}
      />
    );
  };
  const SearchScreen = ({ navigation }) => {
    return <Search back={() => navigation.goBack()} />;
  };
  const SignupScreen = ({ navigation }) => {
    const handleSignup = (email, password) => {
      console.log(email, password);
      alert("Sign here");
    };
    return (
      <Signup
        login={() => navigation.push("Login")}
        signupFunction={handleSignup}
      />
    );
  };
  const LoginScreen = ({ navigation }) => {
    const handleLogin = (email, password) => {
      console.log(email, password);
      navigation.push("Account");
    };
    return (
      <Login
        back={() => navigation.goBack()}
        loginFunction={handleLogin}
        signup={() => navigation.push("Signup")}
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

          //cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Explore"
          component={ExploreScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Reviews"
          component={ReviewsScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Bookings"
          component={BookingScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Account"
          component={AccountScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            gestureEnabled: true,
            gestureDirection: "horizontal",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenOptions: { gestureEnabled: true, gestureDirection: "horizontal" },
});
