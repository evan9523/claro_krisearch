import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

const Welcome = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("Home");
  }, 2000);

  return (
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: require("../../assets/icon1.png") }}
          style={{ height: 50, width: 50 }}
        />
        <Text style={{ color: "#346beb", fontSize: 34 }}>Krisearch</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deebff",
    alignItems: "center",
    justifyContent: "center",
  },
});
