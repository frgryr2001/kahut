import React, {useState, useRef, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {LinearGradientBG} from '../../../components/layouts/LinearGradientBG';
import {RootStackParams} from '../../../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'OtpScreen'> {}

export const OtpScreen = ({navigation}: Props) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [codeExpired, setCodeExpired] = useState(false);
  const otpInputs = useRef<TextInput[]>([]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (timer > 0 && !codeExpired) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setCodeExpired(true);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timer, codeExpired]);
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // Focus on next input
    if (text.length === 1 && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
    if (!text && index > 0) {
      otpInputs.current[index - 1].focus();
      newOtp[index] = '';
      setOtp(newOtp);
    }

    // Blur the last input
    if (text.length === 1 && index === otp.length - 1) {
      otpInputs.current[index].blur();
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-350}>
          <View style={{flex: 1}}>
            <LinearGradientBG
              title="OTP Verification"
              subTitle="Check your email for the OTP code"
              isBtnBack
              goBack={() => navigation.goBack()}
            />

            {/* OTP verifier */}
            <View style={styles.container}>
              <Text style={styles.label}>Enter OTP:</Text>
              <View style={styles.inputContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.input,
                      digit.length > 0 && styles.inputFilled,
                    ]}
                    value={digit}
                    onChangeText={text => handleOtpChange(text, index)}
                    maxLength={1}
                    keyboardType="numeric"
                    ref={ref => (otpInputs.current[index] = ref!)}
                  />
                ))}
              </View>
              <View
                style={[
                  styles.container,
                  {marginVertical: 0, marginBottom: 10},
                ]}>
                {/* Existing code */}
                <View style={styles.timerContainer}>
                  <Text style={styles.timerText}>
                    {codeExpired
                      ? 'Code expired'
                      : `Code will expire in ${timer} seconds`}
                  </Text>
                  {
                    <TouchableOpacity
                      style={styles.resendButton}
                      //   onPress={handleResendCode}
                      activeOpacity={0.9}>
                      <Text style={styles.resendButtonText}>Resend Code</Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  otp.join('').length === 6 ? {backgroundColor: '#7C4DFF'} : {},
                ]}
                onPress={() => {}}
                activeOpacity={0.9}>
                <Text style={styles.buttonText}>Verify</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    borderRadius: 8,
    height: 50,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
  },
  inputFilled: {
    backgroundColor: 'lightgray',
  },
  button: {
    backgroundColor: '#BDBDBD',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  timerText: {
    fontSize: 16,
    fontFamily: 'Popins-Regular',
    marginBottom: 10,
  },
  resendButton: {
    // alignSelf: 'center',
  },
  resendButtonText: {
    color: '#7C4DFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
