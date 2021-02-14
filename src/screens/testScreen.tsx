import { StatusBar } from "expo-status-bar";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import firebase from "../firebase/firebase";
import { firestore } from "firebase";
import {
  SimpleLineIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TextInput } from "react-native-gesture-handler";
import DynamicForm from "../components/dynamicForm";

const Test = ({ navigation }) => {
  const [inputFields, setInputFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);

  const [show, setshow] = useState("");
  const [selected, setselected] = useState("");
  const [crops, setcrops] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "estimatedYield") {
      values[index].estimatedYield = Number(event.target.value);
    } else {
      values[index].harvestingTime = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name: "", harvestingTime: "", estimatedYield: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  useEffect(() => {
    fetch("http://staging.clarolabs.in:7050/Ksearch/crops", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cropName: show,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.list), setcrops(data.data.list);
      });
  }, [show]);

  const cropSearch = (n) => {
    setselected(n);
  };

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={{
        width: winWidth > 767 ? "50%" : "97%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        margin: 2,
        padding: 5,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        backgroundColor: "#fff",
        alignSelf: "center",
      }}
      onPress={() => cropSearch(item.name)}
    >
      <Image
        source={{ uri: item.cropImage }}
        style={{
          width: 45,
          height: 45,
          borderWidth: 1,
          borderColor: "green",
          borderRadius: 45,
        }}
      />
      <Text style={{ fontSize: 20, marginLeft: 5 }}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DynamicForm />
    </View>
  );
};

export default Test;
