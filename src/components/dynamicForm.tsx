import React, { useEffect, useState } from "react";
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
  FlatList,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const DynamicForm = () => {
  const [fields, setFields] = useState([
    { value: "", quantity: "", harvestDate: "" },
  ]);
  const [crop, setcrop] = useState(null);
  const [added, setadded] = useState(null);
  const [filteredBlur, setfilteredBlur] = useState([]);
  const [tempDate, settempDate] = useState(new Date());
  const [tempID, settempID] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sugg, setsugg] = useState([]);
  const [applied, setapplied] = useState(false);
  const options = [];

  useEffect(() => {
    fetch("http://staging.clarolabs.in:7050/Ksearch/crops", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cropName: crop,
      }),
    })
      .then((res) => res.json())
      .then((data) => setfilteredBlur(data.data.list));
  }, []);

  // const filteredCrops = Data.filter((item) => {
  //   return item.name.toLocaleLowerCase().includes(term.toLowerCase());
  // });

  filteredBlur.map((i) => {
    options.push({ values: i.name, label: i.name });
  });

  console.log(options);

  const renderMatch = ({ item }) => (
    <TouchableOpacity
      style={{
        width: winWidth > 767 ? "50%" : "97%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",

        padding: 5,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 10,
        backgroundColor: "#fff",
      }}
      onPress={() => {
        setadded(item.name);
        console.log(added);
        matchCrop(added, null, null, tempID);
        setcrop(null);
        settempID(null);
      }}
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
  // function handleChange(i, event) {
  //   const values = [...fields];
  //   values[i].value = event.target.value;
  //   values[i].quantity = event.target.quantity;
  //   values[i].harvestDate = event.target.harvestDate;
  //   setFields(values);
  //   console.log(fields);
  // }

  function handleAdd() {
    const values = [...fields];
    values.push({ value: "", quantity: "", harvestDate: "" });
    setFields(values);
  }

  const removeCrop = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const addCrop = () => {
    const val = [...fields];
    val.push({ value: "", quantity: "", harvestDate: "" });
    setFields(val);
  };

  const matchCrop = (e, q, h, i) => {
    const values = [...fields];
    if (e !== null) {
      values[i].value = e;
    } else if (q !== null) {
      values[i].quantity = q;
    } else if (h !== null) {
      values[i].harvestDate = h;
    }

    setFields(values);
    console.log(fields);
  };

  const showData = () => {
    console.log(fields);
  };
  return (
    <View
      style={{
        width: winWidth < 768 ? "100%" : "40%",
        borderWidth: 1,
        alignSelf: "center",
      }}
    >
      <View style={{ marginBottom: 10 }}>
        {fields.map((field, idx) => (
          <View
            key={`${field}~${idx}`}
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 5,
              backgroundColor: "yellow",
            }}
          >
            <View style={{ width: "35%", zIndex: 999 }}>
              <Select
                placeholder="Add Crop..."
                defaultValue={selectedOption}
                onChange={(e) => {
                  setSelectedOption;
                  matchCrop(e.label, null, null, idx);
                }}
                options={options}
              />
            </View>

            {/* <TextInput
            style={{
              width: "70%",
              fontSize: 15,
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 5,
              padding: 5,
              margin: 5,
            }}
            value={field.value}
            onChangeText={(e) => {
              // setcrop(e);
              // settempID(idx);
              // matchCrop(e, null, null, idx);
            }}
            placeholder="Add Crop"
          /> */}

            <TextInput
              style={{
                width: "20%",
                fontSize: 15,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                padding: 5,
                margin: 5,
              }}
              onChangeText={(q) => matchCrop(null, q, null, idx)}
              placeholder="Add Qty"
            />

            {applied ? (
              <Text>{field.harvestDate}</Text>
            ) : (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                popperPlacement="top-end"
                popperModifiers={{
                  offset: {
                    enabled: true,
                    offset: "5px, 10px",
                  },
                  preventOverflow: {
                    enabled: true,
                    escapeWithReference: false,
                    boundariesElement: "viewport",
                  },
                }}
                selected={tempDate}
                onChange={(date) => {
                  settempDate(date);
                  setapplied(true);
                  matchCrop(null, null, date.toLocaleDateString(), idx);
                }}
                customInput={
                  <TextInput
                    style={{
                      backgroundColor: "#d6d9ff",
                      borderRadius: 5,
                      borderColor: "#7b42ff",
                      height: 35,
                      borderWidth: 2,
                      padding: 5,
                      fontSize: 13,
                      width: "70%",
                    }}
                  />
                }
              />
            )}
            <AntDesign
              name="delete"
              size={20}
              color="#eb3d3d"
              onPress={() => removeCrop(idx)}
            />
            {/* <Button title="Remove" onPress={() => removeCrop(idx)} /> */}
          </View>
        ))}
      </View>
      {/* {fields.map((field, idx) => {
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
      </TouchableOpacity> */}

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
          addCrop();
          setapplied(false);
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
      {/* <Button
        title="Add Crop"
        onPress={() => {
          addCrop(), setapplied(false);
        }}
      /> */}
      <Button title="Submit" onPress={() => showData()} />
    </View>
  );
};

export default DynamicForm;
