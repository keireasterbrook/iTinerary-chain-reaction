import React from 'react'
import { Text, View } from 'react-native'

export default function HomeScreen(props) {
    return (
        <View>
            <Text>Home Screen</Text>
            <Stack.Screen name="NavBar" component={NavBar}/>
        </View>
    )
}

//if no trips, return "Hi! You currently have no trips coming up. Let's get planning!" and add trip button.
//if already got trips, return list of TripCards