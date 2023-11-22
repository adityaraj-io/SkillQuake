import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, View, Text } from 'react-native';
import database from '@react-native-firebase/database';
import ChatItem from '../components/ChatItem';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const SearchPeople = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const getUsers = () => {
    let ref = database().ref('/users/');
    try {
      ref.on('value', (snapshot) => {
        setUsers(Object.values(snapshot.val()));
        setLoading(false);
      });
    } catch (error) {
      alert('Error Occurred. Restart The App ' + error.message);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) => user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { justifyContent: !loading ? 'flex-start' : 'center' }]}>
      {!loading ? (
        <>
          <View style={styles.input}>
            <TextInput
              placeholder="Search with email"
              placeholderTextColor="gray"
              style={{ color: 'black' }}
              onChangeText={handleSearch}
              value={searchQuery}
            />
          </View>
          <FlatList
            data={filteredUsers}
            ListEmptyComponent={<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black', marginTop: 30}}>No Matches</Text>
            </View>}
            style={{ width: '100%' }}
            renderItem={({ item }) => {
                return auth().currentUser.uid !==item.uid ?  (
                <ChatItem
                  userName={item.name}
                  profileImageUri={item.profileImage}
                  lastMessage={item.email}
                  key={item.uid}
                  onPress={()=>navigation.navigate('MessageScreen', {
                    ruid: item.uid,
                    rname: item.name
                  })}
                />
              ): searchQuery!=='' && (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: 'black', marginTop: 30}}>No Matches</Text>
          </View>);
            }}
          />
        </>
      ) : (
        <>
          <ActivityIndicator size="small" color="royalblue" />
        </>
      )}
    </View>
  );
};

export default SearchPeople;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  input: {
    width: '95%',
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 7,
    marginTop: 5,
  },
});
