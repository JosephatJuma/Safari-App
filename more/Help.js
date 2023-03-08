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
import { FontAwesome5 } from "@expo/vector-icons";
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
      <BottomSheet isVisible={showBS} onBackdropPress={showSendMessage}>
        <Chip containerStyle={styles.chipCont} buttonStyle={styles.chip}>
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
            containerStyle={styles.btnCont}
            buttonStyle={styles.btn}
            title="Send message"
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            onPress={sendMessage}
          />
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
    maxHeight: 300,
    minHeight: 100,
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderRadius: 0,
  },
  chip: {
    borderRadius: 0,
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column",
  },
  inputCont: {
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    maxHeight: 200,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "orange",
    borderWidth: 1,
    minHeight: 50,
  },
  input: {
    color: "orange",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnCont: {
    width: "80%",
    height: 50,
    borderRadius: 8,
  },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "orange",
  },
});
