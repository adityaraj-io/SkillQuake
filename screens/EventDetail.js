import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const EventDetailScreen = ({ route, navigation }) => {
  const { eventName, eventTime, eventLocation, eventDescription, eventImage, host, actualDate, uid } = route.params;
  const user = auth().currentUser;
  const [isJoinButtonEnabled, setJoinButtonEnabled] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: eventName,
    });

    // Check if the event time is today and within the specified time range
    const eventDateTime = new Date(actualDate + ' ' + eventTime.split(' || ')[1]);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (eventDateTime === today) {
      setJoinButtonEnabled(true);
    }
  }, []);

  const handleJoinEvent = () => {
    if (isJoinButtonEnabled) {
      console.log(`Joined event: ${eventName}`);
    } else {
      console.log(`Event time has not arrived yet.`);
      Alert.alert('Notification', 'You will be notified when the event becomes available.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: eventImage }} style={styles.eventImage} />
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.eventTime}>{eventTime}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SeeProfile', {host, hostid: uid})}>
        <Text style={[styles.eventLocation, {color: 'green'}]}>{eventLocation} organized by {host}</Text>
        </TouchableOpacity>
        <Text style={styles.eventLocation}>This event is going to be held on {actualDate}</Text>
        <Text style={styles.eventDescription}>{eventDescription}</Text>

        {/* Join Event Button */}
        <TouchableOpacity
          style={[styles.joinButton, { backgroundColor: isJoinButtonEnabled ? 'royalblue' : 'gray' }]}
          onPress={handleJoinEvent}
          disabled={!isJoinButtonEnabled}>
          <Text style={styles.joinButtonText}>{isJoinButtonEnabled ? user.uid===uid?'Start Event':'Join Event' :  user.uid===uid?'Can\'t Start Event Now':'Can\'t Join Event Now'}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  eventImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: 'gray',
  },
  eventDetailsContainer: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  eventTime: {
    fontSize: 18,
    color: 'royalblue',
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  joinButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notifyButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  notifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventDetailScreen;
