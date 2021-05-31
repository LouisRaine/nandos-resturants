import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  buttontext: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  goToButton: {
    backgroundColor: colors.green,
    height: 40,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface GreenButtonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  buttonStyles?: ViewStyle;
}

const GreenButton = ({text, onPress, buttonStyles = {}}: GreenButtonProps) => (
  <TouchableOpacity style={[styles.goToButton, buttonStyles]} onPress={onPress}>
    <Text style={styles.buttontext}>{text}</Text>
  </TouchableOpacity>
);

export default GreenButton;
