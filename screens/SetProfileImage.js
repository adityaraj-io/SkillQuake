import React, {useState} from 'react'
import { View, Text, StyleSheet,TouchableOpacity, StatusBar, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import MaterialButton from '../components/MaterialButton';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';


const SetProfileImage = () => {
    const [uri, setUri] = useState('https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/camera.png?alt=media&token=f2a84a6c-e1dc-480d-a134-320a3940a2cc');
    const [loading, setLoading] = useState(false);
    const [filename, setFileName] = useState('')
    const navigation = useNavigation();
    const pickImage = () => {
        ImagePicker.openPicker({
            cropping: true
          }).then(image => {
            setUri(image.path)
            // image.filename
            setFileName(filename)
            
        });
    }
    const updateImage = async() => {
        console.log(auth().currentUser.uid);
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
        }).catch((err)=>{
            alert(err.message)
            setLoading(false)
        })
        console.log('Image Updated');
        navigation.replace('Home')
        setLoading(false)

    }
    const skip = () => {
        navigation.replace('Home')
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.textContainer} onPress={pickImage}>
        <Image style={styles.image} source={{uri: uri}} />
        <Text style={styles.text}>Your Profile Image</Text>
        </TouchableOpacity>
        <View style={{width: '90%', alignSelf: 'center'}}>
            <MaterialButton indicatorColor={'#fff'} isLoading={loading} disabled={uri==='https://firebasestorage.googleapis.com/v0/b/skill-quake.appspot.com/o/camera.png?alt=media&token=f2a84a6c-e1dc-480d-a134-320a3940a2cc'} onPress={updateImage} backgroundColor={'black'} height={50} text={'Save Changes'} />
            <View style={{width: '100%', alignSelf: 'center', marginBottom: 50, marginTop: 10}}>
            <MaterialButton  onPress={skip} backgroundColor={'black'} height={50} text={'Skip'} />
        </View>
        </View>
        
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </View>
  )
}

export default SetProfileImage

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#fff'
    },
    image:{
        borderColor: 'lightgray',
        borderWidth: 1,
        width: 300,
        height: 300,
        borderRadius: 900,
        backgroundColor: 'lightblue',
        marginTop: 50
        //  padding: 50
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        color: 'royalblue',
        fontSize: 18,
        marginTop: 15
    }
})