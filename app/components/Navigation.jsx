import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const Navigation = ({ h, e, r, b, a, isH, isE, isR, isB, isA }) => {
  return (
    <View style={styles.nav}>
      <TouchableHighlight
        style={styles.item}
        onPress={h}
        underlayColor="#F5F5F5"
      >
        <View style={styles.itemItem}>
          <Ionicons
            name="ios-home-outline"
            size={28}
            color={isH ? "orange" : "grey"}
          />

          <Text style={[styles.text, isH ? styles.textCurrent : styles.text1]}>
            Home
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.item}
        onPress={b}
        underlayColor="#F5F5F5"
      >
        <View style={styles.itemItem}>
          <AntDesign name="book" size={28} color={isB ? "orange" : "grey"} />
          <Text style={[styles.text, isB ? styles.textCurrent : styles.text1]}>
            Bookings
          </Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.item]}
        onPress={r}
        underlayColor="#F5F5F5"
      >
        <View style={styles.itemItem}>
          <FontAwesome5 name="star" size={28} color={isR ? "orange" : "grey"} />
          <Text style={[styles.text, isR ? styles.textCurrent : styles.text1]}>
            Reviews
          </Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={[styles.item]}
        onPress={a}
        underlayColor="#F5F5F5"
      >
        <View style={styles.itemItem}>
          <Feather name="user" size={28} color={isA ? "orange" : "grey"} />
          <Text style={[styles.text, isA ? styles.textCurrent : styles.text1]}>
            Account
          </Text>
        </View>
      </TouchableHighlight>
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
    width: "25%",
    alignContent: "center",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-evenly",
    //borderRadius: 20,
  },
  itemItem: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
  },
  text: { fontSize: 12, fontWeight: "900" },
  textCurrent: { color: "orange" },
  text1: { color: "grey" },
});
