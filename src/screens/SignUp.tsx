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
  const [inputFields, setInputFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
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
            crops: inputFields,
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
            height: "20%",

            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#d6d6d6",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Please tell us your name
          </Text>
          <TextInput
            style={{
              width: winWidth < 768 ? "80%" : 200,
              height: 40,
              borderWidth: 1,
              borderColor: "#D3D3D3",
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
              outlineColor: "#fff",
            }}
            onChangeText={(e) => setuserName(e)}
            placeholder="Enter your name"
          />
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
          <View
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
          </View>
        </View>
        <View
          style={{
            width: "100%",
            padding: 10,
            marginTop: 15,
          }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              List your crops below
            </Text>
          </View>

          <>
            <form onSubmit={handleSubmit}>
              <View
                style={{
                  borderWidth: 1,

                  borderColor: "#f5f5f5",
                  width: "100%",
                  marginBottom: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}
              >
                <div className="form-row">
                  {inputFields.map((inputField, index) => (
                    <Fragment key={`${inputField}~${index}`}>
                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ width: "90%", marginRight: 10 }}>
                            <div className="form-group col-sm-6">
                              {/* <label htmlFor="firstName">First Name</label> */}

                              <input
                                style={{
                                  width: "90%",
                                  height: 30,
                                  margin: 3,
                                  borderWidth: 1,
                                  outlineColor: "#fff",
                                  borderRadius: 5,
                                }}
                                placeholder="Type to add crop"
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={inputField.name}
                                onChange={(event) => {
                                  handleInputChange(index, event);
                                  setshow(event);
                                }}
                              />
                              {/* {show !== "" ? (
                                <FlatList
                                  showsVerticalScrollIndicator={false}
                                  data={filteredBlur}
                                  renderItem={renderMatch}
                                  ListEmptyComponent={() => (
                                    <Text style={{ fontSize: 30 }}>
                                      {" "}
                                      Oops ! Didnt find that
                                    </Text>
                                  )}
                                  contentContainerStyle={{
                                    width: "100%",
                                  }}
                                />
                              ) : null} */}
                            </div>
                          </View>

                          <AntDesign
                            style={{ marginRight: 10 }}
                            name="delete"
                            size={24}
                            color="#ff7878"
                            onPress={() => {
                              handleRemoveFields(index);
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            width: "90%",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="form-group col-sm-4">
                            {/* <label htmlFor="lastName">Last Name</label> */}
                            <input
                              style={{
                                width: "85%",
                                height: 25,
                                margin: 3,
                                outlineColor: "#fff",
                              }}
                              placeholder="Quantity"
                              type="text"
                              className="form-control"
                              id="estimatedYield"
                              name="estimatedYield"
                              value={inputField.estimatedYield}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            />
                          </div>
                          <div className="form-group col-sm-4">
                            {/* <label htmlFor="date">Date</label> */}

                            <input
                              style={{
                                width: "85%",
                                height: 25,
                                marginLeft: -10,
                                outlineColor: "#fff",
                              }}
                              placeholder="Harvest Date"
                              type="text"
                              className="form-control"
                              id="harvestingTime"
                              name="harvestingTime"
                              value={inputField.harvestingTime}
                              onChange={(event) =>
                                handleInputChange(index, event)
                              }
                            />
                          </div>
                        </View>
                      </View>
                    </Fragment>
                  ))}
                </div>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <View>
                  <button
                    className="btn btn-primary mr-2"
                    type="submit"
                    onSubmit={handleSubmit}
                    style={{
                      width: 100,
                      height: 30,
                      alignItems: "center",
                      backgroundColor: "#8f98ff",
                      borderWidth: 1.5,
                      borderRadius: 5,
                      marginLeft: 10,
                      marginTop: 10,
                      borderColor: "#3A48ED",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "500" }}>
                      {" "}
                      Done
                    </Text>
                  </button>
                </View> */}
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 35,
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 10,
                    borderColor: "#3A48ED",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    handleAddFields();
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      padding: 5,
                      color: "#3A48ED",
                      fontWeight: "700",
                    }}
                  >
                    + Add Crop
                  </Text>
                </TouchableOpacity>
              </View>
              <div className="submit-button">
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: 35,
                    alignItems: "center",
                    backgroundColor: "#3ECF8E",
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 10,
                    borderColor: "#3ECF8E",
                    justifyContent: "center",
                  }}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      padding: 5,
                      color: "#fff",
                      fontWeight: "700",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </div>
              <br />
              <pre>{JSON.stringify(inputFields, null, 2)}</pre>
            </form>
          </>
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
