import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialTextInput from '../components/MaterialTextInput';
import MaterialButton from '../components/MaterialButton';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AlertModal from '../components/AlertModal';
import  {CommonActions} from '@react-navigation/native'
const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (email === '' || password === '') {
      setAlertMessage('All Fields are mandatory!');
      setVisible(true)
    } else {
      try {
        setLoading(true)
        auth()
          .signInWithEmailAndPassword(email.trim(), password.trim())
          .then(() => {
            console.log('User account signed in!');
            // navigation.reset({'login', 1})
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Home', 
                  },
                ],
              })
            );
            setLoading(false)
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setAlertMessage('That email address is already in use!');
              setVisible(true)
              setLoading(false)
            }

            if (error.code === 'auth/invalid-email') {
              setAlertMessage('That email address is invalid!');
              setVisible(true)
              setLoading(false)
            }

            if (error.code === 'auth/invalid-login') {
              setAlertMessage('Invalid Credentials!');
              setVisible(true)
              setLoading(false)
            }

            setAlertMessage(error.message);
            setVisible(true)
            setLoading(false)
          });
      } catch (error) {
        setAlertMessage(error.message);
        setVisible(true)
        setLoading(false)
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.login} source={require('../assets/images/interview.png')} />
      </View>
      <View style={styles.bottomView}>
        <Text style={[styles.title, { color: 'gray', fontWeight: 'normal', fontSize: 18 }]}>Sign In</Text>
        <Text style={styles.title}>Let's<Text style={{ color: '#FF5A66' }}> Get</Text> You <Text style={{ color: '#3183F1' }}>Logged in</Text></Text>
        <View style={{ marginTop: 30 }}>
          <MaterialTextInput value={email} onChangeText={setEmail} placeholder='Email' />
          <MaterialTextInput value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
          <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 20 }}>
            <MaterialButton
              onPress={handleLogin}
              backgroundColor={'black'}
              text={'Login'}
              height={50}
              borderRadius={20}
              isLoading={loading}
              indicatorColor={'#fff'}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.rText}>Don't have an account? <Text style={{ color: 'royalblue' }}>Register</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={'lightgray'} barStyle={'dark-content'} />
      <AlertModal isVisible={visible} message={alertMessage} onClose={() => setVisible(false)} />
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'lightgray',
  },
  login: {
    width: 300,
    height: 300,
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C0C0C0',
    borderTopRightRadius: 500,
    borderTopLeftRadius: 100,
  },
  bottomView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: -30,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    color: 'royalblue',
    textAlign: 'center',
  },
  rText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
});
