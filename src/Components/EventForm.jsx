import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import colours from '../styles/colours';

const EventForm = ({ setStartDate, startDate, onChangeText, text }) => {
  const navigation = useNavigation();

  const [dateSelected, setDateSelected] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (selectedStartDate) => {
    setStartDate(selectedStartDate);
    setDateSelected(true);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../styles/images/ferriswheel.jpg')} style={styles.backgroundImage}>
        <TextInput
          required
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Event Title"
          keyboardType="default"
        />
        <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Select Start Date and Time</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleStartDateConfirm}
          onCancel={hideDatePicker}
          buttonTextColorIOS={colours.darkpurple}
        />
        {dateSelected && (
          <Text style={styles.showDate}>Selected Date: {startDate.toLocaleString('en-GB', { timeZone: 'UTC' })}</Text>
        )}
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("CalendarWeek")}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '130%',
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 50,
    marginBottom: 20,
    borderColor: colours.darkpurple,
    backgroundColor: colours.lightpurple,
    color: 'white',
  },
  datePickerButton: {
    backgroundColor: colours.darkpurple,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  showDate: {
    textAlign: 'center',
    color: colours.darkpurple,
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: colours.darkpurple,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventForm;
