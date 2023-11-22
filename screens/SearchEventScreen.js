import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

// Dummy event data for testing
const dummyEventData = [
  { id: '1', name: 'Tech Conference 2023', location: 'Convention Center', date: 'Dec 15, 2023' },
  { id: '2', name: 'Art Exhibition', location: 'Art Gallery', date: 'Jan 5, 2024' },
  { id: '3', name: 'Fitness Workshop', location: 'Fitness Center', date: 'Feb 20, 2024' },
  // Add more dummy events as needed
];

const SearchEventScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Replace this with your actual logic for searching events based on the searchQuery
    const filteredEvents = dummyEventData.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredEvents);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() =>
        navigation.navigate('EventDetail', {
          eventName: item.name,
          eventLocation: item.location,
          eventDate: item.date,
          eventDescription:
      'Join us for an exciting day of technology discussions, workshops, and networking. Learn from industry experts and connect with fellow tech enthusiasts.',
          // Add more event details as needed
        })
      }
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventLocation}>{item.location}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>
    </TouchableOpacity>
  );

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
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.eventList}
      />
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
