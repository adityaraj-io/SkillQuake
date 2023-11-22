import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import Events from '../components/Event';
import EventList from '../components/EventList';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

const EventsScreen = () => {
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true)

  const getEvents = () => {
    const ref = database().ref('/events');
    try {
      ref.on('value', (snapshot)=>{
        if(snapshot.exists()){
          setEvents(Object.values(snapshot.val()))
          setLoading(false)
        }else{
          setEvents(null)
          setLoading(false)
        }
      })
    } catch (error) {
      alert('Restart the app something went wrong')
    }
  }
  useEffect(()=>{
    getEvents();
  }, [])
  return (
    <>
    {!loading?<ScrollView style={styles.container}>
      <View>
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
      {events !==null ? (events).map((item) => (
              <Events eventName={item.eventName} onPress={()=>navigation.navigate('EventDetail',{
                eventName: item.eventName,
                eventTime: item.eventTime,
                eventDescription: item.eventDescription,
                eventLocation: 'online',
                eventImage: item.thumbnail,
                host: item.host,
                uid: item.uid,
                actualDate: item.actualDate
              })} eventTime={item.eventTime} imageSource={item.thumbnail} key={item.id} />
            )) :<>
            <View>
              <Text style={[styles.userEmail, { color: 'gray' }]}>No Events to Display</Text>
            </View>
            <View style={styles.separator}></View>
          </>}
      </ScrollView>
      <Text style={{ color: 'black', width: '100%', fontSize: 20, fontWeight: 'bold', marginVertical: 15 }}>
        All Events
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {events !==null ? (events).map((item) => (
              <EventList eventName={item.eventName} onPress={()=>navigation.navigate('EventDetail',{
                eventName: item.eventName,
                eventTime: item.eventTime,
                eventDescription: item.eventDescription,
                eventLocation: 'online',
                eventImage: item.thumbnail,
                uid: item.uid,
                host: item.host,
                actualDate: item.actualDate
              })} eventTime={item.eventTime} imageSource={item.thumbnail} host={item.host} key={item.id} />
            )) :<>
            <View>
              <Text style={[styles.userEmail, { color: 'gray' }]}>No Events to Display</Text>
            </View>
            <View style={styles.separator}></View>
          </>}
      </ScrollView>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      </View>
    </ScrollView>:<View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff'}}>
        <ActivityIndicator size={'small'} color={'royalblue'} />
        </View>}
    </>
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
