// import { Text, Platform, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import ItineraryCalendar from "../Screens/Itinerary-calendar";
// import Home from "../Screens/Home";
// import ChatBot from "../Screens/ChatBot";

// const Tab = createBottomTabNavigator();
// const screenOptions = {
//   tabBarShowLabel: false,
//   headerShown: false,
//   tabBayStyle: {
//     positon: "absolute",
//     bottom: 0,
//     right: 0,
//     left: 0,
//     elevation: 0,
//     height: 60,
//     background: "#fff",
//   },
// };

// const NavBar = () => {
//   return (
//       <Tab.Navigator screenOptions={screenOptions}>
//         <Tab.Screen
//           name="Home"
//           component={Home}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <View
//                   style={{ alignItems: "center", justifyContent: "center" }}
//                 >
//                   <Text style={{ fontSize: 12, color: "#16247d" }}>HOME</Text>
//                 </View>
//               );
//             },
//           }}
//         ></Tab.Screen>
//         <Tab.Screen
//           name="ChatBot"
//           component={ChatBot}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <View
//                   style={{ alignItems: "center", justifyContent: "center" }}
//                 >
//                   <Text style={{ fontSize: 12, color: "#16247d" }}>ADD TRIP</Text>
//                 </View>
//               );
//             },
//           }}
//         ></Tab.Screen>
//         <Tab.Screen
//           name="Itinerary-Calendar"
//           component={ItineraryCalendar}
//           options={{
//             tabBarIcon: ({ focused }) => {
//               return (
//                 <View
//                   style={{ alignItems: "center", justifyContent: "center" }}
//                 >
//                   <Text style={{ fontSize: 12, color: "#16247d" }}>SETTINGS</Text>
//                 </View>
//               );
//             },
//           }}
//         ></Tab.Screen>
//       </Tab.Navigator>
//   );
// };

// export default NavBar;