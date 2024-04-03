import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
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
	const {destination,city,holidayLength,food,dayActivity,nightActivity} = holidayObj;
	useEffect(() => {
		setFoodData(holidayObj.food);
		setDayData(holidayObj.dayActivity);
		setNightData(holidayObj.nightActivity);
		console.log(holidayObj, 'im in the activity lisst!!');
	}, []);
	
	console.log(selectedActivities, "selected activities")
	const categories = {
		food: [
			{
				name: 'Mexican',
				query: 'Mexican_restaurant'
			},
			{
				name: 'Cafe',
				query: 'Cafe'
			},
			{
				name: 'Italian',
				query: 'italian_restaurant'
			},
			{
				name: 'American',
				query: 'american_restaurant'
			},
			{
				name: 'Seafood',
				query: 'seafood_restaurant'
			},
			{
				name: 'Bakery',
				query: 'Bakery'
			},
			{
				name: 'Coffee',
				query: 'Coffee'
			},
			{
				name: 'Dessert Shop',
				query: 'dessert_shop'
			},
			{
				name: 'Pizza',
				query: 'pizza_restaurant'
			},
			{
				name: 'Ice Cream',
				query: 'ice_cream'
			},
			{
				name: 'Burger',
				query: 'burger_restaurant'
			},
			{
				name: 'Steakhouse',
				query: 'Steakhouse'
			},
			{
				name: 'Gastropub',
				query: 'Gastropub'
			}
		],
		daytimeActivities: [
			{
				name: 'Shopping',
				query: 'shopping'
			},
			{
				name: 'Outdoor Activities',
				query: 'outdoors'
			},
			{
				name: 'Tourist Attractions',
				query: 'tourist_attraction'
			},
			{
				name: 'Art & History',
				query: 'museum'
			},
			{
				name: 'Sports',
				query: 'sports'
			}
		],
		nighttimeActivities: [
			{
				name: 'Party',
				query: 'nightclub'
			},
			{
				name: 'Pub',
				query: 'pub'
			},
			{
				name: 'Bar',
				query: 'bar'
			},
			{
				name: 'Live Entertainment',
				query: 'entertainment'
			}
		]
	};
	const convertToQuery = (category, option) => {
		const lowerOption = option.toLowerCase();
		const selectedCategory = categories[category];
		const selectedQuery = selectedCategory.find(item => {
			return lowerOption.includes(item.name.toLowerCase());
		});
	
		return selectedQuery ? selectedQuery.query : '';
	};
	console.log(
		foodData,
		dayData,
		nightData,
		'the data of all the stuff we need to list '
	);

	useEffect(() => {
		if (city && destination) {
			axios
				.get(
					`https://api.api-ninjas.com/v1/geocoding?city=${city}`
				)
				.then((response) => {
					console.log(response.data);
					console.log(city);
					console.log(destination);
				})
				.catch((error) => {
					console.error('Error fetching geocoding data:', error);
				});
		}
	}, [city, destination]);

	useEffect(() => {
		setFoodData([]);
	

		food.forEach((restaurant, index) => {
			searchBoxApi
				.get(`category/${convertToQuery('food', restaurant)}${searchBox_API_KEY}`)
				.then((response) => {

					console.log(response.data.features)
					setFoodData(prevData => [...prevData, ...response.data.features]);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		});
	}, [food]);
	useEffect(() => {

		setDayData([]);
	

		dayActivity.forEach((activity, index) => {
			searchBoxApi
				.get(`category/${convertToQuery('daytimeActivities', activity)}${searchBox_API_KEY}`)
				.then((response) => {
					console.log(response.data.features)
					setDayData(prevData => [...prevData, ...response.data.features]);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		});
	}, [dayActivity]);
	useEffect(() => {
		setNightData([]);
	
		nightActivity.forEach((activity, index) => {
			searchBoxApi
				.get(`category/${convertToQuery('nighttimeActivities', activity)}${searchBox_API_KEY}`)
				.then((response) => {
					console.log(response.data.features)
					setNightData(prevData => [...prevData, ...response.data.features]);
				})
				.catch((error) => {
					console.error('Error fetching data:', error);
				});
		});
	}, [nightActivity]);

const collectionName = holidayObj.destination
const goToCalendar = () => {
  return dataPush({collectionName, selectedActivities})
  .then(() => {
    navigation.navigate("CalendarWeek")
  })
}


   return (
	<ScrollView style={{flex:1}}>
		<ImageBackground
        source={require("../styles/images/gradient1.jpg")}
        style={{ flex: 1, width: "100%", height: "100%" }}
      >
     <View style={activityListStyle.list}>
      <Text style={{fontSize: 24, textAlign: 'center', padding: 20}}> Your personalised recommendations are ready!</Text>
	  <Text style={{fontSize: 20}}>Select all the activities you'd like to do on your trip:</Text>
         
		 
	  {foodData && foodData.length > 0 ? (
			
			<View>
				<Text>
				Your Food Options!
				</Text>
				{foodData.map((place, index) => (
					<View key={index}>
						<ActivityCard
							place={place}
							selectedActivities={selectedActivities}
							setSelectedActivities={
								setSelectedActivities
							}></ActivityCard>
					</View>
				))}
				<Text>
				Day Time activity Options!
				</Text>
					{dayData.map((place, index) => (
					<View key={index}>
						<ActivityCard
							place={place}
							selectedActivities={selectedActivities}
							setSelectedActivities={
								setSelectedActivities
							}></ActivityCard>
					</View>
				))}
				<Text>
				Night Time activity Options!
				</Text>
				{nightData.map((place, index) => (
					<View key={index}>
						<ActivityCard
							place={place}
							selectedActivities={selectedActivities}
							setSelectedActivities={
								setSelectedActivities
							}></ActivityCard>
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
	 </ScrollView>
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
