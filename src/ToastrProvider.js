import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import ToastrItem from './ToastrItem'

export const ToastrContext = React.createContext();

let lastInsertId = 0

export default function ToastrProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const addToast = toast => {
    const id = lastInsertId++;
    toast.id = id;

    setToasts([...toasts, toast]);
  };

  const removeToast = id => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  const success = toast => {
    addToast({...toast, type: 'success'});
  };

  const error = toast => {
    addToast({...toast, type: 'error'});
  };

  const warning = toast => {
    addToast({...toast, type: 'warning'});
  };

  const info = toast => {
    addToast({...toast, type: 'info'});
  };

  const toastr = {
    success,
    error,
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
            toast={toast}
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
