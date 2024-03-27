import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { TimelineCalendar, EventItem } from "@howljs/calendar-kit";
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import dataFetch from "../utils/dataFetch";

enableExperimentalWebImplementation(true);


const CalendarWeek = () => {
  const generateRandomStartDate = () => {
    const random = getRandomDate1(new Date('2024-03-28T01:57:45.271Z'), new Date('2024-03-28T06:57:45.271Z'));
    return random.toISOString();
  }
  function getRandomDate1(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }
  
  const generateRandomEndDate = () => {
    const random = getRandomDate(new Date('2024-03-29T01:57:45.271Z'), new Date('2024-03-29T06:57:45.271Z'));
    return random.toISOString();
  }
  function getRandomDate(from, to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }


  const exampleEvents = [
    {
      color: '#A3C7D6',
      title: 'Louvre tour',
      start: generateRandomStartDate(),
      end: generateRandomEndDate(),
      id: 'fhfhgfgh',
    },
    {
      id: '45678',
      title: 'Paris tour',
      start: new Date('2024-03-27T11:00:05.313Z'),
      end: new Date('2024-03-27T14:00:05.313Z'),
      color: '#B1AFFF',
    },
];

// Generate random date in the above format, id can be anything (use doc.id), title can be place_name or text (look at firestore dummy date), color purple (according to palette)

const events = []

  dataFetch().then((activities) => {
    activities.forEach((activity) => {
      console.log(generateRandomStartDate(), "rando start from for each");
      console.log(generateRandomEndDate(), "rando end from for each");
      exampleEvents.push({id: activity.id, title: activity.place_name, start: generateRandomStartDate(), end: generateRandomEndDate(), color: '#B1AFFF' })
    })
    // exampleEvents = activities
  })
  console.log(events, "<<<<events");

  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar viewMode="week" events={exampleEvents} />
    </SafeAreaView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
  });