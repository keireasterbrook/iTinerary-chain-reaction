import React, { useState } from 'react'
import { View, SafeAreaView } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { TimelineCalendar } from '@howljs/calendar-kit';


function CalendarMonth() {
  const [selected, setSelected] = useState("");

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedDotColor: "orange",
          },
        }}
      />
    </View>
  );
}

export default CalendarMonth;