import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {Button} from '../../../../components/ui';

export default function PinCode() {
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
          fontSize: textPin ? 20 : 16,

          backgroundColor: 'white',
          textAlign: 'center',
          borderRadius: 3,
        }}
        placeholder="Enter PIN"
        placeholderTextColor={'#ccc'}
        keyboardType="numeric"
        maxLength={8}
      />
      <Button
        title="Enter"
        onPress={() => {}}
        size="medium"
        width={'100%'}
        style={{
          marginTop: 20,
          backgroundColor: '#536DFE',
        }}
        isActive
      />
    </View>
  );
}
const styles = StyleSheet.create({
  titlePin: {
    fontSize: 32,
  },
  subTitlePin: {
    color: '#D1C4E9',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
});
