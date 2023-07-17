import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  as?: 'text' | 'button';
}
export const Button = ({title, onPress, loading, disabled, as}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={
        as === 'text'
          ? {}
          : {
              ...styles.button,
            }
      }
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color="#fff" size={'small'} />
      ) : (
        <Text
          style={
            as === 'text'
              ? {
                  color: 'black',
                  fontFamily: 'Poppins-Bold',
                }
              : {...styles.buttonText}
          }>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
});
