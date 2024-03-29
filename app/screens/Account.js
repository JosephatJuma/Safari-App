import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Header, Chip, BottomSheet, Button, Dialog } from "@rneui/base";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Octicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { LinearGradient } from "expo-linear-gradient";

const Account = ({
  back,
  toExplore,
  toHome,
  toReviews,
  toBookings,
  logout,
  help,
  info,
  user,
  loggingOut,
}) => {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const logoutFunction = () => {
    logout();
    setShowLogoutAlert(false);
  };
  const displayLogoutAlert = () => {
    setShowLogoutAlert(!showLogoutAlert);
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
        centerComponent={<Text style={styles.screenName}>Account</Text>}
        rightComponent={
          <MaterialIcons
            name="logout"
            size={25}
            color="#fff"
            onPress={displayLogoutAlert}
          />
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
      >
        <View style={[styles.accountDetails, styles.boxShadow]}>
          <FontAwesome5 name="user" size={100} color="orange" />
          <View>
            <Text style={styles.text}>{user.phoneNumber}</Text>
            <Text style={styles.text}>{user.name}</Text>
            <Text style={styles.text}>{user.email}</Text>
          </View>
        </View>
        <View style={[styles.options]}>
          <TouchableOpacity style={styles.option}>
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="account-edit-outline"
                size={25}
                color="orange"
              />
              <Text style={styles.optionText}>Edit Profile</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.icon}>
              <AntDesign name="sharealt" size={24} color="orange" />
              <Text style={styles.optionText}>Share app</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <View style={styles.icon}>
              <AntDesign name="staro" size={24} color="orange" />
              <Text style={styles.optionText}>Rate app</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={help}>
            <View style={styles.icon}>
              <Feather name="help-circle" size={24} color="orange" />
              <Text style={styles.optionText}>Get Help</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={info}>
            <View style={styles.icon}>
              <AntDesign name="infocirlceo" size={24} color="orange" />
              <Text style={styles.optionText}>More Info</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={displayLogoutAlert}>
            <View style={styles.icon}>
              <AntDesign name="logout" size={24} color="orange" />
              <Text style={styles.optionText}>Logout</Text>
            </View>
            <Octicons name="chevron-right" size={25} color="#ff5349" />
          </TouchableOpacity>
        </View>
        <View style={[styles.version]}>
          <Text style={styles.optionText}>App Version:1.0.0</Text>
        </View>
      </ScrollView>
      <BottomSheet
        isVisible={showLogoutAlert}
        onBackdropPress={displayLogoutAlert}
      >
        <Chip
          title="Logout Alert"
          buttonStyle={styles.chip}
          containerStyle={styles.chipCont}
          onAccessibilityEscape={displayLogoutAlert}
        >
          <MaterialIcons name="logout" size={100} color="orange" />
          <Text style={[styles.text, { fontSize: 20, fontWeight: "600" }]}>
            Are you sure you want to logout?
          </Text>
          <Button
            containerStyle={styles.btnCont}
            buttonStyle={styles.btn}
            title="Logout"
            titleStyle={[
              styles.text,
              { fontSize: 20, color: "#fff", fontWeight: "700" },
            ]}
            onPress={logoutFunction}
            ViewComponent={LinearGradient}
            linearGradientProps={styles.linear}
          />
          <Button
            containerStyle={[
              styles.btnCont,
              {
                backgroundColor: "transparent",
                borderWidth: 2,
                borderColor: "grey",
              },
            ]}
            buttonStyle={[styles.btn, { backgroundColor: "transparent" }]}
            title="Cancel"
            titleStyle={[styles.text, { fontSize: 20, fontWeight: "700" }]}
            onPress={displayLogoutAlert}
          />
        </Chip>
      </BottomSheet>
      <Dialog
        overlayStyle={{
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        isVisible={loggingOut}
      >
        <ActivityIndicator color={"orange"} size={30} />
        <Text style={styles.text}>Logging out......</Text>
      </Dialog>
      <Navigation
        isA={true}
        h={toHome}
        e={toExplore}
        r={toReviews}
        b={toBookings}
      />
    </View>
  );
};

export default Account;

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
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  accountDetails: {
    backgroundColor: "#fff",
    width: "96%",
    height: 200,
    alignContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 0.5,
    borderColor: "grey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  text: { fontSize: 16, color: "grey", fontWeight: "500" },
  options: {
    backgroundColor: "#fff",
    width: "96%",
    height: 300,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "grey",
  },
  option: {
    width: "100%",
    borderBottomWidth: 1,
    height: 50,
    borderColor: "lightgrey",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    alignContent: "center",
    alignItems: "center",
  },
  optionText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  version: {
    backgroundColor: "#fff",
    margin: 5,
    width: "96%",
    height: 60,
    marginBottom: 5,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "grey",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chipCont: {
    marginVertical: 0,
    height: 310,
    width: "100%",
    alignSelf: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderRadius: 0,
    //borderWidth: 1,
    borderColor: "grey",
  },
  chip: {
    borderRadius: 0,
    backgroundColor: "#fff",
    height: "100%",
    flexDirection: "column",
  },
  btnCont: { width: "80%", height: 50, borderRadius: 100, margin: 5 },
  btn: { backgroundColor: "orange", height: "100%" },
});
