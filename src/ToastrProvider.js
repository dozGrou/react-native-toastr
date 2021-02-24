import React, {useState, useCallback} from 'react';
import {LayoutAnimation, Platform, StyleSheet, UIManager, View} from 'react-native';
import ToastrItem from './ToastrItem';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function isDuplicate(toast1, toast2) {
  return (
    toast1?.text === toast2?.text &&
    toast1?.type === toast2?.type &&
    toast1?.duplicate === toast2?.duplicate
  )
}

export const ToastrContext = React.createContext();

let lastId = 0

export default function ToastrProvider({children}) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({text, type, duplicate = true, ...config}) => {
    const toast = {text, type, duplicate, ...config}

    if (!toast.duplicate && toasts.some(t => isDuplicate(t, toast))) {
      return;
    }

    toast.id = lastId++;

    setToasts(toasts => [...toasts, toast]);
  };

  const removeToast = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setToasts(toasts => toasts.filter(toast => toast.id !== id));
  };

  const success = useCallback((text, config) => {
    addToast({text, ...config, type: 'success'})
  }, [addToast]);
  const danger = useCallback((text, config) => {
    addToast({text, ...config, type: 'danger'})
  }, [addToast]);
  const warning = useCallback((text, config) => {
    addToast({text, ...config, type: 'warning'})
  }, [addToast]);
  const info = useCallback((text, config) => {
    addToast({text, ...config, type: 'info'})
  }, [addToast]);

  const custom = useCallback((component, config) => {
    addToast({component, ...config})
  }, [addToast]);

  return (
    <ToastrContext.Provider
      value={{
        success,
        danger,
        warning,
        info,
        custom,
      }}
    >
      <View style={{flex: 1}}>{children}</View>

      <View style={styles.toastsContainer}>
        {toasts.map(toast => {
          const {component: Component} = toast;
          if (Component) {
            return (
              <Component
                key={toast.id}
                {...toast}
                onRemove={() => removeToast(toast.id)}
              />
            );
          }

          return (
            <ToastrItem
              key={toast.id}
              {...toast}
              onRemove={() => removeToast(toast.id)}
            />
          );
        })}
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
