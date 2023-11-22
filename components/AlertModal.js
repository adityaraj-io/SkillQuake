import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const AlertModal = ({ isVisible, onClose, message }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;


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
      color: '#3498db',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  