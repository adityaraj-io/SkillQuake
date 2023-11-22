import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const EditProfileScreen = () => {
  const user = auth().currentUser;
  const [name, setName] = useState(user.displayName || '');
  const [interests, setInterests] = useState('');
  const [about, setAbout] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true)
  const [uri, setUri] = useState('https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/user%20(2).png?alt=media&token=d77872c7-8599-4734-bc5c-6c9f581e7a54')
  const [filename, setFileName] = useState('')

  const handleSaveChanges = () => {
      if(name===''||interests===''||about===''){
        alert('All Fields are mandatory')
      }else{
        updateImage();
      }
  };

  const updateImage = async() => {
    const uid = await auth().currentUser.uid;
    const ref = storage().ref(`/${uid}/profilePics/${filename}`)
    setLoading(true)
    await ref.putFile(uri).then(async()=>{
        const downloadUrl = await ref.getDownloadURL();
        setImage(downloadUrl, uid)
    }).catch((error)=>{
        alert('Error Occured', error.message)
        alert(error.message)
        setLoading(false)
    })
}
const setImage = async(url, uid)=>{
    await auth().currentUser.updateProfile({
        photoURL: url
    }).catch((err)=>{
        alert(err.message)
        setLoading(false)

    })
    await database().ref(`/users/${uid}`).update({
        profileImage: url,
        name, interests, about
    }).catch((err)=>{
        alert(err.message)
        setLoading(false)
    })
    console.log('Data Updated');
    alert('Data Saved')
    setLoading(false)

}

  const getUserData = () => {
    try {
      let ref = database().ref(`/users/${auth().currentUser.uid}`);
      ref.once('value', (snapshot)=>{
        setData(snapshot.val())
        console.log(snapshot.val());
        setInterests(snapshot.val().interests)
        setAbout(snapshot.val().about)
        setLoading(false)
      })
    } catch (error) {
      alert('Error Occured')
    }
  }
  
  const pickImage = () => {
    ImagePicker.openPicker({
        cropping: true
      }).then(image => {
        setUri(image.path)
        // image.filename
        setFileName(filename)
        
    });
  }

  useEffect(()=>{
    getUserData();
  },[])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!loading?<View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri:uri }} style={styles.profileImage} />
          <Text style={styles.editProfileImageText}>Edit Profile Image</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={'gray'}
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Interests</Text>
          <TextInput
            style={styles.input}
            value={interests}
            onChangeText={setInterests}
            placeholder="Enter your interests"
            placeholderTextColor={'gray'}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>About</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={about}
            onChangeText={setAbout}
            multiline
            placeholderTextColor={'gray'}
            placeholder="Tell us about yourself"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>:<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'small'} color={'royalblue'} />
        </View>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
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
  editProfileImageText: {
    color: 'royalblue',
    marginTop: 10,
    textAlign: 'center'
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: 'royalblue',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
