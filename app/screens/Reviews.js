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
        <View>
          <Text>Your ratines will be here</Text>
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
