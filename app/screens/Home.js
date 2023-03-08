import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Input,
  Skeleton,
  BottomSheet,
  Chip,
} from "@rneui/base";
import { data } from "../data/Data";
import Navigation from "../components/Navigation";
import { apiUrl } from "../api/Api";
//icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
export default function Home({
  toAccount,
  toReviews,
  toBookings,
  toSearch,
  nots,
}) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [itemIsSlected, setItemIsSlected] = useState(false);
  const [selectedItem, setSelecttedItem] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  //Fetch trips
  const fetchData = () => {
    if (trips.length <= 0) {
      return fetch(apiUrl.trips)
        .then((response) => response.json())
        .then((data) => {
          if (data !== null) {
            var values = Object.values(data);
            setTrips(values);
            setLoading(false);
            setRefreshing(false);
          } else {
            setLoading(false);
            setRefreshing(false);
            setErrMsg("No items found");
          }
        })
        .catch((error) => {
          setLoading(false);
          setErrMsg(error.message);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [1]);

  //Refresh
  const onRefresh = React.useCallback(() => {
    //setLoading(true);
    setRefreshing(true);
    fetchData();
  }, []);

  //select object
  const selectObject = (option) => {
    setItemIsSlected(true);
    setSelecttedItem(option);
  };
  const deselectItem = () => {
    setItemIsSlected(false);
  };

  //Render Skeleton
  const renderSkeleton = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View style={styles.skeleton}>
          <View style={{ width: "80%" }}>
            <Skeleton
              animation="wave"
              width={"100%"}
              height={100}
              LinearGradientComponent={LinearGradient}
            />
          </View>
          <View style={styles.skeletonIcons}>
            <Skeleton
              animation="wave"
              width={30}
              height={20}
              LinearGradientComponent={LinearGradient}
            />
            <Skeleton
              animation="wave"
              width={30}
              height={20}
              LinearGradientComponent={LinearGradient}
            />
          </View>
        </View>
        <View style={styles.skeletonText}>
          <Skeleton
            animation="wave"
            width={"100%"}
            height={20}
            LinearGradientComponent={LinearGradient}
          />
          <Skeleton
            animation="wave"
            width={"100%"}
            height={10}
            LinearGradientComponent={LinearGradient}
          />
        </View>
      </View>
    );
  };
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

  //Render data
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ width: "80%" }}
            onPress={() => selectObject(item)}
          >
            <Image source={{ uri: item.photoURL }} style={styles.image} />
          </TouchableOpacity>
          <View>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={30} color="orange" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                name="add-circle"
                size={30}
                color="orange"
                onPress={() => selectObject(item)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>UGX {item.price}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={styles.linear}
        backgroundColor="transparent"
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
              {/* Safari-area */}
              Tuzunge
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
            <TouchableOpacity onPress={nots}>
              <Ionicons name="notifications-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["orange", "#ff5349", "grey"]}
            size="large"
            title="Relaoding"
          />
        }
      >
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
          <Text style={styles.text}>Upcomming destinations</Text>
          <TouchableOpacity>
            <FontAwesome name="sliders" size={40} color="orange" />
          </TouchableOpacity>
        </View>
        {loading ? (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={renderSkeleton}
            keyExtractor={(item) => item.id.toString()}
            style={styles.row}
            numColumns={2}
          />
        ) : (
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
            data={trips}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            //style={{ maxHeight: "80%", minHeight: "80%" }}
            numColumns={2}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            onEndReachedThreshold={5}
            windowSize={5}
            indicatorStyle={{ backgroundColor: "red" }}
            removeClippedSubviews={true}
            ListEmptyComponent={<Text style={styles.text}>{errMsg}</Text>}
            ListFooterComponent={
              <View style={[styles.listFooter, styles.boxShadow]}>
                <Text style={styles.title}>You have seen all the trips</Text>
              </View>
            }
          />
        )}
      </ScrollView>
      <BottomSheet
        isVisible={itemIsSlected}
        onBackdropPress={deselectItem}
        backdropStyle={{
          backgroundColor: "transparent",
        }}
      >
        <View style={styles.slectedItemView}>
          <View style={styles.viewTop}>
            <Text style={[{ fontSize: 22, fontWeight: "600", color: "#fff" }]}>
              {selectedItem.title}
            </Text>
            <TouchableOpacity onPress={deselectItem}>
              <MaterialIcons name="cancel" size={35} color="#fff" />
            </TouchableOpacity>
          </View>
          <ImageBackground
            source={{ url: selectedItem.photoURL }}
            style={{ width: "100%", height: 100 }}
          />
        </View>
        <Chip
          title="Account created"
          buttonStyle={styles.chip}
          containerStyle={styles.chipCont}
          onAccessibilityEscape={deselectItem}
        >
          <Text style={[styles.text, { fontSize: 15, fontWeight: "600" }]}>
            {selectedItem.description}
          </Text>

          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={styles.linear}
            icon={<MaterialCommunityIcons name="cart" color="#fff" size={30} />}
            title="Book now"
            containerStyle={styles.btnCont}
            buttonStyle={styles.btn}
            titleStyle={{ fontSize: 20, fontWeight: "700" }}
          />
        </Chip>
      </BottomSheet>
      <Navigation a={toAccount} isH={true} b={toBookings} r={toReviews} />
    </View>
  );
}
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
  skeleton: { width: "100%", display: "flex", flexDirection: "row" },
  skeletonIcons: {
    width: "20%",
    justifyContent: "space-between",
    height: 50,
    margin: 5,
  },
  skeletonText: {
    width: "100%",
    justifyContent: "space-between",
    height: 40,
    marginTop: 5,
  },
  listFooter: {
    backgroundColor: "#fff",
    margin: 2,
    alignContent: "center",
    alignItems: "center",
    height: 40,
  },
  slectedItemView: {
    backgroundColor: "orange",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  viewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  chipCont: {
    marginVertical: 0,
    height: 200,
    width: "100%",
    alignSelf: "center",
    borderRadius: 0,
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
