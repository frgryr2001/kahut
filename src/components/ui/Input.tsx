import {View, Text, StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {Control, Controller, FieldValues} from 'react-hook-form';

interface TextInputCustomProps extends TextInputProps {
  label: string;
  name: string;
  control: Control<FieldValues, any>;
  rules: {};
}
const Input = ({
  control,
  label,
  name,
  rules = {},
  ...props
}: TextInputCustomProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocusOutline = () => {
    setIsFocused(true);
  };
  const onBlurOutline = () => {
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
        <Controller
          control={control}
          rules={rules}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
            return (
              <>
                <TextInput
                  style={[
                    styles.inputContainer,
                    isFocused && {borderColor: '#7C4DFF'},
                    error && {borderColor: 'red'},
                  ]}
                  onBlur={() => {
                    onBlur();
                    onBlurOutline();
                  }}
                  onFocus={onFocusOutline}
                  onChangeText={onChange}
                  value={value}
                  {...props}
                />
                {error && (
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular',
                      alignSelf: 'stretch',
                    }}>
                    {error?.message}
                  </Text>
                )}
              </>
            );
          }}
          name={name}
          defaultValue=""
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
