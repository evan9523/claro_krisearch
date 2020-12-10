import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

const Welcome = ({ navigation }) => {
  setTimeout(() => {
    navigation.replace("Home");
  }, 2000);

  return (
    <View style={[styles.container, { backgroundColor: "#346beb" }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: require("../../assets/newicon4.png") }}
          style={{ height: 100, width: 100 }}
        />
        <Text
          style={{
            color: "#fff",
            marginLeft: 10,
            fontSize: 50,
            fontWeight: "bold",
          }}
        >
          Krisearch
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#346beb",
    alignItems: "center",
    justifyContent: "center",
  },
});
