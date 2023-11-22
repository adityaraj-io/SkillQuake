import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const EventDetailScreen = ({ route, navigation }) => {
  // Assume that the event details are passed through navigation route params
  const { eventName, eventTime, eventLocation, eventDescription, eventImage } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: eventName,
    });
  }, []);

  const handleJoinEvent = () => {
    // Implement your logic for joining the event
    // This could include navigating to a registration screen or any other relevant action
    console.log(`Joined event: ${eventName}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: eventImage }} style={styles.eventImage} />
      <View style={styles.eventDetailsContainer}>
        <Text style={styles.eventName}>{eventName}</Text>
        <Text style={styles.eventTime}>{eventTime}</Text>
        <Text style={styles.eventLocation}>{eventLocation}</Text>
        <Text style={styles.eventDescription}>{eventDescription}</Text>

        {/* Join Event Button */}
        <TouchableOpacity style={styles.joinButton} onPress={handleJoinEvent}>
          <Text style={styles.joinButtonText}>Join Event</Text>
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
});

export default EventDetailScreen;
