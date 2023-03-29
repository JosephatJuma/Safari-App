import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Header, Button } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
const Reviews = ({ back, toExplore, toAccount, toHome, toBookings }) => {
  return (
    <View>
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
        centerComponent={<Text style={styles.screenName}>Rating</Text>}
      />
      <ScrollView style={{ minHeight: "80.5%" }}>
        <View
          style={{
            width: "96%",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            height: 600,
            justifyContent: "space-evenly",
          }}
        >
          <Image
            source={require("../assets/images/reviews.png")}
            style={{ height: 300, width: 300 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              color: "#ff5349",
              fontWeight: "700",
            }}
          >
            You have not yet made any reviews
          </Text>
          <Button
            title="Back"
            containerStyle={{ width: "70%", height: 50 }}
            buttonStyle={{ backgroundColor: "#ff5349", height: "100%" }}
            onPress={back}
          />
        </View>
      </ScrollView>
      <Navigation
        isR={true}
        h={toHome}
        a={toAccount}
        e={toExplore}
        b={toBookings}
      />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
});
