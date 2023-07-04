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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

GoogleSignin.configure({
  webClientId:
    '550876915434-5mv9t5oohu6je79rphg5g7ve1l5ieqbe.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true,
});

export const LoginScreen = ({navigation}: Props) => {
  const gotoScreen = (screen: ScreenName) => {
    navigation.navigate(screen);
  };
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(JSON.stringify(userInfo));
    } catch (error: any) {
      console.log('got error', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={-350}
            style={{
              flex: 1,
            }}>
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
                signIn={signIn}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
