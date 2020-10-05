/** @flow strict-local */

import {ToastrProvider} from '@dozgrou/react-native-toastr';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Content from './components/Content';
import Header from './components/Header';

const App: () => React$Node = () => {
  return (
    <ToastrProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#08b3f6" />

      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView>
          <Header />

          <View style={styles.body}>
            <Text style={styles.title}>Toastr Configurator</Text>

            <Content />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ToastrProvider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
});

export default App;
