import { View, Text, Button } from "react-native";
import { styles } from "../../App";
import { useNavigation } from "@react-navigation/native";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import ActivityCard from "../Components/ActivityCard";
import { dataPush } from "../utils/dataFetch";

const searchBox_API_KEY =
  "?access_token=sk.eyJ1IjoiYWh1c3M5OCIsImEiOiJjbHU2d3oyaGIyNjVrMmlzM3Q1d3ZkMDAyIn0.Z8t1arJJokTQXfGF0-KJzw&language=en&limit=5";

const searchBoxApi = axios.create({
  baseURL: "https://api.mapbox.com/search/searchbox/v1/",
});

const ActivitiesList = ({ user, handleAuthentication }) => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([])

  useEffect(() => {
    searchBoxApi.get(`category/museum${searchBox_API_KEY}`).then((response) => {
      setData(response.data.features);
    });
  }, []);

const goToCalendar = () => {
  return dataPush(selectedActivities)
  .then(() => {
    navigation.navigate("Itinerary-calendar")
  })
}


   return (
     <View style={styles.authContainer}>
      <Text>Here are your reccomendations! Select all the activities you'd like to do on your trip:</Text>
         {data && data.length>0 ? (
             <View>
             {data.map((place, index) => (
                 <View key ={index}>
                    <ActivityCard place={place} selectedActivities={selectedActivities} setSelectedActivities={setSelectedActivities}></ActivityCard>
      
                 </View>
             ))}
           </View>
             ) : (
               <Text>Loading...</Text>
             )}
       <Button
         title="Go to calendar"
         onPress={() => goToCalendar()}
       ></Button>
     </View>
   );
}

 


export default ActivitiesList;
