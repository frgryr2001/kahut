import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {
//   CardStyleInterpolators,
//   TransitionPresets,
//   createStackNavigator,
// } from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CreateQuestionScreen,
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
import ModalScreen from '../screens/main/create-question/modal';

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
  CreateQuestionScreen: {
    type: 'quiz' | 'tf';
    question?: string;
  };

  ModalQuestionScreen: {
    question: string;
  };
};
export type ScreenName = keyof RootStackParams;

const Stack = createNativeStackNavigator<RootStackParams>();

export const Navigator = () => {
  const status = useSelector(selectStatus);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          animation: 'slide_from_right',

          headerShown: false,
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
                  //   shadowColor: '#000',
                  //   shadowOffset: {
                  //     width: 0,
                  //     height: 2,
                  //   },
                  //   shadowOpacity: 0.25,
                  //   shadowRadius: 3.84,
                  //   elevation: 3,
                },
                // cardStyle: {
                //   backgroundColor: '#F5F5F5',
                // },
              }}
            />
            <Stack.Screen
              name="CreateQuestionScreen"
              component={CreateQuestionScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="ModalQuestionScreen"
              component={ModalScreen}
              options={{
                headerShown: false,
                presentation: 'transparentModal',

                animation: 'fade',
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
