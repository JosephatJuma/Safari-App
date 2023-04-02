import { StyleSheet, Alert } from "react-native";
import Home from "./app/screens/Home";
import Reviews from "./app/screens/Reviews";
import Bookings from "./app/screens/Bookings";
import Account from "./app/screens/Account";
import Search from "./app/screens/Search";
import Login from "./app/auth/Login";
import Signup from "./app/auth/Signup";
import Forgot from "./app/auth/Forgot";
import GetStarted from "./app/auth/GetStarted";
import Help from "./more/Help";
import Info from "./more/Info";
import Cart from "./app/screens/Cart";
import Notifications from "./more/Notifications";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useState } from "react";
//Firbase
import { app } from "./firebase/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
export default function App() {
  //variables
  const [signedIn, setSignedIn] = useState(false);
  const [logging, SetLogging] = useState(false);
  const [user, setUser] = useState({});
  const [cartItems, setCartItems] = useState([]);

  //forgot password
  const [sendingEmail, setSending] = useState(false);
  const [emailSent, setSent] = useState(false);

  const HomeScreen = ({ navigation }) => {
    const addToCart = (item) => {
      setCartItems((items) => [...items, item]); //add to cart
    };
    return (
      <Home
        numberOfItemsOnCart={cartItems.length}
        toExplore={() => navigation.push("Explore")}
        toAccount={() => navigation.push(signedIn ? "Account" : "Login")}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
        toSearch={() => navigation.push("Search")}
        nots={() => navigation.push("Notifications")}
        cart={() => navigation.push("Cart")}
        handleupDateCart={addToCart}
        user={user}
        loggedIn={signedIn}
      />
    );
  };

  const ReviewsScreen = ({ navigation }) => {
    return (
      <Reviews
        back={() => navigation.goBack()}
        toAccount={() => navigation.push(signedIn ? "Account" : "Login")}
        toBookings={() => navigation.push("Bookings")}
        toHome={() => navigation.popToTop()}
      />
    );
  };
  const BookingScreen = ({ navigation }) => {
    const navigateToAccount = () => {
      return navigation.navigate(signedIn ? "Account" : "Login");
    };
    return (
      <Bookings
        back={() => navigation.goBack()}
        toHome={() => navigation.popToTop()}
        toAccount={navigateToAccount}
        toReviews={() => navigation.push("Reviews")}
        userID={user.userID}
      />
    );
  };
  const AccountScreen = ({ navigation }) => {
    const logout = () => {
      SetLogging(true);
      const auth = getAuth();
      setTimeout(() => {
        auth
          .signOut()
          .then(() => {
            setSignedIn(false);
            setUser({});
            SetLogging(false);
            navigation.push("Get Started");
          })
          .catch((error) => {
            Alert.alert("Sign Out Error!", error.message);
            SetLogging(false);
          });
      }, 10);
    };
    return (
      <Account
        back={() => navigation.goBack()}
        toHome={() => navigation.popToTop()}
        toBookings={() => navigation.push("Bookings")}
        toReviews={() => navigation.push("Reviews")}
        logout={logout}
        help={() => navigation.push("Help")}
        info={() => navigation.push("Info")}
        user={user}
        loggingOut={logging}
      />
    );
  };
  const SearchScreen = ({ navigation }) => {
    return <Search back={() => navigation.goBack()} />;
  };
  const GetStartedScreen = ({ navigation }) => {
    return (
      <GetStarted
        toLogin={() => navigation.navigate("Login")}
        toSignUp={() => navigation.navigate("Signup")}
        toHome={() => navigation.navigate("Home")}
      />
    );
  };
  const SignupScreen = ({ navigation }) => {
    const navigateToLogin = () => {
      return navigation.navigate("Login");
    };
    const handleLogin = (email, password) => {
      SetLogging(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser({
            userID: user.uid,
            name: user.displayName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            verified: user.emailVerified,
          });
        })
        .then(() => {
          SetLogging(false);
          setSignedIn(true);
          navigation.popToTop();
        })
        .catch((error) => {
          Alert.alert("Login Error!", error.code);
          SetLogging(false);
        });
    };

    return (
      <Signup
        login={navigateToLogin}
        nowLogin={handleLogin}
        loggingIn={logging}
      />
    );
  };
  const LoginScreen = ({ navigation }) => {
    const navigateToSignup = () => {
      return navigation.navigate("Signup");
    };
    const handleLogin = (email, password) => {
      if (!email) {
        Alert.alert("Warning!", "Email can't be empty!");
        return;
      } else if (!password) {
        Alert.alert("Warning!", "Password muist be given!");
        return;
      }
      SetLogging(true);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser({
            userID: user.uid,
            name: user.displayName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            verified: user.emailVerified,
          });
        })
        .then(() => {
          SetLogging(false);
          setSignedIn(true);
          navigation.popToTop();
        })
        .catch((error) => {
          Alert.alert("Login Error!", error.code);
          SetLogging(false);
        });
    };

    return (
      <Login
        validating={logging}
        back={() => navigation.goBack()}
        loginFunction={handleLogin}
        signup={navigateToSignup}
        forgot={() => navigation.push("Forgot")}
      />
    );
  };
  const ForgotPasswordScreen = ({ navigation }) => {
    const resetPassword = (email) => {
      setSending(true);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //check with firebase
          const auth = getAuth();
          sendPasswordResetEmail(auth, email)
            .then(() => {
              setSending(false);
              setSent(true);
            })
            .catch((error) => {
              Alert.alert("Login Error!", error.message);
              setSending(false);
            });
          resolve();
        }, 100);
      });
    };
    const resend = () => {
      setSent(false);
    };

    return (
      <Forgot
        reset={resetPassword}
        sending={sendingEmail}
        sent={emailSent}
        login={() => navigation.push("Login")}
        resend={resend}
      />
    );
  };
  //More Screens
  const HelpScreen = ({ navigation }) => {
    return <Help back={() => navigation.goBack()} />;
  };
  const InfoScreen = ({ navigation }) => {
    return <Info back={() => navigation.goBack()} />;
  };
  const NotificationsScreen = ({ navigation }) => {
    return <Notifications back={() => navigation.goBack()} />;
  };
  const CartScreen = ({ navigation }) => {
    const removeFromCart = () => {
      setCartItems([]);
    };
    return (
      <Cart
        back={() => navigation.goBack()}
        items={cartItems}
        removeItem={removeFromCart}
        user={user}
        loggedIn={signedIn}
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
              CardStyleInterpolators.forRevealFromBottomAndroid,
            gestureEnabled: true,
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="Get Started"
          component={GetStartedScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPasswordScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={styles.screenOptions}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={styles.screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenOptions: { gestureEnabled: true, gestureDirection: "horizontal" },
});

//  const ExploreScreen = ({ navigation }) => {
//    return (
//      <Explore
//        back={() => navigation.goBack()}
//        toAccount={() => navigation.push(signedIn ? "Account" : "Login")}
//        toHome={() => navigation.popToTop()}
//        toBookings={() => navigation.push("Bookings")}
//        toReviews={() => navigation.push("Reviews")}
//        toSearch={() => navigation.navigate("Search")}
//      />
//    );
//  };
