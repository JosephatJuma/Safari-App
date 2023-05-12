import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, ActivityIndicator } from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button, NativeBaseProvider, Heading } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
const Login = ({ loginFunction, signup, validating, forgot }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <NativeBaseProvider>
      <View syle={styles.container}>
        <StatusBar style="light" backgroundColor="orange" />
        <ScrollView
          contentContainerStyle={{
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "100%",
          }}
        >
          <Image
            source={require("../assets/images/login.png")}
            style={styles.image}
          />
          <Input
            borderWidth={1.5}
            borderColor="amber.500"
            fontSize={15}
            marginBottom={5}
            disabled={validating}
            placeholder="Enter email address"
            InputLeftElement={
              <MaterialCommunityIcons
                name="email-outline"
                size={24}
                color="grey"
              />
            }
            width={"90%"}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            borderColor="amber.500"
            marginBottom={5}
            fontSize={15}
            width={"90%"}
            borderWidth={1.5}
            disabled={validating}
            secureTextEntry={!show}
            placeholder="Enter your password"
            InputLeftElement={
              <FontAwesome name="lock" size={24} color="grey" />
            }
            rightElement={
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
            marginBottom={5}
            disabled={validating}
            height={50}
            width={"80%"}
            backgroundColor="#ff5349"
            onPress={() => loginFunction(email, password)}
          >
            {validating ? (
              <ActivityIndicator size={35} color="orange" />
            ) : (
              <Heading color="#fff">Sign in</Heading>
            )}
          </Button>
          <Text onPress={forgot}>Forgot password</Text>
          <Text>OR</Text>
          <Button
            marginTop={5}
            width={"80%"}
            height={50}
            disabled={validating}
            containerStyle={[styles.buttonContainer]}
            buttonStyle={{ height: "100%", backgroundColor: "transparent" }}
            title="Sign Up"
            titleStyle={{ color: "orange", fontSize: 25 }}
            onPress={signup}
          >
            <Heading color="#fff">Sign Up</Heading>
          </Button>
        </ScrollView>
      </View>
    </NativeBaseProvider>
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

  image: {
    width: 300,
    height: 300,
    marginTop: 50,
  },
});
