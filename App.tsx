import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigationContainer} from './src/navigation/AppNavigationContainer';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import {LoadingScreen} from './src/screens';
import setup from './src/services/utils/setUpInterceptors';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppNavigationContainer />
      </PersistGate>
    </Provider>
  );
}
setup();
