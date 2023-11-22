import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database';
import EventList from '../components/EventList';

const SearchEventScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getEvents = () => {
    const ref = database().ref('/events');
    try {
      ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
          const allEvents = Object.values(snapshot.val());
          setEvents(allEvents);
          setFilteredEvents(allEvents); // Initialize filtered events with all events
          setLoading(false);
        } else {
          setEvents([]);
          setFilteredEvents([]);
          setLoading(false);
        }
      });
    } catch (error) {
      alert('Restart the app, something went wrong');
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleSearch = () => {
    // Filter events based on the search query
    const filtered = events.filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.host.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Events"
        placeholderTextColor={'gray'}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={handleSearch}
      />

      {!loading ? (
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => (
            <EventList
              eventName={item.eventName}
              onPress={() =>
                navigation.navigate('EventDetail', {
                  eventName: item.eventName,
                  eventTime: item.eventTime,
                  eventDescription: item.eventDescription,
                  eventLocation: 'online',
                  eventImage: item.thumbnail,
                  uid: item.uid,
                  host: item.host,
                  actualDate: item.actualDate,
                })
              }
              eventTime={item.eventTime}
              imageSource={item.thumbnail}
              host={item.host}
              key={item.id}
            />
          )}
        />
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#fff' }}>
          <ActivityIndicator size={'small'} color={'royalblue'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchInput: {
    height: 40,
    // borderColor: 'gray',
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black'
    
  },
  eventList: {
    flex: 1,
  },
  eventItem: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000'
  },
  eventLocation: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: 'royalblue',
  },
});

export default SearchEventScreen;
