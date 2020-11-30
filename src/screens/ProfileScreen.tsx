import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40, width: "100%", elevation: 1000 }}>
        <Header onTap={() => navigation.navigate("Search")} />
      </View>

      <View
        style={{
          flexDirection: winWidth > 767 ? "row" : "column",
          width: "100%",
          backgroundColor: "pink",
          height: "100%",
        }}
      >
        {winWidth > 767 ? (
          <View
            style={{
              backgroundColor: "#8cbaff",
              width: "30%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              title="GO to Home"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        ) : null}

        <View
          style={{
            backgroundColor: "#deebff",
            width: winWidth > 767 ? "70%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            title="GO to Search"
            onPress={() => navigation.navigate("Search")}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deebff",
    alignItems: "center",
    justifyContent: "center",
  },
});
