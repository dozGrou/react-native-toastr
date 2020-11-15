import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient colors={['#08b3f6', '#08C8F6']} start={{x: 0, y: 0}} end={{x: 0, y: .95}}>
        <Text style={styles.headerTitle}>Toastr Example App</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 4,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 30,
  }
})

export default Header;
