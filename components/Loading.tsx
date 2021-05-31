import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading = () => (
  <View style={styles.wrapper}>
    <ActivityIndicator size="large" color={colors.green} />
  </View>
);

export default Loading;
