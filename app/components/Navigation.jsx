import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const Navigation = ({ h, e, r, b, a, isH, isE, isR, isB, isA }) => {
  return (
    <View style={styles.nav}>
      <TouchableOpacity style={styles.item} onPress={h}>
        <Ionicons
          name="ios-home-outline"
          size={28}
          color={isH ? "orange" : "grey"}
        />

        <Text style={[styles.text, isH ? styles.textCurrent : styles.text1]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={e}>
        <AntDesign name="rocket1" size={28} color={isE ? "orange" : "grey"} />
        <Text style={[styles.text, isE ? styles.textCurrent : styles.text1]}>
          Explore
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item]} onPress={r}>
        <FontAwesome5 name="star" size={28} color={isR ? "orange" : "grey"} />
        <Text style={[styles.text, isR ? styles.textCurrent : styles.text1]}>
          Reviews
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={b}>
        <AntDesign name="book" size={28} color={isB ? "orange" : "grey"} />
        <Text style={[styles.text, isB ? styles.textCurrent : styles.text1]}>
          Bookings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={a}>
        <Feather name="user" size={28} color={isA ? "orange" : "grey"} />
        <Text style={[styles.text, isA ? styles.textCurrent : styles.text1]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  nav: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    height: 60,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderTopWidth: 0.5,
    borderColor: "grey",
  },
  item: {
    width: "18%",
    alignContent: "center",
    alignItems: "center",
    height: "90%",
    justifyContent: "space-evenly",
  },
  text: { fontSize: 12, fontWeight: "900" },
  textCurrent: { color: "orange" },
  text1: { color: "grey" },
});
