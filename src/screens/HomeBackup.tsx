import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Platform,
  TextInput,
} from "react-native";
import Header, { HeaderProps } from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import Farmers from "../data/farmers.json";
import Crops from "../data/items.json";
import { Modalize } from "react-native-modalize";
import Card from "../components/Card";

import {
  SimpleLineIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import hideNumber from "../utils/hideNumber";
import getSmallString from "../utils/getSmallString";
import States from "../data/states.json";
import Data from "../data/items.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { render } from "react-dom";
import lottie from "lottie-web";
import { BlurView } from "expo-blur";
import { add } from "date-fns";
import firebase from "../firebase/firebase";

const Home = ({ navigation }) => {
  const cropper = "";
  const [blur, setblur] = useState(false);
  const [placer, setplacer] = useState(false);
  const [crop, setcrop] = useState([]);
  const [parent, setparent] = useState(false);
  const [farmers, setfarmers] = useState([]);
  const [dispfarmers, setdispfarmers] = useState([]);
  const [modalName, setmodalName] = useState("");
  const [firstScroll, setfirstScroll] = useState(0);
  const [selectedState, setselectedState] = useState("");
  const [cats, setcats] = useState(false);
  const [val, setval] = useState("");
  const [tempVal, settempVal] = useState("");
  const [addr, setaddr] = useState("");
  const [tempAddr, settempAddr] = useState("");
  const [parenter, setparenter] = useState("");
  const [term, setterm] = useState("");
  const [filteractive, setfilteractive] = useState(false);
  const [addrToggle, setaddrToggle] = useState(false);
  const [cropToggle, setcropToggle] = useState(false);
  const [merge, setmerge] = useState(false);
  const [dater, setdater] = useState(false);
  const [tempDater, settempDater] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [tempStartDate, settempStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tempEndDate, settempEndDate] = useState(new Date());
  const [show, setshow] = useState("");
  const [applied, setapplied] = useState(false);

  useEffect(() => {
    let i = 0;
    fetch("http://staging.clarolabs.in:7050/Ksearch/farmers", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerName: true,
        farmingArea: true,
        gender: "",
        harvestDate: "",
        orderBy: "",
        pageNo: firstScroll,
        quantity: true,
        state: "",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.list), setfarmers(data.data.list);
      })
      .catch((error) => console.error(error));
  }, [firstScroll]);

  const handleLoad = () => {
    setfirstScroll(firstScroll + 1);
  };

  const renderItems = ({ item }) => (
    <Card
      key={item.id}
      name={item.farmerName}
      avatar={item.farmerImage}
      phone={item.phone}
      address={item.state}
      crop={item.cropName}
      onPress={() => {
        // console.log(item.farmerName),
        // setfarmer(item.id),
        //   // console.log(item.crops.map((i) => i.quantity));
        //   onOpen(),
        //   setmodalName(item.farmerName);
        console.log("Pressed");
      }}
    />
  );

  return (
    <View
      style={{
        width: "100%",
        height: winHeight,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={farmers}
        renderItem={renderItems}
        ListEmptyComponent={() => (
          <Text style={{ fontSize: 30 }}> Oops ! Didnt find that</Text>
        )}
        contentContainerStyle={{
          flexDirection: "row",
          width: "100%",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: winWidth > 767 ? 10 : 2,
        }}
        onEndReached={() => handleLoad()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f7ff",
    alignItems: "center",
    justifyContent: "center",
    height: winHeight,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 5,
  },
  buttonnewContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 5,
    padding: 5,
  },

  circle: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#3A48ED",
    alignItems: "center",
    justifyContent: "center",
  },

  checkedCircle: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: "#3A48ED",
  },
});
