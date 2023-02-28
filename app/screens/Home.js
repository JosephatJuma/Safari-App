import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
} from "react-native";
import React from "react";
import { Button, Header, Input } from "@rneui/base";
import { data } from "../data/Data";
import Navigation from "../components/Navigation";
//icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home({
  toExplore,
  toAccount,
  toReviews,
  toBookings,
  toSearch,
}) {
  const renderRecommendations = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{ margin: 5, width: 80, height: 80 }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: "80%" }}
        />
        <Text style={styles.text}>Item</Text>
        <Text style={styles.text}>Item</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <TouchableOpacity style={{ width: "80%" }}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={30} color="orange" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Desitination Title</Text>
        <Text style={styles.title}>UGX {item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        //ff5349
        backgroundColor="orange"
        height={100}
        centerComponent={
          <View style={{ marginLeft: -30 }}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 29,
              }}
            >
              Safari-area
            </Text>
          </View>
        }
        leftComponent={
          <TouchableOpacity onPress={toSearch}>
            <Ionicons name="search" size={30} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="cart-variant"
                size={30}
                color="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.add, styles.boxShadow]}>
          <View>
            <Text style={{ fontWeight: "600", fontSize: 30, color: "orange" }}>
              Get 25%
            </Text>
            <Text style={styles.text}>Discount on your first trip</Text>
          </View>
          <View style={styles.addRight}>
            <Image
              source={require("../assets/add.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "#fff", padding: 10 }}>
          <View style={styles.itemsTop}>
            <Text style={styles.text}>Recomended for you</Text>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={30}
              color="orange"
            />
          </View>
          <FlatList
            data={data}
            renderItem={renderRecommendations}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.itemsTop}>
          <Text style={styles.text}>Recentyle Added</Text>
          <FontAwesome name="sliders" size={40} color="orange" />
        </View>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={{ marginBottom: 20 }}
          onEndReached={() => console.log("end")}
        />
      </ScrollView>
      <Navigation
        e={toExplore}
        a={toAccount}
        isH={true}
        b={toBookings}
        r={toReviews}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  add: {
    width: "90%",
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 5,
  },
  addRight: {
    width: "40%",
    alignSelf: "flex-end",
    backgroundColor: "orange",
    height: "125%",
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 500,
    marginTop: -70,
    marginEnd: -10,
    borderRadius: 10,
  },
  itemsTop: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  item: {
    width: "50%",
    height: 180,
    backgroundColor: "#fff",
    //borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 1,
    marginTop: 2,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 7,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 0,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    color: "grey",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  text: { color: "#000", fontWeight: "600", fontSize: 15, color: "grey" },
  mainContent: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});
