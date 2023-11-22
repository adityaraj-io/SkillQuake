import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TimePickerAndroid, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeRangePicker = ({ onChange, value }) => {
  const defaultDate = new Date();
  const [startTime, setStartTime] = useState(value[0] instanceof Date ? value[0] : defaultDate);
  const [endTime, setEndTime] = useState(value[1] instanceof Date ? value[1] : defaultDate);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isStartTime, setIsStartTime] = useState(true);

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime !== undefined) {
      const newTime = new Date(selectedTime);
      if (isStartTime) {
        setStartTime(newTime);
      } else {
        setEndTime(newTime);
      }
      onChange([startTime, endTime]);
      console.log([startTime, endTime]);
    }
    setShowTimePicker(false);
  };

  const showTimePickerModal = (isStartTime) => {
    setShowTimePicker(true);
    setIsStartTime(isStartTime);
  };

  return (
    <View style={styles.timeRangeContainer}>
      <TouchableOpacity style={styles.timeRangeButton} onPress={() => showTimePickerModal(true)}>
        <Text style={styles.timeRangeButtonText}>
          {startTime instanceof Date && startTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      <Text style={styles.separator}>-</Text>
      <TouchableOpacity style={styles.timeRangeButton} onPress={() => showTimePickerModal(false)}>
        <Text style={styles.timeRangeButtonText}>
          {endTime instanceof Date && endTime.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={isStartTime ? startTime : endTime}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  timeRangeButtonText: {
    color: 'gray',
    fontSize: 18,
  },
  separator: {
    marginHorizontal: 10,
    color: 'gray',
    fontSize: 18,
  },
});

export default TimeRangePicker;
