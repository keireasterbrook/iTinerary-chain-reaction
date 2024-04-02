import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { styles } from "../../App";
import { useNavigation } from "@react-navigation/native";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../Components/ActivityCard";
import { dataPush, dataFetch } from "../utils/dataFetch";
import colours from "../styles/colours";

const searchBox_API_KEY =
	'?access_token=sk.eyJ1IjoiYWh1c3M5OCIsImEiOiJjbHU2d3oyaGIyNjVrMmlzM3Q1d3ZkMDAyIn0.Z8t1arJJokTQXfGF0-KJzw&language=en&limit=5';

const searchBoxApi = axios.create({
	baseURL: 'https://api.mapbox.com/search/searchbox/v1/',
});

const ActivitiesList = ({ holidayObj }) => {
	const navigation = useNavigation();
	const [data, setData] = useState([]);
	const [selectedActivities, setSelectedActivities] = useState([]);
	const [foodData, setFoodData] = useState([]);
	const [dayData, setDayData] = useState([]);
	const [nightData, setNightData] = useState([]);

	useEffect(() => {
		setFoodData(holidayObj.food);
		setDayData(holidayObj.dayActivity);
		setNightData(holidayObj.nightActivity);
		console.log(holidayObj, 'im in the activity lisst!!');
	}, []);

	console.log(
		foodData,
		dayData,
		nightData,
		'the data of all the stuff we need to list '
	);

	// useEffect(() => {
	// 	foodData.map((restaraunt, index) => {
	// 		searchBoxApi
	// 			.get(`category/${museum}${searchBox_API_KEY}`)
	// 			.then((respose) => {
	// 				setData(...data, respose.data.features);
	// 			});
	// 	});
	// }, []);

	console.log(data);
	useEffect(() => {
		searchBoxApi
			.get(`category/museum${searchBox_API_KEY}`)
			.then((response) => {
				setData(response.data.features);
			});
	}, []);

const goToCalendar = () => {
  return dataPush(selectedActivities)
  .then(() => {
    navigation.navigate("CalendarWeek")
  })
}


   return (
	<View style={{flex:1}}>
		<ImageBackground
        source={require("../styles/images/gradient1.jpg")}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
     <View style={activityListStyle.list}>
      <Text style={{fontSize: 24, textAlign: 'center', padding: 20}}> Your personalised recommendations are ready!</Text>
	  <Text style={{fontSize: 20}}>Select all the activities you'd like to do on your trip:</Text>
         {data && data.length>0 ? (
             <View style={{padding: 20}}>
             {data.map((place, index) => (
                 <View key ={index}>
                    <ActivityCard place={place} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}></ActivityCard>
      
                 </View>
             ))}
           </View>
             ) : (
               <Text>Loading...</Text>
             )}

<Text style={{fontSize: 20, padding: 20}}>Happy with your selections?</Text>
<TouchableOpacity
            activeOpacity={0.8}
            onPress={() => goToCalendar()}
          >
            <View style={activityListStyle.calendarbtn}>
              <Text style={{ fontWeight: "bold" }}>View my calendar</Text>
            </View>
          </TouchableOpacity>
     </View>
	   </ImageBackground>
	 </View>
   );
}

const activityListStyle = StyleSheet.create({
list: {
	padding: 20,
	alignItems: 'center',
	backgroundColor: colours.lightpurple,
	opacity: 0.7
},
calendarbtn: {
	backgroundColor: colours.white,
	padding: 10,
	borderRadius: 7,
	opacity: 0.7
}
})
 


export default ActivitiesList;
