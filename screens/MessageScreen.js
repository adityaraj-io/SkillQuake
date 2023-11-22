import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import MessageInput from '../components/MessageInput';
import EncryptMessage from '../components/EncryptMessage';
import Message from '../components/Message';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database';


const MessageScreen = ({ route, navigation }) => {

    const { ruid, rname } = route.params;
    const [input, setInput] = useState('')
    const user = auth().currentUser;
    const [chats, setChats] = useState([])
    const [recieverData, setRecieverData] = useState({})

    const getMessages = () => {
        let ref = database().ref(`/users/${user.uid}/messages/${ruid}`);
        try {
            ref.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    setChats(Object.values(snapshot.val()))
                    console.log(Object.values(snapshot.val()))
                    // console.log();
                } else {
                    console.log('No Messages Yet');
                    setChats(null)
                }
            })
        } catch (error) {
            Alert('Error Occured Restart App ' + error.message)
        }
    }

    const getRecieverData = () => {
        let ref = database().ref(`/users/${ruid}`);
        try {
            ref.once('value', (snapshot) => {
                console.log(snapshot.val());
                setRecieverData(snapshot.val())
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (<TouchableOpacity onPress={()=>navigation.navigate('SeeProfile', {host: rname, hostid: ruid})}>
            <Text style={{color: '#333', fontSize: 20, fontWeight: 'bold'}}>{rname}</Text>
          </TouchableOpacity>),
            
        });

        getMessages();
        getRecieverData();


    }, [])

    const sendText = () => {
        if (input !== '') {
            let time = new Date().getTime();
            let actTime = new Date().toISOString();
            let message = input.toString();
            let senderRef = database().ref(`/users/${user.uid}/messages/${ruid}/${time}`);
            let recieverRef = database().ref(`/users/${ruid}/messages/${user.uid}/${time}`);
            let senderChatRef = database().ref(`/users/${user.uid}/chats/${ruid}`)
            let recieverChatRef = database().ref(`/users/${ruid}/chats/${user.uid}`)

            senderRef.set({
                message: message,
                id: time,
                time: actTime,
                uid: user.uid,
                type: 'text',
            }).then(() => {
                console.log('message sent');
            });
            recieverRef.set({
                message: message,
                id: time,
                time: actTime,
                uid: user.uid,
                type: 'text',
            }).then(() => {
                console.log('user message sent');
            });
            senderChatRef.update({
                uid: ruid,
                lastMessage: message,
                lastMessageTime: actTime,
                username: rname,
                profileImage: recieverData.profileImage,
                // unreadMessages: TODO
            });

            recieverChatRef.update({
                uid: user.uid,
                lastMessage: message,
                lastMessageTime: actTime,
                username: user.displayName,
                profileImage: user.photoURL
            });

            setInput('')


        }


    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} >
                <View style={styles.container}>
                    <ScrollView>

                        <EncryptMessage />
                        <View style={styles.messageContainer}>
                            {chats && chats.length > 0 ? (
                                [...chats].sort((a, b) => a.time.localeCompare(b.time)).map((chat) => (
                                    chat && chat.type === 'text' && (
                                        <Message message={chat.message} isMe={chat.uid === user.uid} time={chat.time} key={chat.id} />
                                    )
                                ))
                            ) : (
                                <></>
                            )}
                        </View>



                    </ScrollView>

                </View>
                <View>
                    <MessageInput value={input} onSend={sendText} onChangeText={setInput} />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default MessageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    containerView: {
        backgroundColor: '#F5F5F5'
    },
    messageContainer: {
        padding: 10
    }
})