import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {
  RootStackParams,
  ScreenName,
} from '../../../navigation/AppNavigationContainer';
import {FormAuth} from '../../../components/ui';
import {useAppDispatch} from '../../../redux/store';
import {sendOtp} from '../../../redux/slices/authSlice/actions';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}
export const RegisterScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen as never);
  };

  const signUpWithEmail = (data: any, callback: () => void) => {
    if (data.password !== data.confirmPassword) {
      return Snackbar.show({
        text: 'Password and confirm password do not match',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#ED4337',
        fontFamily: 'Poppins-Regular',
      });
    }
    dispatch(
      sendOtp({
        action: 'signup',
        username: data.username,
        email: data.email,
      }),
    )
      .unwrap()
      .then(() => {
        navigation.navigate('OtpScreen', {
          email: data.email,
          password: data.password,
          username: data.username,
        });
        callback();
      })
      .catch((err: any) => {
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#ED4337',
          fontFamily: 'Poppins-Regular',
        });
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-30}>
          <View
            style={{
              flex: 1,
            }}>
            <LinearGradientBG
              title="Sign up"
              isBtnBack
              goBack={() => navigation.goBack()}
              bgImage="register"
            />
            <FormAuth
              formType="register"
              gotoForm={gotoScreen}
              textBtn="Sign up"
              activeBtn={true}
              signUpWithEmail={signUpWithEmail}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
