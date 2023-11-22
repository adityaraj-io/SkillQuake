import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'

const MaterialTextInput = ({ width='90%',placeholder = '', placeholderTextColor = 'gray', onChangeText, value = '', secureTextEntry = false }) => {
    const [isSecure, setIsSecure] = useState(false)
    useEffect(()=>{
        setIsSecure(secureTextEntry)
    },[])
    const [show, setShow] = useState(false)
    const setSecure = () => {
        setShow(!show)
        setIsSecure(!isSecure)
    }
    return (
        <View style={[styles.inputContainer, {width: width}]}>
            <TextInput style={{ flex: 1, color: 'black' }} onChangeText={onChangeText || null} secureTextEntry={isSecure} value={value || null} placeholder={placeholder} placeholderTextColor={placeholderTextColor} />
            {secureTextEntry && <TouchableOpacity onPress={setSecure} style={styles.imageContainer}>
                {show && <Image style={[styles.image, { width: 28, height: 28, tintColor: placeholderTextColor }]} source={require('../assets/images/invisible.png')} />}
                {!show && <Image style={[styles.image, {tintColor: placeholderTextColor}]} source={require('../assets/images/show.png')} />}
            </TouchableOpacity>}
        </View>
    )
}

export default MaterialTextInput

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        padding: 7,
        backgroundColor: 'lightgray',
        borderRadius: 15,
        marginVertical: 5,
        flexDirection: 'row',
        // alignItems: 'flex-end'
        // flex: 1
    },
    image: {
        width: 30,
        height: 30,
        // tintColor: 'gray'
    },
    imageContainer: {
        // alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    }
})