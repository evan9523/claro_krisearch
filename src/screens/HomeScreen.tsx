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
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import hideNumber from "../utils/hideNumber";
import getSmallString from "../utils/getSmallString";

const Home = ({ navigation }) => {
  const [farmer, setfarmer] = useState(0);
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };

  const [isLoading, setLoading] = useState(true);
  const [sata, setSata] = useState([]);

  const cropper = "rice";

  const [crop, setcrop] = useState([]);
  const [farmers, setfarmers] = useState([]);
  const [modalName, setmodalName] = useState("");

  // useEffect(() => {
  //   fetch("http://staging.clarolabs.in:7050/b2bRequirement/fetch/crops", {
  //     method: "post",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: cropper,
  //     }),
  //   })
  //     .then((response) => console.log(response.json()))
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // }, []);
  console.log("REACHING HOME");
  // useEffect(() => {
  //   fetch("https://staging.clarolabs.in:7050/b2bRequirement/fetch/farmers", {
  //     method: "post",
  //     mode: "cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       gender: null,
  //       harvestDate: null,
  //       state: "Bihar",
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setfarmers(data.data.list))
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    fetch("https://maps.claroenergy.in/Ksearch/fetch/crops", {
      method: "post",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cropper,
      }),
    })
      .then((response) => console.log(response))
      // .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  console.log(crop);
  console.log(farmer);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 40,
          width: "100%",
          elevation: 1000,
        }}
      >
        <Header onTap={() => navigation.navigate("Search")} />
      </View>

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
            width: winWidth > 767 ? "100%" : "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Button
            title="GO to Search"
            onPress={() => navigation.navigate("Search")}
          /> */}
          {/* {winWidth < 767 ? (
            <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#346beb",
                padding: 7,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
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
              <TextInput
                style={{
                  width: "60%",
                  height: 40,
                  fontSize: 20,
                  backgroundColor: "#fff",
                  outlineColor: "#346beb",
                  borderRadius: 10,
                  padding: 5,
                }}
                placeholder="Search for Crops"
                onFocus={() => navigation.navigate("Search")}
              />
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#deebff",
                  borderRadius: 35,
                }}
              >
                <SimpleLineIcons name="magnifier" size={20} color="#346beb" />
              </View>
            </View>
          ) : null} */}

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: winWidth > 767 ? "center" : "center",
                padding: winWidth > 767 ? 10 : 2,
              }}
            >
              {farmers.map((item, cIndex) => {
                return (
                  <Card
                    key={item.id}
                    name={item.farmerName}
                    avatar={item.farmerImage}
                    phone={item.phone}
                    address={item.state}
                    crop={item.crops.cropName}
                    onPress={() => {
                      console.log(item.farmerName), setfarmer(item.id);
                      onOpen(), setmodalName(item.farmerName);
                    }}
                    cropAvatar={item.image}
                  />
                );
              })}
            </View>
            {winWidth < 767 ? (
              <View
                style={{
                  height: 60,
                  width: "100%",
                  backgroundColor: "transparent",
                  marginTop: 10,
                }}
              ></View>
            ) : null}
          </ScrollView>
        </View>
      </View>
      <Modalize
        ref={modalizeRef}
        modalHeight={winWidth > 767 ? winHeight : winHeight * 0.9}
        threshold={100}
        // modalStyle={{ position: "absolute", width: "100%", zIndex: 999 }}
        // modalStyle={
        //   winWidth > 767 ? { width: 500, alignSelf: "center" } : null
        // }
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
                  {/* <Text>{item.name}</Text>
                        <Text>{item.address}</Text>
                        <Image source={item.avatar} style={{height:50, width:50}}/>
                   <Text>{farmer}</Text> */}
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
                            {getSmallString(item.farmerName)}
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
                            {Crops.map((cropName, cIndex) => {
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
                              {item.crops.harvestDate}
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
                              {item.crops.quantity} quintal
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
                          height: winWidth < 400 ? 40 : 50,
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
  },
});
