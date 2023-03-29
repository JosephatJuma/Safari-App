import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Skeleton, Button } from "@rneui/base";

const Notifications = ({ back }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={styles.linear}
        backgroundColor="transparent"
        leftComponent={
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="#fff"
            onPress={back}
          />
        }
        centerComponent={<Text style={styles.screenName}>Notifications</Text>}
      />
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
          source={require("../app/assets/images/notification.png")}
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
          You have no Communications yet, once they are available, you will find
          them here
        </Text>
        <Button
          title="Back"
          containerStyle={{ width: "70%", height: 50 }}
          buttonStyle={{ backgroundColor: "#ff5349", height: "100%" }}
          onPress={back}
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  container: {
    backgroundColor: "#F5F5F5",
    height: "100%",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "orange",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 600,
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
});
