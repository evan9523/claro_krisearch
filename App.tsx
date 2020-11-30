import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { winWidth, winHeight } from "./src/utils/window";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/HomeScreen";
import Search from "./src/screens/SearchScreen";
import Welcome from "./src/screens/SplashScreen";
import Header from "../claro_krisearch/src/components/header";
import Profile from "./src/screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <KeyboardAvoidingView>
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          if (index === 1) {
            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 65,
                  width: 65,
                  backgroundColor: isFocused ? "#346beb" : "#fff",
                  position: "absolute",
                  left: winWidth / 2 - 30,
                  bottom: 15,
                  margin: 5,
                  borderRadius: 35,
                  borderWidth: 2,
                  borderColor: isFocused ? "#fff" : "#deebff",
                }}
              >
                {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                {label}
              </Text> */}
                <Feather
                  name="search"
                  size={30}
                  color={isFocused ? "#fff" : "#346beb"}
                />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 56,
              }}
            >
              {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text> */}

              <View>
                {index == 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 2,
                      backgroundColor: isFocused ? "#deebff" : "transparent",
                      borderColor: isFocused ? "#deebff" : "transparent",
                      width: "110%",
                      borderRadius: 20,
                      padding: 5,
                    }}
                  >
                    <Feather
                      name="home"
                      size={20}
                      color={isFocused ? "#346beb" : "#222"}
                    />
                    {isFocused ? (
                      <Text
                        style={{
                          fontSize: 16,
                          marginLeft: 15,
                          color: "#346beb",
                        }}
                      >
                        {label}
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 2,
                        backgroundColor: isFocused ? "#deebff" : "transparent",
                        borderColor: isFocused ? "#deebff" : "transparent",
                        width: "110%",
                        borderRadius: 20,
                        padding: 5,
                      }}
                    >
                      <Feather
                        name="user"
                        size={20}
                        color={isFocused ? "#346beb" : "#222"}
                      />
                      {isFocused ? (
                        <Text
                          style={{
                            fontSize: 16,
                            marginLeft: 15,
                            color: "#346beb",
                          }}
                        >
                          {label}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </KeyboardAvoidingView>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      {winWidth > 767 ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#346beb",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerShown: false,
          }}
          initialRouteName="Welcome"
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Krisearch",
            }}
          />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
            }}
          />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Search" component={Search} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
