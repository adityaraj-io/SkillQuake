import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import ChatItem from '../components/ChatItem';

const ChatsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={[styles.search, {alignSelf: 'center'}]}>
        <Text style={{ color: 'gray' }}>Search Chats</Text>
      </TouchableOpacity>
      <ChatItem lastMessage={'Hello'} userName='Aditya Raj' lastMessageTime='a day ago' badgeCount={5} isBadgeShown />
      <ChatItem lastMessage={'Hi'} userName='Elon Musk' lastMessageTime='few seconds ago' />
      <ChatItem lastMessage={'Ok Bye'} userName='Aniket Raj' lastMessageTime='9 days ago' />
      <ChatItem lastMessage={'Ok. Sure'} userName='Mom' lastMessageTime='few seconds ago' />
      <ChatItem lastMessage={'Yes'} userName='Dad' lastMessageTime='2 hours ago' />
      <ChatItem lastMessage={'Hello'} userName='Warren Buffet' lastMessageTime='2 days ago' badgeCount={3} isBadgeShown />
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </ScrollView>
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
    width: '90%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
