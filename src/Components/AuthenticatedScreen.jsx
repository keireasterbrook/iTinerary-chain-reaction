import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import {Link, useNavigation, useRouter} from 'expo-router'


const AuthenticatedScreen = ({ user, handleAuthentication, navigation }) => {
    console.log("hello from Authenticated screen");
    
  
    return (


      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}>{user.email}</Text>
        <Button title="Start Planning!"
      onPress={() =>
        navigation.navigate('ChatBot')
      }
    />
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
      
 
    );
  };

  export default AuthenticatedScreen