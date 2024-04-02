enableExperimentalWebImplementation(true);
import React, { useEffect, useState } from "react";
import { TimelineCalendar } from "@howljs/calendar-kit";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Button
} from "react-native";
import { enableExperimentalWebImplementation } from "react-native-gesture-handler";
import { dataFetch }from "../utils/dataFetch";
import { useNavigation } from "@react-navigation/native";
import uuid from 'react-native-uuid';



const CalendarWeek = ({startDate, text}) => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  
  // Will need to change the data range when date picker is sorted (hardcoded in these two functions at the moment)
  const generateRandomStartDate = () => {
    const random = getRandomDate1(
      new Date("2024-03-28T01:57:45.271Z"),
      new Date("2024-03-28T10:57:45.271Z")
      );
      return random;
    };
    function getRandomDate1(from, to) {
      const fromTime = from.getTime();
      const toTime = to.getTime();
      return new Date(fromTime + Math.random() * (toTime - fromTime));
    }
    const generateRandomEndDate = () => {
      const random = getRandomDate(
        new Date("2024-03-29T01:57:45.271Z"),
        new Date("2024-03-29T20:57:45.271Z")
        );
        return random;
      };
      function getRandomDate(from, to) {
        const fromTime = from.getTime();
        const toTime = to.getTime();
        return new Date(fromTime + Math.random() * (toTime - fromTime));
      }
      
      useEffect(() => {
        dataFetch().then((activities) => {
          const newEvents = activities.map((activity) => ({
            id: activity.id,
            title: activity.place_name,
            start: generateRandomStartDate(),
            end: generateRandomEndDate(),
            color: "#B1AFFF",
          }));
          setEvents(newEvents);
      
        });
      }, []);

      function hourAdder(time) {
        const stringTime = time.toLocaleTimeString('en-GB')
        const slicedNum = stringTime.slice(0, 2)
        const number = Number(slicedNum)
        if(number === 9){
          number = 10
        } else {
          number + 1
        }
        const returnTimeString = time.toISOString()
        const newTime =  number + stringTime.slice(2)
       
        return returnTimeString.slice(0, 11) + newTime + returnTimeString.slice(-5)
      }

      const manualEvent = {
        id: uuid.v4(),
        title: text,
        start: startDate,
        end: startDate ? hourAdder(startDate) : '',
        color: "#B1AFFF"
      }

      useEffect(() => {
        setEvents([...events, manualEvent]);
      },[startDate])

      console.log(events, "EVENTS")
    
    const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Button 
      title='Add An Event' 
      onPress={() => navigation.navigate("EventForm")}/>
      <TimelineCalendar
        viewMode="week"
        events={events}
        allowPinchToZoom
        initialTimeIntervalHeight={60}
        minTimeIntervalHeight={29}
        maxTimeIntervalHeight={110}/>
    </SafeAreaView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
});
