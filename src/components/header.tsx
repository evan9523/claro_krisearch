import React from "react";
import {
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
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
      <Text style={styles.headerText}>Krisearch</Text>
      {windowWidth > 767 ? (
        <TextInput
          style={{
            width: "40%",
            height: 40,
            fontSize: 20,
            backgroundColor: "#fff",
            outlineColor: "#fff",
            borderRadius: 5,
            padding: 5,
            marginTop: 10,
          }}
          placeholder="Search for Crops"
          onFocus={onTap}
        />
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: winWidth > 767 ? 60 : 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#346beb",
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
  },
});
