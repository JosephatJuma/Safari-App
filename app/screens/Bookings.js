import { StyleSheet, Text, View } from "react-native";
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
const Bookings = ({ back, toExplore, toHome, toReviews, toAccount }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        backgroundColor="orange"
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
        <View style={[styles.bookings, styles.boxShadow]}>
          <Text>Hello</Text>
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
    height: 400,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
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
});
