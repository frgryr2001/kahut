import 'react-native-gesture-handler';
import React from 'react';
import {Navigator} from './src/navigation/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {LoadingScreen} from './src/screens';
import setup from './src/services/utils/setUpInterceptors';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <Navigator />
      </PersistGate>
    </Provider>
  );
}
setup();
