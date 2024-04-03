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


  const holidayStartDate = "2024-04-03";
  const holidayDuration = 10;

  function generateRandomTimeSlotISO(startDaate, durationInDays) {
    const startHour = 8;
    const endHour = 17;

    const holidayStart = new Date(startDaate);
    const holidayEnd = new Date(holidayStart);
    holidayEnd.setDate(holidayStart.getDate() + durationInDays);

    const randomTime = new Date(
      holidayStart.getTime() +
        Math.random() * (holidayEnd.getTime() - holidayStart.getTime())
    );

    randomTime.setHours(
      Math.floor(Math.random() * (endHour - startHour)) + startHour,
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 60),
      Math.floor(Math.random() * 1000)
    );

    const endTime = new Date(randomTime.getTime());
    endTime.setHours(endTime.getHours() + 1);

    const startTimeISO = randomTime.toISOString();
    const endTimeISO = endTime.toISOString();

    return { start: startTimeISO, end: endTimeISO };
  }

  const timeSlot = generateRandomTimeSlotISO(holidayStartDate, holidayDuration)

  console.log(timeSlot, "<<<<< This is time slot");


      
      useEffect(() => {
        dataFetch().then((activities) => {

          const newEvents = activities.slice(0, 4).map((activity) => {
            const { start, end } = generateRandomTimeSlotISO(
              holidayStartDate,
              holidayDuration
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
        key={manualEvent.id}
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
