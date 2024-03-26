import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { TimelineCalendar } from "@howljs/calendar-kit";


const CalendarWeek = () => {
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