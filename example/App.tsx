/** @flow strict-local */

// @ts-ignore
import {ToastrProvider} from '@dozgrou/react-native-toastr';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Content from './components/Content';
import Header from './components/Header';

const App = () => {
  return (
    <ToastrProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#08b3f6" />

      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
    backgroundColor: '#fff',
  },
});

export default App;
