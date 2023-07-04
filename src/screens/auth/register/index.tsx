import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {RootStackParams, ScreenName} from '../../../navigation/Navigation';
import {FormAuth} from '../../../components/ui';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}
export const RegisterScreen = ({navigation}: Props) => {
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-350}>
          <View
            style={{
              flex: 1,
            }}>
            <LinearGradientBG
              title="Register"
              subTitle="Create your account"
              isBtnBack
              goBack={() => navigation.goBack()}
            />
            <FormAuth
              formType="register"
              gotoForm={gotoScreen}
              textBtn="Sign up"
              activeBtn={true}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
