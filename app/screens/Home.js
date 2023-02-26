import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Header, Input } from "@rneui/base";
import { data } from "../data/Data";
import Navigation from "../components/Navigation";
//icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home({ toExplore, toAccount, toReviews, toBookings }) {
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
        <Text style={styles.title}>Desitination name</Text>
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
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 30 }}>
              MySafari
            </Text>
          </View>
        }
        leftComponent={<Ionicons name="search" size={30} color="#fff" />}
        rightComponent={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MaterialCommunityIcons name="cart-plus" size={30} color="#fff" />
            <Ionicons name="heart-outline" size={30} color="#fff" />
            <Ionicons name="notifications-outline" size={30} color="#fff" />
          </View>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.add, styles.boxShadow]}>
          <Text style={{ fontWeight: "900", fontSize: 30, color: "orange" }}>
            Get 25%
          </Text>
          <Text>Discount on your first trip</Text>
          {/* <View style={styles.addRight}></View> */}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{ margin: 5, width: 80, height: 80 }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "80%" }}
                  />
                  <Text>Item</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ backgroundColor: "#fff" }}>
          <Text>Categories</Text>
          <ScrollView
            horizontal={true}
            style={{ height: 100 }}
            showsHorizontalScrollIndicator={false}
          >
            {data.map((item) => {
              return (
                <View key={item.id} style={{ margin: 15 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "80%" }}
                  />
                  <Text>Category {item.id}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.itemsTop}>
          <Text>Recentyle Added</Text>
          <FontAwesome name="sliders" size={30} color="orange" />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          style={{ marginBottom: 20 }}
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
    borderColor: "grey",
  },
  addRight: {
    width: "40%",
    alignSelf: "flex-end",
    backgroundColor: "#000",
    height: "125%",
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
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
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 0,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "grey",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  text: { color: "#000", fontWeight: "500" },
});
