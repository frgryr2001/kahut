import 'react-native-gesture-handler';
import React from 'react';
import {Navigator} from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
