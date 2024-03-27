import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from '@react-navigation/native'



const AuthenticatedScreen = ({ user, handleAuthentication }) => {
    const navigation = useNavigation()
    console.log(navigation, 'navigation')

    return (
      

      <View style={styles.authContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.emailText}></Text>
        <Button title='Start your journey planning!' onPress={() => navigation.navigate('ChatBot')}></Button>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
      
    );
  };

  export default AuthenticatedScreen