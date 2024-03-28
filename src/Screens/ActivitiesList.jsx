import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from "@react-navigation/native";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../Components/ActivityCard";

const searchBox_API_KEY =
  "?access_token=sk.eyJ1IjoiYWh1c3M5OCIsImEiOiJjbHU2d3oyaGIyNjVrMmlzM3Q1d3ZkMDAyIn0.Z8t1arJJokTQXfGF0-KJzw&language=en&limit=5";

const searchBoxApi = axios.create({
  baseURL: "https://api.mapbox.com/search/searchbox/v1/",
});

const ActivitiesList = ({ user, handleAuthentication }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([])
  const [likedStates, setLikedStates] = useState({})

  useEffect(() => {
    searchBoxApi.get(`category/museum${searchBox_API_KEY}`).then((response) => {
      setData(response.data.features);
    });
  }, []);

    const handlePressFavourite = (place) => {
      setLikedStates((prevState) => ({
        ...prevState,
        [place.properties.mapbox_id]: !prevState[place.properties.mapbox_id], // Toggle the liked state for this activity
      }));
  
      // Update selectedActivities based on the liked state
      if (!likedStates[place.properties.mapbox_id]) {
        setSelectedActivities([...selectedActivities, place]);
        console.log(selectedActivities, "activities with new one added")
      } else {
        setSelectedActivities(selectedActivities.filter((activity) => activity.properties.mapbox_id !== place.properties.mapbox_id))
        console.log(selectedActivities, "activities with one removed");
      }
    }

   return (
     <View style={styles.authContainer}>
         {data && data.length>0 ? (
             <View>
             {data.map((place, index) => (
                 <View key ={index}>
                    <ActivityCard place={place}></ActivityCard>
                    <Button title="❤️" onPress={() =>handlePressFavourite(place)}></Button>
                 </View>
             ))}
           </View>
             ) : (
               <Text>Loading...</Text>
             )}
      
       <Button
         title="I am happy with these choices"
         onPress={() => navigation.navigate("Itinerary-calendar")}
       ></Button>
     </View>
   );
}

 


export default ActivitiesList;
