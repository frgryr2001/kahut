import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {
  RootStackParams,
  ScreenName,
} from '../../../navigation/AppNavigationContainer';
import {FormAuth} from '../../../components/ui';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '@env';
import {useAppDispatch} from '../../../redux/store';
import {signInWithGoogle} from '../../../redux/slices/authSlice/actions';
import {useSelector} from 'react-redux';
import {selectLoadingScreen} from '../../../redux/slices/authSlice/selector';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: false,
});

export const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const loadingScreen = useSelector(selectLoadingScreen);
  const gotoScreen = (screen: ScreenName, callback?: () => void) => {
    navigation.navigate(screen as never);
    callback && callback();
  };
  const signInSocialGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      //   Call API from backend
      if (userInfo) {
        await dispatch(
          signInWithGoogle({
            googleId: userInfo.user.id,
            googleToken: userInfo.idToken,
          }),
        ).unwrap();
        navigation.goBack();
      }
    } catch (error: any) {
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
      }}>
      <Spinner
        visible={loadingScreen}
        textContent={'Loading...'}
        textStyle={{
          color: '#FFF',
        }}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={-200}
            style={{
              flex: 1,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <LinearGradientBG
                title="Sign in"
                bgImage="login"
                isBtnBack
                goBack={() => navigation.goBack()}
              />
              <FormAuth
                formType="login"
                gotoForm={gotoScreen}
                textBtn="Sign in"
                activeBtn
                signInSocialGoogle={signInSocialGoogle}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
