import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
}

const InputTitle = ({placeholder}: Props) => {
  const onFocus = () => {
    console.log('onFocus');
  };
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onFocus={onFocus}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 10,
    height: 50,
    flex: 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
});
export default InputTitle;
