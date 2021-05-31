import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import RestaurantList from './components/RestaurantList';
import Loading from './components/Loading';
import TryAgain from './components/TryAgain';
import {Restaurant, ResturantsAPIResponse} from './types/Restaurant';
import Header from './components/Header';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getResturants = async () => {
    setLoading(true);
    try {
      const resturantData = await axios.get<ResturantsAPIResponse>(
        'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
      );

      setRestaurants(resturantData?.data?.data?.restaurant?.items || []);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);

      // we could use a library like Sentry.io in a real project
      console.log('error', error);
    }
  };

  useEffect(() => {
    getResturants();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.mainContainer}>
        <Header />
        {restaurants.length > 0 && <RestaurantList restaurants={restaurants} />}
        {loading && <Loading />}
        {error && <TryAgain onPress={getResturants} />}
      </View>
    </SafeAreaView>
  );
};

export default App;
