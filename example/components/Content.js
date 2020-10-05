import {withToastr} from '@dozgrou/react-native-toastr';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';

const Content = ({toastr}) => {
  const [mode, setMode] = useState('success');
  const [timeout, setTimeout] = useState(true);
  const [timeoutDuration, setTimeoutDuration] = useState(5000);
  const [dismissable, setDismissable] = useState(true);
  const [progressBar, setProgressBar] = useState(true);
  const [duplicate, setDuplicate] = useState(true);

  const onClick = useCallback(() => {
    toastr[mode]('This is a test toastr', {
      timeout,
      timeoutDuration,
      dismissable,
      progressBar,
      duplicate,
    });
  }, [toastr, mode, timeout, timeoutDuration, dismissable, progressBar, duplicate]);


  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={[styles.buttonMode, {backgroundColor: '#d4edda'}, mode === 'success' && {backgroundColor: '#00801e'}]}
          onPress={() => setMode('success')}
        >
          <Text>Success</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonMode, {backgroundColor: '#f8d7da'}, mode === 'danger' && {backgroundColor: '#cc0014'}]}
          onPress={() => setMode('danger')}
        >
          <Text>Danger</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonMode, {backgroundColor: '#fff3cd'}, mode === 'info' && {backgroundColor: '#e6a800'}]}
          onPress={() => setMode('info')}
        >
          <Text>Info</Text>
        </Pressable>

        <Pressable
          style={[styles.buttonMode, {backgroundColor: '#d1ecf1'}, mode === 'warning' && {backgroundColor: '#008599'}]}
          onPress={() => setMode('warning')}
        >
          <Text>Warning</Text>
        </Pressable>
      </View>

      <View style={{marginVertical: 10}} />

      <View style={styles.attribute}>
        <Text>timeout</Text>

        <Switch
          value={timeout}
          onValueChange={() => setTimeout(timeout => !timeout)}
          trackColor={{false: "#767577", true: "#7ae2fc"}}
          thumbColor={timeout ? "#08C8F6" : "#f4f3f4"}
        />
      </View>

      <View style={styles.attribute}>
        <Text>timeoutDuration</Text>

        <TextInput
          keyboardType={'numeric'}
          value={String(timeoutDuration)}
          onChangeText={(e) => setTimeoutDuration(parseInt(e) || 0)}
        />
      </View>

      <View style={styles.attribute}>
        <Text>dismissible</Text>

        <Switch
          value={dismissable}
          onValueChange={() => setDismissable(dismissable => !dismissable)}
          trackColor={{false: "#767577", true: "#7ae2fc"}}
          thumbColor={dismissable ? "#08C8F6" : "#f4f3f4"}
        />
      </View>

      <View style={styles.attribute}>
        <Text>progressBar</Text>

        <Switch
          value={progressBar}
          onValueChange={() => setProgressBar(progressBar => !progressBar)}
          trackColor={{false: "#767577", true: "#7ae2fc"}}
          thumbColor={progressBar ? "#08C8F6" : "#f4f3f4"}
        />
      </View>

      <View style={styles.attribute}>
        <Text>duplicate</Text>

        <Switch
          value={duplicate}
          onValueChange={() => setDuplicate(duplicate => !duplicate)}
          trackColor={{false: "#767577", true: "#7ae2fc"}}
          thumbColor={duplicate ? "#08C8F6" : "#f4f3f4"}
        />
      </View>

      <View style={{marginVertical: 10}} />

      <TouchableOpacity
        style={{borderRadius: 4, backgroundColor: 'orange', paddingVertical: 10}}
        onPress={onClick}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>Click me</Text>
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  attribute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonMode: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 4,
  },
})

export default withToastr(Content)
