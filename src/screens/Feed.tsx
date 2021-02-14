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
import { concat } from "react-native-reanimated";

const Feed = ({ navigation }) => {
  const [showHome, setshowHome] = useState(false);
  const [viewCrops, setviewCrops] = useState([]);
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
  const [cropFinal, setcropFinal] = useState(null);
  const [listRegion, setlistRegion] = useState([]);
  const [fileredFarmers, setfileredFarmers] = useState([]);
  const [listCrops, setlistCrops] = useState([]);
  const [seeFarmer, setseeFarmer] = useState(false);
  const [clickedFarmers, setclickedFarmers] = useState([]);
  const [showList, setshowList] = useState([]);
  const [done, setdone] = useState(null);
  const [finallist, setfinallist] = useState([
    {
      cropName: "",
      harvestDate: "",
      quantity: 0,
    },
  ]);
  const [filter, setfilter] = useState([
    {
      gender: "",
      state: "",
      harvestDate: "",
    },
  ]);

  const [tempGen, settempGen] = useState(null);
  const [tempState, settempState] = useState(null);
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
        harvestDate:
          tempEndDate !== null ? tempEndDate.toLocaleDateString() : "",
        orderBy: "",
        cropName: cropFinal,
        pageNo: firstScroll,
        quantity: true,
        state: tempState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.list), setfarmers(farmers.concat(data.data.list));
      })
      .catch((error) => console.error(error));
  }, [firstScroll]);

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
        harvestDate:
          tempEndDate !== null ? tempEndDate.toLocaleDateString() : "",
        orderBy: "",
        cropName: cropFinal,
        pageNo: 0,
        quantity: true,
        state: tempState,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.list),
          setlistCrops(data.data.list),
          setfileredFarmers(data.data.list);
      })
      .catch((error) => console.error(error));
  }, [sendVal]);

  console.log(listCrops);

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
    fetch("http://staging.clarolabs.in:7050/Ksearch/crops", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cropName: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => setviewCrops(data.data.list));
  }, []);

  console.log(viewCrops);

  const renderAll = ({ item }) => (
    <Card
      key={item.id}
      isCrop={true}
      crop={item.name}
      avatar={item.cropImage}
      onPress={() => {
        console.log("crop"), setseeFarmer(true);
      }}
    />
  );
  useEffect(() => {
    fetch("http://staging.clarolabs.in:7050/Ksearch/fetch/states", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cropName: cropFinal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.list), setlistRegion(data.data.list);
      });
  }, [cropFinal]);

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
        setcropFinal(item.name), setsendVal(sendVal + 1);
        setblur(false);
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
      .then((data) => {
        console.log(data.data), setfocused(data.data.list);
      })
      .catch((err) => console.log(err));

    OpenProfile();
    console.log(listCrops);
    {
      listCrops.map((i) => {
        if (i.id == id) {
          i.crops.map((j) => {
            showList.push(j);
          });
        }
      });
    }
    console.log(showList);
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

  const suggestions = filteredBlur.filter((item) => {
    // console.log(item.id, item.name);
    if (item.id == 548 || item.id == 5721 || item.id == 810 || item.id == 47) {
      return item;
    }
  });

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

  const renderCrops = ({ item }) => (
    <View
      style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        marginBottom: 3,
        borderWidth: 1,
        padding: 5,
        borderColor: "#e8e8e8",
        borderRadius: 5,
        shadowColor: "#346beb",
        shadowOffset: {
          width: 1,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2.22,

        elevation: 5,
      }}
    >
      {/* {
    filteredBlur.map((i)=>{
      if(item.name==i.cropName){
        
      }
    })
  } */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* {opto.map((i) => {
      if (i.name.localCompare(item.name) == 0) {
        <Image
          source={{
            uri: item.cropImage,
          }}
          style={{
            height: 45,
            width: 45,
            marginRight: 5,
            borderRadius: "50%",
            borderColor: "green",
          }}
        />;
      }
    })} */}

        {filteredBlur.map((i) => {
          if (
            item.cropName.toString().toLocaleLowerCase() ===
            i.name.toString().toLocaleLowerCase()
          )
            return (
              <Image
                source={{
                  uri: i.cropImage,
                }}
                style={{
                  height: 45,
                  width: 45,
                  marginRight: 5,
                  borderRadius: 45,
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                }}
              />
            );
        })}

        <Text style={{ fontSize: 16 }}>{item.cropName}</Text>
        <Entypo name="dot-single" size={20} color="black" />
        <Text style={{ fontSize: 16 }}>{item.quantity} Quintal</Text>
      </View>

      <Text style={{ fontSize: 16 }}>{item.harvestDate}</Text>
    </View>
  );
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
    <View style={styles.container}>
      {!showHome ? (
        <View>
          <View
            style={{
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              padding: 10,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 25,
              }}
            >
              Welcome to Krisearch
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Available Crops
              </Text>
              <TouchableOpacity
                // style={{
                //   width: 100,
                //   height: 30,
                //   backgroundColor: "#3ECF8E",
                //   alignItems: "center",
                //   justifyContent: "center",
                //   padding: 5,
                //   borderRadius: 10,
                //   borderColor: "#3ECF8E",
                //   borderWidth: 2,
                // }}
                style={{
                  width: "30%",
                  height: 30,
                  alignItems: "center",
                  backgroundColor: "#3ECF8E",
                  borderWidth: 1,
                  borderRadius: 5,
                  marginRight: 10,
                  borderColor: "#3ECF8E",
                  justifyContent: "center",
                }}
                onPress={() => setshowHome(true)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    padding: 5,
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  View Farmers
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={viewCrops}
            renderItem={renderAll}
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
        </View>
      ) : (
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
              padding: 10,
            }}
          >
            <TouchableOpacity
              // style={{
              //   width: 100,
              //   height: 30,
              //   backgroundColor: "#3ECF8E",
              //   alignItems: "center",
              //   justifyContent: "center",
              //   padding: 5,
              //   borderRadius: 10,
              //   borderColor: "#3ECF8E",
              //   borderWidth: 2,
              // }}
              style={{
                width: "30%",
                height: 30,
                alignItems: "center",
                backgroundColor: "#3ECF8E",
                borderWidth: 1,
                borderRadius: 5,
                marginRight: 10,
                borderColor: "#3ECF8E",
                justifyContent: "center",
              }}
              onPress={() => setshowHome(false)}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 5,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Back to Feed
              </Text>
            </TouchableOpacity>
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
            {sendVal !== 0 ? (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f2f7ff",
                    height: 30,
                    width: 90,
                    padding: 3,
                    borderRadius: 5,
                    margin: 5,
                    borderWidth: 2,
                    borderColor: "#3A48ED",
                  }}
                  onPress={() => {
                    settempGen("");
                    settempEndDate(null);
                    settempState("");
                    setcropFinal("");
                    setsendVal(0);
                  }}
                >
                  <MaterialIcons name="clear-all" size={15} color="#3A48ED" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      marginLeft: 2,
                      color: "#3A48ED",
                    }}
                  >
                    {" "}
                    Clear All
                  </Text>
                </TouchableOpacity>
                {cropFinal !== null ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      marginRight: 5,
                      backgroundColor: "#87EDBF",
                      padding: 5,
                      height: 30,

                      borderRadius: 10,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#3ECF8E",
                    }}
                  >
                    <Text
                      style={{
                        color: "#009150",
                        fontWeight: "600",
                        fontSize: 15,
                      }}
                    >
                      {cropFinal}
                    </Text>

                    <AntDesign
                      name="close"
                      size={15}
                      color="#fff"
                      style={{
                        top: 2,
                        backgroundColor: "#009150",
                        padding: 2,
                        marginLeft: 5,
                        borderRadius: 15,
                      }}
                      onPress={() => {
                        setcropFinal("");
                        setsendVal(0);
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ backgroundColor: "transparent" }} />
                )}
                {tempGen !== null && sendVal !== 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      marginRight: 5,
                      backgroundColor: val ? "#fff" : "#deebff",
                      padding: 5,
                      height: 30,

                      borderRadius: 20,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#346beb",
                    }}
                  >
                    <Text style={{ color: "#000" }}>
                      {tempGen
                        ? tempGen === "m"
                          ? "Men"
                          : tempGen === "f"
                          ? "Women"
                          : "Other"
                        : null}
                    </Text>
                    <AntDesign
                      name="close"
                      size={15}
                      color="#3A48ED"
                      style={{
                        top: 2,
                        backgroundColor: "#A1C7FF",
                        padding: 2,
                        borderRadius: 15,
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        settempGen(null), setsendVal(sendVal + 1);
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ backgroundColor: "transparent" }} />
                )}
                {tempState !== null && sendVal !== 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      marginRight: 5,
                      backgroundColor: val ? "#fff" : "#deebff",
                      padding: 5,
                      height: 30,

                      borderRadius: 20,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "#346beb",
                    }}
                  >
                    <Text style={{ color: "#000" }}>{tempState}</Text>
                    <AntDesign
                      name="close"
                      size={15}
                      color="#3A48ED"
                      style={{
                        top: 2,
                        backgroundColor: "#A1C7FF",
                        padding: 2,
                        borderRadius: 15,
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        settempState(null), setsendVal(sendVal + 1);
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ backgroundColor: "transparent" }} />
                )}
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  marginRight: 5,
                  backgroundColor: "#fff",
                  padding: 5,
                  height: 30,
                  margin: 5,
                  width: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#346beb",
                }}
              >
                <Text style={{ color: "#000" }}>All</Text>
              </View>
            )}
          </View>
          {sendVal !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={fileredFarmers}
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
          ) : (
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
          )}
          <View style={{ width: "100%", height: 40 }} />
          <Modalize
            ref={modalizeFilterRef}
            modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
            modalStyle={
              winWidth > 767 ? { width: 400, alignSelf: "center" } : null
            }
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
                    settempEndDate(null);
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
                    <Text style={{ fontSize: 16, marginLeft: 5 }}>
                      {item.text}
                    </Text>
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
                  {listRegion.map((item) => {
                    return (
                      <View key={item.state} style={styles.buttonnewContainer}>
                        <TouchableOpacity
                          style={styles.circle}
                          onPress={() => {
                            settempState(item.state);
                            // settempAddr(item.name);
                            // // setaddr(item.name);
                            // setaddrToggle(false);
                          }}
                        >
                          {tempState === item.state && (
                            <View style={styles.checkedCircle} />
                          )}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, marginLeft: 5 }}>
                          {item.state}
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
                  <View style={{ marginLeft: 20 }}>
                    <Text style={{ marginBottom: 10 }}>To</Text>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      popperPlacement="bottom-left"
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
            modalStyle={
              winWidth > 767 ? { width: 400, alignSelf: "center" } : null
            }
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
                  onPress={() => {
                    CloseProfile(), setshowList([]);
                  }}
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
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
                              {hideNumber(i.phone)}
                            </Text>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{}}>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 20,
                      padding: 5,
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Entypo name="leaf" size={15} color="#9F99FF" />
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#6F6F6F",
                          fontWeight: "600",
                          marginLeft: 5,
                        }}
                      >
                        Crop Details
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <SimpleLineIcons
                        name="calendar"
                        size={15}
                        color="#9F99FF"
                      />
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#6F6F6F",
                          fontWeight: "600",
                          marginRight: 5,
                          marginLeft: 5,
                        }}
                      >
                        Harvest Dates
                      </Text>
                    </View>
                  </View>
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
                      height: winHeight * 0.4,
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={showList}
                      renderItem={renderCrops}
                      ListEmptyComponent={() => (
                        <View style={styles.container}>
                          <Text style={{ fontSize: 30 }}>
                            {" "}
                            Loading your crops..
                          </Text>
                        </View>
                      )}
                      contentContainerStyle={{
                        flex: 1,
                      }}
                    />
                  </View>
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
                      <FontAwesome
                        name="handshake-o"
                        size={15}
                        color="#A9A9A9"
                      />
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
                  <TouchableOpacity onPress={() => setblur(false)}>
                    <View
                      style={{
                        width: 25,
                        height: 25,
                        borderWidth: 2,
                        borderColor: "#A1C7FF",
                        alignItems: "center",
                        alignSelf: "flex-end",
                        justifyContent: "center",
                        right: -10,
                        backgroundColor: "#A1C7FF",
                        borderRadius: 25,
                      }}
                    >
                      <AntDesign name="close" size={20} color="#3A48ED" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: winWidth > 767 ? "50%" : "97%",
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    margin: 10,
                    borderColor: "#fff",
                    alignSelf: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <View style={{ height: 40, padding: 10 }}>
                    <Text style={{ fontSize: 15 }}>
                      {show !== "" ? "Matching Crops" : "Suggested Crops"}
                    </Text>
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
                  ) : (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={suggestions}
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
                  )}
                </View>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "transparent" }}
                  onPress={() => setblur(false)}
                ></TouchableOpacity>
              </BlurView>
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Feed;

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
