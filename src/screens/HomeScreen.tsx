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
import * as Location from "expo-location";
import firebase from "../firebase/firebase";

const Home = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
  const [focused, setfocused] = useState([]);
  const [cropFinal, setcropFinal] = useState("");
  const [filter, setfilter] = useState([
    {
      gender: "",
      state: "",
      harvestDate: "",
    },
  ]);

  const [tempGen, settempGen] = useState("");
  const [tempState, settempState] = useState("");
  const [tempDate, settempDate] = useState("");
  const [sendVal, setsendVal] = useState(0);
  const [filteredBlur, setfilteredBlur] = useState([]);
  const [selectedCrop, setselectedCrop] = useState(false);
  const [mapCroptoFarmer, setmapCroptoFarmer] = useState([]);

  const tempValues = () => {
    console.log(tempGen, tempState, tempDate);
  };

  useEffect(() => {
    fetch("http://staging.clarolabs.in:7050/Ksearch/farmers", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        farmerName: true,
        farmingArea: true,
        gender: tempGen,
        harvestDate: tempEndDate.toLocaleDateString(),
        orderBy: "",
        cropName: cropFinal,
        pageNo: 0,
        quantity: true,
        state: tempState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.list), setfarmers(data.data.list);
      })
      .catch((error) => console.error(error));
  }, [sendVal, firstScroll]);

  console.log(farmers);

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
      onPress={() => {
        setcropFinal(item.name), setsendVal(sendVal + 1);
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

  const showDetails = (id) => {
    fetch("http://staging.clarolabs.in:7050/Ksearch/farmer/details/" + id, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: null,
    })
      .then((res) => res.json())
      .then((data) => setfocused(data.data.list))
      .catch((err) => console.log(err));

    OpenProfile();
  };

  console.log(focused);

  const cropSearch = (item) => {
    alert(item);
    setselectedCrop(true);
    {
      farmers.map((i) => {
        if (i.cropName == item) {
          console.log(i.farmerName);
        } else {
          console.log("NO MATCH");
        }
      });
    }
  };

  console.log(mapCroptoFarmer);

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
    Location.setGoogleApiKey("AIzaSyBM1KjPdMGHYcIiXTbDl4v_GAAjbOO6OPA");
    Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    })
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
  }

  text = JSON.stringify(location);
  console.log(text);

  const handleLoad = () => {
    setfirstScroll(firstScroll + 1);
  };

  const modalizeFilterRef = useRef<Modalize>(null);
  const onOpenfilter = () => {
    modalizeFilterRef.current?.open();
  };

  const onCloseFilter = () => {
    modalizeFilterRef.current?.close();
  };

  const modalizeRef = useRef<Modalize>(null);
  const OpenProfile = () => {
    modalizeRef.current?.open();
  };

  const CloseProfile = () => {
    modalizeRef.current?.close();
  };

  const genderData = [
    {
      key: "m",
      text: "Men",
    },
    {
      key: "f",
      text: "Women",
    },
  ];

  const renderItems = ({ item }) => (
    <Card
      key={item.id}
      name={item.farmerName}
      avatar={item.farmerImage}
      phone={item.phone}
      address={item.state}
      crop={
        item.crops[0].cropName +
        (item.crops.length - 1 == 0 ? "" : " + " + (item.crops.length - 1))
      }
      onPress={() => {
        // console.log(item.farmerName),
        // setfarmer(item.id),
        //   // console.log(item.crops.map((i) => i.quantity));
        //   onOpen(),
        //   setmodalName(item.farmerName);
        console.log("Pressed");
        showDetails(item.id);
      }}
    />
  );

  return (
    <View
      style={{
        width: "100%",
        height: winHeight,
        backgroundColor: "#deebff",
      }}
    >
      <Header
        onTap={() => {
          setblur(true), setshow("");
        }}
        onLogoTap={() => {
          console.log("Logo");
        }}
        onFilter={() => console.log("Filter")}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          flexDirection: "row",
          backgroundColor: "#deebff",
          padding: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#346beb",
            height: 30,
            width: 80,
            padding: 3,
            borderRadius: 5,
          }}
          onPress={() => onOpenfilter()}
        >
          <AntDesign name="filter" size={15} color="#fff" />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "500",
              marginLeft: 2,
              color: "#fff",
            }}
          >
            {" "}
            Filter
          </Text>
        </TouchableOpacity>
      </View>
      {farmers !== null ? (
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
            backgroundColor: "#deebff",
            padding: winWidth > 767 ? 10 : 2,
          }}
          onEndReached={() => handleLoad()}
        />
      ) : null}
      <View style={{ width: "100%", height: 40 }} />
      <Modalize
        ref={modalizeFilterRef}
        modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
        modalStyle={winWidth > 767 ? { width: 400, alignSelf: "center" } : null}
        threshold={100}
        closeOnOverlayTap={true}
        mod
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            padding: 5,
            top: 5,
          }}
        >
          {/* <TouchableOpacity onPress={() => onCloseFilter()}>
                Close Filter
              </TouchableOpacity> */}
          <Text style={{ fontSize: 16, marginLeft: 7, fontWeight: "600" }}>
            Filter Results
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 10,
                borderColor: "#3A48ED",
                borderWidth: 2,
              }}
              onPress={() => {
                settempGen("");
                settempState("");
                settempDate("");
                setsendVal(0);
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#3A48ED",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 60,
                height: 30,
                backgroundColor: "#3ECF8E",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 10,
                borderColor: "#3ECF8E",
                borderWidth: 2,
              }}
              onPress={() => {
                tempValues();
                setsendVal(sendVal + 1);
                onCloseFilter();
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#fff",
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onCloseFilter();
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderWidth: 2,
                  borderColor: "#A1C7FF",
                  alignItems: "center",
                  alignSelf: "flex-end",
                  justifyContent: "center",
                  flexDirection: "row",
                  backgroundColor: "#A1C7FF",
                  borderRadius: 25,
                }}
              >
                <AntDesign name="close" size={20} color="#3A48ED" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            height: 1,
            backgroundColor: "#C0C0C0",
            marginTop: 10,
            alignItems: "center",
          }}
        ></View>
        <Text
          style={{
            color: "#6F6F6F",
            fontSize: 15,
            marginTop: 3,
            marginLeft: 7,
            padding: 5,
          }}
        >
          By Gender
        </Text>
        <View
          style={{
            width: "32%",
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 5,
            marginLeft: 7,
            alignSelf: "flex-start",
          }}
        >
          {genderData.map((item) => {
            return (
              <View key={item.key} style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.circle}
                  onPress={() => {
                    settempGen(item.key);
                  }}
                >
                  {tempGen === item.key && (
                    <View style={styles.checkedCircle} />
                  )}
                </TouchableOpacity>
                <Text style={{ fontSize: 16, marginLeft: 5 }}>{item.text}</Text>
              </View>
            );
          })}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            padding: 5,
            alignSelf: "flex-start",
          }}
        >
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              height: 1,
              backgroundColor: "#C0C0C0",
              marginTop: 10,
              alignItems: "center",
            }}
          ></View>
          <Text
            style={{
              color: "#6F6F6F",
              fontSize: 15,
              marginTop: 10,
              marginLeft: 0,
              marginBottom: 5,
              padding: 5,
            }}
          >
            By States
          </Text>

          <TouchableOpacity
            onPress={() => setaddrToggle(!addrToggle)}
            style={{
              flexDirection: "row",
              backgroundColor: "#d6d9ff",
              borderWidth: 2,
              borderColor: "#7b42ff",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "space-between",
              padding: 5,
              minWidth: "30%",

              marginLeft: 7,
            }}
          >
            <Text style={{ fontSize: 15 }}>
              {tempAddr ? tempAddr : "All States"}
            </Text>
            <AntDesign name="down" size={12} />
          </TouchableOpacity>
          {addrToggle ? (
            <View style={{ marginTop: 10 }}>
              {States.map((item) => {
                return (
                  <View key={item.code} style={styles.buttonnewContainer}>
                    <TouchableOpacity
                      style={styles.circle}
                      onPress={() => {
                        settempState(item.name);
                        // settempAddr(item.name);
                        // // setaddr(item.name);
                        // setaddrToggle(false);
                      }}
                    >
                      {tempState === item.name && (
                        <View style={styles.checkedCircle} />
                      )}
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>
                      {item.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 10,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            padding: 5,
            alignSelf: "flex-start",
          }}
        >
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              height: 1,
              backgroundColor: "#C0C0C0",
              marginTop: 10,
              alignItems: "center",
            }}
          ></View>
          <View>
            <Text
              style={{
                color: "#6F6F6F",
                fontSize: 15,
                marginTop: 10,
                marginLeft: 0,
                marginBottom: 5,
                zIndex: 1000,
                padding: 5,
              }}
            >
              By Harvest Date
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: 150,
                padding: 5,
              }}
            >
              <View>
                <Text style={{ marginBottom: 10 }}>From</Text>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={
                    tempStartDate < new Date() ? new Date() : tempStartDate
                  }
                  onChange={(date) => {
                    date < new Date().toLocaleDateString()
                      ? alert("Start Date cannot be less than today")
                      : settempStartDate(date);
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
                        fontSize: 15,
                        width: 100,
                      }}
                    />
                  }
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ marginBottom: 10 }}>To</Text>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  popperPlacement="bottom-right"
                  selected={tempEndDate}
                  onChange={(date) => {
                    settempEndDate(date);
                    // date <= tempStartDate
                    //   ? alert(
                    //       "End Date cannot be less than or equal to Start Date"
                    //     )
                    //   : settempEndDate(date);
                    // settempDater(true);
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
                        fontSize: 15,
                        width: 100,
                      }}
                    />
                  }
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "95%",
              alignSelf: "center",
              height: 1,

              marginTop: 100,
              alignItems: "center",
            }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            alignSelf: "flex-end",

            marginTop: "30%",
          }}
        ></View>
      </Modalize>
      <Modalize
        ref={modalizeRef}
        modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
        modalStyle={winWidth > 767 ? { width: 400, alignSelf: "center" } : null}
        threshold={100}
        closeOnOverlayTap={true}
        mod
      >
        <View>
          <View
            style={{
              backgroundColor: "#3A48ED",
              width: "100%",
              height: 170,
              borderWidth: 1,
              top: -2,
              borderRadius: 15,
              borderColor: "#3A48ED",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 9,
            }}
          >
            <TouchableOpacity
              onPress={() => CloseProfile()}
              style={{
                alignItems: "center",
                marginTop: 5,
                marginRight: 2,
                padding: 5,
                justifyContent: "center",
                alignSelf: "flex-end",
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 10,
                height: 35,
                width: 70,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#fff",
                    marginRight: 5,
                  }}
                >
                  Close
                </Text>
                <SimpleLineIcons
                  name="close"
                  size={15}
                  color="#fff"
                  onPress={() => CloseProfile()}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                top: -10,
              }}
            >
              <View style={{ width: "40%", height: "100%", padding: 5 }}>
                {focused.map((i) => {
                  return (
                    <Image
                      source={{ uri: i.farmerImage }}
                      style={{
                        height: 120,
                        width: 120,
                        borderRadius: 120,
                        borderColor: "#fff",
                        borderWidth: 2,
                      }}
                    />
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  width: "60%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="user" size={20} color="#fff" />

                    {focused.map((i) => {
                      return (
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            fontWeight: "700",
                            marginLeft: 5,
                          }}
                        >
                          {i.farmerName}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="map-pin" size={20} color="#fff" />
                    {focused.map((i) => {
                      return (
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            fontWeight: "700",
                            marginLeft: 5,
                          }}
                        >
                          {i.state}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Feather name="phone" size={20} color="#fff" />
                    {focused.map((i) => {
                      return (
                        <Text
                          style={{
                            fontSize: 20,
                            color: "#fff",
                            fontWeight: "700",
                            marginLeft: 5,
                          }}
                        >
                          {i.phone}
                        </Text>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
            <View style={{ top: -40 }}>
              <Text
                style={{
                  marginTop: winWidth < 400 ? 40 : 60,
                  padding: 5,
                  fontWeight: "500",
                  color: "#6F6F6F",
                  fontSize: 20,
                  marginLeft: 5,
                }}
              >
                Farming Details
              </Text>
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  height: 1,
                  backgroundColor: "#C0C0C0",
                }}
              ></View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 10,
                  padding: 10,
                  height: winWidth < 400 ? 100 : 180,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="leaf" size={20} color="#9F99FF" />

                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6F6F6F",
                          fontWeight: "600",
                        }}
                      >
                        Crop
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 20 }}>Crop</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      alignItems: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <SimpleLineIcons
                        name="calendar"
                        size={20}
                        color="#9F99FF"
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6F6F6F",
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                      >
                        Harvest Date
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 20 }}>Harvest Date</Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <SimpleLineIcons
                        name="size-fullscreen"
                        size={20}
                        color="#9F99FF"
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6F6F6F",
                          fontWeight: "600",
                          marginLeft: 5,
                        }}
                      >
                        Farming Area
                      </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                      {focused.map((i) => {
                        return (
                          <Text style={{ fontSize: 20 }}>{i.totalLand}</Text>
                        );
                      })}
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      alignItems: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <SimpleLineIcons
                        name="speedometer"
                        size={20}
                        color="#9F99FF"
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#6F6F6F",
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                      >
                        Quantity
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 20, marginLeft: 5 }}>
                        Quantity q
                      </Text>
                    </View>
                  </View>
                </View>
                <View></View>
              </View>
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  height: 1,
                  backgroundColor: "#C0C0C0",
                  marginTop: winWidth < 400 ? 30 : 10,
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "column",
                top: -29,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "#808080",
                  marginLeft: 5,
                }}
              >
                Coming soon
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  top: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: winWidth < 400 ? 70 : 90,
                    height: winWidth < 400 ? 30 : 40,
                    backgroundColor: "#A9A9A9",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 10,
                  }}
                  onPress={() =>
                    alert(
                      "Click to chat feature helps you connect directly to this farmer in one click. Feature Coming soon !"
                    )
                  }
                >
                  <FontAwesome5 name="whatsapp" size={20} color="#fff" />
                  <Text
                    style={{
                      fontSize: winWidth < 400 ? 16 : 20,
                      color: "#fff",
                      marginLeft: 5,
                    }}
                  >
                    Chat
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: winWidth < 400 ? 70 : 90,
                    height: winWidth < 400 ? 30 : 40,
                    backgroundColor: "#A9A9A9",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 10,
                  }}
                  onPress={() => alert("Feature Coming soon !")}
                >
                  <Text
                    style={{
                      fontSize: winWidth < 400 ? 16 : 20,
                      color: "#fff",
                      marginLeft: 5,
                    }}
                  >
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: winWidth < 400 ? 90 : 120,
                    height: winWidth < 400 ? 35 : 40,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 10,
                    borderColor: "#A9A9A9",
                    borderWidth: 2,
                    padding: 5,
                  }}
                  onPress={() =>
                    alert(
                      "Support the farmer by any kind. Feature Coming Soon !"
                    )
                  }
                >
                  <FontAwesome name="handshake-o" size={15} color="#A9A9A9" />
                  <Text
                    style={{
                      fontSize: winWidth < 400 ? 16 : 20,
                      color: "#A9A9A9",
                      marginLeft: 5,
                    }}
                  >
                    Support
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modalize>
      {blur ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            position: "absolute",
          }}
        >
          <BlurView
            tint="dark"
            intensity={40}
            style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
          >
            <View
              style={{
                backgroundColor: "#fff",
                height: 55,
                width: winWidth > 767 ? "50%" : "97%",
                alignSelf: "center",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: 8,
                padding: 20,
                shadowColor: "#98A0FF",
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.32,
                shadowRadius: 5.46,
                marginTop: 10,
                elevation: 9,
              }}
            >
              <TextInput
                style={
                  Platform.OS === "web" && {
                    outlineColor: "#fff",
                    height: 40,
                    backgroundColor: "white",
                    width: "95%",
                    padding: 5,
                    fontSize: 20,
                  }
                }
                placeholder="Search for Crops"
                autoFocus={true}
                editable={true}
                onChangeText={(text) => {
                  console.log(text);
                  setshow(text);
                }}
              />
              <Button title="Close Blur" onPress={() => setblur(false)} />
            </View>
            {show !== "" ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredBlur}
                renderItem={renderMatch}
                ListEmptyComponent={() => (
                  <View style={styles.container}>
                    <Text style={{ fontSize: 30 }}>
                      {" "}
                      Oops ! Didnt find that
                    </Text>
                  </View>
                )}
                contentContainerStyle={{
                  width: "100%",
                }}
              />
            ) : null}
          </BlurView>
        </View>
      ) : null}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deebff",
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
