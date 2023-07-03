import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonIconSignIn} from './ButtonIconSignIn';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScreenName} from '../../navigator/Navigator';
import Input from './Input';

interface Props {
  formType: 'login' | 'register' | 'forgot' | 'otp';
  gotoForm: (screen: ScreenName) => void;
  textBtn?: string;
  activeBtn?: boolean;
}

export const FormAuth = ({
  formType = 'login',
  gotoForm,
  textBtn,
  activeBtn,
}: Props) => {
  const [isShowPassword, setIsShowPassword] = React.useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });
  // check formType
  const isFormSignInOrUp = formType === 'login' || formType === 'register';

  const handleShowPassword = <T extends keyof typeof isShowPassword>(
    key: T,
  ) => {
    setIsShowPassword({
      ...isShowPassword,
      [key]: !isShowPassword[key],
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        {/* Sign up  */}
        {formType === 'register' && (
          <Input
            keyboardType="default"
            placeholder="Enter your username ..."
            label="Username"
          />
        )}
        <Input
          keyboardType="email-address"
          placeholder="Enter your email ..."
          label="Email"
        />

        {/* Sign up and Sign in */}
        {isFormSignInOrUp && (
          <View
            style={{
              position: 'relative',
              height: 55,
            }}>
            <Input
              keyboardType="default"
              placeholder="Enter your password ..."
              label="Password"
              secureTextEntry={!isShowPassword.password}
              autoCorrect={false}
            />
            {/* Icon show password */}
            <TouchableOpacity
              onPress={() => handleShowPassword('password')}
              style={{
                position: 'absolute',
                right: 15,
                top: '50%',
              }}>
              <Icon
                name={
                  isShowPassword.password ? 'eye-outline' : 'eye-off-outline'
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Sign up  */}
        {formType === 'register' && (
          <View
            style={{
              position: 'relative',
              height: 55,
              marginVertical: 25,
            }}>
            <Input
              keyboardType="default"
              placeholder="Enter your confirm password ..."
              label="Confirm password"
              secureTextEntry={!isShowPassword.confirmPassword}
              autoCorrect={false}
            />
            {/* Icon show password */}
            <TouchableOpacity
              onPress={() => handleShowPassword('confirmPassword')}
              style={{
                position: 'absolute',
                right: 15,
                top: '50%',
              }}>
              <Icon
                name={
                  isShowPassword.confirmPassword
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Sign in */}
        {formType === 'login' && (
          <TouchableOpacity
            style={{
              marginBottom: 10,
              marginTop: 20,
            }}
            activeOpacity={0.9}
            onPress={() => gotoForm('OtpScreen')}>
            <Text
              style={[
                styles.textTitle,
                {
                  color: '#7C4DFF',
                },
              ]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.buttonLogin,
            {
              backgroundColor: activeBtn ? '#7C4DFF' : '#BDBDBD',
            },
          ]}
          activeOpacity={0.9}
          disabled={activeBtn}>
          <Text style={styles.buttonTextLogin}>{textBtn}</Text>
        </TouchableOpacity>

        <View
          style={{
            rowGap: 15,
          }}>
          {isFormSignInOrUp && (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: 25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  columnGap: 20,
                }}>
                <View
                  style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}}
                />
                <Text
                  style={{
                    ...styles.textTitle,
                  }}>
                  Or login with
                </Text>
                <View
                  style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}}
                />
              </View>
              {/* OR Login others */}
              <View style={styles.btnSignInOther}>
                <ButtonIconSignIn
                  nameIcon="logo-google"
                  sizeIcon={25}
                  textIcon="Google"
                  colorIcon={'#DB4437'}
                  activeOpacity={0.7}
                />

                <ButtonIconSignIn
                  activeOpacity={0.7}
                  nameIcon="logo-facebook"
                  sizeIcon={25}
                  textIcon="Facebook"
                  colorIcon={'#4267B2'}
                />
              </View>
            </View>
          )}
          {/* Sign up */}
          {formType === 'login' && (
            <View style={styles.signUpBtn}>
              <Text style={styles.textTitle}>Don't you have an account ?</Text>
              <TouchableOpacity onPress={() => gotoForm('RegisterScreen')}>
                {/* 290498 */}
                <Text
                  style={{
                    ...styles.textTitle,
                    color: '#7C4DFF',
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Sign up */}
          {formType === 'register' && (
            <View style={styles.signUpBtn}>
              <Text style={styles.textTitle}>Have an account ?</Text>
              <TouchableOpacity onPress={() => gotoForm('LoginScreen')}>
                {/* 290498 */}
                <Text
                  style={{
                    ...styles.textTitle,
                    color: '#7C4DFF',
                  }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  titleLogin: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    textAlign: 'center',
  },

  buttonLogin: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonTextLogin: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
  textTitle: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  btnSignInOther: {
    flexDirection: 'row',
    marginHorizontal: 5,
    gap: 10,
  },
});
