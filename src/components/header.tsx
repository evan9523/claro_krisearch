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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          top: 5,
        }}
      >
        <Image
          source={{ uri: require("../../assets/newicon2.png") }}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.headerText}>Krisearch</Text>
      </View>

      <TextInput
        style={{
          width: "50%",
          height: winWidth > 767 ? 40 : 35,
          fontSize: winWidth > 767 ? 20 : 16,
          backgroundColor: windowWidth > 767 ? "#fff" : "#003bc4",
          outlineColor: "#fff",
          borderRadius: 10,
          padding: 5,
          marginTop: 10,
        }}
        placeholder="Search for Crops..."
        placeholderTextColor={winWidth > 767 ? "#000" : "#fff"}
        onFocus={onTap}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#346beb",
    padding: 5,
  },
  headerText: {
    fontSize: winWidth > 767 ? 22 : 20,
    color: "#fff",
    fontWeight: "600",
    marginLeft: 2,
  },
});
