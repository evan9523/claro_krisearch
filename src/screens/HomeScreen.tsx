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
} from "react-native";
import Header, { HeaderProps } from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import Farmers from "../data/farmers.json";
import Crops from "../data/items.json";
import { Modalize } from "react-native-modalize";
import Card from "../components/Card";
import { TextInput } from "react-native-gesture-handler";
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

const Home = ({ navigation }) => {
  const [farmer, setfarmer] = useState(0);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
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

  const [isLoading, setLoading] = useState(true);
  const [sata, setSata] = useState([]);

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
  const [addr, setaddr] = useState("");
  const [parenter, setparenter] = useState("");
  const [term, setterm] = useState("");
  const [filteractive, setfilteractive] = useState(false);
  const [addrToggle, setaddrToggle] = useState(false);
  const [cropToggle, setcropToggle] = useState(false);
  const [merge, setmerge] = useState(false);
  const [dater, setdater] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setshow] = useState("");
  const [applied, setapplied] = useState(false);

  console.log("REACHING HOME");
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../../assets/wheat.json"),
    });
  });

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
        farmerData: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => setcrop(data.data.list))
      .catch((error) => console.error(error));
  }, []);

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
      .then((data) => {
        setdispfarmers(data.data.list.slice(0, firstScroll + 21));
      })
      .catch((error) => console.error(error));
  }, [firstScroll]);

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

  const selectCrop = () => {};

  const handleLoad = () => {
    setfirstScroll(firstScroll + 21);
  };

  const renderMatch = ({ item }) => (
    <View
      style={{
        height: 55,
        width: winWidth > 767 ? winWidth * 0.49 : winWidth * 0.95,
        padding: 2,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setplacer(true), setblur(!blur), setterm(item.name);
          setapplied(true);
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
          {Data.map((i) =>
            i.name.toLowerCase() === item.name.toLowerCase() ? (
              <Image
                source={{ uri: i.image }}
                style={{
                  height: 35,
                  width: 35,
                  borderColor: "green",
                  borderWidth: 1,
                  borderRadius: 35,
                }}
              />
            ) : null
          )}

          <Text style={{ fontSize: 20 }}> {item.name}</Text>
          {item.type !== "0" || "" ? (
            <Text
              style={{
                fontSize: 15,
                alignSelf: "center",
                color: "#989898",
                margin: 5,
              }}
            >
              in
            </Text>
          ) : null}
          {item.type !== "0" || "" ? (
            <TouchableOpacity
              onPress={() => {
                setparent(true),
                  setterm(item.type),
                  setplacer(true),
                  setapplied(false);
                setblur(!blur);
              }}
            >
              <Text style={{ fontSize: 15, color: "#346beb", marginLeft: 0 }}>
                {item.type}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItems = ({ item }) => (
    <Card
      key={item.id}
      name={item.farmerName}
      avatar={item.farmerImage}
      phone={item.phone}
      address={item.state}
      crop={item.crops.map((i) => i.cropName).slice(0, 1)}
      onPress={() => {
        console.log(item.farmerName),
          setfarmer(item.id),
          console.log(item.crops.map((i) => i.quantity));
        onOpen(), setmodalName(item.farmerName);
      }}
    />
  );

  const toTitleCase = (phrase: string) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const showFilter = [val, addr, dater];

  const bgdata = crop.filter((item) => {
    console.log(item.farmers);
  });

  console.log(bgdata);
  const filteredCrops = Data.filter((item) => {
    return item.name.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredParents = crop.filter((item) => {
    return item.type.toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredFarmers = farmers.filter((item) => {
    let a = item.crops.map((i) => i.cropName);
    return a.toString().toLocaleLowerCase().includes(term.toLowerCase());
  });

  const filteredBlur = crop.filter((item) => {
    return item.name.toLocaleLowerCase().includes(show.toLowerCase());
  });

  const suggestions = filteredBlur.filter((item) => {
    console.log(item.id, item.name);
    if (item.id == 548 || item.id == 5918 || item.id == 47 || item.id == 4807) {
      return item;
    }
  });

  const suggested = [];
  const showSugg = () => {
    for (let i = 0; i <= 3; i++) {
      filteredBlur.map((item) => {
        suggested.push(item.name);
      });
    }
  };

  const genderFilter = filteredFarmers.filter((item) => {
    if (val) {
      return item.gender.toLocaleLowerCase() === val.toLowerCase();
    }
  });

  const parentFilter = farmers.filter((item) => {
    let a = item.crops.map((i) => i.cropType);
    return a.toString().toLocaleLowerCase() === parenter.toLowerCase();
  });

  // const addrFilter = crop.filter((item) => {
  //   console.log(item.farmers);
  //   let resultaddr = item.farmers.map((i) => {
  //     console.log(i.state);
  //     if (addr) {
  //       return i.state.toLocaleLowerCase() === addr.toLowerCase();
  //     }
  //   });
  //   // if (addr) {
  //   //   return item.state.toLocaleLowerCase() === addr.toLowerCase();
  //   // }
  // });

  const addrFilter = filteredFarmers.filter((item) => {
    if (addr) {
      return item.state.toLocaleLowerCase() === addr.toLowerCase();
    }
  });

  const harvestResultmulti = filteredFarmers.filter((item) => {
    let str = item.crops.map((i) => i.harvestDate).toString();
    console.log(str);
    var temp = new Array();
    temp = str.split("/");
    console.log(temp);
    let dt = new Date(temp[2], parseInt(temp[1]) - 1, temp[0]);
    console.log(dt);
    if (
      item.gender.toLowerCase() === val.toLowerCase() &&
      item.state.toLowerCase() === addr.toLowerCase()
    )
      return dt >= startDate && dt <= endDate;
  });

  const harvestResultaddr = filteredFarmers.filter((item) => {
    let str = item.crops.map((i) => i.harvestDate).toString();
    console.log(str);
    var temp = new Array();
    temp = str.split("/");
    console.log(temp);
    let dt = new Date(temp[2], parseInt(temp[1]) - 1, temp[0]);
    console.log(dt);
    if (item.state.toLowerCase() === addr.toLowerCase())
      return dt >= startDate && dt <= endDate;
  });

  const harvestResultval = filteredFarmers.filter((item) => {
    let str = item.crops.map((i) => i.harvestDate).toString();
    console.log(str);
    var temp = new Array();
    temp = str.split("/");
    console.log(temp);
    let dt = new Date(temp[2], parseInt(temp[1]) - 1, temp[0]);
    console.log(dt);
    if (item.gender.toLowerCase() === val.toLowerCase())
      return dt >= startDate && dt <= endDate;
  });

  const multiTo = filteredFarmers.filter((item) => {
    let str = item.crops.map((i) => i.harvestDate).toString();
    console.log(str);
    var temp = new Array();
    temp = str.split("/");
    console.log(temp);
    let dt = new Date(temp[2], parseInt(temp[1]) - 1, temp[0]);
    console.log(dt);
    console.log(startDate);
    if (applied) {
      if (val && addr === "") {
        return item.gender.toLowerCase() === val.toLowerCase();
      }
      if (addr && val === "") {
        return item.state.toLowerCase() === addr.toLowerCase();
      }
      if (dater && addr === "" && val === "") {
        return dt >= startDate && dt <= endDate;
      }
      if (val && addr) {
        return (
          item.gender.toLowerCase() === val.toLowerCase() &&
          item.state.toLowerCase() === addr.toLowerCase()
        );
      }
      if (val && dater) {
        return (
          item.gender.toLowerCase() === val.toLowerCase() &&
          dt >= startDate &&
          dt <= endDate
        );
      }

      if (addr && dater) {
        return dt > startDate && dt < endDate
          ? item.state.toLowerCase() === addr.toLowerCase()
          : null;
      }
      if (val && addr && dater) {
        return (
          item.gender.toLowerCase() === val.toLowerCase() &&
          item.state.toLowerCase() === addr.toLowerCase() &&
          dt > startDate &&
          dt < endDate
        );
      } else {
        return filteredFarmers;
      }
    }
  });

  const modalizeFilterRef = useRef<Modalize>(null);
  const onOpenfilter = () => {
    modalizeFilterRef.current?.open();
  };

  const onCloseFilter = () => {
    modalizeFilterRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: winWidth > 767 ? "row" : "column",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#f2f7ff",
            width: winWidth > 767 ? "100%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Header
            onTap={() => {
              setblur(true), setshow("");
            }}
            onLogoTap={() => {
              // setfilteractive(false), setterm("");
              console.log("hello");
            }}
            onFilter={() => onOpenfilter()}
          />

          {!parent ? (
            <View
              style={{
                width: winWidth > 767 ? "93.5%" : "96%",

                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#bfd8ff",

                padding: 5,
              }}
            >
              <View style={{ marginRight: 10 }}>
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
                  onPress={() => {
                    onOpenfilter();
                  }}
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

              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  marginLeft: 10,
                }}
                showsHorizontalScrollIndicator={false}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    alignSelf: "center",

                    alignItems: "flex-start",

                    justifyContent: "flex-start",

                    padding: 5,
                  }}
                >
                  {!applied ||
                  (val === "" &&
                    addr === "" &&
                    dater === false &&
                    term === "") ||
                  term === null ? (
                    <View
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: "#fff",
                        padding: 5,
                        height: 30,
                        width: 50,
                        borderRadius: 20,
                        justifyContent: "center",
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#346beb",
                      }}
                    >
                      <Text style={{ color: "#000" }}>All</Text>
                    </View>
                  ) : (
                    <View style={{ marginRight: 10 }}>
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
                          borderWidth: 2,
                          borderColor: "#3A48ED",
                        }}
                        onPress={() => {
                          setfilteractive(false);
                          setapplied(false);
                          setval("");
                          setaddr("");
                          setdater(false);
                          setterm("");
                        }}
                      >
                        <MaterialIcons
                          name="clear-all"
                          size={15}
                          color="#3A48ED"
                        />
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
                    </View>
                  )}
                  {term ? (
                    <View
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: term ? "#87edbf" : "#deebff",
                        padding: 5,
                        height: 30,

                        borderRadius: 20,
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
                        {term ? term : null}
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
                        onPress={() => setterm("")}
                      />
                    </View>
                  ) : null}

                  {val && applied ? (
                    <View
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
                        {val
                          ? val === "m"
                            ? "Men"
                            : val === "f"
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
                        onPress={() => setval("")}
                      />
                    </View>
                  ) : null}
                  {addr && applied ? (
                    <View
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: addr ? "#fff" : "#deebff",
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
                        {addr ? addr : null}
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
                        onPress={() => setaddr("")}
                      />
                    </View>
                  ) : null}

                  {dater && applied ? (
                    <View
                      style={{
                        alignItems: "center",
                        marginRight: 5,
                        backgroundColor: dater && applied ? "#fff" : "#deebff",
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
                        {dater && applied
                          ? startDate.toDateString() +
                            " - " +
                            endDate.toDateString()
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
                        onPress={() => setdater(false)}
                      />
                    </View>
                  ) : null}
                </View>
              </ScrollView>
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
                  backgroundColor: "#f2f7ff",
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
                  Available {term.split("s")}s
                </Text>
              </View>
            </View>
          )}
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
                  return Data.map((i) =>
                    i.name === item.name ? (
                      <Card
                        key={item.id}
                        name={item.name}
                        avatar={i.image}
                        isCrop={true}
                        onPress={() => {
                          setparent(false), setterm(item.name);
                          setapplied(true);
                        }}
                      />
                    ) : null
                  );
                })}
              </View>
            ) : filteractive ? (
              dater && addr && val === "" && applied ? (
                <View
                  style={{
                    width: "100%",
                    height: winHeight * 0.89,
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={harvestResultaddr}
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
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  />
                </View>
              ) : dater && addr === "" && val && applied ? (
                <View
                  style={{
                    width: "100%",
                    height: winHeight * 0.89,
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={harvestResultval}
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
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  />
                </View>
              ) : dater && addr && val && applied ? (
                <View
                  style={{
                    width: "100%",
                    height: winHeight * 0.89,
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={harvestResultmulti}
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
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    height: winHeight * 0.89,
                  }}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={multiTo}
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
                      flexDirection: "row",
                      width: "100%",
                      flexWrap: "wrap",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      padding: winWidth > 767 ? 10 : 2,
                    }}
                  />
                </View>
              )
            ) : (
              <View
                style={{
                  width: "100%",
                  height: winHeight * 0.89,
                }}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={filteredFarmers}
                  renderItem={renderItems}
                  onEndReached={handleLoad}
                  ListEmptyComponent={() =>
                    term && dispfarmers.length == 0 ? (
                      <View style={styles.container}>
                        <Text style={{ fontSize: 30 }}>
                          {" "}
                          Oops ! Didnt find that
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.container} ref={container} />
                    )
                  }
                  contentContainerStyle={{
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: winWidth > 767 ? 10 : 2,
                  }}
                />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <Modalize
        ref={modalizeRef}
        modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.88}
        threshold={100}
        modalStyle={winWidth > 767 ? { width: 400, alignSelf: "center" } : null}
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

                    elevation: 9,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => onClose()}
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
                        onPress={() => onClose()}
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
                            {toTitleCase(item.farmerName)}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Feather name="map-pin" size={20} color="#fff" />
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
                            <Text style={{ fontSize: 20 }}>
                              {item.crops.map((i) => i.cropName).slice(0, 1)}
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
                              {item.crops.map((i) => i.harvestDate).slice(0, 1)}
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
                              {item.crops.map((i) => i.quantity).slice(0, 1) /
                                100}{" "}
                              q
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
            );
          } else {
            null;
          }
        })}
      </Modalize>
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
                setmerge(false),
                  setfilteractive(false),
                  onCloseFilter(),
                  setval(""),
                  setaddr("");
                setparenter("");
                setdater(false);
                setStartDate(new Date());
                setapplied(false);
                setEndDate(new Date());
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
                setfilteractive(true), onCloseFilter(), setapplied(true);
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
                    setval(item.key);
                    setapplied(false);
                  }}
                >
                  {val === item.key && <View style={styles.checkedCircle} />}
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
            <Text style={{ fontSize: 15 }}>{addr ? addr : "All States"}</Text>
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
                        setaddr(item.name);
                        setaddrToggle(false);
                        setapplied(false);
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
                  popperPlacement="bottom-right"
                  selected={dater ? endDate : null}
                  onChange={(date) => {
                    setEndDate(date), setdater(true), setapplied(false);
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
                  autoFocus={true}
                  editable={blur}
                  onChangeText={(text) => {
                    console.log(text), setshow(text);
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
                  <View
                    style={{
                      width: winWidth > 767 ? winWidth * 0.49 : winWidth * 0.95,
                      marginTop: 5,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      padding: 5,
                    }}
                  >
                    <Text style={{ fontSize: 18, margin: 15 }}>Suggested </Text>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={suggestions}
                      renderItem={renderMatch}
                      contentContainerStyle={{
                        width: "100%",
                      }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: "transparent",
                  }}
                  onPress={() => setblur(false)}
                ></TouchableOpacity>
              </View>
            </View>
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
    backgroundColor: "#f2f7ff",
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
