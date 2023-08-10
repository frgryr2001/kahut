import React from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import * as mainScreens from '../screens';
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
  UserDetailScreen: {
    id: number;
    name: string;
  };
  OtpScreen: {
    email: string;
    password: string;
    username: string;
  };
  ResetPasswordScreen: {
    email: string;
  };
  QuestionScreen: {
    idQuestion?: string | number;
    isEditAPI?: boolean;
    isEdit?: boolean;
  };
  SettingQuestionScreen: {
    kahoot: Question;
    isDraft?: boolean;
  };
  CreateQuestionScreen: {
    type?: 'quiz' | 'tf';
    kahootID: string | number;
    id: string | number;
  };

  ModalQuestionScreen: {
    indexQuestion?: number;
    isQuestionTitle?: boolean;
    questionTitle?: string;
    kahootID: string | number;
    id: string | number;
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
          component={mainScreens.LoginScreen}
          options={{
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={mainScreens.RegisterScreen}
          options={{
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={mainScreens.ForgotPasswordScreen}
          options={{
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="OtpScreen"
          component={mainScreens.OtpScreen}
          options={{
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={mainScreens.ResetPasswordScreen}
          options={{
            contentStyle: {
              backgroundColor: '#fff',
            },
          }}
        />
        <Stack.Screen name="HomeScreen" component={AppTabNavigator} />
        <Stack.Screen
          name="UserSettingScreen"
          component={mainScreens.UserSettingScreen}
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
        <Stack.Screen
          name="QuestionScreen"
          component={mainScreens.QuestionScreen}
        />
        <Stack.Screen
          name="SettingQuestionScreen"
          component={mainScreens.SettingQuestionScreen}
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
          component={mainScreens.CreateQuestionScreen}
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
        <Stack.Screen
          name="UserDetailScreen"
          component={mainScreens.UserDetailScreen}
          options={({route}) => ({
            headerShown: true,
            headerTitle: route.params.name,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
