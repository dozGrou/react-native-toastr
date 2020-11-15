import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CustomToastr = ({onRemove}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onRemove}>
      <View>
        <Text>✔ This is a custom Toastr Component 👍</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 4,
  },

})

export default CustomToastr;
