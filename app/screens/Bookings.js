import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Header, Chip } from "@rneui/base";
import { Rating, AirbnbRating } from "react-native-ratings";
import { bookings } from "../data/Data";
import { LinearGradient } from "expo-linear-gradient";
const Bookings = ({ back, toExplore, toHome, toReviews, toAccount }) => {
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        style="light"
      />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={styles.linear}
        backgroundColor="transparent"
        leftComponent={
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            color="#fff"
            onPress={back}
          />
        }
        centerComponent={<Text style={styles.screenName}>My Bookings</Text>}
      />
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
      >
        {bookings.map((booking) => {
          return (
            <TouchableHighlight
              style={[styles.booking, styles.boxShadow]}
              key={booking.id}
              underlayColor="#DBE9FA"
              onPress={() => console.log("yes")}
            >
              <View>
                <View style={styles.details}>
                  <Image
                    style={[styles.image]}
                    source={require("../assets/images/booking.png")}
                  />
                  <View>
                    <Text style={styles.text}>25th Feb 2023</Text>
                    <Text style={styles.text}>{booking.title}</Text>
                  </View>
                  <Chip
                    title={booking.confirmed ? "Confirmed" : "Pending"}
                    icon={
                      booking.confirmed ? (
                        <MaterialIcons name="check" color="#fff" size={20} />
                      ) : (
                        <MaterialIcons name="pending" color="#fff" size={20} />
                      )
                    }
                    buttonStyle={[
                      booking.confirmed
                        ? { backgroundColor: "orange" }
                        : { backgroundColor: "#ff5349" },
                      6,
                    ]}
                  />
                </View>

                <View style={styles.amount}>
                  <Text style={styles.text}>Total</Text>
                  <Text style={styles.text}>UGX {booking.price}</Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
      <Navigation
        isB={true}
        h={toHome}
        e={toExplore}
        r={toReviews}
        a={toAccount}
      />
    </View>
  );
};

export default Bookings;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  booking: {
    backgroundColor: "#fff",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  image: { width: 70, height: 70 },
  details: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  amount: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
  text: { color: "grey", fontSize: 15, fontWeight: "500" },
});
