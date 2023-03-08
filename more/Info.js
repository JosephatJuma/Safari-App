import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { Header } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
const Info = ({ back }) => {
  const [phoneNumber, setPhoneNumber] = useState("+256757751178");
  const openTwitter = () => {
    Linking.openURL("https://twitter.com/Tuzungeuganda");
  };
  const openInstagram = () => {
    Linking.openURL("https://www.instagram.com/tuzungeuganda/");
  };
  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/tuzungeUganda");
  };

  const makeCall = () => {
    let phoneNumberStr = "";
    if (Platform.OS === "android") {
      phoneNumberStr = `tel:${phoneNumber}`;
    } else {
      phoneNumberStr = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(phoneNumberStr);
  };
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
        centerComponent={<Text style={styles.screenName}>More Info</Text>}
      />

      <View style={styles.items}>
        <TouchableOpacity style={styles.item} onPress={openTwitter}>
          <AntDesign name="twitter" size={100} color="orange" />
          <Text style={styles.text}>Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={openFacebook}>
          <AntDesign name="facebook-square" size={100} color="orange" />
          <Text style={styles.text}>Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.items}>
        <TouchableOpacity style={styles.item} onPress={openInstagram}>
          <AntDesign name="instagram" size={100} color="orange" />
          <Text style={styles.text}>Instagram</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <MaterialCommunityIcons name="web" size={100} color="orange" />
          <Text style={styles.text}>Website</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Info;

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
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  items: {
    width: "98%",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 150,
    alignSelf: "center",
    justifyContent: "space-around",
    margin: 5,
  },
  item: {
    backgroundColor: "#fff",
    width: "45%",
    height: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
  },
  text: { color: "grey", fontSize: 18, fontWeight: "bold" },
});
