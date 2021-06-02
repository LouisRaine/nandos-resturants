import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import inAppBrowser from 'react-native-inappbrowser-reborn';
import {Address} from '../types/Restaurant';
import GreenButton from './GreenButton';

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 7,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 1, height: 1},
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 3,
  },

  text: {
    fontSize: 16,
  },
});

const goTo = async (url: string) => {
  try {
    await inAppBrowser.open(url);
  } catch (error) {
    // we could use a library like Sentry.io in a real project
    console.log('error: opening in app browser', error);
  }
};

interface RestaurantCardProps {
  title: string;
  address: Address;
  url: string;
}

const ResturantCard = ({title, address, url}: RestaurantCardProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.title}>{'Resturant Location'}</Text>
    <Text style={styles.text}>{address.streetAddress}</Text>
    <Text style={styles.text}>{address.addressLocality}</Text>
    <Text style={styles.text}>{address.postalCode}</Text>

    <GreenButton text={'Visit ' + title} onPress={() => goTo(url)} />
  </View>
);

export default ResturantCard;
