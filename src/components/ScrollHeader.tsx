import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Dimensions,
} from "react-native";
import SearchBar from "./SearchBar";

export interface ScrollHeaderProps {
  scrolled?: boolean;
  visible?: boolean;
  headerTap(): any;
  headHolder?: string;
}

function ScrollHeader(props: ScrollHeaderProps) {
  const [sugg, setsugg] = useState(null);
  const { scrolled, visible, headerTap, headHolder } = props;
  const windowWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        width: "100%",
        marginTop: windowWidth > 767 ? 5 : 2,
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "space-evenly",
        marginLeft: windowWidth > 800 ? 50 : 0,
        padding: 5,
      }}
    >
      {windowWidth < 767 ? (
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/newlogo.png")}
            style={{ width: 100, height: 50 }}
          />
        </View>
      ) : null}

      <View style={{ marginTop: -5, width: "100%" }}>
        <SearchBar onHit={headerTap} holderValue={headHolder} />
      </View>
    </View>
  );
}

export default ScrollHeader;
