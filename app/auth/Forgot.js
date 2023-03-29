import { View, Text, StyleSheet } from "react-native";
import { ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Button } from "@rneui/base";
import { MaterialIcons } from "@expo/vector-icons";
export default function Forgot({ reset, sending, sent, login, resend }) {
  const [email, setEmail] = useState("");

  return (
    <ScrollView style={styles.login} contentContainerStyle={styles.container}>
      <StatusBar style="light" backgroundColor="orange" />
      <View
        style={{
          width: "96%",
          alignSelf: "center",
          alignContent: "center",
          alignItems: "center",
          height: 700,
          justifyContent: "space-evenly",
        }}
      >
        <Image
          source={require("../assets/images/password.png")}
          style={{
            width: 300,
            height: 300,
            marginTop: 50,
          }}
        />
        <View>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000" }}>
            Reset password
          </Text>
          <Text style={styles.text}>
            {sent
              ? "We have sent the password change link on your email, check your email and follow it to reset your password"
              : "To reset your password, provide the email you registered with"}
          </Text>
        </View>

        {!sent ? (
          <View style={styles.form}>
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }}
              placeholderTextColor="grey"
              inputStyle={styles.input}
              placeholder="Enter e-mail address"
              containerStyle={styles.inputCont}
              leftIcon={<MaterialIcons name="email" size={24} color="grey" />}
              value={email}
              onChangeText={setEmail}
              disabled={sending}
            />
            <Button
              title={
                sending ? (
                  <ActivityIndicator color="orange" size={30} />
                ) : (
                  "Reset"
                )
              }
              disabled={sending}
              buttonStyle={styles.loginBtn}
              titleStyle={styles.loginBtnText}
              onPress={() => reset(email)}
              disabledStyle={{ backgroundColor: "#000000c0" }}
            />
          </View>
        ) : (
          <View style={styles.form}>
            <Button
              title="Login now"
              buttonStyle={styles.loginBtn}
              titleStyle={styles.loginBtnText}
              onPress={login}
              disabledStyle={{ backgroundColor: "#000000c0" }}
            />
            <Button
              title="Resend Email"
              buttonStyle={styles.loginBtn}
              titleStyle={styles.loginBtnText}
              onPress={resend}
              disabledStyle={{ backgroundColor: "#000000c0" }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    marginTop: 30,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "90%",
    marginTop: 10,
    backgroundColor: "#F5F5F5",
    alignContent: "center",
    height: 200,
    justifyContent: "space-evenly",
  },
  input: { fontWeight: "bold", color: "grey", fontSize: 15 },
  inputCont: {
    borderColor: "#ff5349",
    borderWidth: 1,
    justifyContent: "space-evenly",
    height: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  loginBtn: {
    backgroundColor: "#ff5349",
    width: "100%",
    alignSelf: "center",
    height: 50,
    justifyContent: "space-evenly",
  },

  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "grey",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
    maxWidth: "90%",
  },
});
