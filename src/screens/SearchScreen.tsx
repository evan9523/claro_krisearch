import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
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
  ActivityIndicator,
  FlatList,
  ImageBackground,
} from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import Farmers from "../data/farmers.json";
import Data from "../data/items.json";
import { Modalize } from "react-native-modalize";
import hideNumber from "../utils/hideNumber";
import getSmallString from "../utils/getSmallString";
import { LinearGradient } from "expo-linear-gradient";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import States from "../data/states.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [dater, setdater] = useState(false);

  const setSearch = (text: string) => {
    let dynamic = text.toLowerCase();
    console.log("dynamic: " + dynamic);
  };

  const [crop, setcrop] = useState([]);
  const [farmers, setfarmers] = useState([]);
  const [modalName, setmodalName] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const cropper = "";

  function makestate() {}
  useEffect(() => {
    fetch("https://maps.claroenergy.in/Ksearch/fetch/farmers", {
      method: "post",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender: null,
        harvestDate: null,
        state: selectedState,
      }),
    })
      .then((response) => response.json())
      .then((data) => setfarmers(data.data.list))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://maps.claroenergy.in/Ksearch/fetch/crops", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cropper,
      }),
    })
      .then((response) => response.json())
      .then((data) => setcrop(data.data.list))
      .catch((error) => console.error(error));
  }, []);

  console.log(crop);
  console.log(farmers);

  const selectState = () => {
    States.map((item) => {
      console.log(item.name);
      farmers.map((i) => {
        console.log(i.state);
        if (
          item.name.toString().toLowerCase() ===
          i.state.toString().toLowerCase()
        ) {
          setselectedState(item.name);
        }
      });
    });
  };

  const renderFarmers = ({ item }) => (
    <Card
      key={item.id}
      name={getSmallString(item.farmerName)}
      avatar={item.farmerImage}
      phone={item.phone}
      address={item.state}
      crop={item.crops.map((i) => i.cropName)}
      onPress={() => {
        console.log(item.farmerName),
          setfarmer(item.id),
          console.log(item.crops.map((i) => i.quantity));
        onOpen(), setmodalName(item.farmerName);
      }}
    />
  );

  const filteredCrops = Data.filter((item) => {
    return item.name.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredParents = Data.filter((item) => {
    return item.type.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredFarmers = farmers.filter((item) => {
    let a = item.crops.map((i) => i.cropName);
    return a.toString().toLocaleLowerCase().includes(term.toLowerCase());
  });

  const genderFilter = filteredFarmers.filter((item) => {
    if (val) {
      return item.gender.toLocaleLowerCase() === val.toLowerCase();
    }
  });

  const addrFilter = filteredFarmers.filter((item) => {
    if (addr) {
      return item.state.toLocaleLowerCase() === addr.toLowerCase();
    }
  });

  // const harvestFilter = filteredFarmers.filter((item) => {
  //   if (startDate && endDate) {
  //     return (
  //       new Date(item.crops.map((i) => i.harvestDate)) >= startDate &&
  //       new Date(item.crops.map((i) => i.harvestDate)) <= endDate
  //     );
  //   }
  // });

  // const showHarvests = () => {
  //   console.log("Starting:" + startDate);
  //   console.log("Ending" + endDate);
  //   filteredFarmers.map((item) => {
  //     let dt = new Date(item.crops.map((i) => i.harvestDate));
  //     console.log(dt);
  //     if (dt >= startDate && dt <= endDate) {
  //       console.log("In Range" + dt);
  //     }
  //   });
  // };

  console.log(filteredFarmers);

  const applyFilterFinal = [genderFilter, addrFilter].flat();

  const modalizeRef = useRef<Modalize>(null);

  const modalizeFilterRef = useRef<Modalize>(null);

  console.log(genderFilter);

  const harvestResult = filteredFarmers.filter((item) => {
    let str = item.crops.map((i) => i.harvestDate).toString();
    console.log(str);
    var temp = new Array();
    temp = str.split("/");
    console.log(temp);
    let dt = new Date(temp[2], temp[1], temp[0]);
    console.log(dt);
    return dt >= startDate && dt <= endDate;
  });

  const mergeResult = filteredFarmers.filter((item) => {
    // if (val && addr) {
    // }
    // if (addr && !val) {
    //   return item.address.toLocaleLowerCase() === addr.toLowerCase();
    // }
    // if (val && !addr) {
    //   return item.gender.toLocaleLowerCase() === val.toLowerCase();
    // }
    let dt = new Date(item.crops.map((i) => i.harvestDate));

    return (
      item.gender.toLowerCase() === val.toLowerCase() &&
      item.state.toLowerCase() === addr.toLowerCase() &&
      dt >= startDate &&
      dt <= endDate
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
      key: "m",
      text: "Men",
    },
    {
      key: "f",
      text: "Women",
    },
  ];

  const renderItems = ({ item }) => (
    <View
      style={{
        height: 55,
        width: winWidth > 767 ? winWidth / 2.1 : winWidth * 0.95,
        padding: 2,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setplacer(true), setblur(!blur), setterm(item.name);
        }}
        style={{
          marginBottom: 2,
          width: "100%",
          backgroundColor: "#fff",
          height: "100%",
          padding: 5,
          borderRadius: 10,
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
          <TouchableOpacity
            onPress={() => {
              setparent(true),
                setterm(item.type),
                setplacer(true),
                setblur(!blur);
            }}
          >
            <Text style={{ fontSize: 15, color: "#346beb", marginLeft: 10 }}>
              {item.type}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

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
        <View
          style={{
            backgroundColor: "#deebff",
            width: "100%",
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
            <Header
              onTap={() => {
                setblur(true),
                  (filteredCrops.length = 0),
                  setparent(false),
                  setplacer(false);
                setterm("");
              }}
              onLogoTap={() => navigation.navigate("Home")}
              onFilter={() => onOpenfilter()}
            />

            {/* <View
              style={{
                width: winWidth > 767 ? winWidth * 0.45 : winWidth * 0.9,
                top: winWidth > 767 ? 25 : 0,
                flexDirection: "row",
              }}
            >
              {winWidth > 767 ? (
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 40,
                    backgroundColor: "#346beb",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    borderRadius: 10,
                  }}
                  onPress={() => navigation.navigate("Home")}
                >
                  <FontAwesome5 name="home" size={20} color="#fff" />
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                      marginLeft: 5,
                    }}
                  >
                    Go home
                  </Text>
                </TouchableOpacity>
              ) : null}
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
            </View> */}
            {/* 
            {term ? (
              <Text
                style={{
                  marginTop: 20,
                  padding: 5,
                  fontWeight: "500",
                  color: "#6F6F6F",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Showing results for {term}
              </Text>
            ) : (
              <Text
                style={{
                  marginTop: 20,
                  padding: 5,
                  fontWeight: "500",
                  color: "#6F6F6F",
                  fontSize: 18,
                }}
              >
                Showing all results
              </Text>
            )} */}

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
                    alignSelf: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#bfd8ff",
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
                      alignSelf: "center",
                      marginTop: winWidth > 767 ? 15 : 10,
                      alignItems: "flex-start",
                      marginLeft: winWidth > 767 ? -52 : -10,
                      justifyContent: "flex-start",

                      padding: 5,
                    }}
                  >
                    {/* <Button
                      title="GO Home"
                      onPress={() => navigation.navigate("Home")}
                    /> */}
                    {/* <TouchableOpacity
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
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: term ? "#3ECF8E" : "#deebff",
                        padding: 5,
                        height: 30,
                        width: 80,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "700" }}>
                        {term ? term : null}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: val ? "#fff" : "#deebff",
                        padding: 5,
                        height: 30,
                        width: 80,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: "#000" }}>
                        {val
                          ? val === "m"
                            ? "Men"
                            : val === "f"
                            ? "Women"
                            : "Other"
                          : null}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: addr ? "#fff" : "#deebff",
                        padding: 5,
                        height: 30,
                        width: 80,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: "#000" }}>
                        {addr ? addr : null}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: dater ? "#fff" : "#deebff",
                        padding: 5,
                        height: 30,

                        borderRadius: 20,
                      }}
                    >
                      <Text style={{ color: "#000" }}>
                        {dater
                          ? startDate.toDateString() +
                            " - " +
                            endDate.toDateString()
                          : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    height: 40,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 30,
                      backgroundColor: "#deebff",
                      top: winWidth > 767 ? "20%" : "10%",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        fontWeight: "500",
                        color: "#000",
                        alignSelf: "center",
                        fontSize: winWidth > 767 ? 20 : 15,
                        marginBottom: 10,
                      }}
                    >
                      Available {term}s
                    </Text>
                  </View>
                </View>
              )
            ) : null}
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

            <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
              {parent ? (
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",

                    alignItems: "flex-start",
                    justifyContent: "center",
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
                          setparent(false), setterm(item.name);
                        }}
                      />
                    );
                  })}
                </View>
              ) : filteractive ? (
                merge ? (
                  // <View
                  //   style={{
                  //     flexDirection: "row",
                  //     width: "100%",
                  //     flexWrap: "wrap",
                  //     alignItems: "flex-start",
                  //     justifyContent: winWidth > 767 ? "flex-start" : "center",
                  //     padding: winWidth > 767 ? 10 : 2,
                  //   }}
                  // >
                  //   {mergeResult.map((item, cIndex) => {
                  //     return (
                  //       <Card
                  //         key={item.id}
                  //         name={item.farmerName}
                  //         avatar={item.farmerImage}
                  //         phone={item.phone}
                  //         address={item.state}
                  //         crop={item.crops.map((i) => i.cropName)}
                  //         onPress={() => {
                  //           setfarmer(item.id), onOpen(), sethideFAB(true);
                  //         }}
                  //         cropAvatar={item.image}
                  //       />
                  //     );
                  //   })}
                  // </View>
                  <View
                    style={{
                      width: "100%",
                      height: winHeight * 0.89,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={mergeResult}
                      renderItem={renderFarmers}
                      ListEmptyComponent={() => (
                        <View style={styles.container}>
                          <Text style={{ fontSize: 30 }}>
                            {" "}
                            Oops ! Didnt find that
                          </Text>
                        </View>
                      )}
                      contentContainerStyle={{
                        flexDirection: "row",
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: winWidth > 767 ? "center" : "center",
                        padding: winWidth > 767 ? 10 : 2,
                      }}
                    />
                  </View>
                ) : val && !addr && !dater ? (
                  // <View
                  //   style={{
                  //     flexDirection: "row",
                  //     width: "100%",
                  //     flexWrap: "wrap",
                  //     alignItems: "flex-start",
                  //     justifyContent: winWidth > 767 ? "flex-start" : "center",
                  //     padding: winWidth > 767 ? 10 : 2,
                  //   }}
                  // >
                  //   {genderFilter.map((item, cIndex) => {
                  //     return (
                  //       <Card
                  //         key={item.id}
                  //         name={item.farmerName}
                  //         avatar={item.farmerImage}
                  //         phone={item.phone}
                  //         address={item.state}
                  //         crop={item.crops.map((i) => i.cropName)}
                  //         onPress={() => {
                  //           setfarmer(item.id), onOpen(), sethideFAB(true);
                  //         }}
                  //       />
                  //     );
                  //   })}
                  // </View>
                  <View
                    style={{
                      width: "100%",
                      height: winHeight * 0.89,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={genderFilter}
                      renderItem={renderFarmers}
                      ListEmptyComponent={() => (
                        <View style={styles.container}>
                          <Text style={{ fontSize: 30 }}>
                            {" "}
                            Oops ! Didnt find that
                          </Text>
                        </View>
                      )}
                      contentContainerStyle={{
                        flexDirection: "row",
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: winWidth > 767 ? "center" : "center",
                        padding: winWidth > 767 ? 10 : 2,
                      }}
                    />
                  </View>
                ) : !val && addr && !dater ? (
                  // <View
                  //   style={{
                  //     flexDirection: "row",
                  //     width: "100%",
                  //     flexWrap: "wrap",
                  //     alignItems: "flex-start",
                  //     justifyContent: winWidth > 767 ? "flex-start" : "center",
                  //     padding: winWidth > 767 ? 10 : 2,
                  //   }}
                  // >
                  //   {addrFilter.map((item, cIndex) => {
                  //     return (
                  //       <Card
                  //         key={item.id}
                  //         name={item.farmerName}
                  //         avatar={item.farmerImage}
                  //         phone={item.phone}
                  //         address={item.state}
                  //         crop={item.crops.map((i) => i.cropName)}
                  //         onPress={() => {
                  //           setfarmer(item.id), onOpen();
                  //         }}
                  //         cropAvatar={item.image}
                  //       />
                  //     );
                  //   })}
                  // </View>
                  <View
                    style={{
                      width: "100%",
                      height: winHeight * 0.89,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={addrFilter}
                      renderItem={renderFarmers}
                      ListEmptyComponent={() => (
                        <View style={styles.container}>
                          <Text style={{ fontSize: 30 }}>
                            {" "}
                            Oops ! Didnt find that
                          </Text>
                        </View>
                      )}
                      contentContainerStyle={{
                        flexDirection: "row",
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: winWidth > 767 ? "center" : "center",
                        padding: winWidth > 767 ? 10 : 2,
                      }}
                    />
                  </View>
                ) : !val && !addr && dater ? (
                  <View
                    style={{
                      width: "100%",
                      height: winHeight * 0.89,
                    }}
                  >
                    {" "}
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={harvestResult}
                      renderItem={renderFarmers}
                      ListEmptyComponent={() => (
                        <View style={styles.container}>
                          <Text style={{ fontSize: 30 }}>
                            {" "}
                            Oops ! Didnt find that
                          </Text>
                        </View>
                      )}
                      contentContainerStyle={{
                        flexDirection: "row",
                        width: "100%",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: winWidth > 767 ? "center" : "center",
                        padding: winWidth > 767 ? 10 : 2,
                      }}
                    />
                  </View>
                ) : (
                  <Text>No result found</Text>
                )
              ) : (
                // <View
                //   style={{
                //     flexDirection: "row",
                //     width: "100%",
                //     flexWrap: "wrap",
                //     alignItems: "flex-start",
                //     justifyContent: winWidth > 767 ? "flex-start" : "center",
                //     padding: winWidth > 767 ? 10 : 2,
                //   }}
                // >
                //   {filteredFarmers.map((item, cIndex) => {
                //     return (
                //       <Card
                //         key={item.id}
                //         name={item.name}
                //         avatar={item.avatar}
                //         phone={item.phone}
                //         address={item.address}
                //         crop={item.crop}
                //         onPress={() => {
                //           setfarmer(item.id), onOpen(), sethideFAB(true);
                //         }}
                //         cropAvatar={item.image}
                //       />
                //     );
                //   })}
                // </View>
                <View
                  style={{
                    width: "100%",
                    height: winHeight * 0.89,
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredFarmers}
                    renderItem={renderFarmers}
                    ListEmptyComponent={() => (
                      <View style={styles.container}>
                        <Text style={{ fontSize: 30 }}>
                          {" "}
                          Oops ! Didnt find that
                        </Text>
                      </View>
                    )}
                    contentContainerStyle={{
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: winWidth > 767 ? "center" : "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  />
                </View>
              )}
            </ScrollView>
            <Modalize
              ref={modalizeRef}
              modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
              modalStyle={
                winWidth > 767 ? { width: 500, alignSelf: "center" } : null
              }
              threshold={100}
              closeOnOverlayTap={true}
              mod
            >
              {farmers.map((item, cIndex) => {
                if (farmer == item.id) {
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
                              source={{ uri: item.farmerImage }}
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
                                  {getSmallString(item.farmerName)}
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
                                  {item.state}
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
                                  <View>
                                    <Text style={{ fontSize: 20 }}>
                                      {item.crops.map((i) => i.cropName)}
                                    </Text>
                                  </View>

                                  {/* {Data.map((cropName, cIndex) => {
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
                                  })} */}
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
                                  <Text style={{ fontSize: 20 }}>
                                    {item.crops.map((i) => i.harvestDate)}
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
                                    {item.land} Kattha
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
                                    {item.crops.map((i) => i.quantity) / 100} q
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
              modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
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
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: 5,
                  top: 5,
                }}
              >
                {/* <TouchableOpacity onPress={() => onCloseFilter()}>
                Close Filter
              </TouchableOpacity> */}
                <Text
                  style={{ fontSize: 16, marginLeft: 7, fontWeight: "600" }}
                >
                  Filter Results
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    width: "40%",
                    justifyContent:
                      (val && addr && !dater && !merge) ||
                      (!val && addr && dater && !merge) ||
                      (val && !addr && dater && !merge) ||
                      (!val && addr && !dater && !merge) ||
                      (!val && !addr && dater && !merge) ||
                      (val && !addr && !dater && !merge) ||
                      (!val && !addr && !dater && !merge)
                        ? "flex-end"
                        : "space-between",
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
                      setmerge(false),
                        setfilteractive(false),
                        onCloseFilter(),
                        setval(""),
                        setaddr("");
                      setdater(false);
                      setStartDate(new Date());
                      setEndDate(new Date());
                      sethideFAB(!hideFAB);
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
                  {(val && addr && !dater && !merge) ||
                  (!val && addr && dater && !merge) ||
                  (val && !addr && dater && !merge) ||
                  (!val && addr && !dater && !merge) ||
                  (!val && !addr && dater && !merge) ||
                  (val && !addr && !dater && !merge) ||
                  (!val && !addr && !dater && !merge) ? null : (
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
                        // !merge && filteractive ? setmerge(false) : setmerge(true);
                        // (!val && addr && !dater && !merge) ||
                        // (val && !addr && !dater && !merge) ||
                        // (!val && !addr && dater && !merge)
                        //   ? (setfilteractive(true), setmerge(false))
                        //   : !val && !addr && !dater && merge
                        //   ?
                        //   : setmerge(true);
                        // onCloseFilter();
                        // sethideFAB(false);
                        // setdater(true);
                        (!val && addr && !dater && !merge) ||
                        (val && !addr && !dater && !merge) ||
                        (!val && !addr && dater && !merge)
                          ? (setfilteractive(true), setmerge(false))
                          : (setfilteractive(false), setmerge(true));
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
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      onCloseFilter(), sethideFAB(false);
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
                        marginLeft: 10,
                      }}
                    >
                      <AntDesign name="close" size={20} color="#3A48ED" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

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
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
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
                        selected={endDate}
                        onChange={(date) => {
                          setEndDate(date),
                            setdater(true),
                            setfilteractive(true);
                        }}
                        customInput={
                          <TextInput
                            style={{
                              height: 35,
                              borderWidth: 2,
                              backgroundColor: "#d6d9ff",
                              borderRadius: 5,
                              borderColor: "#7b42ff",
                              padding: 5,
                              fontSize: 15,
                              width: 100,
                            }}
                          />
                        }
                      />
                    </View>
                  </View>

                  {/* <TouchableOpacity onPress={() => showHarvests()}>
                    This week
                  </TouchableOpacity>
                  <TouchableOpacity>This month</TouchableOpacity>
                  <TouchableOpacity>3 months from now</TouchableOpacity>
                  <TouchableOpacity>6 months from now</TouchableOpacity>
                  <TouchableOpacity>1 year from now</TouchableOpacity> */}
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
              >
                {/* <TouchableOpacity
                  style={{
                    width: 80,
                    height: 40,
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
                    setdater(!dater);
                    sethideFAB(!hideFAB);
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
                </TouchableOpacity> */}
                {/* <TouchableOpacity
                  style={{
                    width: 80,
                    height: 40,
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
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Apply
                  </Text>
                </TouchableOpacity> */}
              </View>
              {/* <View
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: "#fff",
                  marginTop: 10,
                }}
              ></View> */}
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
                  onFocus={() => setplacer(false)}
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
                  {/* {term ? (
                    <TouchableOpacity
                      onPress={() => {
                        setterm("");
                      }}
                    >
                      <View
                        style={{
                          width: 50,
                          height: 35,
                          borderWidth: 2,
                          borderColor: "#3d3f40",
                          alignItems: "center",
                          alignSelf: "flex-end",
                          justifyContent: "center",
                          marginRight: 5,
                          backgroundColor: "#3d3f40",
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ fontSize: 15, color: "#fff" }}>
                          Clear
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null} */}
                </View>
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
              <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
                {/* <TouchableOpacity style={{width:"100%", height:30, alignItems:"center", justifyContent:"center", backgroundColor:"transparent"}} onPress={()=>{setplacer(true),setblur(!blur)}}>
<Text>{term}</Text>
</TouchableOpacity> */}
                {term !== "" ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filteredCrops}
                    renderItem={renderItems}
                    ListEmptyComponent={() => (
                      <View style={styles.container}>
                        <Text style={{ fontSize: 30 }}>
                          {" "}
                          Oops ! Didnt find that
                        </Text>
                      </View>
                    )}
                    contentContainerStyle={{
                      // flexDirection: "row",
                      // width: "100%",
                      // flexWrap: "wrap",
                      // alignItems: "center",
                      // justifyContent:
                      //   winWidth > 767 ? "center" : "center",
                      // padding: winWidth > 767 ? 10 : 2,
                      width: "100%",
                    }}
                  />
                ) : // <View
                //   style={{
                //     width: winWidth > 767 ? "50%" : "97%",
                //     alignItems: "center",
                //     backgroundColor: "#fff",
                //     borderRadius: 10,
                //     margin: 5,
                //   }}
                // >
                //   <View
                //     style={{
                //       width: "100%",
                //       alignItems: "flex-start",
                //       padding: 10,
                //       marginBottom: 10,
                //       marginTop: 5,
                //     }}
                //   >
                //     {filteredCrops.length > 0 ? (
                //       <Text
                //         style={{
                //           marginLeft: 20,
                //           fontSize: 15,
                //           fontWeight: "600",
                //         }}
                //       >
                //         Available Crops
                //       </Text>
                //     ) : (
                //       <Text
                //         style={{
                //           marginLeft: 20,
                //           fontSize: 15,
                //           fontWeight: "600",
                //           alignSelf: "center",
                //         }}
                //       >
                //         🤔 ....That seems to be missing...
                //       </Text>
                //     )}
                //   </View>

                //   <View
                //     style={{
                //       width: "100%",
                //       height: winHeight * 0.5,
                //     }}
                //   >
                //     <FlatList
                //       showsVerticalScrollIndicator={false}
                //       data={filteredCrops}
                //       renderItem={renderItems}
                //       ListEmptyComponent={() => (
                //         <View style={styles.container}>
                //           <Text style={{ fontSize: 30 }}>
                //             {" "}
                //             Oops ! Didnt find that
                //           </Text>
                //         </View>
                //       )}
                //       contentContainerStyle={{
                //         // flexDirection: "row",
                //         // width: "100%",
                //         // flexWrap: "wrap",
                //         // alignItems: "center",
                //         // justifyContent:
                //         //   winWidth > 767 ? "center" : "center",
                //         // padding: winWidth > 767 ? 10 : 2,
                //         width: "100%",
                //       }}
                //     />
                //   </View>

                //   {/*
                //   {filteredCrops.map((item, cIndex) => {
                //     return (
                //       <View
                //         style={{
                //           width:
                //             winWidth > 768 ? winWidth - 80 : winWidth - 50,
                //           height: 45,
                //           padding: 5,
                //           borderRadius: 8,
                //           flexDirection: "row",
                //           alignItems: "center",
                //           justifyContent: "space-between",
                //           backgroundColor: "#fff",
                //           margin: 2,
                //         }}
                //       >
                //         <TouchableOpacity
                //           onPress={() => {
                //             setplacer(true),
                //               setblur(!blur),
                //               setterm(item.name);
                //           }}
                //         >
                //           <View
                //             style={{
                //               flexDirection: "row",
                //               alignItems: "center",
                //             }}
                //           >
                //             <Image
                //               source={{ uri: item.image }}
                //               style={{
                //                 height: 35,
                //                 width: 35,
                //                 borderColor: "green",
                //                 borderWidth: 1,
                //                 borderRadius: 35,
                //               }}
                //             />
                //             <Text style={{ fontSize: 20 }}> {item.name}</Text>
                //             <Text
                //               style={{
                //                 fontSize: 15,
                //                 alignSelf: "center",
                //                 color: "#989898",
                //               }}
                //             >
                //               {" "}
                //               in{" "}
                //             </Text>
                //             <Text style={{ fontSize: 15 }}>{item.type}</Text>
                //           </View>
                //         </TouchableOpacity>
                //         <TouchableOpacity
                //           style={{
                //             backgroundColor: "#3ECF8E",
                //             height: "100%",
                //             alignItems: "center",
                //             justifyContent: "center",
                //             padding: 5,
                //             borderRadius: 5,
                //             alignSelf: "flex-end",
                //           }}
                //           onPress={() => {
                //             setparent(!parent),
                //               setterm(item.type),
                //               setplacer(!placer),
                //               setblur(!blur);
                //           }} //true
                //         >
                //           <Text style={{ fontSize: 15, color: "#fff" }}>
                //             View {item.type}s
                //           </Text>
                //         </TouchableOpacity>
                //       </View>
                //     );
                //   })} */}
                // </View>
                null}

                <TouchableOpacity
                  style={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: "transparent",
                  }}
                  onPress={() => navigation.navigate("Home")}
                ></TouchableOpacity>
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
    height: 15,
    width: 15,
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
