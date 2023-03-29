import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { Image, TouchableHighlight, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Skeleton, Header, Chip, Button } from "@rneui/base";
import { Rating, AirbnbRating } from "react-native-ratings";
import { books } from "../data/Data";
import { LinearGradient } from "expo-linear-gradient";
import { apiUrl } from "../api/Api";
import axios from "axios";
const Bookings = ({
  back,
  toExplore,
  toHome,
  toReviews,
  toAccount,
  userID,
  signedIn,
}) => {
  const [bookings, setBookings] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchBookings = () => {
    if (!userID) {
      setErrMsg("You need to signed in to be able to see your bookings");
      setLoading(false);
      return;
    }
    const user = { userID: userID };
    if (bookings.length <= 0) {
      setTimeout(() => {
        if (bookings.length <= 0) {
          axios
            .post(apiUrl.getBookings, user)
            .then((response) => {
              const data = response.data;
              if (data != null) {
                let values = Object.values(data);

                for (var index = 0; index < values.length; index++) {
                  const booking = values[index];
                  setBookings((prev) => [...prev, booking]);
                }
                setErrMsg("");
              } else {
                setErrMsg(
                  "Looks Like you haven' t made any bookings yet, navigate to trips and place your first booking"
                );
              }
              setLoading(false);
            })
            .catch((error) => {
              setErrMsg(error.message);
              setLoading(false);
            });
        }
      }, 10);
    } else {
      setLoading(false);
    }
  };
  //Fechting
  useEffect(() => {
    fetchBookings();
  }, []);

  //Refresh
  const onRefresh = React.useCallback(() => {
    setBookings([]);
    setErrMsg("Refreshing");
    fetchBookings();
  }, []);
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        style="light"
      />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={styles.linear}
        backgroundColor="transparent"
        leftComponent={
          <MaterialIcons
            name="arrow-back-ios"
            size={25}
            color="#fff"
            onPress={back}
          />
        }
        centerComponent={<Text style={styles.screenName}>My Bookings</Text>}
      />
      <ScrollView
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={["orange", "#ff5349", "grey"]}
            size="large"
            title="Relaoding"
          />
        }
      >
        {loading ? (
          books.map((book) => {
            return (
              <View
                key={book.id}
                style={[
                  styles.booking,
                  { flexDirection: "row", justifyContent: "space-evenly" },
                ]}
              >
                <Skeleton
                  animation="wave"
                  width={"15%"}
                  height={50}
                  style={{ margin: 5 }}
                  LinearGradientComponent={LinearGradient}
                />
                <View style={{ flexDirection: "column", width: "50%" }}>
                  <Skeleton
                    animation="wave"
                    width={"100%"}
                    height={30}
                    style={{ margin: 5 }}
                    LinearGradientComponent={LinearGradient}
                  />
                  <Skeleton
                    animation="wave"
                    width={"100%"}
                    height={20}
                    style={{ margin: 5 }}
                    LinearGradientComponent={LinearGradient}
                  />
                </View>
                <Skeleton
                  animation="wave"
                  width={"20%"}
                  height={30}
                  style={{ margin: 5 }}
                  LinearGradientComponent={LinearGradient}
                />
              </View>
            );
          })
        ) : bookings.length > 0 ? (
          bookings.map((booking) => {
            return (
              <TouchableHighlight
                style={[styles.booking, styles.boxShadow]}
                key={booking.id}
                underlayColor="#DBE9FA"
                onPress={() => console.log("yes")}
              >
                <View>
                  <View style={styles.details}>
                    <Image
                      style={[styles.image]}
                      source={require("../assets/images/booking.png")}
                    />
                    <View>
                      <Text style={styles.text}>{booking.bookingDate}</Text>
                      <Text style={styles.text}>{booking.trip.title}</Text>
                    </View>
                    <Chip
                      title={booking.confirmed ? "Confirmed" : "Pending"}
                      icon={
                        booking.confirmed ? (
                          <MaterialIcons name="check" color="#fff" size={20} />
                        ) : (
                          <MaterialIcons
                            name="pending"
                            color="#fff"
                            size={20}
                          />
                        )
                      }
                      buttonStyle={[
                        booking.confirmed
                          ? { backgroundColor: "orange" }
                          : { backgroundColor: "#ff5349" },
                      ]}
                    />
                  </View>

                  <View style={styles.amount}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={styles.text}>UGX {booking.trip.price}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            );
          })
        ) : (
          <View
            style={{
              width: "96%",
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
              height: 600,
              justifyContent: "space-evenly",
            }}
          >
            <Image
              style={{ width: 300, height: 300 }}
              source={require("../assets/images/booking.png")}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                color: "#ff5349",
                fontWeight: "700",
              }}
            >
              {errMsg}
            </Text>

            {!userID && (
              <Button
                title="Login"
                containerStyle={{ width: "70%", height: 50 }}
                buttonStyle={{ backgroundColor: "#ff5349", height: "100%" }}
                onPress={toAccount}
              />
            )}
          </View>
        )}
      </ScrollView>
      <Navigation
        isB={true}
        h={toHome}
        e={toExplore}
        r={toReviews}
        a={toAccount}
      />
    </View>
  );
};

export default Bookings;

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
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
  booking: {
    backgroundColor: "#fff",
    width: "100%",
    alignContent: "center",
    justifyContent: "space-evenly",
    minHeight: 100,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  image: { width: 70, height: 70 },
  details: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  amount: { flexDirection: "row", justifyContent: "space-between", padding: 5 },
  text: { color: "grey", fontSize: 15, fontWeight: "500" },
});
