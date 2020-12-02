import React from "react";
import {
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { winWidth } from "../utils/window";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

export interface HeaderProps {
  onTap(): any;
}

const Header = (props: HeaderProps) => {
  const { onTap } = props;
  return (
    <View style={styles.header}>
      <View
        style={{
          width: winWidth < 767 ? "100%" : "70%",
          top: winWidth > 767 ? 5 : 10,
          height: "100%",
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            top: winWidth > 767 ? 5 : 10,
          }}
        >
          <Image
            source={{ uri: require("../../assets/newicon2.png") }}
            style={{ width: 30, height: 30, top: -2 }}
          />
          <Text style={styles.headerText}>Krisearch</Text>
        </View>

        <TextInput
          style={{
            width: "50%",
            height: winWidth > 767 ? 40 : 35,
            fontSize: winWidth > 767 ? 20 : 16,
            backgroundColor: "#fff",
            outlineColor: "#fff",
            borderRadius: 10,
            padding: 5,
            marginTop: 10,
          }}
          placeholder="Search for Crops..."
          placeholderTextColor="#000"
          onFocus={onTap}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#346beb",
    padding: 5,
  },
  headerText: {
    fontSize: winWidth > 767 ? 22 : 20,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 2,
    alignSelf: "flex-start",
  },
});
