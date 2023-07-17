import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {
  ForgotPasswordScreen,
  LoginScreen,
  OtpScreen,
  QuestionScreen,
  RegisterScreen,
  ResetPasswordScreen,
} from '../screens';
import {selectStatus} from '../redux/slices/authSlice/selector';
import {useSelector} from 'react-redux';
import {TabsApp} from './Tab';

import {HeaderButtonSaveRight} from '../components/ui';

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
  ResetPasswordScreen: {
    email: string;
  };
  QuestionScreen: undefined;
};
export type ScreenName = keyof RootStackParams;

const Stack = createStackNavigator<RootStackParams>();
export const Navigator = () => {
  const status = useSelector(selectStatus);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={TabsApp} />
            <Stack.Screen
              name="QuestionScreen"
              component={QuestionScreen}
              options={{
                headerShown: true,
                headerTitle: 'Create Question',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 18,
                  color: 'black',
                },
                headerStyle: {},
                headerRightContainerStyle: {
                  padding: 10,
                },
                headerRight: HeaderButtonSaveRight,
                cardStyle: {
                  backgroundColor: '#F5F5F5',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
