import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  StatusBar,
  SafeAreaView,
} from "react-native";
import colours from "../styles/colours";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../styles/images/mountain.jpg")}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
        <View style={style.details}>
          <Text
            style={{ color: colours.white, fontSize: 35, fontWeight: "bold" }}
          >
            The trip of a lifetime awaits.
          </Text>
          <Text
            style={{
              color: colours.white,
              lineHeight: 25,
              marginTop: 15,
              fontSize: 16,
            }}
          >
            Take the hassle out of holiday planning and let our TravelBot do the
            heavy lifting for you.
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ChatBot")}
          >
            <View style={style.getstartedbtn}>
              <Text style={{ fontWeight: "bold" }}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.8} onPress={handleAuthentication}>
          <Button
            title="Log out"
            onPress={handleAuthentication}
            color="black"
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  details: {
    height: "70%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 40,
  },
  getstartedbtn: {
    height: 50,
    width: 120,
    backgroundColor: colours.white,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutbtn: {
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthenticatedScreen;
