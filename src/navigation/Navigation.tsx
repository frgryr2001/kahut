import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import {Question} from '../types/question';

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
  QuestionScreen: {
    question: Question;
  };
  SettingQuestionScreen: {
    kahoot: Question;
  };
  CreateQuestionScreen: {
    type?: 'quiz' | 'tf';
    kahootID: string;
    id: string;
  };

  ModalQuestionScreen: {
    indexQuestion?: number;
    isQuestionTitle?: boolean;
    questionTitle?: string;
    kahootID: string;
    typeTf?: boolean;
    id: string;
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
                },
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
            {/* <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                contentStyle: {
                  backgroundColor: '#fff',
                },
              }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{
                contentStyle: {
                  backgroundColor: '#fff',
                },
              }}
            />
            <Stack.Screen
              name="ForgotPasswordScreen"
              component={ForgotPasswordScreen}
              options={{
                contentStyle: {
                  backgroundColor: '#fff',
                },
              }}
            />
            <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{
                contentStyle: {
                  backgroundColor: '#fff',
                },
              }}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{
                contentStyle: {
                  backgroundColor: '#fff',
                },
              }}
            /> */}
          </>
        ) : (
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
                },
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
