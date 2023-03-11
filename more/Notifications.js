import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header, Skeleton, Slider, LinearProgress } from "@rneui/base";

const Notifications = ({ back }) => {
  const translateY = useRef(new Animated.Value(100)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: translateY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        Animated.spring(translateY, {
          toValue: gestureState.dy > 0 ? 600 : 100,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
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
        centerComponent={<Text style={styles.screenName}>Notifications</Text>}
      />
      <View>
        {/* <Skeleton
          animation="wave"
          width={"100%"}
          height={40}
          LinearGradientComponent={LinearGradient}
        /> */}
      </View>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Text>This</Text>
      </Animated.View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  linear: {
    colors: ["orange", "orange", "#ff5349"],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  },
  container: {
    backgroundColor: "#F5F5F5",
    height: "100%",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "orange",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 600,
  },
  screenName: { color: "#fff", fontSize: 22, fontWeight: "600" },
});
