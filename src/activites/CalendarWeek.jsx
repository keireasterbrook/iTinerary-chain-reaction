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
import { generateRandomTimeSlotISO } from "../utils/generateRandomTime";
import colours from "../styles/colours";

const CalendarWeek = ({startDate, text, collectionName, selectedRange}) => {
  const [events, setEvents] = useState([]);

  const firstDay = new Date(selectedRange.firstDate)
  const lastDay = new Date(selectedRange.secondDate)
  const timeDifferenceMS = lastDay - firstDay
  const timeDifferenceDays = Math.floor(timeDifferenceMS / 86400000)
      
      useEffect(() => {
        dataFetch(collectionName).then((activities) => {

          const newEvents = activities.map((activity) => {
            const { start, end } = generateRandomTimeSlotISO(
              firstDay,
              (timeDifferenceDays+1)
            );
            return {
              id: activity.properties.id,
              title: activity.properties.name,
              start: start,
              end: end,
              color: colours.lightpurple,
            };
          });
          setEvents(newEvents);
        });
      }, []);

      const hourAdder = (time) => {
        const stringTime = time.toLocaleTimeString('en-GB')
        const slicedNum = stringTime.slice(0, 2)
        let number = Number(slicedNum)
        if(number === 9){
          number = 10
        } else {
          number += 1
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
        setEvents(events => [...events, manualEvent]);
      },[startDate])
    
    const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("EventForm")}>
          <Text style={styles.buttontext}>Add an event</Text>
        </TouchableOpacity>
      {/* <Button 
      title='Add An Event' 
      color={colours.darkpurple} 
      onPress={() => navigation.navigate("EventForm")}/> */}
      <TimelineCalendar
        key={manualEvent.id}
        start={8}
        viewMode="threeDays"
        events={events}
        allowPinchToZoom
        initialTimeIntervalHeight={60}
        minTimeIntervalHeight={29}
        maxTimeIntervalHeight={110}
        theme={{
          //Saturday style
          saturdayName: { color: colours.darkpurple },
          saturdayNumber: { color: colours.darkpurple },
          saturdayNumberContainer: { backgroundColor: 'white' },

          //Sunday style
          sundayName: { color: colours.darkpurple },
          sundayNumber: { color: colours.darkpurple },
          sundayNumberContainer: { backgroundColor: 'white' },

          //Today style
          todayName: { color: colours.darkpurple },
          todayNumber: { color: 'white' },
          todayNumberContainer: { backgroundColor: colours.darkpurple },
      
          //Normal style
          dayName: { color: colours.darkpurple },
          dayNumber: { color: colours.darkpurple },
          dayNumberContainer: { backgroundColor: 'white' },
        }}
        />
    </SafeAreaView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
  container: { flex: 1, 
    backgroundColor: "#FFF" },
    button: {
      backgroundColor: colours.lightpurple,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',

    },
    buttontext: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold'
      

    }
});
