import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import Events from '../components/Event';
import EventList from '../components/EventList';
import { useNavigation } from '@react-navigation/native';

const EventsScreen = () => {
  const navigation = useNavigation();
  const dummyEventData = {
    eventName: 'Tech Conference 2023',
    eventTime: 'December 15, 2023 | 9:00 AM - 5:00 PM',
    eventLocation: 'Convention Center, City Name',
    eventDescription:
      'Join us for an exciting day of technology discussions, workshops, and networking. Learn from industry experts and connect with fellow tech enthusiasts.',
    eventImage: 'https://example.com/event-image.jpg', 
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={{ color: 'black', width: '100%', fontSize: 20, fontWeight: 'bold' }}>
        Hi, {auth().currentUser.displayName}
      </Text>
      <Text style={{ color: 'gray', width: '100%', fontSize: 18, marginBottom: 15, marginTop: 5 }}>
        Let's Explore Some Events and try to learn something new!
      </Text>
      <TouchableOpacity onPress={()=>navigation.navigate('CreateEvent')} style={[styles.search, { marginVertical: 5, backgroundColor: 'royalblue' }]}>
        <Text style={{ color: '#fff' }}>Create an Event </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.search} onPress={()=>navigation.navigate('SearchEvent')} >
        <Text style={{ color: 'gray' }}>Search Events</Text>
      </TouchableOpacity>
      <Text style={{ color: 'black', width: '100%', fontSize: 20, fontWeight: 'bold', marginVertical: 15 }}>
        Recommended Events
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Events eventName='App Agency Tour' eventTime='24 Nov, 2023' onPress={()=>navigation.navigate('EventDetail', {
          eventName: dummyEventData.eventName, eventTime: dummyEventData.eventTime, eventLocation: dummyEventData.eventLocation, eventDescription: dummyEventData.eventDescription, eventImage: dummyEventData.eventImage
        })} />
        <Events eventName='Au Agency Tour' eventTime='24 Nov, 2023' />
      </ScrollView>
      <Text style={{ color: 'black', width: '100%', fontSize: 20, fontWeight: 'bold', marginVertical: 15 }}>
        All Events
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EventList eventName='Python Class' eventTime='23 Nov, 2023' />
        <EventList eventName='Python Class' eventTime='23 Nov, 2023' />
        <EventList eventName='Python Class' eventTime='23 Nov, 2023' />
        <EventList eventName='Python Class' eventTime='23 Nov, 2023' />
      </ScrollView>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </ScrollView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 60
  },
  search: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
