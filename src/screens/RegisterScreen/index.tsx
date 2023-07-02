import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {ButtonIconSignIn, TextInputCustom} from '../../components/ui';
import {LinearGradientBG} from '../../components/layouts/LinearGradientBG';

import {RootStackParams} from '../../navigator/Navigator';
import {StackScreenProps} from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradientBG>
        <View style={styles.container}>
          <Text style={styles.titleLogin}>Log in</Text>
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
              //   onEndEditing={() => {
              //     console.log('onEndEditing');
              //   }}
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
                  top: 20,
                }}>
                <Icon
                  name={isShowPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonLogin}
              activeOpacity={0.9}
              disabled>
              <Text style={styles.buttonTextLogin}>Login</Text>
            </TouchableOpacity>

            {/* Button Login */}
            <View
              style={{
                // marginVertical: 10,
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                rowGap: 15,
              }}>
              <TouchableOpacity>
                <Text style={styles.textTitle}>Forgot password?</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  rowGap: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}}
                  />
                  <View>
                    <Text
                      style={{
                        ...styles.textTitle,
                        color: '#BDBDBD',
                        marginHorizontal: 10,
                      }}>
                      OR LOGIN WITH
                    </Text>
                  </View>
                  <View
                    style={{flex: 1, height: 1, backgroundColor: '#BDBDBD'}}
                  />
                </View>
                {/* OR Login others */}
                <View style={styles.btnSignInOther}>
                  <ButtonIconSignIn
                    nameIcon="logo-google"
                    sizeIcon={30}
                    colorIcon={'#DB4437'}
                  />

                  <ButtonIconSignIn
                    nameIcon="logo-facebook"
                    sizeIcon={30}
                    colorIcon={'#4267B2'}
                  />
                </View>
              </View>
            </View>

            {/* Sign up */}
            <View style={styles.signUpBtn}>
              <Text style={styles.textTitle}>Don't you have an account ?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}>
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
      </LinearGradientBG>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    // fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'center',
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonLogin: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    // backgroundColor: '#7C4DFF',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    backgroundColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTextLogin: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  textTitle: {
    textAlign: 'right',
    marginTop: 10,
    // fontFamily: 'Poppins-Regular',
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
