import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "@rneui/base";
import { bookings } from "../data/Data";
import { LinearGradient } from "expo-linear-gradient";
const Bookings = ({ back, toExplore, toHome, toReviews, toAccount }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
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
        rightComponent={
          <Ionicons name="ios-briefcase-outline" size={30} color="#fff" />
        }
      />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
      >
        <View style={[styles.bookingTop]}>
          <Text style={styles.optionText}>Trips Booked</Text>
        </View>
        <View style={[styles.bookings]}>
          {bookings.map((booking) => {
            return (
              booking.trip && (
                <TouchableOpacity key={booking.id} style={styles.booking}>
                  <Text style={styles.optionText}>{booking.id}</Text>
                  <Text style={styles.optionText}>{booking.title}</Text>
                </TouchableOpacity>
              )
            );
          })}
        </View>
        <View
          style={[
            styles.bookingTop,
            { borderTopLeftRadius: 0, borderTopRightRadius: 0 },
          ]}
        >
          <Text style={styles.optionText}>Hotel room</Text>
        </View>
        <View style={[styles.bookings]}>
          {bookings.map((booking) => {
            return (
              booking.hotel && (
                <TouchableOpacity key={booking.id} style={styles.booking}>
                  <Text style={styles.optionText}>{booking.id}</Text>
                  <Text style={styles.optionText}>{booking.hotelName}</Text>
                </TouchableOpacity>
              )
            );
          })}
        </View>
        <View style={[styles.bookingBottom]}>
          <Text style={styles.optionText}>Trips Booked</Text>
        </View>
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
  bookings: {
    backgroundColor: "#fff",
    width: "96%",
    minHeight: 60,
    margin: 2,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  bookingTop: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "orange",
    width: "96%",
    height: 60,
    margin: 2,
    borderWidth: 0.5,
    borderColor: "grey",
    alignContent: "center",
    alignItems: "center",
  },
  bookingBottom: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: "orange",
    width: "96%",
    height: 60,
    margin: 2,
    borderWidth: 0.5,
    borderColor: "grey",
    alignContent: "center",
    alignItems: "center",
  },
  booking: {
    width: "100%",
    height: 60,
    borderBottomWidth: 0.5,
    alignContent: "center",
    alignItems: "center",
    borderColor: "grey",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  optionText: { color: "#000", fontSize: 18, fontWeight: "400" },
});
