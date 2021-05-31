import React from 'react';
import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import GreenButton from './GreenButton';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textCenter: {textAlign: 'center'},

  buttonStyles: {paddingHorizontal: 10},
});

interface TryAgainProps {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const TryAgain = ({onPress}: TryAgainProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.textCenter}>Failed to get resturants</Text>
    <GreenButton
      text={'Try again?'}
      onPress={onPress}
      buttonStyles={styles.buttonStyles}
    />
  </View>
);

export default TryAgain;
