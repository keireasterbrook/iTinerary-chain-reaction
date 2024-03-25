import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TimelineCalendar } from "@howljs/calendar-kit";
import dataFetch from "../firebase/activities";

const CalendarWeek = () => {

    useEffect(() => {
        dataFetch()
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar viewMode="week" />
    </SafeAreaView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
  });