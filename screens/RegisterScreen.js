import React, { useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialTextInput from '../components/MaterialTextInput';
import MaterialButton from '../components/MaterialButton';
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../components/AlertModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { CommonActions } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [interests, setInterests] = useState('');
  const [alertMessage, setAlertMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleRegister = () => {
    if (email === '' || password === '' || username === '' || about === ''||interests==='') {
      setAlertMessage('All Fields are mandatory!');
      setVisible(true)
    } else {
      try {

        setLoading(true)
        auth()
          .createUserWithEmailAndPassword(email.trim(), password.trim())
          .then(async(userCredentials) => {
            console.log('Setting Data!');
            await userCredentials.user.updateProfile({
              displayName: username,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/user%20(2).png?alt=media&token=d77872c7-8599-4734-bc5c-6c9f581e7a54'
            })
            database()
              .ref(`/users/${userCredentials.user.uid}`)
              .set({
                name: username,
                about: about,
                uid: userCredentials.user.uid,
                email: email,
                profileImage: 'https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/user%20(2).png?alt=media&token=d77872c7-8599-4734-bc5c-6c9f581e7a54',
                interests: interests
              })
              .then(() => {
                console.log('User account created & signed in!');
                setLoading(false)
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'SetPI', 
                      },
                    ],
                  })
                );
              })
              .catch((err)=>{
                setAlertMessage(err.message);
                setVisible(true)
                setLoading(false)
              })

            
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
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.login} source={require('../assets/images/teamwork.png')} />
      </View>
      <View style={styles.bottomView}>
        <Text style={[styles.title, { color: 'gray', fontWeight: 'normal', fontSize: 18 }]}>Sign Up</Text>
        <Text style={styles.title}>Let's<Text style={{ color: '#FF5A66' }}> Get</Text> You <Text style={{ color: '#3183F1' }}>Registered</Text></Text>
        <View style={{ marginTop: 30 }}>
          <MaterialTextInput value={username} onChangeText={setUserName} placeholder='Name' />
          <MaterialTextInput value={email} onChangeText={setEmail} placeholder='Email' />
          <MaterialTextInput value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry />
          <MaterialTextInput value={about} onChangeText={setAbout} placeholder='Tell us something about yourself' />
          <MaterialTextInput value={interests} onChangeText={setInterests} placeholder='Tell us your Interests' />
          <View style={{ marginVertical: 20 }}>
            <MaterialButton
              backgroundColor={'black'}
              text={'Register'}
              onPress={handleRegister}
              height={50}
              borderRadius={20}
              isLoading={loading}
              indicatorColor={'#fff'}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.rText}>Already have an account? <Text style={{ color: 'royalblue' }}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={'lightgray'} barStyle={'dark-content'} />
      <AlertModal isVisible={visible} message={alertMessage} onClose={() => setVisible(false)} />
    </ScrollView>
  );
};

export default RegisterScreen;

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
    borderTopRightRadius: 100,
    borderTopLeftRadius: 500,
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
  rText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 5,
  },
});
