import React from "react";
import {
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

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
  filterShown?: boolean;
  onFilter(): any;
  // catTap(): any;
}

const Header = (props: HeaderProps) => {
  const { onTap, onLogoTap, filterShown, onFilter } = props;
  return (
    <View style={styles.header}>
      <View
        style={{
          width: "100%",
          top: winWidth > 767 ? 0 : 10,
          height: "100%",
          flexDirection: "row",
          alignSelf: "flex-start",
          alignItems: "center",
          justifyContent: "space-between",
          padding: winWidth > 767 ? 5 : 1,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            top: winWidth > 767 ? 5 : 10,
          }}
          onFocus={onLogoTap}
        >
          <Image
            source={{ uri: require("../../assets/newicon2.png") }}
            style={{ width: 30, height: 30, top: -2 }}
          />
          <Text style={styles.headerText}>Krisearch</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: winWidth > 767 ? "flex-start" : "flex-end",
            width: "69%",
            justifyContent: winWidth > 767 ? "flex-start" : "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              width: winWidth > 767 ? "55%" : "65%",
              height: 40,
              padding: 5,
              justifyContent: "space-between",
              borderRadius: 10,
              top: winWidth > 767 ? null : 3,
            }}
          >
            <TextInput
              style={{
                width: winWidth > 767 ? "90%" : "95%",
                height: winWidth > 767 ? 40 : 35,
                fontSize: winWidth > 767 ? 16 : 16,
                backgroundColor: "#fff",
                outlineColor: "#fff",
                borderRadius: 10,
                padding: 5,
                marginTop: winWidth < 767 ? 0 : 0,
              }}
              placeholder="Search for Crops"
              placeholderTextColor="	#808080"
              onFocus={onTap}
            />
            <AntDesign name="search1" size={20} color="#808080" />
          </View>

          <AntDesign
            name="filter"
            size={25}
            style={{
              alignSelf: "center",
              borderColor: "#deebff",
              width: 40,
              height: 40,
              marginLeft: 10,
              alignItems: "center",
              marginTop: winWidth < 767 ? 10 : -5,
              justifyContent: "center",
              padding: 11,
              borderRadius: 40,
            }}
            color="#deebff"
            onPress={onFilter}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: winWidth > 767 ? 70 : 90,
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
