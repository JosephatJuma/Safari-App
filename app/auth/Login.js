import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button } from "@rneui/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Login = ({ loginFunction, signup, validating, forgot }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
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
          source={require("../assets/images/login.png")}
          style={{
            width: 300,
            height: 300,
            marginTop: 50,
          }}
        />
        <Input
          disabled={validating}
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
          disabled={validating}
          secureTextEntry={!show}
          placeholder="Enter your password"
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
          disabled={validating}
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "#ff5349" }}
          title={
            validating ? (
              <ActivityIndicator size={35} color="orange" />
            ) : (
              "Sign in"
            )
          }
          titleStyle={{ color: "#fff", fontSize: 25 }}
          onPress={() => loginFunction(email, password)}
        />
        <Text onPress={forgot}>Forgot password</Text>
        <Text>OR</Text>
        <Button
          disabled={validating}
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "transparent" }}
          title="Sign Up"
          titleStyle={{ color: "orange", fontSize: 25 }}
          onPress={signup}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

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
    borderRadius: 8,
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
