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
  ImageBackground,
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
import DynamicForm from "../components/dynamicForm";
import DynForm from "../components/DynForm";
import { env } from "../env";
import { da } from "date-fns/locale";

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
  const [applied, setapplied] = useState(false);
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
  const [unit, setunit] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [country, setcountry] = useState("");
  const [region, setregion] = useState("");
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);

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
            setlat(data.data.farmer.latitude);
            setlong(data.data.farmer.longitude);
            setcity(data.data.farmer.village);
            setblock(data.data.farmer.country);
            setregion(data.data.farmer.state);
            setirState(data.data.farmer.state);
            setdistrict(data.data.farmer.district);
            setimage(data.data.farmer.farmerImage);
            setfarmarea(data.data.farmer.totalLandSize);
            setunit(data.data.farmer.totalLandSizeUnit);
            console.log(data.data.crops);
            setFields(data.data.crops);
            setmainCrop(data.data.crops);
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

  const [fields, setFields] = useState([
    { name: "", harvestingTime: "", estimatedYield: 0 },
  ]);

  const [drops, setDrops] = useState([]);
  const [imageColl, setimageColl] = useState([]);
  const [tempDate, settempDate] = useState(new Date());
  const [tempID, settempID] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedUnit, setselectedUnit] = useState(null);

  const removeCrop = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const addCrop = () => {
    const val = [...fields];
    val.push({ name: "", harvestingTime: "", estimatedYield: 0 });
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

  const units = [
    {
      values: "Kattha",
      label: "Kattha",
    },
    {
      values: "Acres",
      label: "Acres",
    },
  ];

  const showData = () => {
    console.log(fields);
  };
  const options = [];
  drops.map((i) => {
    options.push({ values: i.name, label: i.name });
  });

  const [url, seturl] = useState("");

  const uploadImage = (e) => {
    console.log(e.target.files[0]);
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log(data.location),
          seturl(data.location),
          setimage(data.location);
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
        cropName: null,
      }),
    })
      .then((res) => res.json())
      .then((data) => setfilteredBlur(data.data.list));
  }, []);

  console.log(filteredBlur);

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
              item.name.toString().toLocaleLowerCase() ===
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

          <Text style={{ fontSize: 16 }}>{item.name}</Text>
          <Entypo name="dot-single" size={20} color="black" />
          <Text style={{ fontSize: 16 }}>{item.estimatedYield} Quintal</Text>
        </View>
        <Text style={{ fontSize: 16 }}>{item.harvestingTime}</Text>
      </View>
    );
  };

  const confirmUnit = (e) => {
    console.log(e);
    setunit(e);
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
    setfirstName(tempfirstName ? tempfirstName : firstName);
    console.log(firstName);
    console.log(tempfa);
    setfarmarea(tempfa ? tempfa : farmarea);
    console.log(fields);

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
              name: firstName,
              farmerImage: image,

              contactNo: firebase.auth().currentUser?.phoneNumber,
              village: city,
              block: country,
              district: district,
              state: region,
              totalLandSize: tempfa == 0 || null ? farmarea : tempfa,
              totalLandSizeUnit: unit,
              latitude: lat,
              longitude: long,
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
            backgroundColor: "#edf4ff",
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
              width: winWidth < 768 ? "90%" : "40%",

              margin: 10,
              marginTop: -135,
              padding: 5,
              left: winWidth > 768 ? -20 : null,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "transparent",
              zIndex: 999,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 120,

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
                  height: winWidth > 768 ? 130 : 120,
                  width: winWidth > 768 ? 130 : 120,
                  marginBottom: 3,
                  borderColor: "#fff",
                  borderWidth: 2,
                  marginLeft: winWidth > 768 ? 10 : null,
                  borderRadius: 130,
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
                    marginTop: winWidth > 768 ? -20 : null,
                    justifyContent: "flex-end",
                    width: "90%",
                  }}
                >
                  <Feather
                    name="user"
                    size={winWidth > 768 ? 30 : 20}
                    color="#fff"
                    style={{ marginTop: -2, marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: winWidth > 768 ? 30 : 20,
                      color: "#fff",
                      fontWeight: "500",
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
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: winWidth > 768 ? 25 : 16,
                      }}
                    >
                      {firebase.auth().currentUser?.phoneNumber}
                    </Text>
                  )}
                  {/* <Text style={{ fontSize: 16 }}>
                  {firebase.auth().currentUser.phoneNumber == null
                    ? "Not found"
                    : firebase.auth().currentUser.phoneNumber}
                </Text> */}
                </View>
                <View
                  style={{
                    width: "75%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: winWidth > 768 ? 20 : 30,
                    marginRight: winWidth > 768 ? 40 : 20,
                    alignSelf: "flex-end",
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
                      width: "50%",
                      height: 30,
                      alignItems: "center",
                      backgroundColor: "#3ECF8E",
                      borderWidth: 1,
                      borderRadius: 5,
                      marginRight: 10,
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
                        fontWeight: "700",
                      }}
                    >
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
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
                      width: "50%",
                      height: 30,
                      alignItems: "center",
                      backgroundColor: "#ffd4dc",
                      borderWidth: 2,
                      borderRadius: 5,
                      marginRight: 20,
                      borderColor: "#ff0f3b",
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
                        color: "#ff0f3b",
                        fontWeight: "700",
                      }}
                    >
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View></View>
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
                  style={{
                    flexDirection: "column",
                    width: "20%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
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
                      size={15}
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
                      Area
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15 }}>
                      {farmarea} {unit}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "20%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/* <SimpleLineIcons
                      name="size-fullscreen"
                      size={15}
                      color="#9F99FF"
                    /> */}
                    <FontAwesome name="map-marker" size={15} color="#9F99FF" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6F6F6F",
                        fontWeight: "600",
                        marginLeft: 5,
                      }}
                    >
                      Region
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15 }}>{block} </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    width: "20%",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="map" size={15} color="#9F99FF" />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6F6F6F",
                        fontWeight: "600",
                        marginLeft: 5,
                      }}
                    >
                      State
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 15 }}>{region} </Text>
                  </View>
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
                      justifyContent: "space-between",
                      marginTop: 20,
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
                      height: winHeight * 0.4,
                      marginBottom: 20,
                    }}
                  >
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={fields}
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
            </View>
          </View>
        </View>
        <Modalize
          ref={modalizeRef}
          modalHeight={winWidth > 767 ? winHeight * 0.86 : winHeight * 0.9}
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
          <ScrollView contentContainerStyle={{ height: winHeight * 0.9 }}>
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
                  onPress={() => {
                    updateData(), onClose();
                  }}
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
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",

                  width: "100%",
                }}
              >
                <View style={{ width: "30%" }}>
                  <Image
                    source={{ uri: image }}
                    style={{
                      height: 120,
                      width: 120,
                      borderWidth: 2,
                      borderRadius: 120,
                      borderColor: "#346beb",
                    }}
                  />
                  <View style={{ marginTop: 10 }}>
                    <input
                      type="file"
                      onChange={uploadImage}
                      title="Change Image"
                    />
                  </View>
                </View>
                <View style={{ width: "60%", marginBottom: 30 }}>
                  <Text style={{ fontSize: 12 }}>Name</Text>
                  <TextInput
                    style={{
                      width: "100%",
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
                  <Text style={{ fontSize: 12, marginTop: 20 }}>
                    Farming Area
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextInput
                      textContentType="telephoneNumber"
                      style={{
                        width: "48%",
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
                    <View style={{ width: "50%", marginTop: 5 }}>
                      <Select
                        placeholder={unit ? unit : "Unit"}
                        defaultValue={selectedUnit}
                        onChange={(e) => {
                          setselectedUnit;
                          console.log(e.label);
                          confirmUnit(e.label);
                        }}
                        options={units}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 16, marginLeft: 7, fontWeight: "600" }}
                >
                  Edit your crops here
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
                {/* <DynamicForm /> */}
                {/* <DynForm /> */}
              </View>
              <View
                style={{
                  width: winWidth < 768 ? "100%" : "100%",

                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 20,
                    padding: 2,
                    marginLeft: 2,
                    marginTop: 10,
                    marginBottom: 1,

                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: "35%",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={{ color: "#9e9e9e" }}>Crop</Text>
                  </View>
                  <View
                    style={{ width: "25%", alignItems: "center", left: -20 }}
                  >
                    <Text style={{ color: "#9e9e9e" }}>Yield</Text>
                  </View>
                  <View
                    style={{ width: "30%", left: -30, alignItems: "center" }}
                  >
                    <Text style={{ color: "#9e9e9e" }}>Harvest Date</Text>
                  </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                  {fields.map((field, idx) => (
                    <View
                      key={`${field}~${idx}`}
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: 2,
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
                          placeholder={field.name ? field.name : "Add Crop"}
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
                          textAlign: "center",
                        }}
                        onChangeText={(q) => matchCrop(null, q, null, idx)}
                        placeholder="Quantity"
                        value={field.estimatedYield}
                      />

                      {applied || field.harvestingTime ? (
                        <TouchableOpacity
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
                          onPress={() => setapplied(false)}
                        >
                          <Text style={{ fontSize: 14 }}>
                            {field.harvestingTime}
                          </Text>
                        </TouchableOpacity>
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
                            matchCrop(
                              null,
                              null,
                              date.toLocaleDateString(),
                              idx
                            );
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
              {/* <TouchableOpacity
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
                  console.log(fields);
                  updateData();
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
              </TouchableOpacity> */}
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
