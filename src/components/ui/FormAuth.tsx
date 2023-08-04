import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FieldValues, UseFormReset, useForm} from 'react-hook-form';
import Snackbar from 'react-native-snackbar';
import {ButtonIconSignIn} from './ButtonIconSignIn';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScreenName} from '../../navigation/AppNavigationContainer';
import Input from './Input';
import {EMAIL_REGEX} from '../../helpers/emailValidation';
import {useSelector} from 'react-redux';
import {selectLoading} from '../../redux/slices/authSlice/selector';
import {useAppDispatch} from '../../redux/store';
import {signIn} from '../../redux/slices/authSlice/actions';

interface FormAuthProps {
  formType: 'login' | 'register' | 'forgot' | 'otp';
  gotoForm: (screen: ScreenName, callback?: () => void) => void;
  textBtn?: string;
  activeBtn?: boolean;
  signInSocialGoogle?: () => Promise<void>;
  signUpWithEmail?: (data: any, callback: () => void) => void;
  resetPassword?: (data: any) => void;
}

type SocialSignInProps = Omit<FormAuthProps, 'activeBtn' | 'textBtn'> & {
  reset: UseFormReset<FieldValues>;
};

function SocialSignIn({
  formType,
  gotoForm,
  signInSocialGoogle,
  reset,
}: SocialSignInProps) {
  return (
    <View
      style={{
        rowGap: 15,
      }}>
      {formType === 'login' && (
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
              sizeIcon={20}
              textIcon="Continue with Google"
              colorIcon={'#DB4437'}
              activeOpacity={0.7}
              onPress={signInSocialGoogle}
            />
          </View>
        </View>
      )}
      {/* Sign up */}
      {formType === 'login' && (
        <View style={styles.signUpBtn}>
          <Text style={{...styles.textTitle, color: '#7C4DFF'}}>
            Don't you have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => gotoForm('RegisterScreen', () => reset())}>
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
          <Text
            style={[
              styles.textTitle,
              {
                color: '#7C4DFF',
              },
            ]}>
            Have an account ?
          </Text>
          <TouchableOpacity
            onPress={() => gotoForm('LoginScreen', () => reset())}>
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
  );
}

export const FormAuth = ({
  formType = 'login',
  gotoForm,
  textBtn,
  activeBtn,
  signInSocialGoogle,
  signUpWithEmail,
  resetPassword,
}: FormAuthProps) => {
  const dispatch = useAppDispatch();
  const loading = useSelector(selectLoading);
  // check formType
  const isFormSignInOrUp = formType === 'login' || formType === 'register';
  const [isShowPassword, setIsShowPassword] = React.useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    // formState: {errors},
  } = useForm();

  const signInWithEmail = (data: {email: string; password: string}) => {
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        Snackbar.show({
          text: 'Login success',
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#fff',
          backgroundColor: '#7C4DFF',
        });

        reset();
      })
      .catch(err => {
        Snackbar.show({
          text: err.message,
          duration: Snackbar.LENGTH_SHORT,
          textColor: '#fff',
          backgroundColor: '#ff0000',
        });
      });
  };

  const onSubmit = (data: any) => {
    switch (formType) {
      case 'login':
        signInWithEmail(data);
        break;
      case 'register':
        if (signUpWithEmail) {
          signUpWithEmail(data, () => reset());
        }
        break;
      case 'forgot':
        resetPassword && resetPassword(data);
        break;
      default:
        break;
    }
  };

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
            rules={{
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username should be at least 6 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Username should be max 24 characters long',
              },
            }}
            control={control}
            keyboardType="default"
            placeholder="Enter your username ..."
            label="Username"
            name="username"
          />
        )}
        <Input
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
          control={control}
          placeholder="Enter your email ..."
          label="Email"
          name="email"
          selectTextOnFocus
        />

        {/* Sign up and Sign in */}
        {isFormSignInOrUp && (
          <View>
            <Input
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters long',
                },
                trapSpacesForRequiredFields: true,
              }}
              control={control}
              keyboardType="default"
              placeholder="Enter your password ..."
              label="Password"
              secureTextEntry={!isShowPassword.password}
              autoCorrect={false}
              name="password"
            />
            {/* Icon show password */}
            <TouchableOpacity
              onPress={() => handleShowPassword('password')}
              style={{
                position: 'absolute',
                right: 15,
                top: 27.5,
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
          <View>
            <Input
              rules={{
                required: 'Confirm password is required',
                minLength: {
                  value: 6,
                  message: 'Password should be at least 6 characters long',
                },
                trapSpacesForRequiredFields: true,
              }}
              control={control}
              name="confirmPassword"
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
                top: 27.5,
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
            }}
            activeOpacity={0.7}
            onPress={() => gotoForm('ForgotPasswordScreen', () => reset())}>
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

        {/* Button Submit */}
        <TouchableOpacity
          style={[
            styles.buttonLogin,
            {
              backgroundColor: activeBtn ? '#7C4DFF' : '#BDBDBD',
            },
          ]}
          disabled={loading}
          activeOpacity={0.9}
          onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonTextLogin}>{textBtn}</Text>
          )}
        </TouchableOpacity>

        {/* Social SignIn */}
        <SocialSignIn
          //   isFormSignInOrUp={isFormSignInOrUp}
          reset={reset}
          formType={formType}
          gotoForm={gotoForm}
          signInSocialGoogle={signInSocialGoogle}
        />
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
    marginBottom: 10,
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
    gap: 10,
  },
});
