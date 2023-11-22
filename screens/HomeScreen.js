import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import EventsScreen from './EventsScreen';
import ChatsScreen from './ChatsScreen';
import ProfileScreen from './ProfileScreen';
import auth from '@react-native-firebase/auth'

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
    
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === 'Events') {
          // <Image s />
          return focused?<Image style={{width: size, height: size, tintColor: color}} source={require('../assets/images/calendar_clicked.png')} />:
          <Image style={{width: size, height: size, tintColor: color}} source={require('../assets/images/calendar.png')} />
        } else if (route.name === 'Chats') {
          return focused?<Image style={{width: size, height: size, tintColor: color}} source={require('../assets/images/chat_clicked.png')} />:
          <Image style={{width: size, height: size, tintColor: color}} source={require('../assets/images/chat.png')} />
        }else if(route.name === 'Profile'){
          return focused?<Image style={{width: size, height: size, borderRadius: 100, backgroundColor: 'gray', borderColor: color, borderWidth: StyleSheet.hairlineWidth+1}} source={{uri: auth().currentUser.photoURL}} />:
          <Image style={{width: size, height: size, borderRadius: 100, backgroundColor: 'gray',  borderColor: color, borderWidth: StyleSheet.hairlineWidth+1}} source={{uri: auth().currentUser.photoURL}} />
        }
      },
      tabBarActiveTintColor: 'royalblue',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
    >
      <Tab.Screen name='Events' component={EventsScreen} />
      <Tab.Screen name='Chats' component={ChatsScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen