import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import firebase from "../firebase/firebase";
import { firestore } from "firebase";
import { winHeight, winWidth } from "../utils/window";
import OtpInput from "react-otp-input";
import {
  SimpleLineIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [number, setnumber] = useState("");
  const [temp, settemp] = useState("");
  const [user, setuser] = useState("");
  const [token, settoken] = useState(null);
  const [otpsent, setotpsent] = useState(false);
  const [gotCode, setgotCode] = useState("");
  const [tempCode, settempCode] = useState("");
  const [result, setresult] = useState(null);

  const handleClick = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });
    let n = "+919176689903";
    console.log(tempCode);
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.

        firebase
          .auth()
          .signInWithPhoneNumber(number, recaptcha)
          .then(function (e) {
            let code = window.prompt("Enter the OTP", "");
            // let code = gotCode;
            if (code == null) {
              console.log("Null Code");
            }

            e.confirm(code)
              .then(function (result) {
                console.log(result.user, "user");
                setuser(result.user.phoneNumber);
                console.log(
                  result.user ? result.user.phoneNumber : "not verified"
                );

                firebase
                  .auth()
                  .currentUser?.getIdToken()
                  .then(function (idtoken) {
                    // settoken(idtoken);
                    // console.log(idtoken);

                    // console.log(token);

                    fetch(
                      "http://staging.clarolabs.in:7050/Ksearch/farmer/get",
                      {
                        method: "post",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          authToken: idtoken,
                        }),
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data.data.farmer);
                        if (data.data.farmer == null) {
                          navigation.navigate("SignUp");
                          console.log("Not Available");
                        } else {
                          navigation.navigate("Homely", { screen: "Home" });
                          console.log("available");
                        }
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch(function (err) {
                    console.log(err);
                  });

                // var docRef = firestore()
                //   .collection("users")
                //   .doc(firebase.auth().currentUser?.uid);
                // docRef.get().then(function (doc) {
                //   if (doc.exists) {
                //     console.log("DocData:", doc.data());
                //     // navigation.navigate("Profile");
                //     navigation.navigate("Homely", { screen: "Profile" });
                //   } else {
                //     console.log("No such document!");
                //     navigation.navigate("SignUp");
                //   }
                // });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };
  var codeResult;

  const sendCode = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    firebase
      .auth()
      .signInWithPhoneNumber(number, recaptcha)
      .then((confirmResult) => {
        confirmResult = confirmResult;
        codeResult = confirmResult;
        console.log(codeResult);
        setresult(codeResult);

        setotpsent(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const verifyCode = () => {
    var code = tempCode;
    result
      .confirm(code)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const checkUser = (data) => {
    if (data == null) {
      console.log("Doesnt Exist");

      firebase
        .auth()
        .currentUser?.getIdToken()
        .then(function (idtoken) {
          fetch("http://staging.clarolabs.in:7050/Ksearch/farmer/save", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              authToken: idtoken,
              crops: [
                {
                  name: "Sugarcane",
                  estimatedYield: 5,

                  harvestingTime: "31/02/2022",
                },
              ],
              farmer: {
                name: "Evan Chatterjee",
                farmerImage: "string",
                contactNo: "string",
                village: "string",
                block: "string",
                district: "string",
                state: "string",
                totalLandSize: 20,
                totalLandSizeUnit: "Kattha",
                latitude: 0,
                longitude: 0,
              },
            }),
          });
        })
        .then(() => navigation.navigate("Homely", { screen: "Home" }))
        .catch((err) => console.log(err));
    } else {
      console.log("Exists");
    }
  };

  const handleOTP = (e) => {
    settempCode(e);
  };

  console.log(tempCode);

  return (
    <View style={styles.container}>
      <div id="recaptcha-container"></div>
      {/* <View style={{ width: "100%", backgroundColor: "yellow" }}>
        <TextInput
          placeholder="enter number"
          style={{
            width: 200,
            height: 50,
            borderWidth: 2,
            borderColor: "green",
          }}
          onChangeText={(e) => settemp(e)}
        />
        <Button title="Submit" onPress={() => setnumber(temp)} />
        <Button title="Click here" onPress={() => handleClick()} />
        <StatusBar style="auto" />
        <Text>{user}</Text>
      </View> */}
      <View
        style={{
          height: winHeight,
          width: "100%",
          backgroundColor: "#346beb",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            height: "20%",

            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            source={require("../../assets/newIcon4.png")}
            style={{ height: 60, width: 60 }}
          />
          <Text style={{ marginLeft: 5, fontSize: 40, color: "#fff" }}>
            Krisearch
          </Text>
        </View>
        <View
          style={{
            width: winWidth < 768 ? "100%" : "30%",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            margin: 10,
            flexDirection: "row",
          }}
        >
          <Feather name="smartphone" size={24} color="#fff" />
          <Text
            style={{
              fontSize: 20,
              color: "#fff",

              marginLeft: 10,
            }}
          >
            Sign-in with your phone
          </Text>
        </View>

        <View
          style={{
            height: "60%",
            backgroundColor: "#fff",
            borderWidth: 1,
            width: winWidth < 768 ? "90%" : "30%",
            borderColor: "#fff",
            alignSelf: "center",
            borderRadius: 5,
            margin: 10,
            shadowColor: "#002f9c",
            shadowOffset: {
              width: 3,
              height: 5,
            },
            shadowOpacity: 0.5,
            shadowRadius: 2.22,

            elevation: 5,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 25, color: "#346beb" }}>Welcome</Text>
            {/* <SimpleLineIcons
              name="close"
              size={25}
              onPress={() => navigation.navigate("Landing")}
            /> */}
          </View>

          {/* <Button title="Submit" onPress={() => setnumber(temp)} /> */}

          <View
            style={{
              padding: 10,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {otpsent ? (
              <View
                style={{
                  padding: 10,
                  marginTop: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <OtpInput
                  value={tempCode}
                  onChange={(e) => handleOTP(e)}
                  numInputs={6}
                  separator={<span>-</span>}
                  inputStyle={{
                    fontSize: 15,
                    height: 30,
                    width: 30,
                  }}
                />
                <TouchableOpacity
                  style={{
                    width: "60%",
                    height: 40,
                    alignItems: "center",
                    backgroundColor: "#3ECF8E",
                    borderWidth: 1,
                    borderRadius: 5,
                    top: 30,
                    borderColor: "#3ECF8E",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    alert(tempCode);
                    verifyCode();
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
                    Verify and Login
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  padding: 10,

                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <TextInput
                  placeholder="Enter your 10-digit number here"
                  // style={{
                  //   width: "70%",
                  //   height: 40,
                  //   borderWidth: 1,
                  //   borderColor: "#A9A9A9",
                  //   borderRadius: 5,
                  //   padding: 5,
                  // }}
                  focusable={true}
                  style={
                    Platform.OS === "web" && {
                      outlineColor: "#fff",
                      height: 40,
                      backgroundColor: "white",
                      width: "95%",
                      padding: 5,
                      fontSize: 20,
                      borderWidth: 1,
                      borderBottomColor: "#000",
                      borderColor: "#fff",
                      borderRadius: 5,
                      textAlign: "center",
                    }
                  }
                  onChangeText={(e) => setnumber("+91" + e)}
                />
                <TouchableOpacity
                  style={{
                    width: "60%",
                    height: 40,
                    alignItems: "center",
                    backgroundColor: "#3ECF8E",
                    borderWidth: 1,
                    borderRadius: 5,
                    top: 30,
                    borderColor: "#3ECF8E",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    // handleClick();

                    sendCode();
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
                    Get OTP
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <StatusBar style="auto" />
          {/* <Text>{user}</Text> */}
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#346beb",
    alignItems: "center",
    justifyContent: "center",
  },
});
