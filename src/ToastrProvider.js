import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import ToastrItem from './ToastrItem'

export const ToastrContext = React.createContext();

let lastId = 0

export default function ToastrProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const addToast = toast => {
    const id = lastId++;
    toast.id = id;

    setToasts([...toasts, toast]);
  };

  const removeToast = id => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  const success = (text, config) => {
    addToast({text, ...config, type: 'success'});
  };

  const danger = (text, config) => {
    addToast({text, ...config, type: 'danger'});
  };

  const warning = (text, config) => {
    addToast({text, ...config, type: 'warning'});
  };

  const info = (text, config) => {
    addToast({text, ...config, type: 'info'});
  };

  const toastr = {
    success,
    danger,
    warning,
    info,
  }

  return (
    <ToastrContext.Provider value={toastr}>
      <View style={{flex: 1}}>{children}</View>

      <View style={styles.toastsContainer}>
        {toasts.map(toast => (
          <ToastrItem
            key={toast.id}
            {...toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </View>
    </ToastrContext.Provider>
  );
}

const styles = StyleSheet.create({
  toastsContainer: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
});
