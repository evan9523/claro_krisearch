import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/header";
import { winWidth, winHeight } from "../utils/window";
import firebase from "../firebase/firebase";
import { firestore } from "firebase";
import {
  SimpleLineIcons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Landing = ({ navigation }) => {
  const [usere, setusere] = useState(null);
  const [datas, setdatas] = useState([]);
  {
    firebase.auth().onAuthStateChanged((user) => {
      // navigation.navigate(user ? "Profile" : "Login");
      if (user) {
        firebase
          .auth()
          .currentUser?.getIdToken()
          .then((idtoken) => {
            // settoken(idtoken);
            console.log(idtoken);

            // console.log(token);

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
              .then((res) => res.json())

              .then((data) => {
                console.log(data.data.farmer);
                if (data.data.farmer == null) {
                  // navigation.navigate("SignUp");
                  console.log("New User");
                  navigation.navigate("SignUp");
                } else {
                  console.log("Already Signed Up");
                  navigation.navigate("Homely", { screen: "Home" });
                }
              })

              .catch(function (err) {
                console.log(err);
              });

            // .then((data) => {
            //   // // console.log(data.json());
            //   // if (data !== null) {
            //   //   console.log("Found");
            //   //   // console.log(data.json());
            //   //   // navigation.navigate("Homely", { screen: "Home" });
            //   // } else {
            //   //   console.log("No data found");
            //   //   // navigation.navigate("SignUp");
            //   // }
            // })
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
        //     navigation.navigate("Homely", { screen: "Home" });
        //     // navigation.navigate("Profile");
        //   } else {
        //     console.log("No such document!");
        //     navigation.navigate("SignUp");
        //   }
        // });
      } else {
        null;
      }
    });
  }
  // var docRef = firestore()
  //                 .collection("users")
  //                 .doc(firebase.auth().currentUser?.uid);
  //               docRef.get().then(function (doc) {
  //                 if (doc.exists) {
  //                   console.log("DocData:", doc.data());
  //                   navigation.navigate("Profile");
  //                 } else {
  //                   console.log("No such document!");
  //                   navigation.navigate("SignUp");
  //                 }
  //               });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: winWidth > 768 ? "40%" : "100%",

          height: winWidth > 768 ? 400 : 350,
          marginTop: -100,
        }}
      >
        <Carousel
          additionalTransfrom={0}
          autoPlay={true}
          arrows={false}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={true}
          responsive={responsive}
        >
          <View
            style={{
              height: 400,

              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: winWidth > 768 ? "80%" : "60%",
                marginTop: winWidth > 768 ? 10 : 30,
                marginBottom: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/onBoarding/i1.png")}
                style={{
                  height: winWidth > 768 ? 400 : 300,
                  width: winWidth > 768 ? 400 : 300,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: winWidth > 768 ? 25 : 20,
                color: "#fff",
                marginTop: 10,
              }}
            >
              Discover the ones who grow our food
            </Text>
          </View>
          <View
            style={{
              height: 400,

              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: winWidth > 768 ? "80%" : "60%",
                marginTop: winWidth > 768 ? 10 : 30,
                marginBottom: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/onBoarding/i3.png")}
                style={{
                  height: winWidth > 768 ? 400 : 300,
                  width: winWidth > 768 ? 400 : 300,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: winWidth > 768 ? 25 : 20,
                color: "#fff",
                marginTop: 10,
              }}
            >
              Get onboard with other farmers
            </Text>
          </View>
          <View
            style={{
              height: 400,

              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                height: winWidth > 768 ? "80%" : "60%",
                marginTop: winWidth > 768 ? 10 : 30,
                marginBottom: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/onBoarding/i2.png")}
                style={{
                  height: winWidth > 768 ? 350 : 250,
                  width: winWidth > 768 ? 350 : 250,
                }}
              />
            </View>
            <Text
              style={{
                fontSize: winWidth > 768 ? 25 : 20,
                color: "#fff",
                marginTop: 10,
              }}
            >
              Farm-to-Plate helps you buy crops directly
            </Text>
          </View>
        </Carousel>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          top: 20,
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
          flexDirection: "column",
          width: 300,
          height: 100,
          top: 60,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            alignItems: "center",
            backgroundColor: "#3ECF8E",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#3ECF8E",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <View
            style={{
              width: "80%",
              height: "100%",
              flexDirection: "row",

              alignItems: "center",
              justifyContent: "flex-start",
              padding: 10,
            }}
          >
            <FontAwesome5 name="tractor" size={30} style={{ color: "#fff" }} />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-evenly",

                height: 50,
                marginLeft: 10,
              }}
            >
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "600" }}>
                I'm a Farmer
              </Text>
              <Text style={{ fontSize: 14, color: "#fff" }}>
                Get onboard with us
              </Text>
            </View>
          </View>
          <AntDesign
            name="arrowright"
            size={30}
            color="#fff"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 60,
            alignItems: "center",
            backgroundColor: "#fff",
            borderWidth: 2,
            borderRadius: 5,
            borderColor: "#3ECF8E",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Feed")}
        >
          <View
            style={{
              width: "80%",
              height: "100%",
              flexDirection: "row",

              alignItems: "center",
              justifyContent: "flex-start",
              padding: 10,
            }}
          >
            {/* <FontAwesome5 name="tractor" size={30} style={{ color: "#fff" }} /> */}
            <AntDesign name="shoppingcart" size={30} color="#3ECF8E" />
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-evenly",

                height: 50,
                marginLeft: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, color: "#3ECF8E", fontWeight: "600" }}
              >
                I'm a Buyer
              </Text>
              <Text
                style={{ fontSize: 14, color: "#3ECF8E", fontWeight: "500" }}
              >
                Buy fresh crops directly
              </Text>
            </View>
          </View>
          <AntDesign
            name="arrowright"
            size={30}
            color="#3ECF8E"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
            style={{
              width: "100%",
              height: 40,
              alignItems: "center",
              backgroundColor: "#fff",
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#fff",
              justifyContent: "center",
            }}
            onPress={() => navigation.navigate("Homely", { screen: "Home" })}
          >
            <Text style={{ fontSize: 20, color: "#3ECF8E" }}>I'm a Buyer</Text>
          </TouchableOpacity> */}
        {/* <Button
          title="I'm a Buyer"
          onPress={() => navigation.navigate("Home")}
        /> */}
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A48ED",
    alignItems: "center",
    justifyContent: "center",
  },
});
