import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {RootStackParams, ScreenName} from '../../../navigation/Navigation';
import {FormAuth} from '../../../components/ui';
import {useAppDispatch} from '../../../redux/store';
import {sendOtp} from '../../../redux/slices/authSlice/actions';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen as never);
  };
  const onResetPassword = (data: any) => {
    dispatch(sendOtp({action: 'resetpassword', email: data.email}))
      .unwrap()
      .then(() =>
        navigation.navigate('ResetPasswordScreen', {email: data.email}),
      )
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
        // paddingTop: StatusBar.currentHeight, IOS
      }}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-350}>
          <View
            style={{
              flex: 1,
            }}>
            <LinearGradientBG
              title="Forgot Password"
              subTitle="Enter your email account to reset password"
              isBtnBack
              bgImage="forgot"
              mgBottom
              goBack={() => navigation.goBack()}
            />
            <FormAuth
              resetPassword={onResetPassword}
              activeBtn
              formType="forgot"
              gotoForm={gotoScreen}
              textBtn="Continue"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
