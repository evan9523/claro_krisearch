import React, { useState } from "react";
import {
  Button,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
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

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { value: "", quantity: "", harvestDate: "" },
  ]);
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value;
    values[i].quantity = event.target.quantity;
    values[i].harvestDate = event.target.harvestDate;
    setFields(values);
    console.log(fields);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: "", quantity: "", harvestDate: "" });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }
  return (
    <View>
      {fields.map((field, idx) => {
        return (
          <View
            key={`${field}-${idx}`}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              borderWidth: 1,
              padding: 2,
              borderColor: "#D3D3D3",
              borderRadius: 5,
              margin: 2,
            }}
          >
            <View style={{ flexDirection: "column", width: "80%" }}>
              <View>
                <TextInput
                  placeholder="Crop"
                  style={
                    Platform.OS === "web" && {
                      outlineColor: "#3ECF8E",
                      height: 30,
                      backgroundColor: "white",
                      width: "100%",
                      padding: 5,
                      fontSize: 14,
                      borderWidth: 1,

                      borderColor: "#D3D3D3",
                      borderRadius: 5,
                      textAlign: "center",
                    }
                  }
                  value={field.value || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
              </View>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  placeholder="Quantity"
                  style={
                    Platform.OS === "web" && {
                      outlineColor: "#3ECF8E",
                      height: 30,
                      backgroundColor: "white",
                      width: "50%",
                      padding: 5,
                      fontSize: 14,
                      borderWidth: 1,
                      marginTop: 5,
                      marginRight: 5,
                      borderColor: "#D3D3D3",
                      borderRadius: 5,
                      textAlign: "center",
                    }
                  }
                  value={field.quantity || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
                <TextInput
                  placeholder="Harvest Date"
                  style={
                    Platform.OS === "web" && {
                      outlineColor: "#3ECF8E",
                      height: 30,
                      backgroundColor: "white",
                      width: "50%",
                      padding: 5,
                      fontSize: 14,
                      borderWidth: 1,
                      marginTop: 5,
                      marginLeft: 5,
                      borderColor: "#D3D3D3",
                      borderRadius: 5,
                      textAlign: "center",
                    }
                  }
                  value={field.harvestDate || ""}
                  onChange={(e) => handleChange(idx, e)}
                />
              </View>
            </View>

            <AntDesign
              name="delete"
              size={20}
              color="#eb3d3d"
              onPress={() => handleRemove(idx)}
            />
          </View>
        );
      })}
      <TouchableOpacity
        style={{
          width: "100%",
          height: 35,
          alignItems: "center",
          backgroundColor: "#3A48ED",
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 10,
          borderColor: "#3A48ED",
          justifyContent: "center",
        }}
        onPress={() => {
          handleAdd();
        }}
      >
        <Text
          style={{
            fontSize: 15,
            padding: 5,
            color: "#fff",
            fontWeight: "700",
          }}
        >
          + Add Crop
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DynamicForm;
