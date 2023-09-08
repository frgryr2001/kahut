import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Button} from '../../../../components/ui';

export default function PinCode({
  verifyPinPlay,
}: {
  verifyPinPlay: (pinCode: number) => Promise<void>;
}) {
  const {colors} = useTheme();
  const [textPin, setTextPin] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Text
        style={[
          styles.titlePin,
          {
            fontFamily: 'Poppins-Medium',
            color: '#FFFFFF',
          },
        ]}>
        Enter PIN
      </Text>
      {/* subtitle */}
      <Text style={styles.subTitlePin}>Please enter the 8-digit PIN</Text>

      <TextInput
        style={{
          height: 50,
          width: '100%',
          borderColor: colors.border,
          borderWidth: 1,
          color: colors.text,
          marginTop: 10,
          fontSize: 16,
          backgroundColor: 'white',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          fontFamily: 'Poppins-Regular',
        }}
        placeholder="Enter PIN"
        placeholderTextColor={'#777'}
        keyboardType="numeric"
        maxLength={8}
        onChangeText={text => setTextPin(text)}
        value={textPin}
      />

      <Button
        title="Enter"
        onPress={() => {
          if (textPin.match(/^[0-9]+$/) == null) {
            return Alert.alert('PIN must be a number');
          }
          verifyPinPlay(+textPin).then(() => {
            setTextPin('');
          });
        }}
        size="medium"
        width={'100%'}
        style={{
          marginTop: 20,
          backgroundColor: textPin.length < 8 ? '#ccc' : '#536DFE',
          fontFamily: 'Poppins-Bold',
        }}
        isActive
        disabled={textPin.length < 8}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titlePin: {
    fontSize: 32,
  },
  subTitlePin: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
