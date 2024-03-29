import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Card, Button, Dialog } from "@rneui/base";
import { FlutterwaveButton, FlutterwaveInit } from "flutterwave-react-native";

const Cart = ({ back, items, removeItem, user, loggedIn }) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const showCancelBookingAlert = () => {
    setShowDialogue(!showDialogue);
  };
  const makePayment = async (price) => {
    if (loggedIn === false) {
      alert("You are not logged in!");
      return;
    }
    const flutterwaveConfig = {
      tx_ref: generateRef(10),
      authorization: "FLWPUBK_TEST-9b20b51419bb0e23f960a0d675a78c75-X",
      //FLWSECK-019c7aede86c7e57cbd57a33d12e5268-X
      amount: price,
      currency: "UGX",
      customer: {
        name: user.name,
        phone_number: user.phoneNumber,
        email: user.email,
      },
      payment_options: "mobile money",
      redirect_url: "https://ravemodal-dev.herokuapp.com/captcha/verify",
      customizations: { description: "paying for trip", logo: "" },
    };

    try {
      const paymentResponse = await FlutterwaveInit(flutterwaveConfig);
      Linking.openURL(paymentResponse);
    } catch (error) {
      alert(error.message);
    }
  };

  const generateRef = (length) => {
    var a =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );
    var b = [];
    for (var i = 0; i < length; i++) {
      var j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
    }
    return b.join("");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" />
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={styles.linear}
        backgroundColor="transparent"
        leftComponent={
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="#fff"
            onPress={back}
          />
        }
        centerComponent={<Text style={styles.screenName}>Cart</Text>}
      />
      <ScrollView
        style={{ minHeight: "80%", width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <Card
                  containerStyle={[styles.boxShadow, styles.itemCard]}
                  key={item.id}
                >
                  <View style={styles.cardTop}>
                    <Card.Title style={styles.text}>{item.title}</Card.Title>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="delete"
                        size={30}
                        color="#ff5349"
                        onPress={showCancelBookingAlert}
                      />
                    </TouchableOpacity>
                  </View>
                  <Card.Divider></Card.Divider>
                  <Card.Image
                    source={{ uri: item.photoURL }}
                    style={{ width: "100%", height: 250 }}
                  />
                  <Card.FeaturedSubtitle style={styles.text}>
                    UGX {item.price}
                  </Card.FeaturedSubtitle>
                  <FlutterwaveButton
                    style={styles.button}
                    onPress={() => makePayment(item.price)}
                  />
                </Card>
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
                source={require("../assets/images/cart.png")}
                style={{ height: 300, width: 300 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  color: "#ff5349",
                  fontWeight: "700",
                }}
              >
                You haven't added any thing to cart, go to Home and start
                booking
              </Text>
              <Button
                title="Back"
                containerStyle={{ width: "70%", height: 50 }}
                buttonStyle={{ backgroundColor: "#ff5349", height: "100%" }}
                onPress={back}
              />
            </View>
          )}
        </View>
        <Dialog
          isVisible={showDialogue}
          onBackdropPress={showCancelBookingAlert}
          statusBarTranslucent={true}
          overlayStyle={styles.dialog}
        >
          <Dialog.Title
            title="Do you want to remove this item from the cart?"
            titleStyle={styles.title}
          />
          <View style={styles.btns}>
            <Button
              containerStyle={styles.btnCont}
              buttonStyle={styles.btn}
              title="Yes"
              titleStyle={styles.title}
              onPress={removeItem}
            />
            <Button
              containerStyle={styles.btnCont}
              buttonStyle={styles.btn}
              title="No"
              titleStyle={styles.title}
              onPress={showCancelBookingAlert}
            />
          </View>
        </Dialog>
      </ScrollView>
    </View>
  );
};

export default Cart;

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
  itemCard: {
    width: "98%",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "orange",
    padding: 2,
  },
  cardTop: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
  },
  dialog: {
    backgroundColor: "#fff",
    width: "90%",
    height: 200,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 8,
    justifyContent: "space-between",
  },
  btns: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
  },
  btnCont: {
    width: "50%",
    height: 60,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 0,
  },
  btn: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F5F5F5",
  },
  title: { color: "grey", fontSize: 18 },
  text: {
    color: "#ff5349",
    fontWeight: "700",
    fontSize: 18,
  },
  button: {
    backgroundColor: "orange",
    width: "100%",
    height: 60,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 0,
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
