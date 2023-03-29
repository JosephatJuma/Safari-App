import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Header, Input } from "@rneui/base";
import { apiUrl } from "../api/Api";
import axios from "axios";
const Search = ({ back }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [trips, setTrips] = useState([]);
  const Cancel = () => {
    setSearchTerm("");
  };

  const searchRef = useRef(null);
  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const searchForTrip = () => {
    const querry = { searchTerm: searchTerm };
    axios
      .post(apiUrl.search, querry)
      .then((response) => {
        const data = response.data;
        if (data != null) {
          let values = Object.values(data);
          for (var index = 0; index < values.length; index++) {
            const trip = values[index];
            setTrips((prev) => [...prev, trip]);
          }
          setErrMsg("");
        } else {
          setErrMsg("No results found");
        }
        setLoading(false);
      })
      .catch((error) => {
        setErrMsg(error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    searchForTrip();
  }, [searchTerm]);
  return (
    <View>
      <StatusBar style="light" />
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
      <Text>{errMsg}</Text>
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
