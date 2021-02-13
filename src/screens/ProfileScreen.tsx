import { StatusBar } from "expo-status-bar";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import firebase from "../firebase/firebase";
import { firestore } from "firebase";
import * as Location from "expo-location";
import { Modalize } from "react-native-modalize";
import * as ImagePicker from "expo-image-picker";
import S3FileUpload from "react-s3";
import { uploadFile } from "react-s3";

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
import DynamicForm from "../components/dynamicForm";
import DynForm from "../components/DynForm";
import { env } from "../env";

const Profile = ({ navigation }) => {
  const config = {
    bucketName: "claro-farmers",

    region: "ap-south-1",
    accessKeyId: env.accessKeyId,
    secretAccessKey: env.secretAccessKey,
  };

  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClose = () => {
    modalizeRef.current?.close();
  };
  const [crop, setcrop] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [qty, setqty] = useState("");
  const [hdate, sethdate] = useState([]);
  const [tempCrop, settempCrop] = useState("");
  const [tempfirstName, settempfirstName] = useState("");
  const [tempqty, settempqty] = useState("");
  const [tempArea, settempArea] = useState("");
  const [tempfa, settempfa] = useState(0);
  const [farmarea, setfarmarea] = useState(0);
  const [temphDate, settemphDate] = useState("");
  const [area, setarea] = useState("");
  const [details, setdetails] = useState([]);
  const [image, setimage] = useState("");
  const [tempImage, settempImage] = useState("");
  const [modData, setmodData] = useState(false);
  const [block, setblock] = useState("");
  const [irState, setirState] = useState("");
  const [mainCrop, setmainCrop] = useState([]);
  const [confirmCrops, setconfirmCrops] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [filteredBlur, setfilteredBlur] = useState([]);

  useEffect(() => {
    firebase
      .auth()
      .currentUser?.getIdToken()
      .then(function (idtoken) {
        console.log(idtoken);
        fetch("http://staging.clarolabs.in:7050/Ksearch/farmer/get", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authToken: idtoken,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data.data.farmer);
            console.log(data.data.farmer);
            setfirstName(data.data.farmer.name);
            setblock(data.data.farmer.block);
            setirState(data.data.farmer.state);
            setimage(data.data.farmer.farmerImage);
            setfarmarea(data.data.farmer.totalLandSize);
            setInputFields(data.data.crops);
            setmainCrop(data.data.crops);
            console.log(data.data.crops);
          })
          .catch((err) => console.log(err));
      });
  }, []);

  // var docRef = firestore()
  //   .collection("users")
  //   .doc(firebase.auth().currentUser?.uid);
  // docRef.get().then(function (doc) {
  //   if (doc.exists) {
  //     console.log("DocData:", doc.data());
  //     // console.log(doc.data().crop);
  //     setcrop(doc.data().crop);
  //     // console.log(doc.data().firstName);
  //     setfirstName(doc.data().firstName);
  //     // console.log(doc.data().quantity);
  //     setqty(doc.data().quantity);
  //     // console.log(doc.data().harvestDate);
  //     sethdate(doc.data().harvestDate);
  //   } else {
  //     console.log("No such document!");
  //   }
  // });

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

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
  } else if (location) {
    console.log(location);
    text = JSON.stringify(location);
    console.log(text);
  }
  // const getLocation = () => {};
  // const handleEdit = () => {
  //   console.log(firstName);
  //   console.log(tempfirstName);
  //   setfirstName(tempfirstName);
  //   setcrop(tempCrop);
  //   firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(firebase.auth().currentUser?.uid)
  //     .set({
  //       firstName: tempfirstName,
  //       location: text,
  //       crop: crop,
  //       quantity: qty,
  //       harvestDate: hdate,
  //       area: tempArea,
  //     })
  //     .then(function () {
  //       console.log("Updated Successfully");
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });

  //   console.log(crop);
  //   console.log(qty);
  //   console.log(hdate);
  // };
  console.log(firstName);
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const editImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);

    if (!result.cancelled) {
      settempImage(result.uri);
    }
  };
  // const editImage = () => {
  //   console.log("Clicked Edit");
  //   useEffect(() => {
  //     (async () => {
  //       if (Platform.OS !== "web") {
  //         const {
  //           status,
  //         } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //         if (status !== "granted") {
  //           alert("Sorry, we need camera roll permissions to make this work!");
  //         }
  //       }
  //     })();
  //   }, []);

  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     settempImage(result.uri);
  //   }
  // };

  const [inputFields, setInputFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);

  const [url, seturl] = useState("");

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data.location), seturl(data.location);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputFields", inputFields);
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

  //   const handleAddFields = () => {
  //     const values = [...inputFields];
  //     values.push({ firstName: "", lastName: "" });
  //     setInputFields(values);
  //   };

  //   const handleRemoveFields = (index) => {
  //     const values = [...inputFields];
  //     values.splice(index, 1);
  //     setInputFields(values);
  //   };

  //   const handleInputChange = (index, event) => {
  //     const values = [...inputFields];
  //     if (event.target.name === "firstName") {
  //       values[index].firstName = event.target.value;
  //     } else {
  //       values[index].lastName = event.target.value;
  //     }

  //     setInputFields(values);
  //   };

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
      .then((data) => setfilteredBlur(data.data.list));
  }, []);

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

  const renderItems = ({ item }) => {
    return (
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
          <Image
            source={{
              uri:
                "https://www.jaipuriaschoolballia.in/wp-content/uploads/2016/11/blank-img.jpg",
            }}
            style={{
              height: 45,
              width: 45,
              marginRight: 5,
              borderRadius: "50%",
              borderColor: "green",
            }}
          />
          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={{ fontSize: 16 }}>{item.estimatedYield} Quintal</Text>
        </View>
        <Text style={{ fontSize: 16 }}>{item.harvestingTime}</Text>
      </View>
    );
  };

  const dummyCrops = [
    {
      name: "Rice",
      harvestingTime: "12/01/2022",
      estimatedYield: 9,
    },
    {
      name: "Baley",
      harvestingTime: "14/02/2021",
      estimatedYield: 5,
    },
  ];
  function updateData() {
    console.log("FirstName", firstName);
    console.log(tempfirstName);
    var updatedName = tempfirstName;

    console.log(firstName);
    console.log(tempfa);
    console.log(inputFields);
    setmainCrop(inputFields);

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
              name: tempfirstName == "" || null ? firstName : updatedName,
              farmerImage: url,

              contactNo: "+11230981231",
              village: "Paikpara",
              block: "Shyampur",
              district: "South 24 Pgs",
              state: "West Bengal",
              totalLandSize: tempfa == 0 || null ? farmarea : tempfa,
              totalLandSizeUnit: "Kattha",
              latitude: 22,
              longitude: 88,
            },
          }),
        })
          .then(() => console.log("Successful"))
          .catch((err) => console.log(err));
      });
  }
  return (
    <View>
      <ScrollView>
        <View style={{ width: "100%", elevation: 1000 }}>
          <Header onTap={() => navigation.navigate("Home")} />
        </View>

        <View
          style={{
            backgroundColor: "#deebff",
            width: "100%",
            height: winHeight,
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {/* <Button title="Share Location" onPress={() => getLocation()} /> */}
          <View
            style={{ backgroundColor: "#346beb", width: "100%", height: "20%" }}
          ></View>
          <View
            style={{
              width: winWidth < 768 ? "90%" : "35%",

              margin: 10,
              marginTop: -100,
              padding: 5,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#fff",
              zIndex: 999,
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
            <View
              style={{
                width: "100%",
                height: 100,
                borderBottomWidth: 2,
                borderBottomColor: "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",

                borderRadius: 10,
              }}
            >
              <Image
                source={{
                  uri: image,
                }}
                style={{
                  height: 95,
                  width: 95,
                  marginBottom: 3,
                  borderColor: "#fff",
                  borderWidth: 1,
                  borderRadius: 95,
                }}
              />
              <View
                style={{
                  height: 100,
                  flexDirection: "column",
                  width: winWidth > 768 ? "70%" : "70%",
                  alignItems: "center",
                  justifyContent: "center",

                  marginBottom: 3,
                }}
              >
                {/* {details.map((i) => {
                return (
                  <Text
                    style={{
                      fontSize: 18,

                      fontWeight: "600",
                      marginBottom: 5,
                    }}
                  >
                    {i.name}
                  </Text>
                );
              })} */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",

                    justifyContent: "flex-end",
                    width: "90%",
                  }}
                >
                  <Feather
                    name="user"
                    size={20}
                    color="#000"
                    style={{ marginTop: -2, marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 18,

                      fontWeight: "600",
                    }}
                  >
                    {firstName}
                  </Text>
                </View>

                {/* <Text
                style={{
                  fontSize: 18,

                  marginBottom: 5,
                }}
              >
                {area}
              </Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "90%",
                  }}
                >
                  {firebase.auth().currentUser == null ? (
                    <Text>Not Found</Text>
                  ) : (
                    <Text>{firebase.auth().currentUser?.phoneNumber}</Text>
                  )}
                  {/* <Text style={{ fontSize: 16 }}>
                  {firebase.auth().currentUser.phoneNumber == null
                    ? "Not found"
                    : firebase.auth().currentUser.phoneNumber}
                </Text> */}
                </View>
              </View>
            </View>

            {/* <Text>Welcome {firebase.auth().currentUser.phoneNumber}</Text>
          <Text>{firstName}</Text> */}
            <View
              style={{
                marginTop: 5,

                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontWeight: "500", color: "#6F6F6F", fontSize: 18 }}
                >
                  Personal Details
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
                    width: 120,
                    height: 30,
                    alignItems: "center",
                    backgroundColor: "#3ECF8E",
                    borderWidth: 1,
                    borderRadius: 5,

                    borderColor: "#3ECF8E",
                    justifyContent: "center",
                  }}
                  onPress={() => onOpen()}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      padding: 5,
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    Edit Profile
                  </Text>
                </TouchableOpacity>
                <Button
                  title="Log out"
                  onPress={() => {
                    firebase.auth().signOut();
                    navigation.navigate("Landing");
                  }}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  height: 1,
                  // backgroundColor: "#D3D3D3",
                  marginTop: 5,
                }}
              />
              <View
                style={{
                  width: "100%",
                  marginTop: 10,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "grey", fontSize: 13 }}>
                    Farming Area
                  </Text>
                  <Text style={{ fontSize: 16, marginTop: 3 }}>
                    {farmarea} Acres
                  </Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "grey", fontSize: 13 }}>Region</Text>
                  <Text style={{ fontSize: 16, marginTop: 3 }}>{block}</Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ color: "grey", fontSize: 13 }}>State</Text>
                  <Text style={{ fontSize: 16, marginTop: 3 }}>{irState}</Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  backgroundColor: "#D3D3D3",
                  marginTop: 5,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginTop: 10,
                  alignItems: "center",
                  justifyContent: "space-between",
                  // backgroundColor: "red",
                }}
              >
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        color: "#6F6F6F",
                        fontSize: 18,
                        marginBottom: 10,
                      }}
                    >
                      Crop Details
                    </Text>
                    {/* <TouchableOpacity
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
                      width: 120,
                      height: 30,
                      alignItems: "center",
                      backgroundColor: "#3ECF8E",
                      borderWidth: 1,
                      borderRadius: 5,

                      borderColor: "#3ECF8E",
                      justifyContent: "center",
                    }}
                    onPress={() => onOpen()}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        padding: 5,
                        color: "#fff",
                        fontWeight: "500",
                      }}
                    >
                      Edit Crops
                    </Text>
                  </TouchableOpacity> */}
                  </View>

                  <View
                    style={{
                      height: winHeight * 0.4,
                      marginBottom: 20,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={mainCrop}
                      renderItem={renderItems}
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

                    {/* 
                  <ScrollView showsVerticalScrollIndicator={true}>
                    {mainCrop.map((item) => {
                      return (
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
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Image
                              source={{
                                uri:
                                  "https://www.jaipuriaschoolballia.in/wp-content/uploads/2016/11/blank-img.jpg",
                              }}
                              style={{
                                height: 40,
                                width: 40,
                                marginRight: 5,
                                borderRadius: "50%",
                              }}
                            />
                            <Text style={{ fontSize: 14 }}>{item.name}</Text>
                            <Entypo name="dot-single" size={20} color="black" />
                            <Text style={{ fontSize: 14 }}>
                              {item.estimatedYield} Quintal
                            </Text>
                          </View>
                          <Text style={{ fontSize: 14 }}>
                            {item.harvestingTime}
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView> */}

                    {/* <View>
                    <Text style={{ color: "grey" }}>Crop</Text>
                    {dummyCrops.map((i) => {
                      return <Text>{i.name}</Text>;
                    })}
                  </View>
                  <View>
                    <Text style={{ color: "grey" }}>Harvest Date</Text>
                    {dummyCrops.map((i) => {
                      return <Text>{i.harvestingTime}</Text>;
                    })}
                  </View>
                  <View>
                    <Text style={{ color: "grey" }}>Quantity</Text>
                    {dummyCrops.map((i) => {
                      return <Text>{i.estimatedYield}</Text>;
                    })}
                  </View> */}

                    {/* {dummyCrops.map((i) => {
                    return (
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "grey" }}>{i.name}</Text>
                        <Text style={{ color: "grey" }}>
                          {i.harvestingTime}
                        </Text>
                        <Text style={{ color: "grey" }}>
                          {i.estimatedYield}
                        </Text>
                      </View>
                    );
                  })} */}
                  </View>

                  {/* <Text style={{ color: "grey" }}>Crop</Text> */}
                  {/* <Text style={{ fontSize: 18, marginTop: 3 }}>{crop}</Text> */}
                  {/* {dummyCrops.map((i) => {
                  return <Text>{i.name}</Text>;
                })} */}
                </View>
                <View>
                  {/* <Text style={{ color: "grey" }}>Harvest Date</Text> */}
                  {/* <Text style={{ fontSize: 18, marginTop: 3 }}>{hdate}</Text> */}
                </View>
              </View>
              <input type="file" onChange={uploadImage} />
              {/* <Text>{crop}</Text>
            <Text>{qty}</Text>

            <Text>{hdate}</Text> */}
              {/* <View
              style={{
                width: "100%",
                height: 1,
                backgroundColor: "#D3D3D3",
                marginTop: 5,
              }}
            /> */}
              <View style={{ marginBottom: 10, width: "100%" }}>
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
                    width: "100%",
                    height: 30,
                    alignItems: "center",
                    backgroundColor: "#000",
                    borderWidth: 1,
                    borderRadius: 5,

                    borderColor: "#000",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    firebase.auth().signOut();
                    navigation.navigate("Landing");
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      padding: 5,
                      color: "#fff",
                      fontWeight: "500",
                    }}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Modalize
          ref={modalizeRef}
          modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight}
          threshold={100}
          modalStyle={
            winWidth > 767 ? { width: 400, alignSelf: "center" } : null
          }
          closeOnOverlayTap={true}
          mod
        >
          {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 16 }}>Edit your profile here</Text>
          <SimpleLineIcons name="close" size={25} onPress={() => onClose()} />
        </View> */}
          <ScrollView>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 5,
                top: 5,
              }}
            >
              {/* <TouchableOpacity onPress={() => onCloseFilter()}>
                Close Filter
              </TouchableOpacity> */}
              <Text style={{ fontSize: 16, marginLeft: 7, fontWeight: "600" }}>
                Edit your Profile
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  width: "50%",
                  justifyContent: "flex-end",
                }}
              >
                {/* <TouchableOpacity
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
                    marginRight: 10,
                  }}
                  onPress={updateData}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    Save
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
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
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 12, marginTop: 20 }}>Name</Text>
              <TextInput
                style={{
                  width: winWidth < 768 ? "80%" : 200,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#D3D3D3",
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 5,
                }}
                onChangeText={(e) => settempfirstName(e)}
                defaultValue={firstName}
                placeholder="Enter your name"
              />
              <Text style={{ fontSize: 12, marginTop: 20 }}>Farming Area</Text>
              <TextInput
                textContentType="telephoneNumber"
                style={{
                  width: winWidth < 768 ? "80%" : 200,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#D3D3D3",
                  padding: 10,
                  marginTop: 5,
                  borderRadius: 5,
                }}
                defaultValue={farmarea != null ? farmarea : " "}
                onChangeText={(e) => settempfa(e)}
                placeholder="Enter Farming Area"
              />
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{ fontSize: 16, marginLeft: 7, fontWeight: "600" }}
                >
                  Edit your crops here
                </Text>

                {/* <DynamicForm /> */}
                {/* <DynForm /> */}

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
                                marginTop: 10,
                                backgroundColor: "#f5f5f5",
                                borderColor: "#f5f5f5",
                                borderWidth: 1,
                                borderRadius: 10,
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
                                      }}
                                    />
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
                          backgroundColor: "#3A48ED",
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
                            color: "#fff",
                            fontWeight: "700",
                          }}
                        >
                          + Add Crop
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <div className="submit-button"></div>
                    <br />
                    {/* <pre>{JSON.stringify(inputFields, null, 2)}</pre> */}
                  </form>
                </>
              </View>

              {/* <TextInput
            style={{
              width: winWidth < 768 ? "80%" : 200,
              height: 40,
              borderWidth: 1,
              borderColor: "#D3D3D3",
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
            onChangeText={(e) => settempqty(e)}
            defaultValue={qty}
            placeholder="Enter Quantity"
          />
          <TextInput
            style={{
              width: winWidth < 768 ? "80%" : 200,
              height: 40,
              borderWidth: 1,
              borderColor: "#D3D3D3",
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
            onChangeText={(e) => settemphDate(e)}
            defaultValue={hdate}
            placeholder="Enter harvest date"
          />
          <TextInput
            style={{
              width: winWidth < 768 ? "80%" : 200,
              height: 40,
              borderWidth: 1,
              borderColor: "#D3D3D3",
              padding: 10,
              marginTop: 10,
              borderRadius: 5,
            }}
            onChangeText={(e) => settempArea(e)}
            placeholder="Enter farming area"
          /> */}
              {/* <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                width: "30%",
                height: 40,
                alignItems: "center",
                backgroundColor: "#fff",
                borderWidth: 1,
                borderRadius: 5,
                top: 30,
                borderColor: "#346beb",
                justifyContent: "center",
              }}
              onPress={() => console.log("Resetting")}
            >
              <Text
                style={{
                  fontSize: 15,
                  padding: 5,
                  color: "#346beb",
                  fontWeight: "700",
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "30%",
                height: 40,
                alignItems: "center",
                backgroundColor: "#3ECF8E",
                borderWidth: 1,
                borderRadius: 5,
                top: 30,
                borderColor: "#3ECF8E",
                justifyContent: "center",
              }}
              onPress={() => updateData()}
            >
              <Text
                style={{
                  fontSize: 15,
                  padding: 5,
                  color: "#fff",
                  fontWeight: "700",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>

          
          </View> */}
            </View>
          </ScrollView>
        </Modalize>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deebff",
    alignItems: "center",
    justifyContent: "center",
  },
});
