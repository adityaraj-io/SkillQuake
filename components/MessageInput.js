import React from 'react'
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native'

const MessageInput = ({value, onChangeText, onSend=()=>{}, disabledSend=false, onImagePress=()=>{}}) => {
  return (
    <View style={[styles.inputContainer]}>
      <View style={styles.inputData}>
        
        <TextInput placeholderTextColor={'gray'} value={value||null} onChangeText={onChangeText||null} style={{paddingStart: 10, color: 'black', width:'85%', marginRight: 50}} placeholder='Type Some Message'  />
      </View>
      <View style={styles.imgView}>
      <TouchableOpacity disabled={disabledSend} onPress={onSend} style={[styles.imgContainer,{backgroundColor: disabledSend?'lightgray':'royalblue'}]}>
        <Image style={styles.send} source={require('../assets/images/send.png')} />
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default MessageInput

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'flex-end',
      },
      inputData: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        padding: 0,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
      },
      send: {
        width: 17,
        height: 17,
        tintColor: 'white'
      },
      imgView: {
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 7,
      },
      imgContainer: {
        padding: 12,
        borderRadius: 100,
      },
      camera: {
        width: 15,
        height: 15,
        tintColor: 'white',
      },
      cameraContainer: {
        padding: 7,
        marginLeft: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'royalblue',
        borderRadius: 40
      }
})
