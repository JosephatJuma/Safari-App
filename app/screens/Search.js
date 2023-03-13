import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Header, Input } from "@rneui/base";

const Search = ({ back }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const Cancel = () => {
    setSearchTerm("");
  };

  const searchRef = useRef(null);
  useEffect(() => {
    searchRef.current.focus();
  }, []);
  return (
    <View>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        backgroundColor="orange"
        centerComponent={
          <View style={{ width: "200%" }}>
            <Input
              ref={searchRef}
              autoFocus={true}
              containerStyle={styles.inputContainer}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              inputStyle={styles.input}
              placeholder="Looking for any thing?"
              placeholderTextColor="#fff"
              cursorColor="white"
              keyboardType="web-search"
              value={searchTerm}
              onChangeText={setSearchTerm}
              leftIcon={
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color="white"
                  onPress={back}
                />
              }
              rightIcon={
                searchTerm && (
                  <TouchableOpacity onPress={Cancel}>
                    <MaterialIcons name="cancel" size={20} color="#fff" />
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
    backgroundColor: "orange",
    height: 45,
    width: "90%",
    alignSelf: "center",
  },
  input: { color: "#fff", fontWeight: "900" },
});
