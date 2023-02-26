import { StyleSheet, Text, View, DrawerLayoutAndroid } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Header, Input } from "@rneui/base";
import { TouchableOpacity } from "react-native";
const Search = ({ back }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const Cancel = () => {
    setSearchTerm("");
  };

  return (
    <View>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        backgroundColor="orange"
        centerComponent={
          <View style={{ width: "200%" }}>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={styles.input}
              placeholder="Looking for any thing?"
              cursorColor="orange"
              value={searchTerm}
              onChangeText={setSearchTerm}
              leftIcon={
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="orange"
                  onPress={back}
                />
              }
              rightIcon={
                searchTerm && (
                  <TouchableOpacity onPress={Cancel}>
                    <MaterialIcons name="cancel" size={20} color="orange" />
                  </TouchableOpacity>
                )
              }
            />
          </View>
        }
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    width: "80%",
    alignSelf: "center",
  },
  input: { color: "orange", fontWeight: "900" },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
});
