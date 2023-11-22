import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database'

const ProfileScreen = () => {
  const user = auth().currentUser;
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true)

  const getUserData = () => {
    try {
      let ref = database().ref(`/users/${auth().currentUser.uid}`);
      ref.on('value', (snapshot)=>{
        setData(snapshot.val())
        console.log(snapshot.val());
        setLoading(false)
      })
    } catch (error) {
      alert('Error Occured')
    }
  }

  useEffect(()=>{
    getUserData();
  }, [])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loading?<>
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        <Text style={styles.userName}>{user.displayName}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>

        {/* Contact Information Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <Text style={styles.cardText}>{user.email}</Text>
          {/* Add more contact information fields as needed */}
        </View>

        {/* Interests Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Interests</Text>
          <Text style={styles.cardText}>{data!==null?data.interests:'No Data Available'}</Text>
          {/* Add more interest fields as needed */}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.cardText}>{data!==null?data.about:'No Data Available'}</Text>
          {/* Add more interest fields as needed */}
        </View>

        {/* Additional Sections */}
        {/* Add more sections as needed, following the same structure */}
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      </>:<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
    paddingTop: 40,
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

export default ProfileScreen;
