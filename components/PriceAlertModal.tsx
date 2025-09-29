import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

import type { Alert } from '@/context/AlertContext';

interface PriceAlertModalProps {
  visible: boolean;
  symbol: string;
  currentPrice: number;
  alert?: Alert;
  onClose: () => void;
}

const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ visible, symbol, currentPrice, alert, onClose }) => {
  const targetPrice = alert?.price ?? 0;
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
            {' '} (Target: $
            {targetPrice.toFixed(2)})
          </Text>
          <Button title="Close" onPress={onClose} />
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    minWidth: 280,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PriceAlertModal;
