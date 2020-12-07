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
import { TouchableOpacity } from "react-native-gesture-handler";
import { winWidth } from "../utils/window";
import {
  SimpleLineIcons,
  Feather,
  Entypo,
  FontAwesome5,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

export interface HeaderProps {
  onTap(): any;
  onLogoTap(): any;
  catTap(): any;
}

const Header = (props: HeaderProps) => {
  const { onTap, onLogoTap, catTap } = props;
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
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            top: winWidth > 767 ? 5 : 10,
          }}
          onPress={onLogoTap}
        >
          <Image
            source={{ uri: require("../../assets/newicon2.png") }}
            style={{ width: 30, height: 30, top: -2 }}
          />
          <Text style={styles.headerText}>Krisearch</Text>
        </TouchableOpacity>

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
      <View
        style={{
          alignSelf: "center",
          alignItems: "flex-end",
          flex: 1,

          top: 10,
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "center",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            backgroundColor: "#03329e",
            flexDirection: "row",
            padding: 5,
            borderRadius: 20,
          }}
          onPress={catTap}
        >
          <Text style={{ fontSize: 20, marginRight: 5, color: "#fff" }}>
            Categories
          </Text>
          <AntDesign name="downcircleo" size={20} color="#fff" />
        </TouchableOpacity>
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
