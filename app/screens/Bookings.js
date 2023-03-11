import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Header } from "@rneui/base";
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
        <View style={[styles.bookings]}>
          {bookings.map((booking) => {
            return (
              <TouchableOpacity
                style={[styles.booking, styles.boxShadow]}
                key={booking.id}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Image
                    style={{ width: "40%", height: 80 }}
                    resizeMode="contain"
                    source={{
                      uri: booking.image,
                    }}
                  />
                  <Card
                    containerStyle={{
                      width: "60%",
                      marginBottom: 5,
                      borderWidth: 0,
                    }}
                  >
                    <Text style={styles.text}>{booking.id}</Text>
                    <Text style={styles.text}>{booking.title}</Text>
                    <Text style={styles.text}>{booking.price}</Text>
                  </Card>
                </View>
              </TouchableOpacity>
            );
          })}
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
    width: "98%",
  },

  booking: {
    alignItems: "center",
    marginBottom: 2,
    backgroundColor: "#fff",
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
  text: { color: "grey", fontSize: 15, fontWeight: "500" },
});
