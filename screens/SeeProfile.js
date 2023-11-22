import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image , ScrollView, ActivityIndicator } from 'react-native';
import database from '@react-native-firebase/database'
import Events from '../components/Event';

const SeeProfile = ({route, navigation}) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([]);
  const {host, hostid} = route.params;
 

  const getUserData = () => {
    try {
      let ref = database().ref(`/users/${hostid}`);
      ref.on('value', (snapshot) => {
        setData(snapshot.val())
        if(snapshot.val().events){
          setEvents(Object.values(snapshot.val().events));
        }else{
          setEvents(null)
        }
        setLoading(false)
      })
    } catch (error) {
      alert('Error Occured')
    }
  }

  useEffect(() => {
    getUserData();
    navigation.setOptions({
        headerTitle: host,
    })
  }, [])
  return (
  <ScrollView contentContainerStyle={styles.container}>
      {!loading ? <>
        <View style={styles.profileContainer}>
          <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          <Text style={styles.userName}>{data.name}</Text>
          <Text style={styles.userEmail}>{data.email}</Text>
          {/* <View style={styles.separator}></View> */}
          
          {/* Contact Information Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Contact Information</Text>
            <Text style={styles.cardText}>{data.email}</Text>
            {/* Add more contact information fields as needed */}
          </View>

          {/* Interests Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Interests</Text>
            <Text style={styles.cardText}>{data !== null ? data.interests : 'No Data Available'}</Text>
            {/* Add more interest fields as needed */}
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>About</Text>
            <Text style={styles.cardText}>{data !== null ? data.about : 'No Data Available'}</Text>
            {/* Add more interest fields as needed */}
          </View>

          {/* Additional Sections */}
          {/* Add more sections as needed, following the same structure */}
          <Text style={[styles.userName, { textAlign: 'left', width: '100%', fontSize: 18, marginLeft: 10 }]}>Organized Events</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginVertical: 10 }}>
            {events !==null ? (events).map((item) => (
              <Events eventName={item.eventName} eventTime={item.eventTime} onPress={()=>navigation.navigate('EventDetail',{
                eventName: item.eventName,
                eventTime: item.eventTime,
                eventDescription: item.eventDescription,
                eventLocation: 'online',
                eventImage: item.thumbnail,
                uid: item.uid,
                host: item.host,
                actualDate: item.actualDate
              })} imageSource={item.thumbnail} key={item.id} />
            )) :<>
            <View>
              <Text style={[styles.userEmail, { color: 'gray' }]}>No Events Organized</Text>
            </View>
            <View style={styles.separator}></View>
          </>}
            {/* <Events eventName='Au Agency Tour' eventTime='24 Nov, 2023' /> */}
          </ScrollView>
        </View>
      </> : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'small'} color={'royalblue'} />
      </View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginBottom: 5
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    backgroundColor: 'gray'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.2, // for iOS shadow
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'royalblue',
  },
  cardText: {
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SeeProfile;
