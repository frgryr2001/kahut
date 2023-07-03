import {View, Text, StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';

interface TextInputCustomProps extends TextInputProps {
  label: string;
}
const Input = ({label, ...props}: TextInputCustomProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text
          style={{
            fontSize: 14,
            color: '#BDBDBD',
            fontFamily: 'Poppins-Regular',
          }}>
          {label}
        </Text>
      </View>
      <View>
        <TextInput
          {...props}
          style={[
            styles.inputContainer,
            {
              borderColor: isFocused ? '#7950f2' : '#BDBDBD',
            },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    marginStart: 7,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    top: 0,
  },
  inputContainer: {
    height: 55,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
});

export default Input;
