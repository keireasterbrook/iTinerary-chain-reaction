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
import { hourAdder } from "../utils/hourAdder";

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
              color: "#B1AFFF",
            };
          });
          setEvents(newEvents);
        });
      }, []);


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
    
    const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Button 
      title='Add An Event' 
      color={'#B1AFFF'}
      onPress={() => navigation.navigate("EventForm")}/>
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
          saturdayName: { color: '#7f7dff' },
          saturdayNumber: { color: '#7f7dff' },
          saturdayNumberContainer: { backgroundColor: 'white' },

          //Sunday style
          sundayName: { color: '#7f7dff' },
          sundayNumber: { color: '#7f7dff' },
          sundayNumberContainer: { backgroundColor: 'white' },

          //Today style
          todayName: { color: '#7f7dff' },
          todayNumber: { color: 'white' },
          todayNumberContainer: { backgroundColor: '#7f7dff' },
      
          //Normal style
          dayName: { color: "#7f7dff" },
          dayNumber: { color: "#7f7dff" },
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
});
