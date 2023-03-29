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
        style={isH ? styles.currentItem : styles.item}
        onPress={h}
        underlayColor="#DBE9FA"
      >
        <View style={styles.itemItem}>
          <Ionicons
            name="ios-home-outline"
            size={28}
            color={isH ? "#fff" : "grey"}
          />

          {!isH && <Text style={[styles.text, styles.text1]}>Home</Text>}
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={isB ? styles.currentItem : styles.item}
        onPress={b}
        underlayColor="#DBE9FA"
      >
        <View style={styles.itemItem}>
          <AntDesign name="book" size={28} color={isB ? "#fff" : "grey"} />
          {!isB && <Text style={[styles.text, styles.text1]}>Bookings</Text>}
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={isR ? styles.currentItem : styles.item}
        onPress={r}
        underlayColor="#DBE9FA"
      >
        <View style={styles.itemItem}>
          <FontAwesome5 name="star" size={28} color={isR ? "#fff" : "grey"} />
          {!isR && <Text style={[styles.text, styles.text1]}>Reviews</Text>}
        </View>
      </TouchableHighlight>

      <TouchableHighlight
        style={isA ? styles.currentItem : styles.item}
        onPress={a}
        underlayColor="#DBE9FA"
      >
        <View style={styles.itemItem}>
          <Feather name="user" size={28} color={isA ? "#fff" : "grey"} />
          {!isA && <Text style={[styles.text, styles.text1]}>Account</Text>}
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
    borderWidth: 0.3,
    borderColor: "lightgrey",
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
  currentItem: {
    width: "15%",
    alignContent: "center",
    alignItems: "center",
    height: "90%",
    justifyContent: "space-evenly",
    backgroundColor: "orange",
    borderRadius: 100,
    marginBottom: 30,
  },
  text: { fontSize: 12, fontWeight: "bold", letterSpacing: -0.6 },
  textCurrent: { color: "#fff" },
  text1: { color: "grey" },
});
