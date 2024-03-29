import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Image, Alert, ActivityIndicator } from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Input, Button, Dialog, Chip, BottomSheet } from "@rneui/base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { apiUrl } from "../api/Api";
//Regular Expression
const nameREGEX =
  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const passGEX =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#!%*?&])([a-zA-Z0-9@$#!%*?&]{8,16})$/;
const emailREGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const phoneREGEX =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const Signup = ({ login, nowLogin, loggingIn }) => {
  //validations
  const [isValidEmail, setValidEmail] = useState(false);
  const [isStrongPassword, setStrongPassword] = useState(false);
  const [isValidName, setValidName] = useState(false);
  const [isValidPhone, setValidPhone] = useState(false);
  //values
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+256");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneErro] = useState("");

  const [loading, setLoading] = useState(false);
  const [disableForm, setDisable] = useState(false);
  const [sent, setSent] = useState(false);
  const [uid, setUid] = useState("");

  const validateName = () => {
    const valid = nameREGEX.test(name);
    setValidName(valid);
    valid === false ? setNameError("Name is not correct!") : setNameError("");
    if (valid === false) return;
  };
  const validateEmail = () => {
    const valid = emailREGEX.test(email);
    setValidEmail(valid);
    valid === false ? setEmailError("Email Not Correct!") : setEmailError("");
    if (valid === false) return;
  };
  const validatePhone = () => {
    const valid = phoneREGEX.test(phone);
    setValidPhone(valid);
    valid === false
      ? setPhoneErro("The Phone Number is not valid!")
      : setPhoneErro("");
    if (valid === false) return;
  };
  const validatePassword = () => {
    const valid = passGEX.test(password);
    setStrongPassword(valid);
    valid === false
      ? setPasswordError(
          "Password must have uppercase, lowercase letters, numbers & speacial characters!"
        )
      : setPasswordError("");
    if (valid === false) return;
  };

  //create account then
  const handleSignUp = () => {
    validateName();
    validateEmail();
    validatePhone();
    validatePassword();
    if (!name || !email || !phone || !password) {
      Alert.alert(
        "Empty field(s) detected!",
        "Please fill all the required fileds to continue!",
        [{ text: "Alright" }]
      );
      return;
    }
    if (!isValidName || !isValidEmail || !isValidPhone || !isStrongPassword) {
      Alert.alert(
        "Invalid enteries!",
        "Please check your form and correct some fields!",
        [{ text: "Alright" }]
      );
      return;
    }
    const user = {
      email: email,
      name: name,
      password: password,
      phone: phone,
    };
    setLoading(!loading);
    setDisable(!disableForm);
    axios
      .post(apiUrl.register, user)
      .then((response) => {
        if (response.data.status === false) {
          Alert.alert(
            "Registration Error!",
            response.data.message,
            [{ text: "I get it" }],
            { cancelable: true }
          );
          setLoading(false);
          setDisable(false);
          return;
        }
        setUid(response.data.uid);
        setLoading(false);
        setDisable(false);
        setSent(true);
      })
      .catch((error) => {
        Alert.alert(error, error.message, [{ text: "I get it" }], {
          cancelable: true,
        });
        setLoading(false);
        setDisable(false);
      });
  };
  const handleLogin = () => {
    nowLogin(email, password);
  };
  return (
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
        <View
          style={{
            height: 200,
            width: "100%",
            backgroundColor: "orange",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <FontAwesome
            name="user-circle"
            size={100}
            color="#fff"
            style={{ marginTop: 40 }}
          />
        </View>
        <BottomSheet
          isVisible={sent}
          backdropStyle={{ backgroundColor: "#000000c0" }}
        >
          <Chip
            buttonStyle={styles.chip}
            containerStyle={styles.chipCont}
            onAccessibilityEscape={handleLogin}
            on
          >
            <MaterialCommunityIcons name="hand-clap" size={50} color="orange" />
            <Text style={styles.TXT}>
              Congratulations, Your account was created successfully
            </Text>
            <Button
              containerStyle={[styles.buttonContainer]}
              buttonStyle={{ height: "100%", backgroundColor: "#ff5349" }}
              title="Now Login"
              titleStyle={{ color: "#fff", fontSize: 25 }}
              onPress={handleLogin}
              disabled={disableForm}
              disabledStyle={{ backgroundColor: "#ff5349c0" }}
            />
          </Chip>
        </BottomSheet>
        <Input
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          placeholder="Full name"
          leftIcon={<Ionicons name="person-outline" size={24} color="grey" />}
          value={name}
          onChangeText={setName}
          onChange={validateName}
          errorMessage={nameError}
          disabled={disableForm}
          keyboardType="name-phone-pad"
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
          onChange={validateEmail}
          errorMessage={emailError}
          disabled={disableForm}
          keyboardType="email-address"
        />
        <Input
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          placeholder="Phone Number"
          leftIcon={<FontAwesome name="phone" size={24} color="grey" />}
          maxLength={13}
          value={phone}
          onChangeText={setPhone}
          onChange={validatePhone}
          errorMessage={phoneError}
          keyboardType="phone-pad"
          disabled={disableForm}
        />
        <Input
          secureTextEntry={!show}
          placeholder="Create Password"
          inputContainerStyle={styles.noBorder}
          containerStyle={[styles.inputContainer, styles.boxShadow]}
          leftIcon={
            <MaterialCommunityIcons name="lock" size={24} color="grey" />
          }
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
          onChange={validatePassword}
          errorMessage={!isStrongPassword && passwordError}
          disabled={disableForm}
        />
        <Button
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "#ff5349" }}
          title={
            loading ? (
              <>
                <ActivityIndicator size={40} color="#fff" />
              </>
            ) : (
              "Sign up"
            )
          }
          titleStyle={{ color: "#fff", fontSize: 25 }}
          onPress={handleSignUp}
          disabled={disableForm}
          disabledStyle={{ backgroundColor: "#ff5349c0" }}
        />

        <Text>OR</Text>
        <Button
          containerStyle={[styles.buttonContainer]}
          buttonStyle={{ height: "100%", backgroundColor: "transparent" }}
          title="Sign in"
          titleStyle={{ color: "orange", fontSize: 25 }}
          onPress={login}
          disabled={disableForm}
        />

        <Dialog
          overlayStyle={{
            alignContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          isVisible={loggingIn}
        >
          <ActivityIndicator color={"orange"} size={30} />
          <Text style={styles.text}>Logging in......</Text>
        </Dialog>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
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
    height: 53,
  },
  buttonContainer: {
    marginTop: 25,
    width: "90%",
    borderWidth: 1,
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
  text: { color: "orange" },
  TXT: {
    color: "orange",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  chipCont: {
    marginVertical: 0,
    height: 300,
    width: "100%",
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  chip: {
    borderRadius: 0,
    backgroundColor: "#F5F5F5",
    height: "100%",
    flexDirection: "column",
  },
});
