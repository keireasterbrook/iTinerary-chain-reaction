import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from '@react-navigation/native'

const ChatBot = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.authContainer}>
        <Text style={styles.title}>Hi I am ChatBot</Text>
        <Text style={styles.emailText}></Text>
        <Button title='to Activities List' onPress={() => navigation.navigate('ActivitiesList')}></Button>

      </View>
    )
}

export default ChatBot