import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Alert } from '@/context/AlertContext';

interface PriceAlertModalProps {
  visible: boolean;
  symbol: string;
  currentPrice: number;
  alert?: Alert;
  onClose: () => void;
}

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ visible, symbol, currentPrice, alert, onClose }) => {
  const targetPrice = alert
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Price Alert</Text>
          <Text style={styles.text}>
            {symbol} has reached $
            {typeof currentPrice === 'number' ? currentPrice.toFixed(2) : 'N/A'}
            {' '} 
            alert price was: 
            ${targetPrice}
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#294947ff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    minWidth: 280,
  },
  title: {
color:'#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    color:'#ffff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#21fa90",
    width:300,

    padding: 12,
    borderRadius: 6,
    alignItems: "center",

  },
  buttonText: {
    color: "#6a6a6a",
    fontWeight: "bold",
  },
});

export default PriceAlertModal;
