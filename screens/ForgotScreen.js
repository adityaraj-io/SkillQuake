import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native'
import MaterialTextInput from '../components/MaterialTextInput'
import MaterialButton from '../components/MaterialButton'
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../components/LoadingModal';
import auth from '@react-native-firebase/auth'

const ForgotScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const resetPassword = async() => {
    if(email===''){
      alert('please enter your email')
    }
    else if(isValidEmail(email)){
      setLoading(true)
      try {
        await auth().sendPasswordResetEmail(email).catch((error)=>{
          setLoading(false)
          alert(error.message);
          setLoading(false)
        }).then(()=>{
          setLoading(false)
          alert('Check Your Email! Reset Link Sent')

        })
        setLoading(false)
      } catch (error) {
        setLoading(false)
        alert(error.message)
      }
    }
    else{
      alert('Enter a valid email')
    }
  }
  return (
    <View  style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.login} source={require('../assets/images/meeting.png')} />
      </View>
      <View style={styles.bottomView}>
      <Text style={[styles.title, {color: 'gray', fontWeight: 'normal', fontSize: 18}]}>Forgot Password?</Text>
        <Text style={styles.title}>Let's<Text style={{ color: '#FF5A66' }}> Reset</Text> It</Text>
        <View style={{marginTop: 30}}>
        <MaterialTextInput value={email} onChangeText={setEmail} placeholder='Email' />
        <View style={{marginVertical: 20}}>
        <MaterialButton onPress={resetPassword} backgroundColor={'black'} text={'Send Reset Link'} height={50} borderRadius={20} isLoading={loading} indicatorColor={'#fff'}  />
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.rText}>Password Remembered? <Text style={{color: 'royalblue'}}>Go back</Text></Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
      <StatusBar backgroundColor={'lightgray'} barStyle={'dark-content'} />
      <LoadingModal isVisible={loading} />
    </View>
  )
}

export default ForgotScreen

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
    width: 300,
    height: 300,
    marginTop: 30
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
    borderTopRightRadius: 900,
    borderTopLeftRadius: 60
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