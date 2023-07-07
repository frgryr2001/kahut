import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  ForgotPasswordScreen,
  HomeScreen,
  LoadingScreen,
  LoginScreen,
  OtpScreen,
  RegisterScreen,
} from '../screens';
import {selectStatus} from '../redux/slices/authSlice/selector';
import {useSelector} from 'react-redux';

export type RootStackParams = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  OtpScreen: {
    email: string;
    password: string;
    username: string;
  };
};
export type ScreenName = keyof RootStackParams;

const Stack = createStackNavigator<RootStackParams>();
export const Navigator = () => {
  //   const status = useSelector(selectStatus);

  //   if (status === 'checking') {
  //     return <LoadingScreen />;
  //   }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
