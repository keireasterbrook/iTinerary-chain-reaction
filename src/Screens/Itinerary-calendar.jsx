import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from '@react-navigation/native'



const ItineraryCalendar = ({ user, handleAuthentication }) => {
    const navigation = useNavigation()


    return (
      

      <View style={styles.authContainer}>
        <Text style={styles.title}>Here is the calendar</Text>
        <Text style={styles.emailText}></Text>
      </View>
      
    );
  };

  export default ItineraryCalendar