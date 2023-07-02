import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonIconSignIn} from './ButtonIconSignIn';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInputCustom} from './TextInputCustom';

interface Props {
  formType: 'login' | 'register' | 'forgot' | 'otp';
  gotoForm: () => void;
}

export const FormAuth = ({formType = 'login', gotoForm}: Props) => {
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 10,
        }}>
        <Text style={styles.label}>Email:</Text>
        <TextInputCustom
          style={styles.input}
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Enter your email ..."
        />
        <Text style={styles.label}>Password:</Text>
        <View
          style={{
            position: 'relative',
          }}>
          <TextInputCustom
            style={styles.input}
            autoCorrect={false}
            placeholder="Enter your password ..."
            secureTextEntry={!isShowPassword}
            keyboardType="default"
          />
          <TouchableOpacity
            onPress={handleShowPassword}
            style={{
              position: 'absolute',
              right: 10,
              top: 25,
            }}>
            <Icon
              name={isShowPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            marginBottom: 10,
          }}>
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
        <TouchableOpacity
          style={styles.buttonLogin}
          activeOpacity={0.9}
          disabled>
          <Text style={styles.buttonTextLogin}>Login</Text>
        </TouchableOpacity>

        {/* Button Login */}
        <View
          style={{
            flexDirection: 'column',
            rowGap: 15,
          }}>
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
              <View style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}} />
              <Text
                style={{
                  ...styles.textTitle,
                }}>
                Or login with
              </Text>
              <View style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}} />
            </View>
            {/* OR Login others */}
            <View style={styles.btnSignInOther}>
              <ButtonIconSignIn
                nameIcon="logo-google"
                sizeIcon={25}
                textIcon="Google"
                colorIcon={'#DB4437'}
              />

              <ButtonIconSignIn
                nameIcon="logo-facebook"
                sizeIcon={25}
                textIcon="Facebook"
                colorIcon={'#4267B2'}
              />
            </View>
          </View>
          {/* Sign up */}
          <View style={styles.signUpBtn}>
            <Text style={styles.textTitle}>Don't you have an account ?</Text>
            <TouchableOpacity onPress={gotoForm}>
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
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleLogin: {
    fontFamily: 'Poppins-Bold',

    fontSize: 26,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  input: {
    height: 50,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#e0e0e0',
    borderRadius: 5,
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
    fontSize: 18,
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
