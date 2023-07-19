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
  SettingQuestionScreen,
} from '../screens';
import {selectStatus} from '../redux/slices/authSlice/selector';
import {useSelector} from 'react-redux';
import {TabsApp} from './Tab';

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
  SettingQuestionScreen: undefined;
};
export type ScreenName = keyof RootStackParams;

const Stack = createStackNavigator<RootStackParams>();
export const Navigator = () => {
  const status = useSelector(selectStatus);

  return (
    <NavigationContainer independent>
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
            <Stack.Screen name="HomeScreen" component={TabsApp} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
            <Stack.Screen
              name="SettingQuestionScreen"
              component={SettingQuestionScreen}
              options={{
                headerShown: true,
                headerTitle: 'Setting',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: '#fff',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 3,
                },
                cardStyle: {
                  backgroundColor: '#F5F5F5',
                },
              }}
            />

            {/* <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            /> */}
          </>
        ) : (
          <>
            {/* <Stack.Screen name="HomeScreen" component={TabsApp} />
            <Stack.Screen name="QuestionScreen" component={QuestionScreen} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
