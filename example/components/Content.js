import {withToastr} from '@dozgrou/react-native-toastr';
import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CustomToastr from './CustomToastr';

const toastrTexts = [
  'I am a beautiful toastr !',
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  'Mauris pulvinar mauris in tincidunt hendrerit. Duis risus leo, mollis.',
  'Suspendisse feugiat ornare eros, at dapibus erat pharetra non. Etiam.',
  'Phasellus porttitor, odio eu pellentesque commodo, ipsum purus porttitor sapien.',
]

const AttributeValue = ({label, value}) => (
  <Text>
    <Text style={styles.bold}>{`\t${label}`}</Text>
    {': '}
    <Text style={styles.textHighlight}>{String(value)}</Text>
    {',\n'}
  </Text>
)

const ModeButton = ({mode, backgroundColor, backgroundColorActive, isActive, onPress}) => (
  <Pressable
    style={[styles.buttonMode(backgroundColor), isActive && styles.buttonModeActive(backgroundColorActive)]}
    onPress={() => onPress(mode)}
  >
    <Text style={[styles.buttonModeText, isActive && styles.buttonModeTextActive]}>
      {mode.charAt(0).toUpperCase() + mode.slice(1)}
    </Text>
  </Pressable>
)

const Content = ({toastr}) => {
  const [mode, setMode] = useState('success');
  const [timeout, setTimeout] = useState(true);
  const [timeoutDuration, setTimeoutDuration] = useState(5000);
  const [dismissable, setDismissable] = useState(true);
  const [progressBar, setProgressBar] = useState(true);
  const [duplicate, setDuplicate] = useState(true);

  const onClick = useCallback(() => {
    const text = toastrTexts[Math.floor(Math.random() * Math.floor(toastrTexts.length))]
    const config = {
      timeout,
      timeoutDuration,
      dismissable,
      progressBar,
      duplicate,
    };

    if (mode === 'custom') {
      toastr.custom(({...config}) => <CustomToastr {...config} />)

      return
    }

    toastr[mode](text, config);
  }, [toastr, mode, timeout, timeoutDuration, dismissable, progressBar, duplicate]);


  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <ModeButton
          mode={'success'}
          backgroundColor={'#d4edda'}
          backgroundColorActive={'#00801e'}
          isActive={mode === 'success'}
          onPress={setMode}
        />

        <ModeButton
          mode={'danger'}
          backgroundColor={'#f8d7da'}
          backgroundColorActive={'#cc0014'}
          isActive={mode === 'danger'}
          onPress={setMode}
        />

        <ModeButton
          mode={'info'}
          backgroundColor={'#d1ecf1'}
          backgroundColorActive={'#008599'}
          isActive={mode === 'info'}
          onPress={setMode}
        />

        <ModeButton
          mode={'warning'}
          backgroundColor={'#fff3cd'}
          backgroundColorActive={'#e6a800'}
          isActive={mode === 'warning'}
          onPress={setMode}
        />

        <ModeButton
          mode={'custom'}
          backgroundColor={'#a5a5a5'}
          backgroundColorActive={'#676767'}
          isActive={mode === 'custom'}
          onPress={setMode}
        />
      </View>

      {mode !== 'custom' && (
        <>
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
              style={styles.input}
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
        </>
      )}

      <View style={{marginVertical: 10}} />

      <TouchableOpacity
        style={{borderRadius: 4, backgroundColor: 'orange', paddingVertical: 10}}
        onPress={onClick}
      >
        <Text style={{textAlign: 'center', color: 'white'}}>Display it</Text>
      </TouchableOpacity>

      <View style={{marginVertical: 10}} />

      {mode !== 'custom' && (
        <View style={styles.config}>
          <Text style={{color: '#fff'}}>Config:</Text>

          <Text style={{color: '#fff'}}>
            {'{\n'}
            <AttributeValue label={'timeout'} value={timeout} />
            <AttributeValue label={'timeoutDuration'} value={timeoutDuration} />
            <AttributeValue label={'dismissible'} value={dismissable} />
            <AttributeValue label={'progressBar'} value={progressBar} />
            <AttributeValue label={'duplicate'} value={duplicate} />
            {'}'}
          </Text>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  attribute: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonMode: color => ({
    backgroundColor: color,
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 5,
    borderRadius: 4,
  }),
  buttonModeActive: color => ({
    backgroundColor: color,
  }),
  buttonModeText: {
    color: 'black',
  },
  buttonModeTextActive: {
    color: 'white',
  },
  config: {
    backgroundColor: '#222527',
    padding: 5,
    borderRadius: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  textHighlight: {
    color: '#24a4a4'
  },
  input: {
    height: 40,
  },
})

export default withToastr(Content)
