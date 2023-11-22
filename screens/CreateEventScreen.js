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
import TimeRangePicker from '../components/TimeRangePicker';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import storage from '@react-native-firebase/storage'
import AlertModal from '../components/AlertModal';
import LoadingModal from '../components/LoadingModal';
import { useNavigation } from '@react-navigation/native';

const CreateEventScreen = () => {
  const [eventName, setEventName] = useState('');
  const [eventTimings, setEventTimings] = useState(['Select', 'Timings']);
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('Select Date');
  const [uri, setUri] = useState('');
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();


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

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes}${period}`;
  };


  const handleCreateEvent = async() => {
    if(eventName===''||eventDescription===''||eventDate==='Select Date'||eventTimings[0]==='Select'||eventTimings[1]==='Timings'||uri===''){
      // AlertModal({true, })
      alert(`All Fields are mandatory including thumbnail!`)
    }else{
      try {
        setLoading(true)
        const uriRef = storage().ref(`/events-pics/${new Date().getTime()}`)
        await uriRef.putFile(uri).catch((err)=>{
          alert(err.message)
          setLoading(true)
        }).then(async()=>{
          let url = await uriRef.getDownloadURL();
          let time = new Date().getTime();
          let timeEvent = eventDate + " || " + formatTime(new Date(eventTimings[0])) + " - " + formatTime(new Date(eventTimings[1]))
          let host = auth().currentUser.displayName;
          let uid = auth().currentUser.uid
          database().ref(`/events/${time}`).set({
            eventName,
            eventTime: timeEvent,
            actualTime: eventTimings,
            actualDate: eventDate,
            host: host,
            uid: uid,
            id: time,
            thumbnail: url,
            eventDescription,
          }).catch((err)=>{
            alert(err.message)
            setLoading(true)
          }).then(()=>{
            database().ref(`/users/${uid}/events/${time}`).set({
              eventName,
            eventTime: timeEvent,
            actualTime: eventTimings,
            actualDate: eventDate,
            host: host,
            uid: uid,
            id: time,
            thumbnail: url,
            eventDescription,
            }).catch((Err)=>{
              alert(Err.message)
              setLoading(true)
            }).then(()=>{
              alert('Event Created!')
              setLoading(false)
              navigation.goBack();
              
            })
          })
        })

      } catch (error) {
        alert(error.message)
        setLoading(true)

      }
    }
  };

  const handlePickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
      });

      setUri(image.path);
      console.log(image.path);

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
            source={{
              uri:
                uri || 'https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/placeholder.png?alt=media&token=6bc18465-38a0-4f60-819f-ec8e3987a6b2',
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
          <Text style={{ color: 'black', fontSize: 18, marginLeft: 5 }}>Event Timings</Text>
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
          minimumDate={tomorrow}
          onConfirm={handleConfirm}
          date={tomorrow}
          onCancel={hideDatePicker}
        />

      </View>
      <LoadingModal isVisible={loading} />
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
