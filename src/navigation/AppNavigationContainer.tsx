import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {
  CreateQuestionScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OtpScreen,
  QuestionScreen,
  RegisterScreen,
  ResetPasswordScreen,
  SettingQuestionScreen,
  UserSettingScreen,
} from '../screens';
import {AppTabNavigator} from './AppTabNavigator';
import ModalScreen from '../screens/main/create-question/modal';
import {Question} from '../types/question';
import {DarkTheme, LightTheme} from '../themes/appTheme';
import {AppBarIconButton} from '../components/ui';
import {selectStatus} from '../redux/slices/authSlice/selector';

export type RootStackParams = {
  HomeScreen: undefined;
  DiscoverScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  UserSettingScreen: undefined;
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
    isDraft?: boolean;
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
        <Stack.Screen
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
        />
        <Stack.Screen name="HomeScreen" component={AppTabNavigator} />
        <Stack.Screen
          name="UserSettingScreen"
          component={UserSettingScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerRight:
              status === 'authenticated'
                ? () =>
                    AppBarIconButton({
                      type: 'normal',
                      onPress: () => {},
                      icon: 'create-outline',
                    })
                : undefined,
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
