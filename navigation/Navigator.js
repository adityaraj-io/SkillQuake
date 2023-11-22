import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StartScreen from '../screens/StartScreen';
import ForgotScreen from '../screens/ForgotScreen';
import HomeScreen from '../screens/HomeScreen';
import SetProfileImage from '../screens/SetProfileImage';
import EditProfileScreen from '../screens/EditProfileScreen';
import EventDetailScreen from '../screens/EventDetail';
import SearchEventScreen from '../screens/SearchEventScreen';
import CreateEventScreen from '../screens/CreateEventScreen';

const Stack = createNativeStackNavigator();
const Navigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Start' screenOptions={{headerShown: false}}>
            <Stack.Screen component={StartScreen} name='Start' />
            <Stack.Screen component={LoginScreen} name='Login' />
            <Stack.Screen component={RegisterScreen} name='Register' />
            <Stack.Screen component={ForgotScreen} name='Forgot' />
            <Stack.Screen component={HomeScreen} name='Home' />
            <Stack.Screen component={EditProfileScreen} name='EditProfile' options={{headerShown: true}} />
            <Stack.Screen component={EventDetailScreen} name='EventDetail' options={{headerShown: true}} />
            <Stack.Screen component={SearchEventScreen} name='SearchEvent' options={{headerShown: true}} />
            <Stack.Screen component={CreateEventScreen} name='CreateEvent' options={{headerShown: true, headerTitle: 'Create an Event'}} />
            <Stack.Screen component={SetProfileImage} name='SetPI' options={{headerShown: true, headerTitle: 'Set Profile Image', headerStyle:{elevation: 0}}} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
