import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button } from "@rneui/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Signup = ({ signupFunction, login }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View syle={styles.container}>
      <StatusBar style="light" backgroundColor="orange" />

      <ScrollView
        contentContainerStyle={{
          //marginTop: 100,
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Image
          source={require("../assets/login.jpg")}
          style={{
            width: "100%",
            height: 300,
            //borderBottomRightRadius: 100,
            borderBottomLeftRadius: 140,
          }}
        />
        <Input
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          placeholder="Full name"
          leftIcon={<Ionicons name="person-outline" size={24} color="grey" />}
          value={name}
          onChangeText={setName}
        />
        <Input
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          placeholder="Enter email address"
          leftIcon={
            <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="grey"
            />
          }
          value={email}
          onChangeText={setEmail}
        />
        <Input
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          placeholder="Phone Number"
          leftIcon={<Ionicons name="call" size={24} color="grey" />}
          value={phone}
          onChangeText={setPhone}
        />
        <Input
          secureTextEntry={!show}
          placeholder="Create Password"
          passwordRules={"dhdh"}
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          leftIcon={<FontAwesome name="lock" size={24} color="grey" />}
          rightIcon={
            <Ionicons
              name={show ? "ios-eye-off-outline" : "ios-eye"}
              size={18}
              color="grey"
              onPress={() => setShow(!show)}
            />
          }
          value={password}
          onChangeText={setPassword}
        />
        <Button
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "#000" }}
          title="Sign up"
          titleStyle={{ color: "#fff", fontSize: 25 }}
          onPress={() => signupFunction(email, password)}
        />

        <Text>OR</Text>
        <Button
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "orange" }}
          title="Sign in"
          titleStyle={{ color: "#fff", fontSize: 25 }}
          onPress={login}
        />
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  noBorder: { borderBottomWidth: 0 },
  inputContainer: {
    backgroundColor: "#fff",
    margin: 10,
    width: "96%",
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 8,
    height: 53,
  },
  buttonContainer: {
    margin: 10,
    width: "90%",
    borderWidth: 1,
    borderRadius: 12,
    height: 52,
    borderColor: "#000",
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
});
