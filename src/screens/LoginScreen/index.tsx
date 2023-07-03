import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {LinearGradientBG} from '../../components/layouts/LinearGradientBG';
import {RootStackParams, ScreenName} from '../../navigator/Navigator';
import {FormAuth} from '../../components/ui';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen);
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
              title="Sign in to your Account"
              subTitle="Sign in to your Account"
            />
            <FormAuth
              formType="login"
              gotoForm={gotoScreen}
              textBtn="Login"
              activeBtn
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
