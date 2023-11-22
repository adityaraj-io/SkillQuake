import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native'

const EventList = ({eventName='', eventTime='', onPress=()=>{}, imageSource, host=''}) => {
  return (
    <View style={{width: Dimensions.get('window').width-Dimensions.get('window').width*10/100, marginRight: 20}}>
        <TouchableOpacity  onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/back.jpg')} />
            <View style={{flex: 1}}>
                <Text style={{color: 'black', fontWeight: 'bold', marginHorizontal: 10}}>{eventName} <Text>on {eventTime}</Text></Text>
                <Text style={{color: 'gray', marginHorizontal: 10}}>by {host}</Text>
            </View>
        </TouchableOpacity>
      
    </View>
  )
}

export default EventList

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        // paddingBottom: 7,
        padding: 10,
        flexDirection: 'row',
        marginVertical: 5 
    },
    image: {
        // width: '100%',
        // height: 180,
        width: 50,
        height: 50,
        borderRadius: 5
    },
    title:{
        fontSize: 16,
        color: '#000',
        marginHorizontal: 5,
        fontWeight: 'bold'
    },
    subTitle: {
        color: 'gray',
        alignSelf: 'baseline',
        marginLeft: 5
    }
})