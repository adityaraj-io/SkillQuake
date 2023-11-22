import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const Message = ({onPress=()=>{}, message='', time='', isMe=false}) => {
  return (
      <TouchableOpacity  onPress={onPress} style={[styles.msgContainer, { alignSelf: isMe ? 'flex-end' : 'flex-start', backgroundColor: isMe ? 'royalblue' : 'lightgray', flexDirection: message.length <= 20 ? 'row' : 'column' }]}>
      <Text style={[styles.msgText, { color: isMe ? 'white' : '#101010' }]} >{message}</Text>
      <View style={styles.msgTimeContainer}>
        <Text style={[styles.msgTime, { color: isMe?'#DCDCDC':'gray' }]}>{dayjs(time).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Message

const styles = StyleSheet.create({
    msgContainer: {
      padding: 7,
      borderRadius: 5,
      overflow: 'visible',
      marginVertical: 5,
      maxWidth: '90%'
  
    },
    msgText: {
      color: '#FF5A66',
      fontSize: 17,
      marginRight: 10,
    },
    msgTime: {
      color: 'gray',
      fontSize: 12,
      marginHorizontal: 5
    },
    msgTimeContainer: {
      alignSelf: 'flex-end',
      marginTop: 5
    }
})