import {View, Text} from 'react-native'

const ActivityCard = ({place}) => {


    return (
        <View>
      <Text>{place.properties.name}</Text>
      <Text>{place.properties.full_address}</Text>
    </View>
    )
            }

export default ActivityCard