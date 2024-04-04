import moment from "moment";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import DateRangePicker from "rn-select-date-range";
import { useNavigation } from "@react-navigation/native";
import colours from "../styles/colours";

const DisplayDatePicker = ({setSelectedRange, selectedRange}) => {
  

  const navigation = useNavigation({});
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text 
        style={{ 
          textAlign: 'center',
          backgroundColor: colours.darkpurple,
          borderRadius: 7,

          marginBottom: 15,
          padding: 7,
          color: 'white', 
          fontSize: 35, 
          fontWeight: "bold" }}>When is your trip?</Text>
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
        {/* <View style={styles.container}>
          <Text>first date: {selectedRange.firstDate}</Text>
          <Text>second date: {selectedRange.secondDate}</Text>
        </View> */}
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
    backgroundColor: colours.lightpurple,
  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
});

export default DisplayDatePicker;