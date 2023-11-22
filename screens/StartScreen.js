import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Dimensions } from 'react-native'
import MaterialButton from '../components/MaterialButton'
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

const StartScreen = () => {
  const navigation = useNavigation()
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    
    if(user){
      navigation.replace('Home')
      SplashScreen.hide()
    }else{
      SplashScreen.hide()
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing){
    return null
  }
  
  return (
    <View  style={styles.container}>

      <View style={styles.imageContainer}>
        <Image style={styles.login} source={require('../assets/images/human.png')} />
      </View>
      <View style={styles.bottomView}>
        <Text style={[styles.title, {textAlign: 'left', width: '95%'}]}>Let's<Text style={{ color: '#FF5A66' }}> Get</Text><Text style={{ color: '#3183F1' }}> Started</Text></Text>
        <Text style={[styles.subTitle, {marginTop: 10}]}>
            Welcome to SkillQuake. Here you'll learn, earn, grow and maybe share your skills.
        </Text>
        <View style={{marginTop: 15, width: '100%'}}>
        
        <MaterialButton backgroundColor={'black'} text={'Login'} onPress={()=>navigation.navigate('Login')} height={50} isLoading={false} indicatorColor={'#fff'}  />
        <View style={{marginVertical: 5}}>
        <MaterialButton backgroundColor={'gray'} text={'Register'} onPress={()=>navigation.navigate('Register')} height={50} isLoading={false} indicatorColor={'#fff'}  />
        </View>
        
        </View>
      </View>
      <StatusBar backgroundColor={'lightgray'} barStyle={'dark-content'} />
    </View>
  )
}

export default StartScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: 'lightgray',
    // marginTop: StatusBar.currentHeight,
    // marginBottom: Dimensions.get('screen').height - Dimensions.get('window').height
  },
  login: {
    width: 350,
    height: 350,
    marginTop: 30
  },
  subTitle:{
    color: 'gray'
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
    borderTopRightRadius: 900,
    borderTopLeftRadius: 900
  },
  bottomView: {
    width: '100%',
    // height: 250,
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: -30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
    // backgroundColor
  },
  forgot: {
    color: 'royalblue',
    textAlign: 'center'
  },
  rText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 5
  }
})