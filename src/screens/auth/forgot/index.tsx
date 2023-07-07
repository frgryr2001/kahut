import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {RootStackParams, ScreenName} from '../../../navigation/Navigation';
import {FormAuth} from '../../../components/ui';

interface Props
  extends StackScreenProps<RootStackParams, 'ForgotPasswordScreen'> {}

export const ForgotPasswordScreen = ({navigation}: Props) => {
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen as never);
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
