import React, {useState, useRef} from 'react';
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
import {LinearGradientBG} from '../../components/layouts/LinearGradientBG';
import {RootStackParams, ScreenName} from '../../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'OtpScreen'> {}

export const OtpScreen = ({navigation}: Props) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef<TextInput[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus on next input
    if (text.length === 1 && index < otp.length - 1) {
      otpInputs.current[index + 1].focus();
    }
    // Delete otp digit when user press backspace
    if (!text && index !== 0) {
      otpInputs.current[index - 1].focus();
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
});
