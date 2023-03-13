import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
export default function GetStarted({ toLogin, toSignUp, toHome }) {
  return (
    <View style={styles.main}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <ImageBackground
        source={require("../assets/images/login.jpg")}
        style={{
          width: "100%",
          height: "80%",
          alignContent: "center",
          alignItems: "center",
          borderBottomRightRadius: 400,
        }}
      >
        <View
          style={{
            alignContent: "center",
            alignItems: "center",
            width: "100%",
            borderBottomRightRadius: 400,
          }}
        >
          {/* <Image
            source={require("../assets/images/login.jpg")}
            style={styles.logo}
          /> */}
          <Text style={styles.text}>Travel, Learn, Discover.</Text>
        </View>
      </ImageBackground>
      <LinearGradient
        colors={["#ffffff", "#fff", "#fff"]}
        style={styles.btnArea}
      >
        <Button
          title="Login"
          buttonStyle={styles.btn}
          onPress={toLogin}
          titleStyle={styles.btnTitle}
          containerStyle={styles.btnContainer}
        />

        <Button
          title="Create Account"
          buttonStyle={styles.btn}
          onPress={toSignUp}
          titleStyle={styles.btnTitle}
          containerStyle={styles.btnContainer}
        />
        <Button
          title="Continue as guest"
          buttonStyle={styles.btn}
          onPress={toHome}
          titleStyle={styles.btnTitle}
          containerStyle={styles.btnContainer}
        />
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#F7BE15",
  },

  logo: {
    width: 100,
    height: 100,
    marginTop: 120,
  },
  btnTitle: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    color: "orange",
  },
  btnArea: {
    width: "100%",
    height: 260,
    alignContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    height: 100,
    alignContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  btn: {
    width: "90%",
    backgroundColor: "#000000",
    alignContent: "center",
    alignItems: "center",
    height: "18%",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 50,
  },

  text: {
    fontSize: 45,
    alignSelf: "center",
    fontWeight: "bold",
    color: "#fff",
    marginTop: 370,
    textAlign: "center",
  },
});
