import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Card, Button, Dialog } from "@rneui/base";
import {
  FlutterwaveButton,
  PayWithFlutterwave,
  FlutterwaveInit,
} from "flutterwave-react-native";
import Flutterwave from "flutterwave-react-native";
const Cart = ({ back, items, removeItem }) => {
  const [showDialogue, setShowDialogue] = useState(false);
  const showCancelBookingAlert = () => {
    setShowDialogue(!showDialogue);
  };
  const makePayment = async (price) => {
    const flutterwaveConfig = {
      tx_ref: generateRef(11),
      authorization: "FLWPUBK_TEST-9b20b51419bb0e23f960a0d675a78c75-X",
      amount: price,
      currency: "UGX",
      customer: {
        name: "Juma Josephat",
        phonenumber: "+256702206985",
        email: "jumajosephat61@gmail.com",
      },
      payment_options: "mobile money",
      redirect_url:
        "https://ravemodal-dev.herokuapp.com/captcha/verify/85199:9e323b300f53a7d6962199dd9a84c700",
      customizations: { description: "paying for trip", logo: "" },
    };

    try {
      const paymentResponse = await FlutterwaveInit(flutterwaveConfig);
      console.log(paymentResponse);
      Linking.openURL(paymentResponse);
    } catch (error) {
      console.log(error.message);
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
    <View>
      <StatusBar style="light" backgroundColor="transparent" />
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
        centerComponent={<Text style={styles.screenName}>Cart</Text>}
      />
      <ScrollView style={{ minHeight: "80%" }}>
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
            <Card
              containerStyle={[
                styles.boxShadow,
                styles.itemCard,
                { alignContent: "center", alignItems: "center" },
              ]}
            >
              <MaterialIcons
                name="remove-shopping-cart"
                size={100}
                color="orange"
              />
              <Text style={styles.title}>Empty cart</Text>
            </Card>
          )}
        </View>
        <Dialog
          isVisible={showDialogue}
          onBackdropPress={showCancelBookingAlert}
          statusBarTranslucent={true}
          overlayStyle={styles.dialog}
        >
          <Dialog.Title
            title="Do you want to cancel booking?"
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
    width: "95%",
    height: 160,
    alignContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
