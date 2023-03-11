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
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Header, BottomSheet, Chip, Input, Button } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
const Help = ({ back }) => {
  const [phoneNumber, setPhoneNumber] = useState("+256757751178");
  const [showBS, setShowBS] = useState(false);
  const [message, setMessage] = useState("");
  const openWhatsApp = () => {
    Linking.openURL("https://wa.me/256757751178");
  };
  const sendEmail = () => {
    // Linking.openURL("email:jumajosephat61@gmail.com");
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
  const showSendMessage = () => {
    setShowBS(!showBS);
  };
  const sendMessage = () => {
    console.log(message);
  };
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
        centerComponent={<Text style={styles.screenName}>Help Center</Text>}
      />

      <View>
        <TouchableOpacity style={styles.item} onPress={makeCall}>
          <Ionicons name="call" size={24} color="orange" />
          <Text style={styles.text}>Call Help Desk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={openWhatsApp}>
          <Ionicons name="logo-whatsapp" size={24} color="orange" />
          <Text style={styles.text}> WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={showSendMessage}>
          <AntDesign name="message1" size={24} color="orange" />
          <Text style={styles.text}>Send Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={sendEmail}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="orange"
          />
          <Text style={styles.text}>Email Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <AntDesign name="infocirlceo" size={24} color="orange" />
          <Text style={styles.text}>App info</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        isVisible={showBS}
        onBackdropPress={showSendMessage}
        //containerStyle={{ backgroundColor: "#000000c0" }}
      >
        <Chip containerStyle={[styles.chipCont]} buttonStyle={[styles.chip]}>
          <TouchableOpacity
            onPress={showSendMessage}
            style={{
              alignSelf: "flex-end",
              position: "relative",
            }}
          >
            <Feather name="delete" size={30} color="grey" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <Input
              containerStyle={styles.inputCont}
              placeholder="Type your message here"
              inputStyle={styles.input}
              multiline={true}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={message}
              onChangeText={setMessage}
            />

            <Button
              icon={<MaterialIcons name="send" size={30} color="grey" />}
              containerStyle={styles.btnCont}
              buttonStyle={styles.btn}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
              onPress={sendMessage}
            />
          </View>
        </Chip>
      </BottomSheet>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 8,
    elevation: 4,
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  item: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "grey",
    height: 60,
  },
  text: { color: "grey", fontSize: 18, fontWeight: "600", marginLeft: 30 },
  chipCont: {
    minHeight: 200,
    //maxHeight: 600,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 0,
  },
  chip: {
    borderRadius: 0,
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column",
  },
  inputCont: {
    width: "80%",
    alignContent: "center",
    alignItems: "center",
    maxHeight: 200,
    marginBottom: 10,
    marginRight: 5,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    minHeight: 50,
  },
  input: {
    color: "grey",
    fontSize: 18,
    fontWeight: "500",
  },
  btnCont: {
    width: "20%",
    height: 60,
    borderRadius: 8,
  },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
