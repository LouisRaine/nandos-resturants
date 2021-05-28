import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import inAppBrowser from 'react-native-inappbrowser-reborn';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
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
  buttontext: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 3,
  },
  text: {
    fontSize: 16,
  },
  textCenter: {textAlign: 'center'},
  goToButton: {
    backgroundColor: '#01e2c2',
    height: 40,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 56,
    backgroundColor: 'white',
  },
  headerImage: {
    height: 50,
    width: 50,
    marginHorizontal: 5,
    marginVertical: 3,
  },
});

export interface ResturantData {
  data: Data;
}

export interface Data {
  restaurant: Restaurant;
}

export interface Restaurant {
  items: Item[];
}

export interface Item {
  name: string;
  url: string;
  geo: Geo;
}

export interface Geo {
  address: Address;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
}

const Header = () => (
  <View style={styles.headerWrapper}>
    <Image
      style={styles.headerImage}
      source={require('./img/nandos-logo.png')}
    />
  </View>
);

const renderResturantItem = ({item}: {item: Item}) => (
  <ResturantInfo name={item.name} address={item.geo.address} url={item.url} />
);

const goTo = async (url: string) => {
  try {
    await inAppBrowser.open(url);
  } catch (error) {
    console.log('error: opening in app browser', error);
  }
};

const ResturantInfo = ({
  name,
  address,
  url,
}: {
  name: string;
  address: Address;
  url: string;
}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{'Resturant Location'}</Text>
    <Text style={styles.text}>{address.streetAddress}</Text>
    <Text style={styles.text}>{address.addressLocality}</Text>
    <Text style={styles.text}>{address.postalCode}</Text>

    <GreenButton text={'Visit ' + name} onPress={() => goTo(url)} />
  </View>
);

const GreenButton = ({
  text,
  onPress,
  buttonStyles = {},
}: {
  text: string;
  onPress: Function;
  buttonStyles?: any;
}) => {
  return (
    <TouchableOpacity
      style={[styles.goToButton, buttonStyles]}
      onPress={() => onPress()}>
      <Text style={styles.buttontext}>{text}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const [resturants, setResturants] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getResturants = async () => {
    setLoading(true);
    try {
      const resturantData = await axios.get<ResturantData>(
        'https://storage.googleapis.com/nandos-engineering-public/coding-challenge-rn/restaurantlist.json',
      );
      setResturants(resturantData?.data?.data?.restaurant?.items || []);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
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
        {resturants.length > 0 && (
          <FlatList
            data={resturants}
            renderItem={renderResturantItem}
            keyExtractor={item => item.name}
          />
        )}
        {loading && (
          <View style={styles.wrapper}>
            <ActivityIndicator size="large" color="#01e2c2" />
          </View>
        )}
        {error && (
          <View style={styles.wrapper}>
            <Text style={styles.textCenter}>Failed to get resturants</Text>
            <GreenButton
              text={'Try again?'}
              onPress={getResturants}
              buttonStyles={{paddingHorizontal: 10}}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;
