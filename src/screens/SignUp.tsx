import { StatusBar } from "expo-status-bar";
import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import firebase from "../firebase/firebase";
import PreData from "../data/refFarmers.json";
import { winHeight, winWidth } from "../utils/window";
import * as Location from "expo-location";
import Crops from "../data/items.json";
import dynamicForm from "../components/dynamicForm";
import DynamicForm from "../components/dynamicForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { env } from "../env";
import Select from "react-select";

import {
  SimpleLineIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";

const SignUp = ({ navigation }) => {
  const [name, setname] = useState("");
  const [filled, setfilled] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cropName, setcropName] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [country, setcountry] = useState("");
  const [region, setregion] = useState("");
  const [locData, setlocData] = useState([]);
  const [userName, setuserName] = useState("");
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [show, setshow] = useState("");
  const [qty, setqty] = useState("");
  const [hdate, sethdate] = useState("");
  const [filteredBlur, setfilteredBlur] = useState([]);
  const [crop, setcrop] = useState(null);
  const [added, setadded] = useState(null);
  const [drops, setDrops] = useState([]);
  const [tempDate, settempDate] = useState(new Date());
  const [tempID, settempID] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sugg, setsugg] = useState([]);
  const [applied, setapplied] = useState(false);
  const [fields, setFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);
  const [inputFields, setInputFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);

  const handleSubmit = () => {
    console.log("fields", fields);
    console.log(userName);
    let phone = firebase.auth().currentUser?.phoneNumber;
    firebase
      .auth()
      .currentUser?.getIdToken()
      .then((idtoken) => {
        fetch("http://staging.clarolabs.in:7050/Ksearch/farmer/save", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authToken: idtoken,
            crops: fields,
            farmer: {
              name: userName,
              farmerImage:
                "https://www.shareicon.net/data/512x512/2016/09/01/822718_user_512x512.png",
              contactNo: firebase.auth().currentUser?.phoneNumber,
              village: city,
              block: country,
              district: district,
              state: region,
              totalLandSize: 0,
              totalLandSizeUnit: "Kattha",
              latitude: lat,
              longitude: long,
            },
          }),
        }).then(() => navigation.navigate("Homely", { screen: "Home" }));
      });
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
      .then((data) => setDrops(data.data.list));
  }, []);

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
      .then((data) => setfilteredBlur(data.data.list));
  }, [show]);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = "errorMsg";
  } else if (location != null) {
    console.log(location);
    Location.setGoogleApiKey(env.googleAPIkey);
    Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
      .then((e) => {
        console.log(e[0]);
        setcity(e[0].city);
        setdistrict(e[0].district);
        setregion(e[0].region);
        setcountry(e[0].name);
        setlat(location.coords.latitude);
        setlong(location.coords.longitude);
        console.log(city, district, region, country);
      })
      .catch((err) => console.log(err));
  }

  text = JSON.stringify(location);
  console.log(text);

  text = JSON.stringify(location);
  console.log(text);

  console.log("Reached Signup");

  const getCrop = (e) => {
    Crops.map((item) => {
      if (item.name.toLocaleLowerCase().includes(e.toLowerCase())) {
        console.log(item.name);
      }
    });
  };

  const removeCrop = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const addCrop = () => {
    const val = [...fields];
    val.push({ name: "", estimatedYield: 0, harvestingTime: "" });
    setFields(val);
  };

  const matchCrop = (e, q, h, i) => {
    const values = [...fields];
    if (e !== null) {
      values[i].name = e;
    } else if (q !== null) {
      values[i].estimatedYield = Number(q);
    } else if (h !== null) {
      values[i].harvestingTime = h;
    }

    setFields(values);
    console.log(fields);
  };

  const showData = () => {
    console.log(fields);
  };
  const options = [];
  drops.map((i) => {
    options.push({ values: i.name, label: i.name });
  });

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
        borderColor: "#fff",
        borderRadius: 10,
        backgroundColor: "#fff",
        alignSelf: "center",
      }}
      onPress={() => console.log(item.name)}
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
    <View style={[styles.container, { backgroundColor: "#fff" }]}>
      <View
        style={{ height: winHeight, width: "100%", backgroundColor: "#fff" }}
      >
        <View
          style={{
            height: "15%",
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/newIcon6.png")}
            style={{ height: 40, width: 40 }}
          />
          <Text style={{ marginLeft: 5, fontSize: 30, color: "#000" }}>
            Krisearch
          </Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Create your account</Text>
          <Text style={{ color: "green" }}>
            Number successfully verified. Lets get started
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "10%",

            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#d6d6d6",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",

              alignItems: "center",
              width: winWidth > 768 ? "40%" : "95%",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                marginLeft: 5,
                color: "#6F6F6F",
              }}
            >
              Your Name
            </Text>
            <TextInput
              style={{
                width: winWidth < 768 ? "60%" : "60%",
                height: 40,
                borderWidth: 1,
                borderColor: "#D3D3D3",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
                outlineColor: "#D3D3D3",
                fontSize: 16,
              }}
              onChangeText={(e) => setuserName(e)}
              placeholder="Enter your name"
            />
          </View>

          {/* <TouchableOpacity
            style={{
              width: "80%",
              height: 35,
              backgroundColor: "#3ECF8E",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              borderRadius: 5,
              borderColor: "#3ECF8E",
              borderWidth: 2,
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <Entypo name="location" size={24} color="#fff" />
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                marginLeft: 10,
              }}
            >
              Share Location
            </Text>
          </TouchableOpacity> */}
          {/* <Text>SignUp Form</Text>
          <Text>{text}</Text> */}
          {/* <View
            style={{
              width: "100%",
              backgroundColor: "yellow",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text>{city !== "" || null ? city : "Loading"}</Text>
            <Text>{district !== "" || null ? district : "Loading"}</Text>
            <Text>{region !== "" || null ? region : "Loading"}</Text>
            <Text>{country !== "" || null ? country : "Loading"}</Text>
          </View> */}
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              width: winWidth < 768 ? "100%" : "40%",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 5,
                color: "#6F6F6F",
              }}
            >
              List your crops below
            </Text>
            <TouchableOpacity
              style={{
                width: "35%",
                height: 30,
                alignItems: "center",
                backgroundColor: "#fff",
                borderWidth: 2,
                borderRadius: 20,
                marginTop: 10,
                borderColor: "#3ECF8E",
                justifyContent: "center",
              }}
              onPress={() => {
                addCrop();
                setapplied(false);
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 5,
                  color: "#3ECF8E",
                  fontWeight: "700",
                }}
              >
                + Add Crop
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: winWidth < 768 ? "100%" : "40%",

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
                    padding: 2,
                    height: 50,
                    borderColor: "#fafcff",
                    borderWidth: 2,
                    borderRadius: 5,
                    backgroundColor: "#fafcff",
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
                      borderColor: "#D3D3D3",
                      borderRadius: 5,
                      padding: 5,
                      margin: 5,
                      height: 37,
                      outlineColor: "#D3D3D3",
                    }}
                    onChangeText={(q) => matchCrop(null, q, null, idx)}
                    placeholder="Quantity"
                  />

                  {applied ? (
                    <View
                      style={{
                        backgroundColor: "#d6d9ff",
                        borderRadius: 5,
                        borderColor: "#7b42ff",
                        height: 35,
                        borderWidth: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30%",
                      }}
                    >
                      <Text style={{ fontSize: 14 }}>
                        {field.harvestingTime}
                      </Text>
                    </View>
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
                            fontSize: 14,
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

            {/* <Button
        title="Add Crop"
        onPress={() => {
          addCrop(), setapplied(false);
        }}
      /> */}
            {/* <Button title="Submit" onPress={() => showData()} /> */}
          </View>
          {/* <DynamicForm /> */}
          <View
            style={{
              width: winWidth > 768 ? "40%" : "100%",

              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "43%",
                height: 40,
                alignItems: "center",
                backgroundColor: "#3ECF8E",
                borderWidth: 1,
                borderRadius: 5,
                top: 30,
                borderColor: "#3ECF8E",
                justifyContent: "center",
                alignSelf: "flex-end",
              }}
              onPress={() => {
                handleSubmit();
                // console.log(fields);
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
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* {preCheck} */}

      <StatusBar style="auto" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#346beb",
    alignItems: "center",
    justifyContent: "center",
  },
});
