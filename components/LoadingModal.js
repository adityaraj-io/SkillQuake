import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const LoadingModal = ({ isVisible }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size={'large'} color={'royalblue'} />
                    <TouchableOpacity >
                        <Text style={styles.closeButton}>Please Wait</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;


const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '80%',
      padding: 20,
      alignItems: 'center',
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
      color: '#333',
    },
    closeButton: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  