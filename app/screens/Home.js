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
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Skeleton,
  BottomSheet,
  Chip,
  Badge,
  SpeedDial,
} from "@rneui/base";
import { data } from "../data/Data";
import Navigation from "../components/Navigation";
import { apiUrl } from "../api/Api";
//icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
export default function Home({
  toAccount,
  toReviews,
  toBookings,
  toSearch,
  nots,
  cart,
  addItem,
  numberOfItemsOnCart,
  notifications,
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
            setErrMsg("There are no upcoming trips apparently");
          }
        })
        .catch((error) => {
          setLoading(false);
          setRefreshing(false);
          setErrMsg(error.message);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [1]);

  //Refresh
  const onRefresh = React.useCallback(() => {
    setErrMsg("Refreshing");
    setRefreshing(true);
    fetchData();
  }, []);

  //select object
  const selectObject = (option) => {
    setSelecttedItem(option);
    setItemIsSlected(true);
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
        style={{
          margin: 5,
          width: 120,
          height: 160,
          alignContent: "center",
          alignItems: "center",
        }}
        onPress={() => selectObject(item)}
      >
        <Image source={{ uri: item.photoURL }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const renderSkeletonForRecommend = ({ item }) => {
    return (
      <View
        key={item.id}
        style={{
          margin: 5,
          width: 80,
          height: 80,
          justifyContent: "space-evenly",
        }}
      >
        <Skeleton
          animation="wave"
          width={"100%"}
          height={"70%"}
          LinearGradientComponent={LinearGradient}
        />
        <Skeleton
          animation="wave"
          width={"100%"}
          height={"15%"}
          LinearGradientComponent={LinearGradient}
        />
      </View>
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
            <Text style={styles.name}>Tuzunge</Text>
          </View>
        }
        leftComponent={
          <TouchableOpacity onPress={toSearch}>
            <Ionicons name="search" size={30} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity onPress={cart}>
              <MaterialCommunityIcons
                name="cart-variant"
                size={30}
                color="#fff"
              />
              {numberOfItemsOnCart > 0 && <Badge badgeStyle={styles.badge} />}
            </TouchableOpacity>
            <TouchableOpacity onPress={nots}>
              <Ionicons name="notifications-outline" size={30} color="#fff" />
              {notifications > 0 && <Badge badgeStyle={styles.badge} />}
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
          <View style={{ padding: 5 }}>
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
        <View
          style={{
            backgroundColor: "#fff",
            padding: 0,
            borderBottomWidth: 1,
            borderColor: "lightgrey",
          }}
        >
          <View style={styles.itemsTop}>
            <Text style={styles.text}>Recomended for you</Text>
            <MaterialCommunityIcons
              name="lightning-bolt"
              size={30}
              color="orange"
            />
          </View>
          <FlatList
            data={loading ? data : trips}
            renderItem={
              loading ? renderSkeletonForRecommend : renderRecommendations
            }
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={10}
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
            numColumns={2}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            onEndReachedThreshold={5}
            windowSize={5}
            indicatorStyle={{ backgroundColor: "red" }}
            removeClippedSubviews={true}
            ListEmptyComponent={
              <View
                style={[styles.listFooter, styles.boxShadow, { height: 250 }]}
              >
                <View style={styles.error}>
                  <MaterialIcons name="error-outline" size={28} color="grey" />
                  <Text style={styles.text}>{errMsg}</Text>
                </View>
                <TouchableOpacity onPress={onRefresh}>
                  {refreshing ? (
                    <ActivityIndicator size={80} color="orange" />
                  ) : (
                    <FontAwesome name="refresh" size={80} color="orange" />
                  )}
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              trips.length > 0 && (
                <View style={[styles.listFooter, styles.boxShadow]}>
                  <Text style={styles.title}>You have seen all the trips</Text>
                </View>
              )
            }
          />
          // <View
          //   style={{
          //     alignContent: "center",
          //     justifyContent: "space-evenly",
          //     flexDirection: "row",
          //     flexWrap: "wrap",
          //     width: "100%",
          //   }}
          // >
          //   {trips.map((item) => {
          //     return (
          //       <View style={[styles.item, styles.boxShadow]} key={item.id}>
          //         <View
          //           style={{
          //             width: "100%",
          //             display: "flex",
          //             flexDirection: "row",
          //           }}
          //         >
          //           <TouchableOpacity
          //             style={{ width: "80%" }}
          //             onPress={() => selectObject(item)}
          //           >
          //             <Image
          //               source={{ uri: item.photoURL }}
          //               style={styles.image}
          //             />
          //           </TouchableOpacity>
          //           <View>
          //             <TouchableOpacity>
          //               <Ionicons
          //                 name="heart-outline"
          //                 size={30}
          //                 color="orange"
          //               />
          //             </TouchableOpacity>
          //             <TouchableOpacity>
          //               <MaterialIcons
          //                 name="add-circle"
          //                 size={30}
          //                 color="orange"
          //                 onPress={() => selectObject(item)}
          //               />
          //             </TouchableOpacity>
          //           </View>
          //         </View>
          //         <Text style={styles.title}>{item.title}</Text>
          //         <Text style={styles.title}>UGX {item.price}</Text>
          //       </View>
          //     );
          //   })}
          // </View>
        )}
      </ScrollView>
      <BottomSheet
        isVisible={itemIsSlected}
        onBackdropPress={deselectItem}
        containerStyle={{
          backgroundColor: "#000000c0",
        }}
      >
        <View style={styles.slectedItemView}>
          <View style={styles.viewTop}>
            <Text style={[{ fontSize: 22, fontWeight: "600", color: "#fff" }]}>
              {selectedItem.title}
            </Text>
            <TouchableOpacity onPress={deselectItem}>
              <Feather name="delete" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../assets/images/login.jpg")}
            //source={{ url: selectedItem.photo }}
            style={{ width: "100%", height: 200 }}
          ></Image>
        </View>
        <Chip
          title="Account created"
          buttonStyle={styles.chip}
          containerStyle={styles.chipCont}
          onAccessibilityEscape={deselectItem}
        >
          <View style={styles.desc}>
            <Ionicons name="ios-information-circle" size={24} color="orange" />
            <Text style={[styles.text]}>{selectedItem.description}</Text>
          </View>
          <View style={styles.desc}>
            <Ionicons name="md-location" size={24} color="orange" />
            <Text style={styles.text}>{selectedItem.destination}</Text>
          </View>
          <View style={styles.desc}>
            <Ionicons name="pricetags" size={24} color="orange" />
            <Text style={styles.text}>UGX {selectedItem.price}</Text>
          </View>
          <View style={styles.desc}>
            <Ionicons name="ios-calendar" size={24} color="orange" />
            <Text style={styles.text}>
              {selectedItem.startDate} - {selectedItem.endDate}
            </Text>
          </View>

          <Button
            ViewComponent={LinearGradient}
            linearGradientProps={styles.linear}
            icon={<MaterialCommunityIcons name="cart" color="#fff" size={30} />}
            title="Book now"
            containerStyle={styles.btnCont}
            buttonStyle={styles.btn}
            titleStyle={{ fontSize: 20, fontWeight: "700" }}
            onPress={() => addItem(selectedItem)}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  name: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 29,
  },
  badge: {
    top: -32,
    position: "absolute",
    backgroundColor: "#000",
    left: 17,
  },
  add: {
    width: "90%",
    backgroundColor: "#fff",
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
    margin: 5,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addRight: {
    width: "40%",
    alignSelf: "flex-end",
    backgroundColor: "orange",
    height: "100%",
    borderTopLeftRadius: 200,
    borderBottomLeftRadius: 500,
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
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
    height: 110,
    borderRadius: 0,
    marginBottom: 16,
  },
  title: {
    //fontSize: 15,
    fontWeight: "500",
    color: "#ff5349",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  text: {
    color: "#000",
    fontWeight: "800",
    fontSize: 15,
    color: "grey",
    textAlignVertical: "center",
    textAlign: "auto",
  },
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
  error: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
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
    maxHeight: 400,
    minHeight: 200,
    width: "100%",
    alignSelf: "center",
    borderRadius: 0,
    borderColor: "grey",
  },
  chip: {
    borderRadius: 0,
    backgroundColor: "#fff",
    maxHeight: 400,
    minHeight: 200,
    flexDirection: "column",
  },
  desc: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    width: "90%",
    alignSelf: "flex-start",
    padding: 2,
  },
  btnCont: { width: "70%", height: 50, borderRadius: 10, margin: 5 },
  btn: { backgroundColor: "orange", height: "100%" },
});
