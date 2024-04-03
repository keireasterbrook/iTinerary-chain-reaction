import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image, SafeAreaView, StatusBar
} from "react-native";
import colours from "../styles/colours";
import { ImageBackground } from "react-native";

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin,
  handleAuthentication,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../styles/images/homeandlogo.png")}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
    
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? "Sign In" : "Sign Up"}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <Button
              title={isLogin ? "Sign In" : "Sign Up"}
              onPress={handleAuthentication}
              color={colours.darkpurple}
            />
          </View>

          <View style={styles.bottomContainer}>
            <Text
              style={styles.toggleText}
              onPress={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Need an account? Sign Up"
                : "Already have an account? Sign In"}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.darkpurple,
    bottom: 0,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: colours.darkpurple,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: 'center',
    opacity: 0.7
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: colours.white
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    color: colours.white,
    width: '90%'
  },
  buttonContainer: {
    marginBottom: 16,
    backgroundColor: colours.white,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  toggleText: {
    color: colours.white,
    textAlign: "center",
  },
  bottomContainer: {
    marginTop: 0,
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: colours.white
  },
});
export default AuthScreen;
