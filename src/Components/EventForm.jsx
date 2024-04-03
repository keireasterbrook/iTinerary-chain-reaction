import React from 'react';
import {SafeAreaView, StyleSheet, TextInput, Text, Button} from 'react-native';
import { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";


const EventForm = ({setStartDate, setEndDate, onChangeText, text}) => {
  const navigation = useNavigation()

    
    const [number, onChangeNumber] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

  

    const handleStartDateConfirm = (startDate) => {
      setStartDate(startDate);
      hideDatePicker();
    };
    
 
    
    return (
      <SafeAreaView >
        <TextInput
        required
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Event Title"
          keyboardType="default"
        />
        <Button title="Select Start Date and Time:" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleStartDateConfirm}
        onCancel={hideDatePicker}
      />
      <Button title='Submit' onPress={() => navigation.navigate("CalendarWeek")}></Button>

    
    
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default EventForm;