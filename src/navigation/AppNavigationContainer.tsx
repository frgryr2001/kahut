import React from 'react';
import {useColorScheme, Image} from 'react-native';
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import * as mainScreens from '../screens';
import {AppTabNavigator} from './AppTabNavigator';
import ModalScreen from '../screens/main/create-question/modal';
import {Question} from '../types/question';
import {KahootDetailData} from '../types/kahoot.type';
import {DarkTheme, LightTheme} from '../themes/appTheme';

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
    isEditAPI?: boolean;
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
  PlayScreen: {
    kahoot?: KahootDetailData;
    assignmentId?: number;
  };
  ReportDetailScreen: {
    id: number;
    kahootId: number;
    assignmentId?: number;
    kahootName: string;
  };
  ResultPlayKahootScreen: {
    id: number;
    kahootId?: number;
    assignmentId?: number;
    kahootName?: string;
    kahootObj?: KahootDetailData;
  };
  JoinScreen: undefined;
  SearchKahootScreen: undefined;
};
export type ScreenName = keyof RootStackParams;

const Stack = createNativeStackNavigator<RootStackParams>();

export const AppNavigationContainer = () => {
  const scheme = useColorScheme();
  const {colors} = useTheme();
  // const status = useSelector(selectStatus);

  const getAppBarLogo = () => {
    return (
      <Image
        source={require('../assets/images/logo.png')}
        style={{width: 32, height: 32}}
        resizeMode="cover"
      />
    );
  };

  return (
    <NavigationContainer theme={scheme === 'light' ? LightTheme : DarkTheme}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
          },
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
          name="UserDetailScreen"
          component={mainScreens.UserDetailScreen}
          // options={({route}) => ({
          //   headerShown: true,
          //   headerTitle: route.params.name,
          //   headerTitleAlign: 'center',
          //   headerStyle: {
          //     backgroundColor: colors.card,
          //   },
          //   headerShadowVisible: false,
          // })}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerTitle: () => getAppBarLogo(),
          }}
        />

        <Stack.Screen
          name="UserSettingScreen"
          component={mainScreens.UserSettingScreen}
          options={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Settings',
            headerStyle: {
              backgroundColor: colors.card,
            },
            headerShadowVisible: false,
            // headerRight:
            //   status === 'authenticated'
            //     ? () =>
            //         AppBarIconButton({
            //           type: 'normal',
            //           onPress: () => {},
            //           icon: 'account-edit-outline',
            //         })
            //     : undefined,
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
              backgroundColor: colors.card,
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
          name="PlayScreen"
          component={mainScreens.PlayScreen}
          options={{
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
        <Stack.Screen
          name="JoinScreen"
          component={mainScreens.JoinScreen}
          options={{
            contentStyle: {
              backgroundColor: colors.background,
            },
            presentation: 'card',
          }}
        />

        <Stack.Screen
          name="ResultPlayKahootScreen"
          component={mainScreens.ResultPlayKahoot}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
        <Stack.Screen
          name="ReportDetailScreen"
          component={mainScreens.ReportDetailScreen}
          options={({route}) => {
            return {
              headerShown: true,
              headerTitleAlign: 'center',
              headerTitle: route.params.kahootName,
              contentStyle: {
                backgroundColor: colors.background,
              },
            };
          }}
        />

        <Stack.Screen
          name="SearchKahootScreen"
          component={mainScreens.SearchKahootScreen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
