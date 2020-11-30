import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import Farmers from "../data/farmers.json";
import Data from "../data/items.json";
import { Modalize } from "react-native-modalize";
import hideNumber from "../utils/hideNumber";
import getSmallString from "../utils/getSmallString";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import States from "../data/states.json";
import ScrollHeader from "../components/ScrollHeader";
import Card from "../components/Card";

const Search = ({ navigation }) => {
  const [blur, setblur] = useState(true);
  const [term, setterm] = useState("");
  const [placer, setplacer] = useState(false);
  const [farmer, setfarmer] = useState(0);
  const [openFilter, setopenFilter] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [val, setval] = useState("");
  const [addr, setaddr] = useState("");
  const [genFilterfinal, setgenFilterfinal] = useState([]);
  const [hideFAB, sethideFAB] = useState(false);
  const [parent, setparent] = useState(false);
  const [genderSelected, setgenderSelected] = useState(false);
  const [filteractive, setfilteractive] = useState(false);
  const [addrToggle, setaddrToggle] = useState(false);
  const [merge, setmerge] = useState(false);

  const setSearch = (text: string) => {
    let dynamic = text.toLowerCase();
    console.log("dynamic: " + dynamic);
  };

  const filteredCrops = Data.filter((item) => {
    return item.name.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredParents = Data.filter((item) => {
    return item.type.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredFarmers = Farmers.filter((item) => {
    return item.crop.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const genderFilter = filteredFarmers.filter((item) => {
    if (val) {
      return item.gender.toLocaleLowerCase() === val.toLowerCase();
    }
  });

  const addrFilter = filteredFarmers.filter((item) => {
    if (addr) {
      return item.address.toLocaleLowerCase() === addr.toLowerCase();
    }
  });

  const applyFilterFinal = [genderFilter, addrFilter].flat();

  const modalizeRef = useRef<Modalize>(null);

  const modalizeFilterRef = useRef<Modalize>(null);

  const mergeResult = (genderFilter && addrFilter).filter((item) => {
    // if (val && addr) {

    // }
    // if (addr && !val) {
    //   return item.address.toLocaleLowerCase() === addr.toLowerCase();
    // }
    // if (val && !addr) {
    //   return item.gender.toLocaleLowerCase() === val.toLowerCase();
    // }
    return (
      item.gender.toLocaleLowerCase() === val.toLowerCase() &&
      item.address.toLocaleLowerCase() === addr.toLowerCase()
    );
  });

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const onOpenfilter = () => {
    modalizeFilterRef.current?.open();
  };

  const onCloseFilter = () => {
    modalizeFilterRef.current?.close();
  };

  const genderData = [
    {
      key: "male",
      text: "Male",
    },
    {
      key: "female",
      text: "Female",
    },
    {
      key: "other",
      text: "Other",
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={{ marginTop: 40, width: "100%", elevation: 1000 }}>
        <Header onTap={() => navigation.navigate("Search")} />
      </View> */}
      <View
        style={{
          flexDirection: winWidth > 767 ? "row" : "column",
          width: "100%",

          height: "100%",
        }}
      >
        {winWidth > 767 ? (
          <View
            style={{
              backgroundColor: "#8cbaff",
              width: "30%",
              height: "100%",
              alignItems: "center",

              padding: 10,
            }}
          >
            <Text style={{ fontSize: 24, alignSelf: "flex-start" }}>
              Welcome to Krisearch
            </Text>
            <Text
              style={{
                fontSize: 24,
                marginBottom: 20,
                alignSelf: "flex-start",
              }}
            >
              Lets start discovering Farmers
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 20 }}>
                <Button
                  title="Go to Home"
                  onPress={() => navigation.navigate("Home")}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Button
                  title="Go to Profile"
                  onPress={() => navigation.navigate("Profile")}
                />
              </View>
            </View>
          </View>
        ) : null}

        <View
          style={{
            backgroundColor: "#deebff",
            width: winWidth > 767 ? "70%" : "100%",
            height: "100%",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          {/* <Button
            title="Go to Home"
            onPress={() => navigation.navigate("Home")}
          />
          <Button title="Set Blur" onPress={() => setblur(!blur)} /> */}

          <View
            style={{
              marginBottom: 10,
              width: "100%",
              alignItems: "center",
              height: winHeight * 0.99,
            }}
          >
            <View
              style={{
                width: winWidth > 767 ? winWidth * 0.45 : winWidth * 0.9,
              }}
            >
              <ScrollHeader
                headerTap={() => {
                  setblur(!blur), setterm(""), setparent(false);
                }}
                headHolder={
                  placer && parent
                    ? term
                    : parent
                    ? term
                    : "Search for crops..."
                }
              />
            </View>

            <Text
              style={{
                marginTop: 10,
                padding: 5,
                fontWeight: "500",
                color: "#6F6F6F",
                fontSize: 18,
              }}
            >
              Showing results for {term}
            </Text>

            {/* <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: 5,
                  backgroundColor: "blue",
                }}
              >
                <Text>{val ? val : ""}</Text>
                <AntDesign
                  name="close"
                  size={20}
                  color="#fff"
                  onPress={() => setval("")}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>{addr ? addr : ""}</Text>
              </TouchableOpacity>
            </View> */}
            {placer ? (
              !parent ? (
                <View
                  style={{
                    width: winWidth > 767 ? "80%" : "90%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Text
                    style={{
                      marginTop: 60,
                      padding: 5,
                      fontWeight: "500",
                      color: "#6F6F6F",
                      fontSize: 20,
                    }}
                  >
                    {term}
                  </Text> */}
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        top: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#949cff",
                        height: 30,
                        padding: 3,
                        borderRadius: 5,
                        marginBottom: 20,
                        marginRight: 20,
                      }}
                      onPress={() => {
                        console.log("Biharma"),
                          sethideFAB(true),
                          onOpenfilter();
                      }}
                    >
                      <AntDesign name="filter" size={15} color="#3A48ED" />
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          marginLeft: 2,
                          color: "#fff",
                        }}
                      >
                        {" "}
                        Filter Results
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: val ? "#fff" : "#deebff",
                        padding: 5,
                        height: 30,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "#000" }}>{val ? val : null}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: addr ? "#fff" : "#deebff",
                        padding: 5,
                        height: 30,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ color: "#000" }}>
                        {addr ? addr : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      marginTop: 60,
                      padding: 5,
                      fontWeight: "500",
                      color: "#6F6F6F",
                    }}
                  >
                    {term}
                  </Text>
                </View>
              )
            ) : parent ? (
              <View>
                <Text
                  style={{
                    marginTop: 60,
                    padding: 5,
                    fontWeight: "500",
                    color: "#6F6F6F",
                  }}
                >
                  {term}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    marginTop: 60,
                    padding: 5,
                    fontWeight: "500",
                    color: "#6F6F6F",
                  }}
                >
                  {term}
                </Text>
                <TouchableOpacity
                  style={{
                    top: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#949cff",
                    height: 30,
                    padding: 3,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    console.log("Biharma"), sethideFAB(true), onOpenfilter();
                  }}
                >
                  <AntDesign name="filter" size={15} color="#3A48ED" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      marginLeft: 2,
                      color: "#fff",
                    }}
                  >
                    {" "}
                    Filter Results
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* {placer ? (
            <TouchableOpacity
              style={{ alignSelf: "flex-end", top: -23, width: 50, height: 20 }}
              onPress={() => {
                onOpenfilter();
              }}
            >
              Filter
            </TouchableOpacity>
          ) : null} */}
            <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#96c1ff",
              }}
            ></View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
              {parent ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: winWidth > 767 ? "flex-start" : "center",
                    padding: winWidth > 767 ? 10 : 2,
                  }}
                >
                  {filteredParents.map((item, cIndex) => {
                    return (
                      <Card
                        key={item.id}
                        name={item.name}
                        avatar={item.image}
                        isCrop={true}
                        onPress={() => {
                          setparent(!parent), setterm(item.name);
                        }}
                      />
                    );
                  })}
                </View>
              ) : filteractive ? (
                merge ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: winWidth > 767 ? "flex-start" : "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  >
                    {mergeResult.map((item, cIndex) => {
                      return (
                        <Card
                          key={item.id}
                          name={item.name}
                          avatar={item.avatar}
                          phone={item.phone}
                          address={item.address}
                          crop={item.crop}
                          onPress={() => {
                            setfarmer(item.id), onOpen(), sethideFAB(true);
                          }}
                          cropAvatar={item.image}
                        />
                      );
                    })}
                  </View>
                ) : val && !addr ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: winWidth > 767 ? "flex-start" : "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  >
                    {genderFilter.map((item, cIndex) => {
                      return (
                        <Card
                          key={item.id}
                          name={item.name}
                          avatar={item.avatar}
                          phone={item.phone}
                          address={item.address}
                          crop={item.crop}
                          onPress={() => {
                            setfarmer(item.id), onOpen(), sethideFAB(true);
                          }}
                          cropAvatar={item.image}
                        />
                      );
                    })}
                  </View>
                ) : !val && addr ? (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: winWidth > 767 ? "flex-start" : "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  >
                    {addrFilter.map((item, cIndex) => {
                      return (
                        <Card
                          key={item.id}
                          name={item.name}
                          avatar={item.avatar}
                          phone={item.phone}
                          address={item.address}
                          crop={item.crop}
                          onPress={() => {
                            setfarmer(item.id), onOpen();
                          }}
                          cropAvatar={item.image}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <Text>No Result Found</Text>
                )
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: winWidth > 767 ? "flex-start" : "center",
                    padding: winWidth > 767 ? 10 : 2,
                  }}
                >
                  {filteredFarmers.map((item, cIndex) => {
                    return (
                      <Card
                        key={item.id}
                        name={item.name}
                        avatar={item.avatar}
                        phone={item.phone}
                        address={item.address}
                        crop={item.crop}
                        onPress={() => {
                          setfarmer(item.id), onOpen(), sethideFAB(true);
                        }}
                        cropAvatar={item.image}
                      />
                    );
                  })}
                </View>
              )}
              <View
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: "transparent",
                  marginTop: 10,
                }}
              ></View>
            </ScrollView>
            <Modalize
              ref={modalizeRef}
              modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.95}
              modalStyle={
                winWidth > 767 ? { width: 500, alignSelf: "center" } : null
              }
              threshold={100}
              closeOnOverlayTap={true}
              mod
            >
              {filteredFarmers.map((item, cIndex) => {
                let kisan = farmer;
                if (kisan == item.id) {
                  return (
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

                          elevation: 11,
                        }}
                      >
                        {/* <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                        <Image source={item.avatar} style={{height:50, width:50}}/>
                   <Text>{farmer}</Text> */}
                        <TouchableOpacity
                          onPress={() => {
                            onClose(), sethideFAB(false);
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
                              onPress={() => {
                                onClose(), sethideFAB(false);
                              }}
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
                          <View
                            style={{
                              width: "40%",
                              height: "100%",
                              padding: 5,
                            }}
                          >
                            <Image
                              source={{ uri: item.avatar }}
                              style={{
                                height: 120,
                                width: 120,
                                borderRadius: 120,
                                borderColor: "#fff",
                                borderWidth: 2,
                              }}
                            />
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
                              <View style={{ flexDirection: "row" }}>
                                <Feather name="user" size={20} color="#fff" />
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#fff",
                                    fontWeight: "700",
                                    marginLeft: 5,
                                  }}
                                >
                                  {getSmallString(item.name)}
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Feather
                                  name="map-pin"
                                  size={20}
                                  color="#fff"
                                />
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#fff",
                                    fontWeight: "700",
                                    marginLeft: 5,
                                  }}
                                >
                                  {item.address}
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Feather name="user" size={20} color="#fff" />
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#fff",
                                    fontWeight: "700",
                                    marginLeft: 5,
                                  }}
                                >
                                  {hideNumber(item.phone)}
                                </Text>
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
                              <View
                                style={{
                                  flexDirection: "column",
                                  width: "50%",
                                }}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <Entypo
                                    name="leaf"
                                    size={20}
                                    color="#9F99FF"
                                  />
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
                                  {Data.map((cropName, cIndex) => {
                                    let a = cropName.name.toLowerCase();
                                    let b = item.crop?.toLowerCase();
                                    let result = a.localeCompare(b);

                                    if (a == b) {
                                      return (
                                        <View
                                          style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Image
                                            source={{ uri: cropName.image }}
                                            style={{
                                              height: 30,
                                              width: 30,
                                              borderWidth: 1,
                                              borderRadius: 30,
                                              borderColor: "#3ECF8E",
                                            }}
                                          />
                                          <Text
                                            style={{
                                              fontSize: 20,
                                              marginLeft: 5,
                                            }}
                                          >
                                            {cropName.name}
                                          </Text>
                                        </View>
                                      );
                                    } else {
                                      null;
                                    }
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
                                  <Text style={{ fontSize: 20, marginLeft: 5 }}>
                                    {item.harvestDate}
                                  </Text>
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
                              <View
                                style={{
                                  flexDirection: "column",
                                  width: "50%",
                                }}
                              >
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
                                <View>
                                  <Text style={{ fontSize: 20 }}>
                                    {item.area} Kattha
                                  </Text>
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
                                    {item.quantity} quintal
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
                                width: winWidth < 400 ? 90 : 120,
                                height: winWidth < 400 ? 30 : 50,
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
                              <FontAwesome5
                                name="whatsapp"
                                size={25}
                                color="#fff"
                              />
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
                                width: winWidth < 400 ? 90 : 120,
                                height: winWidth < 400 ? 30 : 50,
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
                                height: winWidth < 400 ? 30 : 50,
                                backgroundColor: "#fff",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                borderRadius: 10,
                                borderColor: "#A9A9A9",
                                borderWidth: 2,
                              }}
                              onPress={() =>
                                alert(
                                  "Support the farmer by any kind. Feature Coming Soon !"
                                )
                              }
                            >
                              <FontAwesome
                                name="handshake-o"
                                size={25}
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
                  );
                } else {
                  null;
                }
              })}
            </Modalize>

            <Modalize
              ref={modalizeFilterRef}
              modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.95}
              modalStyle={
                winWidth > 767 ? { width: 500, alignSelf: "center" } : null
              }
              threshold={100}
              closeOnOverlayTap={true}
              mod
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    padding: 5,
                    fontWeight: "500",
                    color: "#6F6F6F",
                    fontSize: 20,
                    marginLeft: 5,
                  }}
                >
                  Filter resuts here
                </Text>
                {/* <TouchableOpacity onPress={() => onCloseFilter()}>
                Close Filter
              </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={() => {
                    onCloseFilter(), sethideFAB(false);
                  }}
                  style={{
                    alignItems: "center",
                    marginTop: 5,
                    marginRight: 2,
                    padding: 5,
                    justifyContent: "center",
                    alignSelf: "flex-end",
                    backgroundColor: "#000",
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
                      onPress={() => {
                        onCloseFilter(), sethideFAB(false);
                      }}
                    />
                  </View>
                </TouchableOpacity>
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
                }}
              >
                By gender
              </Text>
              <View
                style={{
                  width: "60%",
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  padding: 5,

                  alignSelf: "flex-start",
                }}
              >
                {genderData.map((item) => {
                  return (
                    <View key={item.key} style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.circle}
                        onPress={() => {
                          setfilteractive(true);
                          setval(item.key);
                          // toggler(item.key);
                          // let a = item.text;
                          // let b = filteredFarmers.filter((i) => {
                          //   return i.gender.toLowerCase() === a.toLowerCase();
                          // });
                          // console.log(item.text);
                          // console.log(a);
                          // console.log(b);
                        }}
                      >
                        {val === item.key && (
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
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 5,
                    minWidth: "30%",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: 15 }}>
                    {addr ? addr : "All States"}
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
                              setfilteractive(true);
                              setaddr(item.name);
                              setaddrToggle(false);
                              // toggler(item.key);
                              // let a = item.text;
                              // let b = filteredFarmers.filter((i) => {
                              //   return i.gender.toLowerCase() === a.toLowerCase();
                              // });
                              // console.log(item.text);
                              // console.log(a);
                              // console.log(b);
                            }}
                          >
                            {addr === item.name && (
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
              </View>
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
                    width: 120,
                    height: 50,
                    backgroundColor: "#fff",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: 10,
                    borderColor: "#3A48ED",
                    borderWidth: 2,
                  }}
                  onPress={() => {
                    setmerge(false),
                      setfilteractive(false),
                      onCloseFilter(),
                      setval(""),
                      setaddr("");
                    sethideFAB(!hideFAB);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#3A48ED",
                    }}
                  >
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 50,
                    backgroundColor: "#3ECF8E",
                    alignItems: "center",
                    justifyContent: "center",

                    borderRadius: 10,
                    borderColor: "#3ECF8E",
                    borderWidth: 2,
                  }}
                  onPress={() => {
                    // !merge && filteractive ? setmerge(false) : setmerge(true);
                    (!val && addr && !merge) || (val && !addr && !merge)
                      ? setfilteractive(true)
                      : !val && !addr && merge
                      ? (setmerge(true), setfilteractive(false))
                      : setmerge(true);
                    onCloseFilter();
                    sethideFAB(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: "#fff",
                  marginTop: 10,
                }}
              ></View>
            </Modalize>
          </View>
        </View>
      </View>
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
                marginTop: 20,
                padding: 5,
                height: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  height: 55,
                  width: "97%",
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
                      width: "95%",
                      padding: 5,
                      fontSize: 20,
                    }
                  }
                  placeholder="Search for Crops"
                  value={term}
                  autoFocus={true}
                  editable={blur}
                  onChangeText={(text) => {
                    console.log(text), setterm(text), setSearch(text);
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {term ? (
                    <TouchableOpacity
                      onPress={() => {
                        setterm("");
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
                          right: -10,
                          backgroundColor: "#A1C7FF",
                          borderRadius: 25,
                        }}
                      >
                        <AntDesign name="close" size={20} color="#3A48ED" />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
                {/* <TouchableOpacity style={{width:"100%", height:30, alignItems:"center", justifyContent:"center", backgroundColor:"transparent"}} onPress={()=>{setplacer(true),setblur(!blur)}}>
<Text>{term}</Text>
</TouchableOpacity> */}
                {term !== null ? (
                  <View
                    style={{
                      width: "97%",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      margin: 5,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-start",
                        padding: 5,
                        marginBottom: 10,
                        marginTop: 5,
                      }}
                    >
                      {filteredCrops.length > 0 ? (
                        <Text
                          style={{
                            marginLeft: 20,
                            fontSize: 15,
                            fontWeight: "600",
                          }}
                        >
                          Available Crops
                        </Text>
                      ) : (
                        <Text
                          style={{
                            marginLeft: 20,
                            fontSize: 15,
                            fontWeight: "600",
                            alignSelf: "center",
                          }}
                        >
                          🤔 ....That seems to be missing...
                        </Text>
                      )}
                    </View>

                    {filteredCrops.map((item, cIndex) => {
                      return (
                        <View
                          style={{
                            width:
                              winWidth > 768 ? winWidth - 80 : winWidth - 50,
                            height: 45,
                            padding: 5,
                            borderRadius: 8,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#fff",
                            margin: 2,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              setplacer(true),
                                setblur(!blur),
                                setterm(item.name);
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: 35,
                                  width: 35,
                                  borderColor: "green",
                                  borderWidth: 1,
                                  borderRadius: 35,
                                }}
                              />
                              <Text style={{ fontSize: 20 }}> {item.name}</Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  alignSelf: "center",
                                  color: "#989898",
                                }}
                              >
                                {" "}
                                in{" "}
                              </Text>
                              <Text style={{ fontSize: 15 }}>{item.type}</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#3ECF8E",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: 5,
                              borderRadius: 5,
                              alignSelf: "flex-end",
                            }}
                            onPress={() => {
                              setparent(!parent),
                                setterm(item.type),
                                setplacer(!placer),
                                setblur(!blur);
                            }} //true
                          >
                            <Text style={{ fontSize: 15, color: "#fff" }}>
                              View {item.type}s
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>
          </BlurView>
        </View>
      ) : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deebff",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "flex-start",
    marginRight: 5,
    marginTop: 2,
  },

  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#3A48ED",
    alignItems: "center",
    justifyContent: "center",
  },

  checkedCircle: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: "#3A48ED",
  },
});
