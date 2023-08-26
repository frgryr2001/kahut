import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {RootStackParams} from '../../../navigation/AppNavigationContainer';
import Input from '../../../components/ui/Input';
import {useForm} from 'react-hook-form';
import {Button} from '../../../components/ui';
import {useAppDispatch} from '../../../redux/store';
import {resetPassword} from '../../../redux/slices/authSlice/actions';
import {useSelector} from 'react-redux';
import {selectLoading} from '../../../redux/slices/authSlice/selector';

interface Props
  extends StackScreenProps<RootStackParams, 'ResetPasswordScreen'> {}

export const ResetPasswordScreen = ({navigation, route}: Props) => {
  const {email} = route.params;
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  const {
    control,
    handleSubmit,
    // reset,
    watch,
    // formState: {errors},
  } = useForm();
  const onSubmit = (data: any) => {
    const newData = {
      otp: data.otp,
      password: data.newPassword,
      email,
    };
    dispatch(resetPassword(newData))
      .unwrap()
      .then(() => {
        Snackbar.show({
          text: 'Reset password successfully',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: '#7C4DFF',
          fontFamily: 'Poppins-Regular',
        });

        navigation.navigate('LoginScreen');
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
        // paddingTop: StatusBar.currentHeight, IOS
      }}>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-200}>
          <View
            style={{
              flex: 1,
            }}>
            <LinearGradientBG
              title="Reset Password"
              subTitle="Enter your new password and confirm it"
              isBtnBack
              bgImage="resetpassword"
              mgBottom
              goBack={() => navigation.goBack()}
            />
            <View style={styles.container}>
              <Input
                control={control}
                rules={{
                  required: 'Otp is required',
                  //only 6 digits
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'Otp must be 6 digits',
                  },
                }}
                label="Otp"
                name="otp"
              />
              <Input
                control={control}
                rules={{
                  required: 'New password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                }}
                label="New password"
                name="newPassword"
                secureTextEntry={true}
              />
              <Input
                control={control}
                rules={{
                  required: 'Confirm password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  validate: (value: string) =>
                    value === watch('newPassword') ||
                    'The passwords do not match',
                }}
                label="Confirm password"
                name="confirmPassword"
                secureTextEntry={true}
              />

              <Button
                title="Confirm"
                loading={loading}
                disabled={loading}
                color="#7C4DFF"
                size="medium"
                isActive
                style={{
                  backgroundColor: '#7C4DFF',
                }}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});
