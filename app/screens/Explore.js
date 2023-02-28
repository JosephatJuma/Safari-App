import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Navigation from "../components/Navigation";
import { ScrollView } from "react-native-gesture-handler";
import { Header, Skeleton, BottomSheet, Chip, Button } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";
import { data } from "../data/Data";
import { apiUrl } from "../api/Api";
const Explore = ({
  back,
  toHome,
  toReviews,
  toBookings,
  toAccount,
  toSearch,
}) => {
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
          } else {
            setLoading(false);
            setErrMsg("No items found");
          }
        })
        .catch((error) => {
          console.log(error);
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
    //setTrips([]);
    setLoading(true);
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  //select object
  const selectObject = (option) => {
    setItemIsSlected(true);
    console.log("==========================");
    setSelecttedItem(option);
    console.log(selectedItem);
    //console.log("selected" + option);
    //console.log("==========================");
  };
  const deselectItem = () => {
    setItemIsSlected(false);
  };
  //Render data
  const renderSkeleton = ({ item }) => {
    return (
      <View style={[styles.item, styles.boxShadow]}>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <TouchableOpacity style={{ width: "80%" }}>
            <Skeleton
              animation="wave"
              width={"100%"}
              height={100}
              LinearGradientComponent={LinearGradient}
            />
          </TouchableOpacity>
          <View
            style={{
              width: "20%",
              justifyContent: "space-between",
              height: 50,
              margin: 5,
            }}
          >
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
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            height: 30,
            marginTop: 5,
          }}
        >
          <Skeleton
            animation="wave"
            width={"100%"}
            height={10}
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
              <MaterialIcons name="add-circle" size={30} color="orange" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title}>UGX {item.price}</Text>
      </View>
    );
  };

  return (
    <View>
      <StatusBar style="light" backgroundColor="orange" />
      <Header
        //ff5349 another color
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
            <TouchableOpacity onPress={onRefresh}>
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

      {loading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderSkeleton}
          keyExtractor={(item) => item.id.toString()}
          style={styles.row}
          onEndReached={() => console.log("end")}
          numColumns={2}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={true}
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={{ maxHeight: "80%", minHeight: "80%" }}
          //onEndReached={() => console.log("end")}
          numColumns={2}
          // initialNumToRender={4}
          // maxToRenderPerBatch={6}
          windowSize={3}
          indicatorStyle={{ backgroundColor: "red" }}
          removeClippedSubviews={true}
          onEndReachedThreshold={0.5}
          //ListFooterComponentStyle={<Text>All</Text>}
          ListEmptyComponent={<Text style={styles.text}>{errMsg}</Text>}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["orange", "grey", "black"]}
              size="large"
              title="Relaoding"
            />
          }
        />
      )}
      {/* {show && <ActivityIndicator color="orange" size={30} />} */}
      <BottomSheet
        isVisible={itemIsSlected}
        onBackdropPress={deselectItem}
        backdropStyle={{
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            backgroundColor: "orange",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
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
            icon={<MaterialCommunityIcons name="cart" color="#fff" size={30} />}
            title="Book now"
            containerStyle={styles.btnCont}
            buttonStyle={styles.btn}
            titleStyle={{ fontSize: 20, fontWeight: "700" }}
          />
        </Chip>
      </BottomSheet>
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
  text: {
    color: "#000",
    fontWeight: "500",
    fontSize: 30,
    color: "grey",
    alignSelf: "center",
    //marginTop: 200,
  },
  chipCont: {
    marginVertical: 0,
    height: 200,
    width: "100%",
    alignSelf: "center",
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
    borderRadius: 0,
    //borderWidth: 1,
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
