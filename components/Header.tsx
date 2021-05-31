import {Image, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
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

const Header = () => (
  <View style={styles.headerWrapper}>
    <Image
      style={styles.headerImage}
      source={require('../img/nandos-logo.png')}
    />
  </View>
);

export default Header;
