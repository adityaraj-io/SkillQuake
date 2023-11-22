import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet, Image, Dimensions} from 'react-native'

const Events = ({eventName='', eventTime='', onPress=()=>{}, imageSource}) => {
  return (
    <View style={{width: Dimensions.get('window').width-Dimensions.get('window').width*10/100, marginRight: 20}}>
        <TouchableOpacity  onPress={onPress} style={styles.container}>
            <Image style={styles.image} source={{uri: imageSource}} />
            <Text style={styles.title}>{eventName}</Text>
            <Text style={styles.subTitle}>on {eventTime}</Text>
        </TouchableOpacity>
      
    </View>
  )
}

export default Events

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'lightgray',
        borderRadius: 5,
        paddingBottom: 7,
    },
    image: {
        width: '100%',
        height: 180,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
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