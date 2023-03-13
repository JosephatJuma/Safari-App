import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlightComponent,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Header, Chip } from "@rneui/base";

import { bookings } from "../data/Data";
import { LinearGradient } from "expo-linear-gradient";
const Bookings = ({ back, toExplore, toHome, toReviews, toAccount }) => {
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
        rightComponent={
          <Ionicons name="ios-briefcase-outline" size={30} color="#fff" />
        }
      />
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
      >
        <View style={[styles.bookings]}>
          {bookings.map((booking) => {
            return (
              <Card
                containerStyle={[styles.booking, styles.boxShadow]}
                key={booking.id}
              >
                <View
                  style={{
                    width: "100%",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.text}>25th Feb 2023</Text>
                    <Image
                      style={[styles.image]}
                      source={{
                        uri: booking.image,
                      }}
                    />
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
                    containerStyle={{
                      marginVertical: 15,
                      borderRadius: 10,
                    }}
                    buttonStyle={[
                      booking.confirmed
                        ? { backgroundColor: "orange" }
                        : { backgroundColor: "grey" },
                      { borderRadius: 10 },
                    ]}
                  />
                </View>
                <Card.Divider></Card.Divider>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text style={styles.text}>{booking.title}</Text>
                </View>

                <Card.Divider></Card.Divider>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text style={styles.text}>Total</Text>
                  <Text style={styles.text}>UGX {booking.price}</Text>
                </View>
              </Card>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  bookings: {
    width: "98%",
    alignContent: "center",
    alignItems: "center",
  },

  booking: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    alignContent: "center",
    height: 200,
    padding: 0,
    borderWidth: 1,
    margin: 5,
    borderColor: "lightgrey",
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 11,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  textArea: {},
  text: { color: "grey", fontSize: 15, fontWeight: "900" },
});
