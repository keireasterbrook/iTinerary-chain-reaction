import moment from "moment";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DateRangePicker from "rn-select-date-range";
import { useNavigation } from "@react-navigation/native";

const DisplayDatePicker = ({setSelectedRange, selectedRange}) => {
  

  const navigation = useNavigation({});
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>When is your trip?</Text>
        <DateRangePicker
          onSelectDateRange={(range) => {
            setSelectedRange(range);
          }}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          confirmBtnTitle="Submit"
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
          onConfirm={() => navigation.navigate("ChatBot")}
        />
        <View style={styles.container}>
          <Text>first date: {selectedRange.firstDate}</Text>
          <Text>second date: {selectedRange.secondDate}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});

export default DisplayDatePicker;