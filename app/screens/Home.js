import { StatusBar } from "expo-status-bar";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Image, TouchableOpacity, RefreshControl } from "react-native";
import { Alert, ActivityIndicator, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { Header } from "@rneui/base";
import { BottomSheet, Chip, Badge } from "@rneui/base";
import { data } from "../data/Data";
import Navigation from "../components/Navigation";
import { apiUrl } from "../api/Api";
import { Ionicons, FontAwesome, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { Rating } from "react-native-ratings";
import {
  NativeBaseProvider,
  Skeleton,
  Actionsheet,
  Heading,
  Button,
  AlertDialog,
} from "native-base";
export default function Home({
  user,
  loggedIn,
  toAccount,
  toReviews,
  toBookings,
  toSearch,
  nots,
  cart,
  handleupDateCart,
  numberOfItemsOnCart,
  notifications,
}) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [itemIsSlected, setItemIsSlected] = useState(false);
  const [selectedItem, setSelecttedItem] = useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const [booking, setBooking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
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
  const loginFirst = () => {
    setItemIsSlected(false);
    setSelecttedItem([]);
    toAccount();
  };

  const bookingInProgress = () => {
    if (loggedIn === false) {
      setItemIsSlected(false);
      setIsOpen(true);

      return;
    }
    setBooking(true);
    const booking = {
      item: selectedItem,
      userID: user.userID,
      confirmed: false,
    };
    setTimeout(() => {
      axios
        .post(apiUrl.book, booking)
        .then((response) => {
          //console.log(response.data);
          if (response.data.status === false) {
            Alert.alert(
              "Booking unsuccessful!",
              response.data.message,
              [{ text: "I get it" }],
              { cancelable: true }
            );
            setBooking(false);
            return;
          }
          setItemIsSlected(false);
          setBooking(false);
          handleupDateCart(selectedItem);
          cart();
        })
        .catch((error) => {
          Alert.alert("Failure:", error.message);
          console.log(error);
          setBooking(false);
        });
    }, 2000);
  };

  //Render Skeleton
  const renderSkeleton = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View style={styles.skeleton}>
          <View style={{ width: "80%" }}>
            <Skeleton width={"100%"} height={100} />
          </View>
          <View style={styles.skeletonIcons}>
            <Skeleton width={30} height={20} />
            <Skeleton width={30} height={20} />
          </View>
        </View>
        <View style={styles.skeletonText}>
          <Skeleton width={"100%"} height={20} />
          <Skeleton width={"100%"} height={10} />
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
        <Skeleton width={"100%"} height={"70%"} />
        <Skeleton width={"100%"} height={"15%"} />
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
            <Rating
              type="heart"
              ratingCount={1}
              imageSize={30}
              onFinishRating={this.ratingCompleted}
              ratingTextColor="#ff5349"
              startingValue={0}
            />

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
        <Rating
          type="heart"
          ratingCount={5}
          imageSize={15}
          showRating
          onFinishRating={this.ratingCompleted}
          ratingTextColor="#ff5349"
          startingValue={2.5}
        />
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor="transparent" />
        <Header
          ViewComponent={LinearGradient}
          linearGradientProps={styles.linear}
          backgroundColor="transparent"
          height={100}
          centerComponent={
            <View style={{ marginLeft: -30 }}>
              <Text style={styles.name}>Zunguka</Text>
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
                {numberOfItemsOnCart > 0 && (
                  <Badge
                    badgeStyle={styles.badge}
                    value={numberOfItemsOnCart}
                  />
                )}
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
              <Text
                style={{ fontWeight: "600", fontSize: 30, color: "orange" }}
              >
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
                    <MaterialIcons
                      name="error-outline"
                      size={28}
                      color="grey"
                    />
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
                    <Text style={styles.title}>
                      You have seen all the trips
                    </Text>
                  </View>
                )
              }
            />
          )}
        </ScrollView>
        <Actionsheet isOpen={itemIsSlected} onClose={deselectItem}>
          <Actionsheet.Content>
            <Heading>{selectedItem.title}</Heading>
            {/* <Image
              //source={require("../assets/images/login.jpg")}
              source={{ url: selectedItem.photoURL }}
              style={{ width: "100%", height: 200 }}
            /> */}

            {booking ? (
              <>
                <ActivityIndicator size={50} color="orange" />
                <Text style={{ fontSize: 20, color: "orange" }}>
                  Booking in progress....
                </Text>
              </>
            ) : (
              // </Chip>
              <>
                <Actionsheet.Item
                  startIcon={
                    <Ionicons
                      name="ios-information-circle"
                      size={24}
                      color="orange"
                    />
                  }
                  paddingRight={10}
                >
                  <Text style={styles.text}>{selectedItem.description}</Text>
                </Actionsheet.Item>
                <Actionsheet.Item
                  startIcon={
                    <Ionicons name="pricetags" size={24} color="orange" />
                  }
                >
                  <Text style={styles.text}>UGX {selectedItem.price}</Text>
                </Actionsheet.Item>
                <Actionsheet.Item
                  startIcon={
                    <Ionicons name="md-location" size={24} color="orange" />
                  }
                >
                  <Text style={styles.text}>{selectedItem.destination}</Text>
                </Actionsheet.Item>
                <Actionsheet.Item
                  startIcon={
                    <Ionicons name="ios-calendar" size={24} color="orange" />
                  }
                >
                  <Text style={styles.text}>
                    {selectedItem.startDate} - {selectedItem.endDate}
                  </Text>
                </Actionsheet.Item>
                <Rating
                  type="heart"
                  ratingCount={5}
                  imageSize={25}
                  showRating
                  onFinishRating={this.ratingCompleted}
                  ratingTextColor="#ff5349"
                  style={{
                    flexDirection: "row",
                    width: "90%",
                    justifyContent: "space-between",
                  }}
                />
                <Button
                  width={"80%"}
                  onPress={bookingInProgress}
                  backgroundColor="#ff5349"
                >
                  Book now
                </Button>
              </>
            )}
          </Actionsheet.Content>
        </Actionsheet>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          width={450}
          alignSelf="center"
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Need to sign in!</AlertDialog.Header>
            <AlertDialog.Body>
              You must login to make a booking
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button colorScheme="red" onPress={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="orange" onPress={loginFirst}>
                  Login
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>

        <Navigation a={toAccount} isH={true} b={toBookings} r={toReviews} />
      </View>
    </NativeBaseProvider>
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
    top: -35,
    position: "absolute",
    backgroundColor: "orange",
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
    height: 250,
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 1,
    margin: 2,
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
    fontSize: 15,
    fontWeight: "600",
    color: "#ff5349",
    textAlign: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  text: {
    color: "#000",
    fontWeight: "400",
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
  btnCont: { width: "70%", height: 50, margin: 5 },
  btn: { backgroundColor: "#ff5349", height: "100%" },
});

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
