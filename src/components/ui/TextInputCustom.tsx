import React from 'react';
import {TextInputProps, TextInput} from 'react-native';
interface TextInputCustomProps extends TextInputProps {
  style?: any;
}

export const TextInputCustom = ({style, ...props}: TextInputCustomProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <TextInput
      {...props}
      style={[
        style,
        {
          borderColor: isFocused ? '#7950f2' : '#BDBDBD',
        },
      ]}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
