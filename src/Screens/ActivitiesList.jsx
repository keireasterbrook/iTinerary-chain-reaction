import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from '@react-navigation/native'



const ActivitiesList = ({ user, handleAuthentication }) => {
    const navigation = useNavigation()

    return (
      

      <View style={styles.authContainer}>
        <Text style={styles.title}>Here are your items</Text>
        <Text style={styles.emailText}></Text>
        <Button title='I am happy with these choices' onPress={() => navigation.navigate('Itinerary-calendar')}></Button>
      </View>
      
    );
  };

  export default ActivitiesList