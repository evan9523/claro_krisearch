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
  FlatList,
  ActivityIndicator,
} from "react-native";
import Data from "../data/items.json";
import Farmer from "../data/farmers.json";

export interface SearchProps {
  visible?: boolean;
  tapper?: boolean;
  onHit(): any;
  isFocused?: boolean;
  holderValue?: string;
}

function SearchBar(props: SearchProps) {
  const { visible, onHit, tapper, isFocused, holderValue } = props;

  const [sugg, setsugg] = useState(false);
  const newdata = [];

  function renderAll(a = []) {
    for (let i = 0; i < a.length; i++) {
      return (
        <View style={{ width: "100%", height: 50, backgroundColor: "yellow" }}>
          <Text>{a[i]}</Text>
        </View>
      );
    }
  }

  return (
    <View
      style={{
        backgroundColor: tapper ? "#fff" : "transparent",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 40,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 8,
          padding: 5,
          shadowColor: "#98A0FF",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        }}
      >
        {/* <TextInput style={{height:40, backgroundColor:"white", width:"75%", padding:5, outline}} placeholder="Search for crops..." autoFocus={true}/> */}
        <TextInput
          style={
            Platform.OS === "web" && {
              outlineColor: "#fff",
              height: 40,
              backgroundColor: "white",
              width: "85%",
              padding: 5,
              fontSize: 20,
            }
          }
          onFocus={onHit}
          placeholder={holderValue}
          autoFocus={visible}
          editable={visible}
          onChangeText={(text) => {
            let a = text.toLowerCase();
            console.log(a);
            var setting = [];
            var typer = [];

            {
              {
                Data.map((item, cIndex) => setting.push(item.name));
              }
            }

            {
              {
                Data.map((item, cIndex) => typer.push(item.type));
              }
            }
            console.log(setting);
            for (let i = 0; i < setting.length; i++) {
              var b = setting[i].toLowerCase();
              var c = typer[i].toLowerCase();
              var result = b.includes(a);

              if (result == true) {
                newdata.push(setting[i]);
                console.log("New Data : " + newdata);
              } else {
                null;
              }
            }
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity>
            <View
              style={{
                width: 35,
                height: 35,
                borderColor: "#8790FF",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3A48ED",
                borderRadius: 35,
              }}
            >
              <SimpleLineIcons name="magnifier" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View></View>
    </View>
  );
}

export default SearchBar;
