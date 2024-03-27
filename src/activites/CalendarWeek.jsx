import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { TimelineCalendar, EventItem } from "@howljs/calendar-kit";
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import dataFetch from "../utils/dataFetch";

enableExperimentalWebImplementation(true);


const CalendarWeek = () => {

  const exampleEvents = [
    {
      id: '1',
      title: 'Louvre tour',
      start: new Date('2024-03-28T09:00:05.313Z'),
      end: new Date('2024-03-28T12:00:05.313Z'),
      color: '#A3C7D6',
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
    // exampleEvents = activities
  })

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