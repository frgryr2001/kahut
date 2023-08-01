import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateQuestionScreen,
  QuestionScreen,
  SettingQuestionScreen,
} from '../screens';
import {selectStatus} from '../redux/slices/authSlice/selector';
import {useSelector} from 'react-redux';
import {AppTabNavigator} from './AppTabNavigator';
import ModalScreen from '../screens/main/create-question/modal';
import {Question} from '../types/question';
import {DarkTheme, LightTheme} from '../themes/appTheme';

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

export const AppNavigationContainer = () => {
  const scheme = useColorScheme();
  const status = useSelector(selectStatus);

  return (
    <NavigationContainer theme={scheme === 'light' ? LightTheme : DarkTheme}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}>
        {status !== 'authenticated' ? (
          <>
            <Stack.Screen name="HomeScreen" component={AppTabNavigator} />
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
        ) : (
          <>
            <Stack.Screen name="HomeScreen" component={AppTabNavigator} />
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
