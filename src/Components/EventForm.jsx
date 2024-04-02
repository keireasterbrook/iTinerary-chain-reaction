import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { useState } from 'react';


const EventForm = () => {

    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');
  
    return (
      <SafeAreaView>
        <TextInput
        required
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter Event Title"
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Choose start (picker)"
          keyboardType="default"
        />
         <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Choose end (picker)"
          keyboardType="default"
        />
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