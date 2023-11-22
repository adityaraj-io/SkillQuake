import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import TimeRangePicker from '../components/TimeRangePicker'; // Adjust the path accordingly

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [eventTimings, setEventTimings] = useState(['Select', 'Timings']);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(['Select Date']);
  const [uri, setUri] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    var inputDate = new Date(date);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var formattedDate =
      inputDate.getUTCDate() + " " + months[inputDate.getUTCMonth()] + ", " + inputDate.getUTCFullYear();
    setEventDate(formattedDate);
    hideDatePicker();
  };

  const handleCreateEvent = () => {
    // Add your logic to handle creating the event
  };

  const handlePickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });

      setUri(image.path);
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePickImage}>
          <Image
            style={styles.image}
            progressiveRenderingEnabled
            defaultSource={require('../assets/images/placeholder.png')}
            source={{
              uri:
                uri||'https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/placeholder.png?alt=media&token=6bc18465-38a0-4f60-819f-ec8e3987a6b2',
            }}
            // alt='r'
          />
          <Text style={{ color: 'gray', textAlign: 'center' }}>
            Set Event Thumbnail
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Create Event</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            placeholderTextColor={'gray'}
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Description"
            multiline
            placeholderTextColor={'gray'}
            value={eventDescription}
            onChangeText={(text) => setEventDescription(text)}
          />
          <TouchableOpacity onPress={showDatePicker} style={styles.input}>
            <Text style={{ color: 'gray', fontSize: 18 }}>{eventDate}</Text>
          </TouchableOpacity>

          {/* Integrated TimeRangePicker component */}
          <Text style={{color: 'black', fontSize: 18, marginLeft: 5}}>Event Timings</Text>
          <TimeRangePicker onChange={setEventTimings} value={eventTimings} />

        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateEvent}
        >
          <Text style={styles.createButtonText}>Create Event</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          date={new Date()}
          onCancel={hideDatePicker}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 18,
    color: '#333',
  },
  createButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: 'gray',
  },
});

export default CreateEventScreen;
