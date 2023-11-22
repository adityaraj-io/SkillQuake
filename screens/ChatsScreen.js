import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import ChatItem from '../components/ChatItem';
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ChatsScreen = () => {

  const user = auth().currentUser;
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getChats = () => {
    const ref = database().ref(`/users/${user.uid}/chats`);
    try {
      ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
          setChats(Object.values(snapshot.val()))

          setLoading(false)
        } else {
          setChats(null)
          console.log('Chats doesn\'t exist');
          setLoading(false)

        }
      })
    } catch (error) {
      alert(error.message + ' Restart the app!')
    }

  }

  useEffect(() => {
    getChats();
  }, [])

  return (
    <>
      {!loading ? <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('SearchPeople')} style={[styles.search, { alignSelf: 'center' }]}>
            <Text style={{ color: 'gray' }}>Search Chats</Text>
          </TouchableOpacity>

          {
            chats !== null || chats !== undefined ? chats.map((chat) => (
              <ChatItem
                key={chat.uid} // Add a unique key prop for each item
                lastMessage={chat ? chat.lastMessage : ''}
                profileImageUri={chat ? chat.profileImage : ''}
                badgeCount={chat ? chat.unreadMessages : 0}
                isBadgeShown={chat.unreadMessages ? chat.unreadMessages !== 0 : false}
                lastMessageTime={chat ? chat.lastMessageTime : ''}
                borderShown
                onPress={() => navigation.navigate('MessageScreen', {
                  ruid: chat.uid,
                  rname: chat.username
                })}
                userName={chat ? chat.username : ''}
              />
            )) : <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: Dimensions.get('window').height - StatusBar.currentHeight - (Dimensions.get('screen').height - Dimensions.get('window').height) - StatusBar.currentHeight * 2.5 }}>

              <Text style={{ color: 'black' }} >No Messages to Display</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SearchPeople')}  >
                <Text style={{ color: 'royalblue' }} >Start Conversation</Text>
              </TouchableOpacity>


            </View>
          }
        </View>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      </ScrollView> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size={'small'} color={'royalblue'} />
      </View>}
    </>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  search: {
    width: '95%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
