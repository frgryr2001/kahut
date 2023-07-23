import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';

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
  };
  ModalQuestionScreen: undefined;
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
                // presentation: 'modal',
                // cardOverlayEnabled: true,
                // ...TransitionPresets.ModalPresentationIOS,
                // cardOverlay: () => (
                //   <View
                //     style={{
                //       flex: 1,
                //       backgroundColor: 'rgba(0, 0, 0, 0.5)',
                //     }}
                //   />
                // ),
              }}
            />
            <Stack.Screen
              name="CreateQuestionScreen"
              component={CreateQuestionScreen}
              options={{
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
            />
            <Stack.Screen
              name="ModalQuestionScreen"
              component={ModalScreen}
              options={{
                presentation: 'transparentModal',
                ...TransitionPresets.ModalFadeTransition,
                animationEnabled: true,
                cardStyle: {
                  backgroundColor: 'transparent',
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
