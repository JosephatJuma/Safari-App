import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Header } from "@rneui/base";
import { data } from "../data/Data";
const Explore = ({
  back,
  toHome,
  toReviews,
  toBookings,
  toAccount,
  toSearch,
}) => {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity style={{ width: "60%" }}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>Desitination Title</Text>
            <Text style={styles.title}>UGX {item.price}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={30} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="md-add-circle-sharp" size={30} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        backgroundColor="orange"
        leftComponent={
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            color="#fff"
            onPress={back}
          />
        }
        rightComponent={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity>
              <MaterialIcons name="sync" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                name="search"
                size={30}
                color="#fff"
                onPress={toSearch}
              />
            </TouchableOpacity>
          </View>
        }
        centerComponent={<Text style={styles.screenName}>All trips</Text>}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.row}
        onEndReached={() => console.log("end")}
      />
      <Navigation
        isE={true}
        h={toHome}
        a={toAccount}
        b={toBookings}
        r={toReviews}
      />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  row: {
    maxHeight: "80%",
  },
  item: {
    width: "98%",
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 16,
    margin: 2,
    //borderRadius: 5,
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
    height: 150,
    borderRadius: 15,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    color: "grey",
  },
});
