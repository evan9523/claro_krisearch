import { Entypo, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import getSmallString from "../utils/getSmallString";
import hideNumber from "../utils/hideNumber";

export interface CardProps {
  name: string;
  avatar?: string;
  crop?: string;
  phone?: number;
  address?: string;
  onPress: any;
  cropAvatar?: string;
  isCrop?: boolean;
}

export default function Card(props: CardProps) {
  const {
    name,
    avatar,
    crop,
    phone,
    address,
    onPress,
    cropAvatar,
    isCrop,
  } = props;

  const windowWidth = Dimensions.get("window").width;
  const cardWidth = windowWidth / 2 - 30;

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View
        style={
          windowWidth > 767
            ? {
                width: 200,
                height: 185,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 10,
                alignItems: "center",
                margin: 5,
                marginBottom: 5,
                shadowColor: "#98A0FF",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2.22,

                elevation: 3,
              }
            : {
                width: windowWidth * 0.45,
                height: 185,
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 10,
                alignItems: "center",
                margin: 6,

                shadowColor: "#98A0FF",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.15,
                shadowRadius: 2.22,

                elevation: 3,
              }
        }
      >
        <Image
          source={{ uri: avatar }}
          style={
            !isCrop
              ? {
                  width: 105,
                  height: 105,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 105,
                }
              : {
                  width: 140,
                  height: 140,
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 100,
                }
          }
        />
        <Text style={{ fontWeight: "500", fontSize: 16, marginTop: 10 }}>
          {name}
        </Text>

        {!isCrop ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text> {crop}</Text>
            </View>
            <Entypo name="dot-single" size={15} style={{ marginTop: 5 }} />
            <View>
              <Text>{address}</Text>
            </View>
          </View>
        ) : null}

        {!isCrop ? (
          <View>
            <Text>{phone ? hideNumber(phone) : "Not available"}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
