import { View, Text, Button } from "react-native";
import { styles } from "../../App";

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    console.log("hello from Authenticated screen");
  
    return (
      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    );
  };

  export default AuthenticatedScreen