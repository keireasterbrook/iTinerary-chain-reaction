import { Text, Platform, View } from "react-native";
import { HomeScreen, NewTrip, Settings } from "../screens";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBayStyle: {
    positon: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};

const NavBar = () => {
  return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>HOME</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="New Trip"
          component={NewTrip}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>ADD TRIP</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 12, color: "#16247d" }}>SETTINGS</Text>
                </View>
              );
            },
          }}
        ></Tab.Screen>
      </Tab.Navigator>
  );
};

export default NavBar;
