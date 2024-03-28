import { SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { TimelineCalendar } from "@howljs/calendar-kit";
import { enableExperimentalWebImplementation } from 'react-native-gesture-handler';
import dataFetch from "../utils/dataFetch";

enableExperimentalWebImplementation(true);


const CalendarWeek = () => {
  const [events, setEvents] = useState([]);

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
      setEvents(newEvents)
    });
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar viewMode="week" events={events} />
    </SafeAreaView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
  });