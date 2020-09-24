# React Native Toastr

React Native Toastr is strongly inspired by the [toastr](https://github.com/CodeSeven/toastr) package.

## Installation

```
yarn add @dozgrou/react-native-toastr
```
or
```
npm install @dozgrou/react-native-toastr
```

## Usage

First, wrap your entire application with `ToastrProvider` component.

```js
import React from 'react';
import {ToastrProvider} from '@dozgrou/react-native-toastr'

class App extends React.Component {
    render() {
        return (
            <ToastrProvider>
                // App
            </ToastrProvider>
        );
    }
};
```

And then use the `withToastr` function to access the toastr api.

```jsx
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {withToastr} from '@dozgrou/react-native-toastr';

class Button extends React.Component {
    handlePress() {
        this.props.toastr.success('Awesome notification', {
            dismissable: false,
        });
    }
	
    render() {
        return (
            <TouchableOpacity
                onPress={() => this.handlePress()}>
                <Text>Click me</Text>
            </TouchableOpacity>
        );
    }
}

//Use the function withToastr to get access to toastr props
//in any component
export default withToastr(Button)
```

### Custom component

```jsx
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native';
import {withToastr} from '@dozgrou/react-native-toastr';

const CustomComponent = ({onRemove}) => {
  return (
    <TouchableOpacity onPress={onRemove}>
      <View>
        <Text>Awesome custom component</Text>
      </View>
    </TouchableOpacity>
  )
};

const Button = () => {
  return (
    <TouchableOpacity onPress={toastr.custom((...config) => <CustomComponent {...config} />)}>
      <View>Click me</View>
    </TouchableOpacity>
  );
};

export default withToastr(Button);
```

## Methods

| Method name   | Arguments                                                                         | Notes                             |
|---------------|-----------------------------------------------------------------------------------|-----------------------------------|
|success        | text: string, config?: [ToastrConfig](#toastr-config)                             | Show a success message (Green)    |
|danger         | text: string, config?: [ToastrConfig](#toastr-config)                             | Show a danger message (Red)       |
|warning        | text: string, config?: [ToastrConfig](#toastr-config)                             | Show a warning message (Yellow)   |
|info           | text: string, config?: [ToastrConfig](#toastr-config)                             | Show an info message (Blue)       |
|custom         | component: Function(onRemove: Function), config?: [ToastrConfig](#toastr-config)  | Show a custom component           |


## Toastr config
|                   | Type      | Default   | Notes                                             |
|-------------------|-----------|-----------|---------------------------------------------------|
| timeout           | boolean   | true      | Set to `false` to disable the timeout             |
| timeoutDuration   | number    | 5000      | The timeout duration in ms                        |
| dismissable       | boolean   | true      | Set to `false` to disable click to remove         |
| progressBar       | boolean   | true      | Set to `false` to deactivate the progress bar     |
| duplicate         | boolean   | true      | Set to `false` to not display duplicates toastr   |


## License
[MIT](license.md)
