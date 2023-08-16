import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  as?: 'text' | 'button';
  isActive?: boolean;
  color?: string;
  width?: number;
  style?: any;
}
export const Button = ({
  title,
  onPress,
  loading,
  disabled,
  as,
  size,
  color,
  width,
  isActive,
  style,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        as === 'text'
          ? {}
          : {
              ...styles.button,
            },
        size === 'small' && {paddingVertical: 5, paddingHorizontal: 20},
        size === 'medium' && {paddingVertical: 10, paddingHorizontal: 30},
        size === 'large' && {paddingVertical: 20, paddingHorizontal: 40},
        {backgroundColor: isActive ? '#2886de' : color, width: width},
        {
          ...style,
        },
      ]}
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
              : {...styles.buttonText, color: isActive ? '#fff' : 'black'}
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
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});
